function loadHTML(selector, filePath, callback) {
  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error("加载失败: " + filePath);
      return res.text();
    })
    .then(html => {
      const target = document.querySelector(selector);
      if (target) {
        target.innerHTML = html;
        if (typeof callback === "function") callback();
      } else {
        console.warn(`容器 ${selector} 不存在，跳过插入 ${filePath}`);
      }
    })
    .catch(err => console.error(err));
}

function bindI18nEvents() {
  // 确保使用window.setLanguage（来自i18n.js）来设置正确语言
  if (window.setLanguage) {
    // 使用与i18n.js相同的语言检测逻辑
    const pathname = window.location.pathname;
    let currentLang = 'en';
    
    if (pathname.includes('/zh/') || pathname === '/zh' || pathname.endsWith('/zh')) {
      currentLang = 'zh';
    } else if (pathname.includes('/fr/') || pathname === '/fr' || pathname.endsWith('/fr')) {
      currentLang = 'fr';
    } else if (pathname.includes('/ar/') || pathname === '/ar' || pathname.endsWith('/ar')) {
      currentLang = 'ar';
    } else {
      currentLang = localStorage.getItem('lang') || 'en';
    }
    
    window.setLanguage(currentLang);
    
    // 绑定语言切换按钮事件
    document.querySelectorAll('.i18n-lang-option').forEach(btn => {
      btn.removeEventListener('click', btn.i18nClickHandler);
      btn.i18nClickHandler = function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        window.setLanguage(lang);
        // 不跳转页面，只在当前页面内切换语言
      };
      btn.addEventListener('click', btn.i18nClickHandler);
    });
  }
}

function bindGdprEvents() {
  const gdprNotification = document.getElementById('uc-gdpr-notification');
  if (!gdprNotification) return;
  
  const gdprAccepted = localStorage.getItem('gdprAccepted');

  // Show the GDPR notification if it has not been accepted
  if (!gdprAccepted) {
    setTimeout(function() {
      gdprNotification.classList.add('show');
    }, 5000); // 5000 milliseconds = 5 seconds
  }

  // Set event listener for the accept button
  const acceptBtn = document.getElementById('uc-accept-gdpr');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      gdprNotification.classList.remove('show');
      // Set the localStorage item to indicate GDPR has been accepted
      localStorage.setItem('gdprAccepted', 'true');
    });
  }

  // Set event listener for the close button
  const closeBtn = document.getElementById('uc-close-gdpr-notification');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      gdprNotification.classList.remove('show');
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // 根据当前页面路径判断语言版本
  const pathname = window.location.pathname;
  let langPrefix = '';
  
  if (pathname.includes('/zh/') || pathname === '/zh' || pathname.endsWith('/zh')) {
    langPrefix = '/zh';
  } else if (pathname.includes('/fr/') || pathname === '/fr' || pathname.endsWith('/fr')) {
    langPrefix = '/fr';
  } else if (pathname.includes('/ar/') || pathname === '/ar' || pathname.endsWith('/ar')) {
    langPrefix = '/ar';
  }
  
  const headerPath = `${langPrefix}/main/header.html`;
  const footerPath = `${langPrefix}/main/footer.html`;
  const gdprPath = `${langPrefix}/main/gdpr.html`;
  
  loadHTML("#header", headerPath, bindI18nEvents);
  loadHTML("#footer", footerPath, bindI18nEvents);
  loadHTML("#gdpr", gdprPath, bindGdprEvents);
});