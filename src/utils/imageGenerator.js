// client/src/utils/imageGenerator.js
export const generateShareImage = (username, score) => {
  // In a real app, you would use a service like canvas or a third-party API
  // For this example, we'll generate a simple data URL

  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;

  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#3B82F6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw curved design elements
  ctx.fillStyle = "#1D4ED8";
  ctx.beginPath();
  ctx.ellipse(100, 400, 200, 120, 0, Math.PI, 0, false);
  ctx.fill();

  ctx.fillStyle = "#2563EB";
  ctx.beginPath();
  ctx.ellipse(500, 50, 200, 100, 0, Math.PI, 2 * Math.PI, false);
  ctx.fill();

  // Title
  ctx.fillStyle = "white";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("🧩 Globetrotter", canvas.width / 2, 80);

  // Username
  ctx.font = "bold 30px Arial";
  ctx.fillText(`${username} challenges you!`, canvas.width / 2, 160);

  // Score
  ctx.font = "26px Arial";
  ctx.fillText(
    `Score: ${score.correct} / ${score.total}`,
    canvas.width / 2,
    220
  );

  // Call to action
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 24px Arial";
  ctx.fillText("Can you beat my score?", canvas.width / 2, 300);

  // Return as data URL
  return canvas.toDataURL("image/png");
};
