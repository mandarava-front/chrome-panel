/*
 * @Description: 
 * @Version: 1.0
 * @Author: changfeng
 * @Date: 2024-09-09 11:42:19
 * @LastEditors: changfeng
 * @LastEditTime: 2024-09-09 13:50:52
 */
chrome.devtools.panels.create(
  "Orders Monitor", // 面板标题
  // 'src/assets/smart.svg',
  null, // 图标路径，可以为空
  "panel.html", // 指向自定义面板的HTML文件
  function (panel) {
    console.log("Custom panel created");
  }
);
