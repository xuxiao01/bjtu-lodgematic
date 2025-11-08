(function () {
    // 检查请求库可用性
    const hasAxios = typeof window !== 'undefined' && !!window.axios;
    const hasApiInstance = typeof window !== 'undefined' && !!window.api;
    // 选择可用的请求实例
    const request = hasApiInstance ? window.api : (hasAxios ? window.axios : null);

    if (!request) {
      return Promise.reject(new Error('未找到可用的请求库 (axios/api)'));
    }
    
   // 博客文章 
   window.ArticleApi = {
    getList: function (params) {
      params = params || {};
      //对应原来的：/articles XBM-102:{"pageNum":1,"pageSize":50}
      return request.get('/getAllarticles', {params})
        .then(function (res) {
           //返回结果格式：{"total":"0","records":[]} records为实际数据 total满足条件的记录数
          return res.records;
      });
    },
    getById: function (ids) {
          param = {id: ids};
          return request.get('/getArticlesById', {param}).then(function (res) 
          { //返回结果就额是要用的数据或[] (全部返回) console.log("XBM-104:",JSON.stringify(res))
              return res;
          });
     },
  };
  // 博客作者 /api/authors/
  window.AuthorApi = {
    getById: function (ids) {
      param = {id: ids};
      return request.get('/getAuthorById', {param}).then(function (res) {
        return res;
      });
    },
    getList: function (params) {
      params = params || {};
      return request.get('/getAllAuthors', {params }).then(function (res) {
        return res.records;
      });
    }
  };
   // 帮助文档章节 /api/help-chapters
  window.HelpChapterApi = {
    getList: function (params) {
      params = params || {};
      return request.get('/getHelpChapters', {params}).then(function (res) {
        return res.records;
      });
    }
  };
})();


