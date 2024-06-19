import TweenLite from 'gsap';
import RainRenderer from "./rain-renderer";
import Raindrops from "./raindrops";
import loadImages from "./image-loader";
import createCanvas from "./create-canvas";
import times from './times';
import { random, chance } from './random';

import DropColor from '@img/weather/img/drop-color.png';
import DropAlpha from '@img/weather/img/drop-alpha.png';
import TextureGrass from '@img/weather/img/grass01.webp';

const images = [
  { name: "dropAlpha", src: DropAlpha },
  { name: "dropColor", src: DropColor },
  { name: "textureSunFg", src: TextureGrass },
  { name: "textureSunBg", src: TextureGrass },
  { name: "textureDrizzleFg", src: TextureGrass },
  { name: "textureDrizzleBg", src: TextureGrass },
  { name: "textureRainFg", src: TextureGrass },
  { name: "textureRainBg", src: TextureGrass },
  { name: "textureStormLightningFg", src: TextureGrass },
  { name: "textureStormLightningBg", src: TextureGrass },
];

let textures = {};
let textureFg, textureFgCtx, textureBg, textureBgCtx;
let textureBgSize = { width: 384, height: 256 };
let textureFgSize = { width: 96, height: 64 };
let raindrops, renderer, canvas;
let parallax = { x: 0, y: 0 };
let weatherData = null;
let curWeatherData = null;
let blend = { v: 0 };
let intervalId = undefined;

export function loadTextures(textureOverrides) {
  images.forEach(img => {
    if (textureOverrides[img.name]) {
      img.src = textureOverrides[img.name];
    }
  });

  loadImages(images).then(loadedImages => {
    textures = loadedImages;
    init();
  });
}

function init() {
  canvas = document.querySelector('#container-weather');

  var dpi = window.devicePixelRatio;
  canvas.width = window.innerWidth * dpi;
  canvas.height = window.innerHeight * dpi;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  raindrops = new Raindrops(
    canvas.width,
    canvas.height,
    dpi,
    textures.dropAlpha.img,
    textures.dropColor.img, {
      trailRate: 1,
      trailScaleRange: [0.2, 0.45],
      collisionRadius: 0.45,
      dropletsCleaningRadiusMultiplier: 0.28,
    }
  );

  textureFg = createCanvas(textureFgSize.width, textureFgSize.height);
  textureFgCtx = textureFg.getContext('2d');
  textureBg = createCanvas(textureBgSize.width, textureBgSize.height);
  textureBgCtx = textureBg.getContext('2d');

  generateTextures(textures.textureRainFg.img, textures.textureRainBg.img);

  renderer = new RainRenderer(canvas, raindrops.canvas, textureFg, textureBg, null, {
    brightness: 1.04,
    alphaMultiply: 6,
    alphaSubtract: 3,
    minRefraction: 128
  });

  setupEvents();
}

function setupEvents() {
  setupParallax();
  setupWeather();
  setupFlash();
}

function setupParallax() {
  document.addEventListener('mousemove', (event) => {
    let x = event.pageX;
    let y = event.pageY;

    TweenLite.to(parallax, 1, {
      x: ((x / canvas.width) * 2) - 1,
      y: ((y / canvas.height) * 2) - 1,
      onUpdate: () => {
        renderer.parallaxX = parallax.x;
        renderer.parallaxY = parallax.y;
      }
    })
  });
}

function setupFlash() {
  intervalId = setInterval(() => {
    if (chance(curWeatherData.flashChance)) {
      flash(curWeatherData.bg, curWeatherData.fg, curWeatherData.flashBg, curWeatherData.flashFg);
    }
  }, 500);
}

function setupWeather() {
  setupWeatherData();
  window.addEventListener("hashchange", updateWeather);
  updateWeather();
}

function setupWeatherData() {
  var defaultWeather = {
    minR: 10,
    maxR: 40,
    rainChance: 0.35,
    rainLimit: 6,
    drizzle: 50,
    drizzleSize: [2, 4.5],
    raining: true,
    trailRate: 1,
    trailScaleRange: [0.2, 0.35],
    fg: textures.textureRainFg.img,
    bg: textures.textureRainBg.img,
    flashFg: null,
    flashBg: null,
    flashChance: 0
  };

  function weather(data) {
    return Object.assign({}, defaultWeather, data);
  };

  weatherData = {
    rain: weather({
      rainChance: 0.35,
      rainLimit: 6,
      drizzle: 50,
      raining: true,
      fg: textures.textureRainFg.img,
      bg: textures.textureRainBg.img
    }),
    storm: weather({
      minR: 20,
      maxR: 45,
      rainChance: 0.55,
      rainLimit: 6,
      drizzle: 80,
      drizzleSize: [2, 6],
      trailRate: 1,
      trailScaleRange: [0.15, 0.3],
      fg: textures.textureRainFg.img,
      bg: textures.textureRainBg.img,
      flashFg: textures.textureStormLightningFg.img,
      flashBg: textures.textureStormLightningBg.img,
      flashChance: 0.1
    }),
    fallout: weather({
      rainChance: 0.35,
      rainLimit: 6,
      drizzle: 20,
      trailRate: 4,
    }),
    drizzle: weather({
      rainChance: 0.15,
      rainLimit: 2,
      drizzle: 10,
      fg: textures.textureDrizzleFg.img,
      bg: textures.textureDrizzleBg.img
    }),
    sunny: weather({
      rainChance: 0,
      rainLimit: 0,
      drizzle: 0,
      raining: false,
      fg: textures.textureSunFg.img,
      bg: textures.textureSunBg.img
    })
  };
}

function updateWeather() {
  var hash = window.location.hash;
  var currentSlide = null;
  var currentNav = null;
  if (hash !== "") {
    currentSlide = document.querySelector(hash);
  }
  if (currentSlide == null) {
    currentSlide = document.querySelector(".slide");
    hash = "#" + currentSlide.getAttribute("id");
  }
  currentNav = document.querySelector("[href='" + hash + "']");
  var data = weatherData[currentSlide.getAttribute('data-weather')];
  curWeatherData = data;
  raindrops.options = Object.assign(raindrops.options, data);
  raindrops.clearDrops();

  TweenLite.fromTo(blend, 1, {
    v: 0
  }, {
    v: 1,
    onUpdate: () => {
      generateTextures(data.fg, data.bg, blend.v);
      renderer.updateTextures();
    }
  });

  var lastSlide = document.querySelector(".slide--current");
  if (lastSlide != null) lastSlide.classList.remove("slide--current");

  var lastNav = document.querySelector(".nav-item--current");
  if (lastNav != null) lastNav.classList.remove("nav-item--current");

  currentSlide.classList.add("slide--current");
  // currentNav.classList.add("nav-item--current");
}

function flash(baseBg, baseFg, flashBg, flashFg) {
  let flashValue = { v: 0 };
  function transitionFlash(to, t = 0.025) {
    return new Promise((resolve) => {
      TweenLite.to(flashValue, t, {
        v: to,
        onUpdate: () => {
          generateTextures(baseFg, baseBg);
          generateTextures(flashFg, flashBg, flashValue.v);
          renderer.updateTextures();
        },
        onComplete: () => {
          resolve();
        }
      });
    });
  }

  let lastFlash = transitionFlash(1);
  times(random(2, 7), () => {
    lastFlash = lastFlash.then(() => {
      return transitionFlash(random(0.1, 1))
    })
  })
  lastFlash = lastFlash.then(() => {
    return transitionFlash(1, 0.1);
  }).then(() => {
    transitionFlash(0, 0.25);
  });
}

function generateTextures(fg, bg, alpha = 1) {
  textureFgCtx.globalAlpha = alpha;
  textureFgCtx.drawImage(fg, 0, 0, textureFgSize.width, textureFgSize.height);

  textureBgCtx.globalAlpha = alpha;
  textureBgCtx.drawImage(bg, 0, 0, textureBgSize.width, textureBgSize.height);
}

export function cleanWeather() {
  clearInterval(intervalId);
  weatherData = null;
  curWeatherData = null;
  intervalId = null;
}
