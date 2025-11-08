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