/**
 * 页面跳转加载动画工具
 * 实现页面切换时显示统一的绿色加载动画
 */

(function() {
    'use strict';

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // 为所有内部链接添加加载动画
        enhanceInternalLinks();
    }

    /**
     * 为内部链接添加加载动画效果
     */
    function enhanceInternalLinks() {
        // 获取当前域名
        const currentDomain = window.location.origin;
        
        // 选择所有链接
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // 跳过外部链接、锚点链接、javascript链接和特殊属性链接
            if (!href || 
                href.startsWith('#') || 
                href.startsWith('javascript:') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                link.hasAttribute('data-no-transition') ||
                link.getAttribute('target') === '_blank') {
                return;
            }
            
            // 检查是否是内部链接
            let isInternal = false;
            try {
                if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
                    isInternal = true;
                } else if (href.startsWith('http')) {
                    const linkUrl = new URL(href);
                    isInternal = linkUrl.origin === currentDomain;
                } else {
                    isInternal = true; // 相对路径
                }
            } catch (e) {
                // 如果无法解析 URL，假设是内部链接
                isInternal = true;
            }
            
            if (isInternal) {
                link.addEventListener('click', handleLinkClick);
            }
        });
    }

    /**
     * 处理链接点击事件
     */
    function handleLinkClick(e) {
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        // 如果按住 Ctrl/Cmd 键或鼠标中键，不阻止默认行为
        if (e.ctrlKey || e.metaKey || e.button === 1) {
            return;
        }
        
        // 阻止默认跳转
        e.preventDefault();
        
        // 显示加载动画并跳转
        showLoaderAndNavigate(href);
    }

    /**
     * 显示加载动画并导航到新页面
     */
    function showLoaderAndNavigate(url) {
        // 创建加载动画容器
        const loader = createLoader();
        document.body.appendChild(loader);
        
        // 强制重绘以触发动画
        loader.offsetHeight;
        
        // 添加显示类
        loader.classList.add('show');
        
        // 延迟一小段时间后跳转（让用户看到加载动画）
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    /**
     * 创建加载动画元素
     */
    function createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-transition-loader';
        loader.innerHTML = `
            <div class="page-transition-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        `;
        
        // 添加样式（如果不存在）
        if (!document.getElementById('page-transition-styles')) {
            const style = document.createElement('style');
            style.id = 'page-transition-styles';
            style.textContent = `
                .page-transition-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(255, 255, 255, 0.95);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 999999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .page-transition-loader.show {
                    opacity: 1;
                    pointer-events: all;
                }
                
                .uc-dark .page-transition-loader,
                .page-transition-loader:where(.uc-dark) {
                    background-color: rgba(19, 19, 19, 0.95);
                }
                
                .page-transition-spinner {
                    display: inline-block;
                    position: relative;
                    width: 50px;
                    height: 50px;
                }
                
                .page-transition-spinner > div {
                    box-sizing: border-box;
                    display: block;
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    margin: 0;
                    border: 5px solid transparent;
                    border-radius: 50%;
                    animation: page-transition-spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                    border-color: var(--color-primary, #60D1AE) transparent transparent transparent;
                }
                
                .page-transition-spinner > div:nth-child(1) {
                    animation-delay: -0.1s;
                }
                
                .page-transition-spinner > div:nth-child(2) {
                    animation-delay: -0.2s;
                }
                
                .page-transition-spinner > div:nth-child(3) {
                    animation-delay: -0.3s;
                }
                
                @keyframes page-transition-spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        return loader;
    }

    /**
     * 处理浏览器回退/前进按钮
     * 确保回退时不会一直显示 loading
     */
    window.addEventListener('popstate', function(e) {
        // 回退时移除可能存在的加载器
        const existingLoader = document.querySelector('.page-transition-loader');
        if (existingLoader) {
            existingLoader.remove();
        }
    });

    // 页面可见性变化时，确保移除加载器（防止页面切换时卡住）
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            const existingLoader = document.querySelector('.page-transition-loader');
            if (existingLoader) {
                existingLoader.remove();
            }
        }
    });

    // 导出到全局（可选）
    window.PageTransition = {
        navigate: showLoaderAndNavigate
    };

})();

