// Banner duration timer start time
var startTime;

// Timeline reference
var tl;

var pause = false;

var human = document.getElementsByClassName("human");
var carShadow = document.getElementsByClassName("car-shadow");
var groundShadow = document.getElementsByClassName("shadow-ground");

var hover = false;

// console.log(object)

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
    TweenLite.to(target, randomTime(), {
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
      y: `+=${(dir * -1)}`,
      ease: Sine.easeInOut,
    });

    TweenLite.to(target[2], time, {
      y: `+=${dir * -1}`,
      x: `+=${dir}`,
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
  tl = new TimelineMax({ onComplete: endTime });

  var delayRollover = setTimeout(setRollover, 9000);
  animate();
}

function animate() {
  // tl.set(["#main_content"], { autoAlpha: 1, force3D: true });
  tl.set(["#cta"], { force3D: false, rotation: 0.001 });

  // tl.to(object, 0.5, {y: -80})

  // tl.set(object, {
  //   y: randomX(1),
  //   rotation: randomAngle(-1)
  // });

  tl.to(human, 4, { y: -70, ease: Power2.easeOut, });
  tl.to(human, 4, { x: 0, ease: Power4.easeOut, }, "-=4");
  // tl.to(carShadow, 4, { y: -50, ease: Power2.easeOut, }, "-=4");
  tl.to(groundShadow, 4, { y: -30, x: 40, ease: Power2.easeOut, }, "-=4");

  tl.add(() => { hover = true; moveY([human, carShadow, groundShadow], -1); rotate(human, 1); moveX(human, -1) }, "-=1")
  // tl.to(".reflection", 4, {y: 20, autoAlpha: 0, ease: Power2.easeInOut}, "-=5")
  // tl.to(".shadow", 4, {autoAlpha: 0.4, ease: Power2.easeInOut}, "-=4")

  tl.to(".copy1", 0.3, { autoAlpha: 1, ease: Power2.easeInOut }, "-=4")
  tl.to(".copy1", 0.3, { autoAlpha: 0, ease: Power2.easeInOut }, "-=0.4")
  tl.to(".copy2", 0.3, { autoAlpha: 1, ease: Power2.easeInOut })
  tl.to("#cta", 0.5, { autoAlpha: 1, ease: Power2.easeInOut }, "+=0.5")
  tl.to(".copy2", 0.5, { autoAlpha: 0, ease: Power2.easeInOut }, "+=1.5")
  tl.to(".copy3", 0.5, { autoAlpha: 1, ease: Power2.easeInOut })

  // rotate(human, 1);

  tl.add(() => { pause = true; console.log("paused") }, 15)
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
