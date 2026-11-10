let activeAnimation = 0;
const random = (min, max) => Math.random() * (max - min) + min;
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

export function showerPetals(container, requestedAmount = 48) {
  if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.cancelAnimationFrame(activeAnimation); container.replaceChildren();

  const colors = ["#fbf6ea", "#fbf6ea", "#f3ead9", "#f3ead9", "#eadfc9", "#d5b875"];
  const shapes = ["85% 15% 76% 24% / 68% 32% 68% 32%", "72% 28% 88% 12% / 58% 42% 72% 28%", "92% 8% 62% 38% / 76% 24% 84% 16%"];
  const vw = window.innerWidth, vh = window.innerHeight;
  const amount = Math.min(requestedAmount, Math.max(30, Math.round(vw / 10)));
  const petals = [];

  for (let i = 0; i < amount; i++) {
    const el = document.createElement("i");
    const size = random(6, 12.5), x = random(-20, vw + 20), y = random(-105, -18);
    const rot = random(0, 360), rotX = random(0, 360), rotY = random(0, 360), scale = random(0.72, 1.18);
    el.style.width = `${size}px`; el.style.height = `${size * random(1.35, 1.85)}px`;
    el.style.background = randomItem(colors); el.style.borderRadius = randomItem(shapes);
    el.style.opacity = "0"; el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
    container.append(el);

    petals.push({
      el, x, y, vx: random(-13, 13), vy: random(42, 72), gravity: random(7, 15), wind: random(-4, 4),
      sway: random(18, 48), swaySpeed: random(1.05, 2.25), swayPhase: random(0, Math.PI * 2),
      rot, rotX, rotY, spin: random(-105, 105), spinX: random(-150, 150), spinY: random(-190, 190), scale,
      baseOpacity: random(0.48, 0.82), delay: random(0, 1250), lifetime: random(6500, 9000),
    });
  }

  let startTime, prevTime;
  const animate = (time) => {
    startTime ??= time; prevTime ??= time;
    const elapsed = time - startTime, delta = Math.min((time - prevTime) / 1000, 0.032);
    prevTime = time; let visible = 0;

    petals.forEach(p => {
      if (elapsed < p.delay) return;
      const age = elapsed - p.delay;
      if (age >= p.lifetime || p.y > vh + 100) { p.el.style.display = "none"; return; }
      visible++;
      p.vy += p.gravity * delta; p.vx += Math.sin((age/1000) * 0.7 + p.swayPhase) * p.wind * delta;
      p.x += p.vx * delta; p.y += p.vy * delta;
      p.rot += p.spin * delta; p.rotX += p.spinX * delta; p.rotY += p.spinY * delta;
      
      const sway = Math.sin((age/1000) * p.swaySpeed + p.swayPhase) * p.sway;
      const lift = Math.sin((age/1000) * p.swaySpeed * 1.65 + p.swayPhase) * 4;
      const fadeIn = Math.min(1, age / 320);
      const bottomFade = p.y > vh * 0.78 ? Math.max(0, 1 - (p.y - vh * 0.78) / (vh + 80 - vh * 0.78)) : 1;
      
      p.el.style.opacity = String(p.baseOpacity * fadeIn * bottomFade);
      p.el.style.transform = `translate3d(${p.x + sway}px, ${p.y + lift}px, 0) rotate(${p.rot}deg) rotateX(${p.rotX}deg) rotateY(${p.rotY}deg) scale(${p.scale})`;
    });

    if (elapsed < 10200 && (visible || elapsed < 1500)) activeAnimation = window.requestAnimationFrame(animate);
    else { container.replaceChildren(); activeAnimation = 0; }
  };
  activeAnimation = window.requestAnimationFrame(animate);
}