(function() {
  // 1. 定义内部函数
 function isNull(obj){
  if (0 === obj) return false;
  if (null == obj || 'null' == obj || 'null' == String(obj)
        || '' == obj 
        || 'undefined' == obj || 'undefined' == String(obj)
        || obj == '{}'  //检查对象是否没有任何自有属性
        || obj == '[]') {
      return true
  }
  else 
      return false
}

// 转换字符串，undefined,null等转化为"null"
function praseStrEmpty(str) {
  if (!str || str == "undefined") {
      return null;
  }
  return str;
}

  // 2. 挂载到 window，暴露给全局
  window.SamUtil = {
    praseStrEmpty: praseStrEmpty,
    isNull: isNull
  };
})();