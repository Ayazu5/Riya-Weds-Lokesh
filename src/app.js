import { weddingConfig as config } from "./config.js?v=51";
import { renderInvitation } from "./render.js?v=51";
import { initializeScratchCard } from "./lib/scratch.js?v=50";
import { showerPetals } from "./lib/petals.js?v=50";

const app = document.querySelector("#app");
app.innerHTML = renderInvitation(config);

const root = document.documentElement;
Object.entries(config.theme.colors).forEach(([key, value]) => {
  const cssName = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  root.style.setProperty(`--${cssName}`, value);
});
root.style.setProperty("--font-arabic", config.theme.fonts.arabic);
root.style.setProperty("--font-names", config.theme.fonts.names);
root.style.setProperty("--font-display", config.theme.fonts.display);
root.style.setProperty("--font-body", config.theme.fonts.body);

document.title = `${config.couple.groomName} & ${config.couple.brideName} | Reception Invitation`;

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
  }
});

const video = document.querySelector("#intro-video");
const posterFrame = document.querySelector("#hero-poster-frame");
const music = document.querySelector("#background-music");
const openingGate = document.querySelector("#opening-gate");
const musicControl = document.querySelector("#music-control");
const musicLabel = musicControl.querySelector(".music-control__label");
const heroContent = document.querySelector("#hero-content");
const scrollCue = document.querySelector("#scroll-cue");
let experienceOpened = false;
let soundEnabled = true;
let namesShown = false;
let namesTimer;

function hidePosterAfterFirstVideoFrame() {
  if (!posterFrame || !video) return;

  const hidePoster = () => {
    requestAnimationFrame(() => {
      posterFrame.classList.add("is-hidden");
    });
  };

  if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
    video.requestVideoFrameCallback(() => {
      hidePoster();
    });
    return;
  }

  video.addEventListener(
    "playing",
    () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(hidePoster);
      });
    },
    { once: true }
  );
}

function setMusicUi() {
  musicControl.classList.toggle("is-muted", !soundEnabled);
  musicControl.setAttribute("aria-label", soundEnabled ? "Turn music off" : "Turn music on");
  musicLabel.textContent = experienceOpened
    ? (soundEnabled ? "Sound on" : "Sound off")
    : (soundEnabled ? "Sound ready" : "Sound muted");
}

function startMedia() {
  video.muted = true;
  video.currentTime = 0;

  hidePosterAfterFirstVideoFrame();

  const videoPromise = video.play();

  if (videoPromise) {
    videoPromise.catch((error) => {
      console.warn("Video could not start", error);
    });
  }

  if (soundEnabled) {
    music.volume = 0.42;
    const musicPromise = music.play();
    if (musicPromise) {
      musicPromise.catch((error) => {
        console.warn("Music could not start", error);
      });
    }
  }
}

function showNames() {
  if (namesShown) return;
  namesShown = true;
  heroContent.classList.add("is-visible");
  heroContent.setAttribute("aria-hidden", "false");
  scrollCue.classList.add("is-visible");
}

function openExperience() {
  if (experienceOpened) return;
  experienceOpened = true;
  
  if (openingGate) {
    openingGate.classList.add("is-opening");
  }
  document.body.classList.remove("scroll-locked");
  document.body.classList.add("experience-open");
  
  setMusicUi();
  startMedia();
  
  // Video chalne ke baad timing par names show honge
  namesTimer = window.setTimeout(showNames, config.intro.namesAppearAtSeconds * 1000);
  
  window.setTimeout(() => {
    if (openingGate) openingGate.setAttribute("hidden", "");
  }, 1100);
}

// Sirf click/touch karne par hi khulega (jaise pehle tha)
if (openingGate) {
  openingGate.addEventListener("click", openExperience);
}

musicControl.addEventListener("click", async (event) => {
  event.stopPropagation();
  if (!experienceOpened) {
    openExperience();
    return;
  }
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    music.volume = 0.42;
    try { await music.play(); } catch (error) { console.warn(error); }
  } else {
    music.pause();
  }
  setMusicUi();
});
setMusicUi();

video.addEventListener("timeupdate", () => {
  if (video.currentTime >= config.intro.namesAppearAtSeconds) {
    window.clearTimeout(namesTimer);
    showNames();
  }
});
video.addEventListener("ended", showNames);

const scratchCanvas = document.querySelector("#scratch-canvas");
if (scratchCanvas) {
  const dateHeading = document.querySelector("#date-heading");
  const dateKicker = document.querySelector("#date-kicker");
  const scratchWrap = document.querySelector("#scratch-wrap");
  const petalLayer = document.querySelector("#petal-layer");

  initializeScratchCard({
    canvas: scratchCanvas,
    container: scratchWrap,
    threshold: 0.42,
    onReveal: () => {
      dateHeading.textContent = config.copy.dateRevealed;
      dateKicker.textContent = "Save the date";
      showerPetals(petalLayer);
    },
  });
}

const gallery = document.querySelector("#gallery-slider");

if (gallery) {
  const slides = [...gallery.querySelectorAll(".gallery__slide")];
  const dots = [...gallery.querySelectorAll(".gallery__dots button")];

  let active = 0;
  let touchStart = 0;
  let autoplayTimer = null;
  let restartTimer = null;
  let galleryIsVisible = false;
  let suppressNextClick = false;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const autoplayEnabled = config.galleryOptions?.autoplay !== false && !prefersReducedMotion;
  const autoplayDelay = Number(config.galleryOptions?.intervalMs) || 4000;
  const restartDelay = Number(config.galleryOptions?.pauseAfterInteractionMs) || 5000;

  function showSlide(index) {
    if (!slides.length) return;
    active = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === active);
      slide.setAttribute("aria-hidden", slideIndex === active ? "false" : "true");
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === active;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function stopAutoplay() {
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function startAutoplay() {
    stopAutoplay();
    if (!autoplayEnabled || !galleryIsVisible || document.hidden || slides.length < 2) return;
    autoplayTimer = window.setInterval(() => {
      showSlide(active + 1);
    }, autoplayDelay);
  }

  function restartAutoplayLater() {
    stopAutoplay();
    window.clearTimeout(restartTimer);
    restartTimer = window.setTimeout(() => {
      startAutoplay();
    }, restartDelay);
  }

  function manuallyShowSlide(index) {
    showSlide(index);
    restartAutoplayLater();
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      manuallyShowSlide(Number(dot.dataset.slide));
    });
  });

  const galleryTrack = gallery.querySelector(".gallery__track");

  galleryTrack?.addEventListener("click", () => {
    if (suppressNextClick) {
      suppressNextClick = false;
      return;
    }
    manuallyShowSlide(active + 1);
  });

  galleryTrack?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      manuallyShowSlide(active + 1);
    }
  });

  gallery.addEventListener("touchstart", (event) => {
    touchStart = event.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  gallery.addEventListener("touchend", (event) => {
    const touchEnd = event.changedTouches[0].clientX;
    const distance = touchEnd - touchStart;
    if (Math.abs(distance) > 45) {
      suppressNextClick = true;
      manuallyShowSlide(active + (distance < 0 ? 1 : -1));
    } else {
      restartAutoplayLater();
    }
  }, { passive: true });

  gallery.addEventListener("mouseenter", stopAutoplay);
  gallery.addEventListener("mouseleave", startAutoplay);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  const galleryObserver = new IntersectionObserver(([entry]) => {
    galleryIsVisible = entry.isIntersecting;
    if (galleryIsVisible) startAutoplay();
    else stopAutoplay();
  }, { threshold: 0.35 });

  galleryObserver.observe(gallery);
  showSlide(0);
}

const countdown = document.querySelector("#countdown-clock");
if (countdown) {
  const target = new Date(countdown.dataset.target).getTime();
  const units = {
    days: countdown.querySelector('[data-unit="days"]'),
    hours: countdown.querySelector('[data-unit="hours"]'),
    minutes: countdown.querySelector('[data-unit="minutes"]'),
    seconds: countdown.querySelector('[data-unit="seconds"]'),
  };

  const tick = () => {
    const remaining = Math.max(0, target - Date.now());
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    if (units.days) units.days.textContent = String(days).padStart(2, "0");
    if (units.hours) units.hours.textContent = String(hours).padStart(2, "0");
    if (units.minutes) units.minutes.textContent = String(minutes).padStart(2, "0");
    if (units.seconds) units.seconds.textContent = String(seconds).padStart(2, "0");
    if (remaining === 0) countdown.closest(".section__inner").querySelector("h2").textContent = "Today is the day";
  };
  tick();
  window.setInterval(tick, 1000);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal-on-scroll").forEach((element) => observer.observe(element));

window.addEventListener("beforeunload", () => {
  video?.pause();
  music?.pause();
});