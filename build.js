const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const i18n = require('./src/assets/js/i18n.js');

const srcFile = path.join(__dirname, 'src/index.html');
const distDir = path.join(__dirname, 'dist');

// 只处理英文和中文
const langs = [
  { code: 'en', out: 'index.html', dir: distDir },
  { code: 'zh', out: 'index.html', dir: path.join(distDir, 'zh') }
];

// 构建每个语言版本的首页 (index.html)
langs.forEach(({ code, out, dir }) => {
  const html = fs.readFileSync(srcFile, 'utf-8');
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const dict = i18n[code] || {};

  // 资源路径前缀
  const assetPrefix = (dir === distDir) ? 'assets/' : '../assets/';
  ['src', 'href', 'data-src', 'data-href'].forEach(attr => {
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      const val = el.getAttribute(attr);
      if (val && val.startsWith('assets/')) {
        el.setAttribute(attr, assetPrefix + val.slice(7));
      }
    });
  });

  // 替换 data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  // 设置语言切换按钮的初始文本
  document.querySelectorAll('.i18n-lang-text').forEach(el => {
    const langNameKey = { en: 'english', zh: 'chinese' }[code];
    if (dict[langNameKey]) {
      el.textContent = dict[langNameKey];
    }
  });

  // 设置 HTML 属性
  document.documentElement.lang = code;
  if (code === 'ar') {
    document.documentElement.dir = 'rtl';
  }

  // 设置 SEO 标签
  if (dict.title) document.title = dict.title;
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', dict.description || '');
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', dict.og_title || '');
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', dict.og_description || '');

  // 动态设置 hreflang 标签
  langs.forEach(langInfo => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', langInfo.code);
      const href = (langInfo.code === 'en') ? '/' : `/${langInfo.code}/`;
      link.setAttribute('href', href);
      document.head.appendChild(link);
  });

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, out), dom.serialize(), 'utf-8');
  console.log(`✅ 已生成: ${path.join(dir, out)}`);
});

// 拷贝静态资源 assets/
const copyDir = (src, dest) => {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, file.name);
    const destPath = path.join(dest, file.name);
    file.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
};
copyDir(path.join(__dirname, 'src/assets'), path.join(distDir, 'assets'));
console.log('✅ 已复制静态资源 assets/');

// 递归处理 main 目录下所有 html 文件
const mainSrcDir = path.join(__dirname, 'src/main');
function processMainFiles(srcDir, outDir, lang) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(outDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const outPath = path.join(outDir, entry.name);
    if (entry.isDirectory()) {
      processMainFiles(srcPath, outPath, lang);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const html = fs.readFileSync(srcPath, 'utf-8');
      const dom = new JSDOM(html);
      const { document } = dom.window;
      const dict = i18n[lang] || {};
      
      // 根据是否为中文目录来确定资产路径
      const isZhDir = outDir.includes(path.sep + 'zh' + path.sep) || outDir.endsWith(path.sep + 'zh');
      const assetPrefix = isZhDir ? '../../assets/' : '../assets/';

      ['src', 'href', 'data-src', 'data-href'].forEach(attr => {
        document.querySelectorAll(`[${attr}]`).forEach(el => {
          const val = el.getAttribute(attr);
          if (val && val.startsWith('assets/')) {
            el.setAttribute(attr, assetPrefix + val.slice(7));
          } else if (val && val.startsWith('/assets/')) {
            el.setAttribute(attr, assetPrefix + val.slice(8));
          } else if (val && val.startsWith('../assets/')) {
            el.setAttribute(attr, assetPrefix + val.slice(10));
          }
        });
      });
      
      document.querySelectorAll('link[rel="stylesheet"]').forEach(el => {
        const href = el.getAttribute('href');
        if (href && href.includes('.scss')) {
          if (href.includes('main.scss')) {
            el.setAttribute('href', href.replace('scss/theme/main.scss', 'css/theme-six.css'));
          } else {
            el.setAttribute('href', href.replace('.scss', '.css'));
          }
        }
      });
      
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
      });

      // 在这里也添加一次按钮文本的修正
      document.querySelectorAll('.i18n-lang-text').forEach(el => {
        const langNameKey = { en: 'english', zh: 'chinese' }[lang];
        if (dict[langNameKey]) {
          el.textContent = dict[langNameKey];
        }
      });
      
      // 如果是列表页，更新清洁工详情页链接
      if (entry.name === 'cleaner-search-listing.html') {
        const cleanersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/cleaners.json'), 'utf-8'));
        const cleanersPath = isZhDir ? '../cleaners/' : 'cleaners/';
        
        cleanersData.forEach(cleaner => {
          // 更新所有指向cleaner-tutor-detail.html的链接
          document.querySelectorAll(`a[href*="cleaner-tutor-detail.html"]`).forEach(link => {
            const href = link.getAttribute('href');
            // 检查是否包含这个清洁工的信息
            if (href.includes(`name=${encodeURIComponent(cleaner.name)}`) || 
                href.includes(`name=${cleaner.name.replace(' ', '%20')}`)) {
              link.setAttribute('href', `${cleanersPath}${cleaner.slug}.html`);
            }
          });
        });
      }
      
      if (dict.title) document.title = dict.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', dict.description || '');
      
      fs.writeFileSync(outPath, dom.serialize(), 'utf-8');
    }
  }
}

// 处理 main 文件夹，只处理英文和中文
const mainDistEn = path.join(distDir, 'main');
const mainDistZh = path.join(distDir, 'zh/main');

processMainFiles(mainSrcDir, mainDistEn, 'en');
processMainFiles(mainSrcDir, mainDistZh, 'zh');

console.log('✅ 已输出 main/ 目录下的 HTML 文件');

// 生成清洁工详情页
function generateCleanerPages() {
  const cleanersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/cleaners.json'), 'utf-8'));
  const templatePath = path.join(__dirname, 'src/main/cleaner-tutor-detail.html');
  const template = fs.readFileSync(templatePath, 'utf-8');
  
  // 为英文和中文分别生成，放在main目录下
  const langs = [
    { code: 'en', dir: path.join(distDir, 'main') },
    { code: 'zh', dir: path.join(distDir, 'zh/main') }
  ];
  
  langs.forEach(({ code, dir }) => {
    const cleanersDir = path.join(dir, 'cleaners');
    fs.mkdirSync(cleanersDir, { recursive: true });
    
    // 根据语言确定资源路径（从 main/cleaners/ 到 assets/）
    const assetPrefix = (code === 'en') ? '../../assets/' : '../../../assets/';
    
    cleanersData.forEach(cleaner => {
      let html = template;
      
      // 替换占位符
      const replacements = {
        '{{TITLE}}': cleaner.name,
        '{{DESCRIPTION}}': `${cleaner.name} - Professional cleaner in ${cleaner.location}. Rating: ${cleaner.rating}/5.0 with ${parseInt(cleaner.reviews).toLocaleString()} reviews. Starting from $${cleaner.price}/hr.`,
        '{{NAME}}': cleaner.name,
        '{{RATING}}': cleaner.rating,
        '{{REVIEWS}}': parseInt(cleaner.reviews).toLocaleString(),
        '{{LOCATION}}': cleaner.location,
        '{{PRICE}}': parseFloat(cleaner.price).toFixed(2),
        '{{IMAGE_PATH}}': `${assetPrefix}cleaner/images/listing/${cleaner.image}`
      };
      
      Object.keys(replacements).forEach(placeholder => {
        html = html.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), replacements[placeholder]);
      });
      
      // 处理资源路径
      const dom = new JSDOM(html);
      const { document } = dom.window;
      
      ['src', 'href', 'data-src', 'data-href'].forEach(attr => {
        document.querySelectorAll(`[${attr}]`).forEach(el => {
          const val = el.getAttribute(attr);
          if (val && val.startsWith('../assets/')) {
            // 从 ../assets/cleaner/... 改为 ../../assets/cleaner/...
            // assetPrefix 已经是 ../../assets/，所以只需要添加 cleaner/... 部分
            const restPath = val.replace('../assets/', ''); // 获取 'cleaner/...' 部分
            el.setAttribute(attr, assetPrefix + restPath);
          } else if (val && val.startsWith('assets/')) {
            el.setAttribute(attr, assetPrefix + val.substring(7)); // 跳过 'assets/'
          } else if (val && val.startsWith('../../assets/')) {
            // 如果已经是 ../../assets/，直接使用
            el.setAttribute(attr, val);
          }
        });
      });
      
      // 生成文件名（使用slug）
      const outputFile = path.join(cleanersDir, `${cleaner.slug}.html`);
      fs.writeFileSync(outputFile, dom.serialize(), 'utf-8');
      console.log(`✅ 已生成清洁工页面: ${outputFile}`);
    });
  });
}

generateCleanerPages();
console.log('✅ 已生成所有清洁工详情页');