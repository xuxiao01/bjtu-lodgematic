// js/blog-single-render.js
// 渲染 blog-single.html 页面：
// - 优先从 URL ?id= 获取文章；
// - 否则获取第一条 status === "1" 的文章；
// - 使用 ArticleApi（mock-articles.js 暴露）+ axios 渲染页面。

(function () {
  function getQueryId() {
    try {
      var params = new URLSearchParams(window.location.search);
      var id = params.get('id');
      return id ? parseInt(id, 10) : null;
    } catch (e) {
      return null;
    }
  }

  function formatDate(iso) {
    if (!iso) return '';
    try {
      var d = new Date(iso);
      return d.toLocaleDateString();
    } catch (e) {
      return iso;
    }
  }

  function estimateReadMinutes(html) {
    var text = String(html || '').replace(/<[^>]*>/g, '');
    var words = text.trim().length;
    var minutes = Math.ceil(words / 250); // 简单估算：250字/分钟
    return minutes || 1;
  }

  function renderArticle(article, author) {
    if (!article) return;

    // 标题
    var titleEl = document.getElementById('article-title');
    if (titleEl) titleEl.textContent = article.title || '';

    // 作者信息
    var authorName = '';
    var authorAvatar = 'https://picsum.photos/seed/placeholder/100/100';
    
    if (author) {
      // 优先使用昵称，其次使用姓名
      authorName = author.nickname || author.name || '';
      authorAvatar = author.avatar_url || authorAvatar;
    }

    var authorEl = document.getElementById('author-name');
    if (authorEl) authorEl.textContent = authorName;

    var authorImg = document.getElementById('author-img');
    if (authorImg) {
      authorImg.src = authorAvatar;
      authorImg.alt = authorName + '的头像';
    }

    // 日期
    var publishDateEl = document.getElementById('publish-date');
    if (publishDateEl) publishDateEl.textContent = formatDate(article.publish_time);

    // 封面图
    var mainImgEl = document.getElementById('blog-img');
    var cover = article.cover_image || {};
    if (mainImgEl) {
      if (cover && cover.url) {
        mainImgEl.src = cover.url;
        mainImgEl.alt = article.subtitle || article.title || '';
      } else {
        // 无封面图时使用占位图
        mainImgEl.src = 'https://picsum.photos/seed/article' + (article.id || 'x') + '/800/400';
        mainImgEl.alt = 'cover placeholder';
      }
    }

    // 正文
    var contentEl = document.getElementById('article-content');
    if (contentEl) contentEl.innerHTML = article.content || '';

    // 阅读时间
    var minutes = estimateReadMinutes(article.content);
    var readTimeEl = document.getElementById('read-time');
    if (readTimeEl) readTimeEl.textContent = minutes + '分钟阅读';
  }

  function loadArticleWithAuthor(article) {
    if (!article) {
      renderArticle(null, null);
      return;
    }

    // 如果文章有作者ID，则获取作者信息
    if (article.author_id) {
      AuthorApi.getById(article.author_id)
        .then(function (author) {
          renderArticle(article, author);
        })
        .catch(function (err) {
          console.error('加载作者信息失败：', err);
          // 即使作者信息加载失败，也要渲染文章
          renderArticle(article, null);
        });
    } else {
      // 没有作者ID，直接渲染文章
      renderArticle(article, null);
    }
  }

  function load() {
    var id = getQueryId();

    if (id) {
      // 指定 id，直接查详情
      ArticleApi.getById(id)
        .then(function (data) {
          loadArticleWithAuthor(data);
        })
        .catch(function (err) {
          console.error('加载文章失败：', err);
        });
      return;
    }

    // 否则获取第一条 status === "Publish" 的文章
    ArticleApi.getList({ pageNum: 1, pageSize: 50 })
      .then(function (data) {
        var list = (data && data.list) || [];
        var firstOnline = list.find(function (a) { return String(a.status) === 'Publish'; }) || list[0];
        loadArticleWithAuthor(firstOnline);
      })
      .catch(function (err) {
        console.error('加载文章列表失败：', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();

