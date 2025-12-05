/**
 * 博客相关 API
 * 使用 samAxios 实例发送请求
 */
(function() {
  // 测试阶段的 token（后续应该从配置或登录状态中获取）
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJHZW5Ub2tlbkJhc2VPbkFjY291bnQiOiJhZG1pbiIsImV4cCI6MTc2NjIzNzc2MH0.HJaUrQ0zPvlPYbECv-_3Egvme1vLYvcMBrJ6yfu5rZk';

  /**
   * 获取博客详情
   * @param {string|number} blogId - 博客ID
   * @returns {Promise} 返回博客数据
   */
  async function getBlog(blogId) {
    if (!blogId) {
      return Promise.reject(new Error('博客ID不能为空'));
    }

    try {
      // 使用 window.api (samAxios 实例) 发送请求
      const response = await window.api.get(`/api/blog/getBlog/${blogId}`, {
        headers: {
          Authorization: token
        }
      });
      return response;
    } catch (error) {
      console.error('获取博客失败:', error);
      throw error;
    }
  }

  // 挂载到 window 对象，暴露给全局使用
  window.BlogAPI = {
    getBlog: getBlog
  };

  console.log('BlogAPI 已创建并挂载到 window.BlogAPI');
})();

