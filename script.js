function locoMotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();



}
locoMotive();

var clutter = "";
document.querySelector("#page2 h1").textContent.split("").forEach(function (dets) {
  clutter += `<span>${dets}</span>`

  document.querySelector("#page2 h1").innerHTML = clutter;
})

gsap.to("#page2 h1 span", {
  color: "#fff",
  scrollTrigger: {
    trigger: "#page2 h1 span",
    start: "top 70%",
    end: "bottom 48%",
    scroller: "#main",
    scrub: 0.5,
  },
  stagger: 0.2
});

function canvas() {
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
./image/frames00007.png
./image/frames00010.png
./image/frames00013.png
./image/frames00016.png
./image/frames00019.png
./image/frames00022.png
./image/frames00025.png
./image/frames00028.png
./image/frames00031.png
./image/frames00034.png
./image/frames00037.png
./image/frames00040.png
./image/frames00043.png
./image/frames00046.png
./image/frames00049.png
./image/frames00052.png
./image/frames00055.png
./image/frames00058.png
./image/frames00061.png
./image/frames00064.png
./image/frames00067.png
./image/frames00070.png
./image/frames00073.png
./image/frames00076.png
./image/frames00079.png
./image/frames00082.png
./image/frames00085.png
./image/frames00088.png
./image/frames00091.png
./image/frames00094.png
./image/frames00097.png
./image/frames00100.png
./image/frames00103.png
./image/frames00106.png
./image/frames00109.png
./image/frames00112.png
./image/frames00115.png
./image/frames00118.png
./image/frames00121.png
./image/frames00124.png
./image/frames00127.png
./image/frames00130.png
./image/frames00133.png
./image/frames00136.png
./image/frames00139.png
./image/frames00142.png
./image/frames00145.png
./image/frames00148.png
./image/frames00151.png
./image/frames00154.png
./image/frames00157.png
./image/frames00160.png
./image/frames00163.png
./image/frames00166.png
./image/frames00169.png
./image/frames00172.png
./image/frames00175.png
./image/frames00178.png
./image/frames00181.png
./image/frames00184.png
./image/frames00187.png
./image/frames00190.png
./image/frames00193.png
./image/frames00196.png
./image/frames00199.png
./image/frames00202.png
`;
    return data.split("\n")[index];
  }

  //change
  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas()

document.querySelector("#page4 h1").textContent.split("").forEach(function (dets) {
  clutter += `<span>${dets}</span>`

  document.querySelector("#page4 h1").innerHTML = clutter;
})

gsap.to("#page4 h1 span", {
  color: "#fff",
  scrollTrigger: {
    trigger: "#page4 h1 span",
    start: "top 70%",
    end: "bottom 40%",
    scroller: "#main",
    scrub: 0.5,
  },
  stagger: 0.2
});