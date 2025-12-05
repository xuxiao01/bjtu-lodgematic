// i18n.js

// ** Node.js 环境 (用于 build.js) **
if (typeof module !== 'undefined' && module.exports) {
  const fs = require('fs');
  const path = require('path');

  const translationsDir = path.join(__dirname, 'translations');
  const translations = {};

  fs.readdirSync(translationsDir).forEach(file => {
    if (file.endsWith('.json')) {
      const lang = file.replace('.json', '');
      const filePath = path.join(translationsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      translations[lang] = JSON.parse(fileContent);
    }
  });

  module.exports = translations;
}
// ** 浏览器环境 (用于客户端) **
else {
  const loadedTranslations = {};

  function applyTranslations(lang, translation) {
    if (!translation) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translation[key]) {
        el.innerHTML = translation[key];
      }
    });

    document.querySelectorAll('.i18n-lang-text').forEach(el => {
      const langNameKey = {
        en: 'english',
        zh: 'chinese',
        fr: 'french',
        ar: 'arabic'
      }[lang];
      if (translation[langNameKey]) {
        el.innerText = translation[langNameKey];
      }
    });

    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
    document.documentElement.setAttribute('lang', lang);
  }

  async function loadAndApply(lang) {
    let translationData = loadedTranslations[lang];

    if (!translationData) {
      try {
        const response = await fetch(`/assets/js/translations/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to fetch ${lang}.json`);
        translationData = await response.json();
        loadedTranslations[lang] = translationData;
      } catch (error) {
        console.error(error);
        if (lang !== 'en') return loadAndApply('en');
        return;
      }
    }

    applyTranslations(lang, translationData);
  }

  // 获取当前语言，优先考虑URL路径
  function getCurrentLanguage() {
    const pathname = window.location.pathname;

    // 检查URL路径中的语言标识
    if (pathname.includes('/zh/') || pathname === '/zh' || pathname.endsWith('/zh')) {
      return 'zh';
    } else if (pathname.includes('/fr/') || pathname === '/fr' || pathname.endsWith('/fr')) {
      return 'fr';
    } else if (pathname.includes('/ar/') || pathname === '/ar' || pathname.endsWith('/ar')) {
      return 'ar';
    }

    // 如果URL中没有语言标识，则使用localStorage中的设置
    return localStorage.getItem('lang') || 'en';
  }

  function setLanguage(lang) {
    // 更新localStorage
    localStorage.setItem('lang', lang);

    // 应用翻译（不改变URL）
    loadAndApply(lang);
  }

  window.setLanguage = setLanguage;

  // --- 使用事件委托来处理所有交互 ---
  document.addEventListener('DOMContentLoaded', () => {
    // 确定并设置初始语言
    const initialLang = getCurrentLanguage();
    setLanguage(initialLang);

    // 将点击事件监听器绑定到 document.body
    // 这样即便是之后动态加载进来的元素也能响应点击
    document.body.addEventListener('click', (event) => {
      // event.target 是用户实际点击的元素
      // .closest('[data-lang]') 会查找被点击的元素自身或其父元素是否带有 [data-lang] 属性
      const langSwitchButton = event.target.closest('[data-lang]');

      // 如果找到了匹配的按钮
      if (langSwitchButton) {
        // 阻止 a 标签的默认跳转行为
        event.preventDefault();

        const lang = langSwitchButton.getAttribute('data-lang');
        if (lang) {
          setLanguage(lang);
        }
      }
    });
  });
}