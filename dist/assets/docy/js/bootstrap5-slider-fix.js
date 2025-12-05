/* Bootstrap 5 轮播图修复 */
(function($) {
    'use strict';
    
    // 确保DOM加载完成后初始化轮播图
    $(document).ready(function() {
        
        // 重新初始化轮播图
        function initSliders() {
            // 检查轮播图容器是否存在
            if ($(".doc_testimonial_area").length && $(".doc_testimonial_slider").length) {
                
                // 销毁现有的slick实例（如果存在）
                if ($(".doc_testimonial_slider").hasClass('slick-initialized')) {
                    $(".doc_testimonial_slider").slick('unslick');
                }
                if ($(".doc_img_slider").hasClass('slick-initialized')) {
                    $(".doc_img_slider").slick('unslick');
                }
                
                // 重新初始化文字轮播
                $(".doc_testimonial_slider").slick({
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 3000,
                    speed: 800,
                    dots: true,
                    arrows: false,
                    asNavFor: ".doc_img_slider",
                    fade: false,
                    cssEase: 'ease-in-out',
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                autoplaySpeed: 4000,
                                speed: 600
                            }
                        }
                    ]
                });
                
                // 重新初始化图片轮播
                $(".doc_img_slider").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    asNavFor: ".doc_testimonial_slider",
                    arrows: false,
                    fade: true,
                    focusOnSelect: true,
                    cssEase: 'ease-in-out',
                    speed: 800
                });
                
                console.log('轮播图初始化成功');
            }
            
            // 初始化其他轮播图
            if ($(".doc_feedback_slider").length) {
                if ($(".doc_feedback_slider").hasClass('slick-initialized')) {
                    $(".doc_feedback_slider").slick('unslick');
                }
                
                $(".doc_feedback_slider").slick({
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000,
                    speed: 1000,
                    dots: false,
                    arrows: true,
                    prevArrow: ".prev",
                    nextArrow: ".next",
                    pauseOnHover: true,
                    pauseOnFocus: true
                });
            }
        }
        
        // 延迟初始化，确保所有资源加载完成
        setTimeout(function() {
            initSliders();
        }, 500);
        
        // 窗口调整大小时重新初始化
        $(window).on('resize', function() {
            clearTimeout(window.resizeTimeout);
            window.resizeTimeout = setTimeout(function() {
                initSliders();
            }, 250);
        });
        
    });
    
    // 修复搜索表单提交和nice-select初始化
    $(document).ready(function() {
        
        // 初始化 nice-select
        function initNiceSelect() {
            if ($(".custom-select").length) {
                // 销毁现有的nice-select实例
                $(".custom-select").each(function() {
                    if ($(this).next('.nice-select').length) {
                        $(this).next('.nice-select').remove();
                        $(this).show();
                    }
                });
                
                // 重新初始化
                $(".custom-select").niceSelect();
                console.log('Nice Select 初始化成功');
            }
        }
        
        // 延迟初始化nice-select
        setTimeout(function() {
            initNiceSelect();
        }, 100);
        
        // 搜索表单提交
        $('.header_search_form').on('submit', function(e) {
            e.preventDefault();
            
            var searchTerm = $('#searchbox').val().trim();
            var postType = $('#search_post_type').val();
            
            if (searchTerm) {
                console.log('搜索关键词:', searchTerm);
                console.log('搜索类型:', postType);
                
                // 这里可以添加实际的搜索逻辑
                // 例如跳转到搜索结果页面或发送Ajax请求
                
                // 临时提示
                alert('搜索功能：' + searchTerm + (postType ? ' (类型: ' + postType + ')' : ''));
            } else {
                $('#searchbox').focus();
            }
        });
        
        // 建议搜索关键词点击事件
        $('.header_search_keyword ul li a').on('click', function(e) {
            e.preventDefault();
            var keyword = $(this).text().trim();
            $('#searchbox').val(keyword).focus();
        });
        
        // 窗口调整大小时重新初始化nice-select
        $(window).on('resize', function() {
            clearTimeout(window.niceSelectTimeout);
            window.niceSelectTimeout = setTimeout(function() {
                initNiceSelect();
            }, 250);
        });
    });
    
})(jQuery);
