/*
 * @Description:
 * @Version: 1.0
 * @Author: changfeng
 * @Date: 2024-09-10 16:44:40
 * @LastEditors: changfeng
 * @LastEditTime: 2024-09-10 16:50:11
 */
window.onload = () => {
  let app = document.getElementById("app");
  // 创建canvas元素
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;
  // document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  // 绘制爱心的函数
  function drawHeart(x, y, size, hue) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, size / 4);
    ctx.bezierCurveTo(size / 4, 0, size, (3 * size) / 4, 0, size);
    ctx.bezierCurveTo(-size, (3 * size) / 4, -size / 4, 0, 0, size / 4);
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fill();
    ctx.restore();
  }

  // 绘制五彩斑斓的爱心
  function drawColorfulHeart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 360; i += 15) {
      const x = canvas.width / 2 + 80 * Math.cos((i * Math.PI) / 180);
      const y = canvas.height / 2 + 80 * Math.sin((i * Math.PI) / 180);
      const size = 30 + Math.random() * 20;
      const hue = (i + Date.now() / 50) % 360;

      drawHeart(x, y, size, hue);
    }

    requestAnimationFrame(drawColorfulHeart);
  }

  // 开始动画
  drawColorfulHeart();

  app.appendChild(canvas);
};
