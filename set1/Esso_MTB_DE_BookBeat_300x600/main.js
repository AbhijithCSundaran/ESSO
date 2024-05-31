// var tl = new TimelineMax({ onComplete: endTime, repeat: 0, repeatDelay: 3 });
var tl = new TimelineMax({ onComplete: endTime });
var startTime
window.onload = function () {
  initAd();
};

function initAd() {

  startTime = new Date();

  //---------- START ANIMATION ------------
  tl.addLabel("start")
    .set("#copy1,#copy2,#cta,#terms", { autoAlpha: 0, force3D: true })

  // ----------Frame 1 ------------
  tl.addLabel("frame1", "")
  tl.to("#copy1", 0.5, { autoAlpha: 1, ease: Power2.easeInOut }, "+=1")

  // ----------Frame 2 ------------
  tl.addLabel("frame2", "")
  tl.to("#copy1", 0.5, { autoAlpha: 0, ease: Power2.easeInOut }, "+=1.5")
  tl.to("#copy2", 0.5, { autoAlpha: 1, ease: Power2.easeInOut })
  tl.to("#cta", 0.5, { autoAlpha: 1, ease: Power2.easeInOut }, "+=0.5")
  tl.to("#terms", 0.5, { autoAlpha: 1, ease: Power2.easeInOut }, "+=0.5")
}


function endTime() {
  setRollover()
  // show total banner animation time in browser console.
  var endTime = new Date();

  console.log(
    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  );
}

// CTA grow on hover
function setRollover() {
  document.getElementById("bgExit")
    .addEventListener("mouseover", default_over, false);
  document.getElementById("bgExit")
    .addEventListener("mouseout", default_out, false);
}

function default_over(event) {
  TweenMax.to(["#cta"], 0.3, { scale: 1.1, ease: Power1.easeOut, delay: 0 });
}

function default_out(event) {
  TweenMax.to(["#cta"], 0.3, { scale: 1, ease: Power1.easeOut, delay: 0 });
}
