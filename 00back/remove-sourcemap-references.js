const fs = require('fs');
const path = require('path');

// 要处理的文件列表
const filesToProcess = [
  'src/assets/docy/assets/bootstrap/css/bootstrap.min.css',
  'src/assets/docy/assets/bootstrap/js/popper.min.js',
  'src/assets/docy/assets/bootstrap/js/bootstrap.min.js'
];

console.log('开始移除 source map 引用...');

filesToProcess.forEach(filePath => {
  const fullPath = path.resolve(filePath);
  
  if (fs.existsSync(fullPath)) {
    try {
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;
      
      // 移除 CSS 中的 source map 注释
      content = content.replace(/\/\*# sourceMappingURL=.*?\*\//g, '');
      
      // 移除 JS 中的 source map 注释
      content = content.replace(/\/\/# sourceMappingURL=.*/g, '');
      
      // 如果内容有变化，则写入文件
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✓ 已处理: ${filePath}`);
      } else {
        console.log(`○ 无需处理: ${filePath} (未找到 source map 引用)`);
      }
    } catch (error) {
      console.log(`✗ 处理失败: ${filePath}`, error.message);
    }
  } else {
    console.log(`✗ 文件不存在: ${filePath}`);
  }
});

console.log('处理完成！');