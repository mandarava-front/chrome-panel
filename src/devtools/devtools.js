chrome.devtools.panels.create(
    "Network Monitor -1",        // 面板标题
    // 'src/assets/smart.svg',  
    null,                   // 图标路径，可以为空
    "panel.html",             // 指向自定义面板的HTML文件
    function(panel) {
      console.log("Custom panel created");
    }
  );
  