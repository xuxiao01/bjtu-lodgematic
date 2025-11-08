/* mock-articles.js —— 文章列表与详情的本地假接口（基于 Mock.js + axios） */

(function () {
  var hasMock = typeof window !== 'undefined' && typeof window.Mock !== 'undefined';

  // ① 准备数据（
  var blogArticles = [
    {
      "id": 101,
      "title": "如何快速上手我们的产品",
      "subtitle": "新手必读指南",
      "publish_time": "2025-08-10T14:30:00Z",
      "image_desc": [
        { "img_id": 501, "desc": "封面图：产品操作界面" },
        { "img_id": 502, "desc": "功能模块详细截图" }
      ],
      "duration_days": 365,
      "content": "<h2>步骤一：注册账号</h2><p>访问我们的网站并点击注册按钮，填写基本信息完成注册。</p><h2>步骤二：配置环境</h2><p>登录后进入控制台，按照向导完成初始配置。</p><h2>步骤三：开始使用</h2><p>创建第一个项目，体验我们产品的强大功能。</p>",
      "author_id": "u001",
      "type_id": 1,
      "cover_image": {
        "id": 501,
        "url": "https://picsum.photos/seed/cover101/800/400"
      },
      "status": "Publish",
      "create_by": "admin",
      "create_time": "2025-08-01T08:00:00Z",
      "update_by": "editor01",
      "update_time": "2025-08-09T09:20:00Z"
    },
    {
      "id": 102,
      "title": "前端开发最佳实践指南",
      "subtitle": "提升代码质量的10个技巧",
      "publish_time": "2025-08-12T10:15:00Z",
      "image_desc": [
        { "img_id": 503, "desc": "代码示例截图" }
      ],
      "duration_days": 365,
      "content": "<h2>1. 代码规范</h2><p>建立统一的代码风格规范，使用 ESLint 和 Prettier 等工具...</p><h2>2. 组件化设计</h2><p>合理拆分组件，提高代码复用性和可维护性...</p><h2>3. 性能优化</h2><p>使用懒加载、缓存策略等技术提升应用性能...</p>",
      "author_id": "u002",
      "type_id": 1,
      "cover_image": {
        "id": 503,
        "url": "https://picsum.photos/seed/cover102/800/400"
      },
      "status": "Publish",
      "create_by": "admin",
      "create_time": "2025-08-02T09:00:00Z",
      "update_by": "editor02",
      "update_time": "2025-08-11T16:30:00Z"
    }
  ];
  var blogAuthors = [
    {
      "id": "u001",
      "name": "张三",
      "nickname": "老张",
      "avatar_url": "https://picsum.photos/seed/zhangsan/100/100",
      "bio": "资深技术顾问，专注Web开发10年",
      "email": "zhangsan@example.com",
      "website": "https://zhangsan.dev",
      "social_links": {
        "github": "https://github.com/zhangsan",
        "twitter": "https://twitter.com/zhangsan"
      },
      "create_time": "2025-07-01T09:00:00Z",
      "update_time": "2025-08-01T09:00:00Z"
    },
    {
      "id": "u002",
      "name": "李四",
      "nickname": "前端小李",
      "avatar_url": "https://picsum.photos/seed/lisi/100/100",
      "bio": "前端工程师，React 和 Vue.js 专家",
      "email": "lisi@example.com",
      "website": "https://lisi.tech",
      "social_links": {
        "github": "https://github.com/lisi",
        "twitter": "https://twitter.com/lisi"
      },
      "create_time": "2025-07-15T10:30:00Z",
      "update_time": "2025-08-05T14:20:00Z"
    }
  ];
  
  var helpChapters = [
    {
      "id": "c101",
      "article_id": "faq001",   // 整个帮助文档ID
      "title": "快速开始",
      "content": `
        <p>本文将帮助你快速了解并上手我们的产品，包含账号、权限、资源等常见问题。</p>
        <h2>创建与登录</h2>
        <ol>
          <li>访问官网，点击「注册」。</li>
          <li>完成邮箱验证后登录控制台。</li>
        </ol>
      `,
      "order_no": 1
    },
    {
      "id": "c102",
      "article_id": "faq001",
      "title": "账户与安全",
      "content": `
        <h2>重置密码</h2>
        <p>在登录页面点击「忘记密码」，根据指引完成重置。</p>
        <h2>角色与权限</h2>
        <table class="table">
          <thead><tr><th>角色</th><th>权限</th></tr></thead>
          <tbody>
            <tr><td>Owner</td><td>全部权限</td></tr>
            <tr><td>Editor</td><td>读写</td></tr>
            <tr><td>Viewer</td><td>只读</td></tr>
          </tbody>
        </table>
      `,
      "order_no": 2
    },
    {
      "id": "c103",
      "article_id": "faq001",
      "title": "更多资源",
      "content": `
        <ul>
          <li><a href="#">开发者文档</a></li>
          <li><a href="#">最佳实践</a></li>
          <li><a href="#">变更日志</a></li>
        </ul>
        <p><img src="https://placehold.co/800x320/png?text=Help+Illustration" alt="帮助文档插图" /></p>
      `,
      "order_no": 3
    }
  ];

  function parseQuery(url) {
    var queryString = (url.split('?')[1] || '').trim();
    var params = new URLSearchParams(queryString);
    var out = {};
    params.forEach(function (v, k) { out[k] = v; });
    return out;
  }

  // ② 注册 Mock 接口
  if (hasMock) {
    // GET /api/articles?type_id=1&page=1&pageSize=10 - 博客文章接口
    window.Mock.mock(/\/api\/articles(\?.*)?$/, 'get', function (options) {
      var q = parseQuery(options.url || '');
      var page = parseInt(q.page || '1', 10);
      var pageSize = parseInt(q.pageSize || '10', 10);
      var typeId = q.type_id ? parseInt(q.type_id, 10) : null;
      var statusParam = typeof q.status !== 'undefined' ? String(q.status) : null;

      var filtered = Array.isArray(blogArticles) ? blogArticles.slice() : [];
      if (typeId) {
        filtered = filtered.filter(function (a) { return Number(a.type_id) === typeId; });
      }
      if (statusParam !== null) {
        filtered = filtered.filter(function (a) { return String(a.status) === statusParam; });
      }

      var total = filtered.length;
      var start = (page - 1) * pageSize;
      var end = start + pageSize;
      var list = filtered.slice(start, end);

      return {
        code: 200,
        message: 'ok',
        data: {
          list: list,
          total: total,
          page: page,
          pageSize: pageSize
        }
      };
    });

    // GET /api/articles/:id - 博客文章详情接口
    window.Mock.mock(/\/api\/articles\/(\d+)$/, 'get', function (options) {
      var match = (options.url || '').match(/\/api\/articles\/(\d+)$/);
      var id = match ? parseInt(match[1], 10) : NaN;
      var found = blogArticles.find(function (a) { return Number(a.id) === id; });
      if (!found) {
        return { code: 404, message: 'not found', data: null };
      }
      return { code: 200, message: 'ok', data: found };
    });

    // GET /api/help-chapters?article_id=xxx - 帮助文档章节接口
    window.Mock.mock(/\/api\/help-chapters(\?.*)?$/, 'get', function (options) {
      var q = parseQuery(options.url || '');
      var articleId = q.article_id;

      var filtered = Array.isArray(helpChapters) ? helpChapters.slice() : [];
      if (articleId) {
        filtered = filtered.filter(function (c) { return String(c.article_id) === String(articleId); });
      }

      // 按 order_no 排序
      filtered.sort(function (a, b) { return (a.order_no || 0) - (b.order_no || 0); });

      return {
        code: 200,
        message: 'ok',
        data: {
          list: filtered,
          total: filtered.length
        }
      };
    });

    // GET /api/authors/:id - 作者详情接口
    window.Mock.mock(/\/api\/authors\/([^\/]+)$/, 'get', function (options) {
      var match = (options.url || '').match(/\/api\/authors\/([^\/]+)$/);
      var id = match ? match[1] : null;
      var found = blogAuthors.find(function (a) { return String(a.id) === String(id); });
      if (!found) {
        return { code: 404, message: 'author not found', data: null };
      }
      return { code: 200, message: 'ok', data: found };
    });

    // GET /api/authors - 作者列表接口
    window.Mock.mock(/\/api\/authors(\?.*)?$/, 'get', function (options) {
      return {
        code: 200,
        message: 'ok',
        data: {
          list: blogAuthors,
          total: blogAuthors.length
        }
      };
    });
  } else {
    console.warn('[mock-articles] 未检测到 Mock.js，接口未注册');
  }

  // ③ 提供 axios 便捷方法（可选）
  // 使用方式：ArticleApi.getList({ page:1, pageSize:10 }).then(data => { ... })
  //          ArticleApi.getById(101).then(data => { ... })
  //          HelpChapterApi.getList({ article_id: 'faq001' }).then(data => { ... })
  var hasAxios = typeof window !== 'undefined' && typeof window.axios !== 'undefined';
  
  // 博客文章 API
  window.ArticleApi = {
    getList: function (params) {
      if (!hasAxios) {
        return Promise.reject(new Error('axios 未加载'));
      }
      params = params || {};
      return window.axios.get('/api/articles', { params: params }).then(function (res) {
        return res.data && res.data.data ? res.data.data : res.data;
      });
    },
    getById: function (id) {
      if (!hasAxios) {
        return Promise.reject(new Error('axios 未加载'));
      }
      return window.axios.get('/api/articles/' + id).then(function (res) {
        return res.data && res.data.data ? res.data.data : res.data;
      });
    }
  };

  // 帮助文档章节 API
  window.HelpChapterApi = {
    getList: function (params) {
      if (!hasAxios) {
        return Promise.reject(new Error('axios 未加载'));
      }
      params = params || {};
      return window.axios.get('/api/help-chapters', { params: params }).then(function (res) {
        return res.data && res.data.data ? res.data.data : res.data;
      });
    }
  };

  // 博客作者 API
  window.AuthorApi = {
    getById: function (id) {
      if (!hasAxios) {
        return Promise.reject(new Error('axios 未加载'));
      }
      return window.axios.get('/api/authors/' + id).then(function (res) {
        return res.data && res.data.data ? res.data.data : res.data;
      });
    },
    getList: function (params) {
      if (!hasAxios) {
        return Promise.reject(new Error('axios 未加载'));
      }
      params = params || {};
      return window.axios.get('/api/authors', { params: params }).then(function (res) {
        return res.data && res.data.data ? res.data.data : res.data;
      });
    }
  };
})();


