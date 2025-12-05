/**
 * 博客组件模块化加载器
 * 用于动态加载页头和页脚组件
 */

class BlogInclude {
    constructor() {
        this.loadedComponents = new Set();
    }

    /**
     * 加载HTML组件
     * @param {string} url - 组件文件路径
     * @param {string} targetSelector - 目标容器选择器
     * @param {Function} callback - 加载完成后的回调函数
     */
    async loadComponent(url, targetSelector, callback = null) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            const targetElement = document.querySelector(targetSelector);
            
            if (targetElement) {
                targetElement.innerHTML = html;
                this.loadedComponents.add(url);
                
                // 执行回调函数
                if (callback && typeof callback === 'function') {
                    callback();
                }
                
                console.log(`✅ 组件加载成功: ${url}`);
            } else {
                console.error(`❌ 未找到目标容器: ${targetSelector}`);
            }
        } catch (error) {
            console.error(`❌ 组件加载失败: ${url}`, error);
        }
    }

    /**
     * 加载页头组件
     * @param {string} targetSelector - 目标容器选择器，默认为 '#blog-header'
     * @param {Object} options - 配置选项
     * @param {boolean} options.defaultFixed - 是否默认为固定状态（白色背景+黑色文字）
     */
    async loadHeader(targetSelector = '#blog-header', options = {}) {
        await this.loadComponent('blog-header.html', targetSelector, () => {
            // 页头加载完成后的初始化逻辑
            this.initHeaderEvents(options);
        });
    }

    /**
     * 加载页脚组件
     * @param {string} targetSelector - 目标容器选择器，默认为 '#blog-footer'
     */
    async loadFooter(targetSelector = '#blog-footer') {
        await this.loadComponent('blog-footer.html', targetSelector, () => {
            // 页脚加载完成后的初始化逻辑
            this.initFooterEvents();
        });
    }

    /**
     * 初始化页头事件
     * @param {Object} options - 配置选项
     */
    initHeaderEvents(options = {}) {
        // 语言切换事件 - 使用主项目的 i18n 系统
        // 注意：语言切换事件已由主项目的 i18n.js 通过事件委托处理
        // 这里不需要重复添加事件监听器

        // 暗色模式切换（如果存在）
        const darkModeToggle = document.querySelector('.dark_mode_switcher');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', (e) => {
                this.toggleDarkMode(e.target.checked);
            });
        }

        // 初始化滚动事件（navbar固定效果）
        this.initStickyNavbar(options);

        console.log('🎯 页头事件初始化完成');
    }

    /**
     * 初始化粘性导航栏
     * @param {Object} options - 配置选项
     */
    initStickyNavbar(options = {}) {
        const navbar = document.querySelector('.navbar.sticky-nav');
        if (!navbar) return;

        // 如果设置为默认固定状态，直接添加固定样式并返回
        if (options.defaultFixed) {
            navbar.classList.add('navbar_fixed');
            console.log('📌 导航栏设置为默认固定状态（白色背景+黑色文字）');
            return;
        }

        // 正常的滚动切换逻辑
        let lastScrollTop = 0;
        let isFixed = false;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 10 && !isFixed) {
                // 向下滚动超过10px就立即变黑，添加固定样式
                navbar.classList.add('navbar_fixed');
                isFixed = true;
            } else if (scrollTop <= 10 && isFixed) {
                // 回到顶部10px以内，移除固定样式恢复白色
                navbar.classList.remove('navbar_fixed');
                isFixed = false;
            }

            lastScrollTop = scrollTop;
        };

        // 添加滚动事件监听
        window.addEventListener('scroll', handleScroll, { passive: true });

        // 页面加载时检查一次
        handleScroll();

        console.log('📌 粘性导航栏已初始化（滚动切换模式）');
    }

    /**
     * 初始化页脚事件
     */
    initFooterEvents() {
        // 更新年份
        this.updateFooterYear();
        
        // 社交媒体图标hover效果已通过CSS处理
        // 语言切换事件 - 使用主项目的 i18n 系统
        // 注意：语言切换事件已由主项目的 i18n.js 通过事件委托处理
        // 这里不需要重复添加事件监听器

        console.log('🎯 页脚事件初始化完成');
    }

    /**
     * 更新页脚年份
     */
    updateFooterYear() {
        const yearElement = document.getElementById("yearfooter");
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = currentYear;
            console.log('📅 页脚年份已更新为:', currentYear);
        } else {
            console.warn('⚠️ 未找到 yearfooter 元素');
        }
    }

    // switchLanguage 方法已移除，改为使用主项目的 i18n 系统

    /**
     * 切换暗色模式
     * @param {boolean} isDark - 是否为暗色模式
     */
    toggleDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('body_dark');
        } else {
            document.body.classList.remove('body_dark');
        }
        
        console.log(`🌙 暗色模式: ${isDark ? '开启' : '关闭'}`);
    }

    /**
     * 初始化所有组件
     * @param {Object} options - 配置选项
     * @param {boolean} options.headerDefaultFixed - 页头是否默认固定
     */
    async initAll(options = {}) {
        console.log('🚀 开始加载博客组件...');
        
        // 并行加载页头和页脚
        await Promise.all([
            this.loadHeader('#blog-header', { defaultFixed: options.headerDefaultFixed }),
            this.loadFooter()
        ]);

        console.log('✨ 所有组件加载完成');
    }

    /**
     * 获取已加载的组件列表
     */
    getLoadedComponents() {
        return Array.from(this.loadedComponents);
    }
}

// 创建全局实例
window.blogInclude = new BlogInclude();

// DOM加载完成后自动初始化
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否存在目标容器
    const hasHeader = document.querySelector('#blog-header');
    const hasFooter = document.querySelector('#blog-footer');
    
    if (hasHeader || hasFooter) {
        // 检查body是否有特殊类名来确定页头模式
        const isFixedHeader = document.body.classList.contains('fixed-header');
        
        window.blogInclude.initAll({
            headerDefaultFixed: isFixedHeader
        });
    }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogInclude;
}
