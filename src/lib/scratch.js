export function initializeScratchCard({ canvas, container, onReveal, threshold = 0.42 }) {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  let drawing = false, revealed = false, previous = null;

  const resize = () => {
    if (revealed) return;
    const rect = container.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#aa8742"); gradient.addColorStop(0.35, "#ead89f");
    gradient.addColorStop(0.68, "#c4a45d"); gradient.addColorStop(1, "#8f6f31");
    context.globalCompositeOperation = "source-over"; context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);

    context.globalAlpha = 0.16;
    for (let i = 0; i < 100; i += 1) {
      context.fillStyle = i % 2 ? "#fff" : "#4e3616"; context.beginPath();
      context.arc(Math.random() * rect.width, Math.random() * rect.height, Math.random() * 2.5 + 0.5, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1; context.fillStyle = "#17312c"; context.textAlign = "center";
    context.font = `600 ${Math.max(16, Math.min(24, rect.width / 17))}px system-ui`;
    context.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 - 2);
    context.font = `400 ${Math.max(11, Math.min(14, rect.width / 30))}px system-ui`;
    context.fillText("A date written for two hearts", rect.width / 2, rect.height / 2 + 27);
  };

  const position = (e) => ({ x: e.clientX - canvas.getBoundingClientRect().left, y: e.clientY - canvas.getBoundingClientRect().top });
  
  const scratch = (from, to) => {
    context.globalCompositeOperation = "destination-out"; context.lineCap = "round"; context.lineJoin = "round";
    context.lineWidth = Math.max(34, Math.min(58, canvas.getBoundingClientRect().width / 8));
    context.beginPath(); context.moveTo(from.x, from.y); context.lineTo(to.x, to.y); context.stroke();
    context.beginPath(); context.arc(to.x, to.y, context.lineWidth / 2, 0, Math.PI * 2); context.fill();
  };

  const finish = () => {
    if (revealed) return;
    revealed = true; drawing = false; container.classList.add("is-revealed"); canvas.remove(); onReveal?.();
  };

  const move = (e) => {
    if (!drawing || revealed) return;
    const current = position(e); scratch(previous, current); previous = current;
    const image = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0, sampled = 0;
    for (let i = 3; i < image.length; i += 48) { sampled++; if (image[i] < 30) transparent++; }
    if (transparent / sampled >= threshold) finish();
  };

  const start = (e) => { if (!revealed) { drawing = true; previous = position(e); scratch(previous, previous); } };
  const end = () => { drawing = false; previous = null; };

  canvas.addEventListener("pointerdown", start); canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", end); canvas.addEventListener("pointercancel", end);
  window.addEventListener("resize", resize); resize();
  return { reveal: finish };
}