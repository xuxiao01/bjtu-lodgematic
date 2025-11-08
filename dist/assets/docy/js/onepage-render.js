// js/onepage-render.js
// 在 onepage.html 渲染帮助文档章节数据为 3 个章节

(function () {
  function renderHelpChapters(chapters) {
    console.log('🎨 开始渲染章节:', chapters);
    if (!Array.isArray(chapters) || chapters.length === 0) {
      console.warn('⚠️ 章节数据为空或无效');
      return;
    }

    var sectionIds = ['doc', 'shortcodes', 'test'];
    var navLinks = document.querySelectorAll('#chapter-nav .nav-link');
    console.log('🔍 找到导航链接数量:', navLinks.length);

    // 确保至少有3个章节，不足的用空内容填充
    while (chapters.length < 3) {
      chapters.push({ title: '', content: '' });
    }

    // 只取前3个章节
    var displayChapters = chapters.slice(0, 3);

    displayChapters.forEach(function (chapter, idx) {
      var holder = document.querySelector('#' + sectionIds[idx] + ' .chapter-content');
      var title = chapter.title || '';
      var content = chapter.content || '';

      // 渲染内容
      if (holder) {
        var html = '';
        if (title) {
          html += '<h1 id="section-' + (idx + 1) + '">' + title + '</h1>';
        }
        html += content;
        holder.innerHTML = html;
      }

      // 更新导航链接
      if (navLinks[idx]) {
        navLinks[idx].textContent = title || '章节 ' + (idx + 1);
        if (title) {
          navLinks[idx].setAttribute('href', '#section-' + (idx + 1));
        } else {
          navLinks[idx].setAttribute('href', '#' + sectionIds[idx]);
        }
      }
    });
  }

  function load() {
    console.log('🚀 onepage-render.js 开始加载数据');
    console.log('📊 检查 HelpChapterApi 是否可用:', typeof window.HelpChapterApi);
    
    // 获取帮助文档章节数据，默认获取 article_id 为 'faq001' 的章节
    HelpChapterApi.getList({id: 'faq001' })
      .then(function (data) {
        console.log('✅ 成功获取章节数据:', data);
        var list = (data && data.list) || [];
        console.log('📝 处理后的章节列表:', list);
        renderHelpChapters(list);
      })
      .catch(function (err) {
        console.error('❌ 加载帮助文档章节失败：', err);
        // 如果加载失败，尝试获取所有章节
        console.log('🔄 尝试备用方案：获取所有章节');
        HelpChapterApi.getList({})
          .then(function (data) {
            console.log('✅ 备用方案成功:', data);
            var list = (data && data.list) || [];
            renderHelpChapters(list);
          })
          .catch(function (err2) {
            console.error('❌ 加载帮助文档章节失败（备用方案）：', err2);
          });
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
