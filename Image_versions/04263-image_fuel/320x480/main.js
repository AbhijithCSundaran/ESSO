// Banner duration timer start time
var startTime;

// Timeline reference
var tl;
var tl1;

var pause = false;

var woman = document.getElementsByClassName("woman");
var womanShadow = document.getElementsByClassName("woman-shadow");
var handShadow = document.getElementsByClassName("hand-shadow");

var hover = false;

// console.log(phone)

var randomX = random(4, 5);
var randomY = random(5, 7);
var randomDelay = random(0, 1);
var randomTime = random(3, 5);
var randomTime2 = random(4, 5);
var randomAngle = random(2, 3);

function rotate(target, direction) {
  if (hover === true && pause === false) {
  TweenLite.to(target, randomTime2(), {
    rotation: randomAngle(direction),
    // delay: randomDelay(),
    ease: Sine.easeInOut,
    onComplete: pause ? null : rotate,
    onCompleteParams: [target, direction * -1]
  });
}
}

function moveX(target, direction) {
  if (hover === true && pause === false) {
  TweenLite.to(target, randomTime2(), {
    x: randomX(direction),
    ease: Sine.easeInOut,
    onComplete: pause ? null : moveX,
    onCompleteParams: [target, direction * -1]
  });
}
}

function moveY(target, direction) {
  var time = randomTime();
  var dir = randomY(direction);

  if (hover === true && pause === false) {
    TweenLite.to(target[0], time, {
      y: `+=${dir * -1}`,
      ease: Sine.easeInOut,
    });

    TweenLite.to(target[1], time, {
      opacity: `+=${(dir * -0.01 )}`,
      ease: Sine.easeInOut,
      onComplete: moveY,
      onCompleteParams: [target, direction * -1],
    });
  }
}

function random(min, max) {
  var delta = max - min;
  return (direction = 1) => (min + delta * Math.random()) * direction;
}

// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  startTime = new Date();

  // Set Background Timeline
  tl2 = new TimelineMax({});

  // Set Global Timeline
  tl1 = new TimelineMax({ onComplete: endTime });

  var delayRollover = setTimeout(setRollover, 9000);
  animate();
}

function animate() {
  // tl1.set(["#main_content"], { autoAlpha: 1, force3D: true });
  tl1.set(["#cta"], { force3D: false, rotation: 0.001 });

  // tl1.to(phone, 0.5, {y: -80})

  // tl1.set(phone, {
  //   y: randomX(1),
  //   rotation: randomAngle(-1)
  // });

  tl1.to(woman, 4, {
    y: -50,
    ease: Power2.easeOut,
  });

  tl1.to(womanShadow, 4, {
    opacity: 0.6,
    ease: Power2.easeOut,
  }, "-=4");

  tl1.to(handShadow, 4, {
    opacity: 1,
    x: 0,
    y: 0,
    ease: Power2.easeOut,
  }, "-=4");


  tl1.add(() => {hover = true; moveY([woman, womanShadow], -1); rotate(woman, 1); moveX(woman, -1)}, "-=1")
  // tl1.to(".reflection", 4, {y: 20, autoAlpha: 0, ease: Power2.easeInOut}, "-=5")
  // tl1.to(".shadow", 4, {autoAlpha: 0.4, ease: Power2.easeInOut}, "-=4")

  tl1.to(".copy1", 0.3, {autoAlpha: 1, ease: Power2.easeInOut}, "-=4")
  tl1.to(".copy1", 0.3, {autoAlpha: 0, ease: Power2.easeInOut}, "-=0.4")
  tl1.to(".copy2", 0.3, {autoAlpha: 1, ease: Power2.easeInOut})
  tl1.to("#cta", 0.5, {autoAlpha: 1, ease: Power2.easeInOut}, "+=0.5")

  // // rotate(woman, 1);

  // tl1.add(() => {pause = true; console.log("paused")}, 15)
}

function endTime() {
  // show total banner animation time in browser console.
  var endTime = new Date();

  console.log(
    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  );
}

// CTA grow on hover

function setRollover() {
  document
    .getElementById("bgExit")
    .addEventListener("mouseover", default_over, false);
  document
    .getElementById("bgExit")
    .addEventListener("mouseout", default_out, false);
}

function default_over(event) {
  TweenMax.to(["#cta", "#cta-shine-container"], 0.3, {
    scale: 1.1,
    ease: Power1.easeOut,
    delay: 0,
  });
}

function default_out(event) {
  TweenMax.to(["#cta", "#cta-shine-container"], 0.3, {
    scale: 1,
    ease: Power1.easeOut,
    delay: 0,
  });
}