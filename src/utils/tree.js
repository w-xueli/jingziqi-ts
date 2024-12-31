function a(e) {
  return function () {
    // 返回一个生成器对象
    var t = e.apply(this, arguments);

    // 处理生成器的递归执行
    function handle(next) {
      let result;
      try {
        result = t[next]();
      } catch (err) {
        return Promise.reject(err); // 捕获异常并返回拒绝的 Promise
      }

      // 如果生成器未完成，继续执行
      if (!result.done) {
        return Promise.resolve(result.value).then(
          function (value) {
            return handle("next", value); // 调用 'next' 继续执行生成器
          },
          function (error) {
            return handle("throw", error); // 如果 Promise 被拒绝，则调用 'throw'
          }
        );
      }

      return Promise.resolve(result.value); // 返回结果
    }

    return handle("next"); // 启动生成器
  };
}

gsap.config({ trialWarn: !1 });
a(function* () {
  MorphSVGPlugin.convertToPath("polygon");
  let e = function (e) {
      return document.querySelector(e);
    },
    t = (e(".pContainer"), e(".mainSVG")),
    a = (e("#star"), e(".sparkle")),
    n = (e("#tree"), !0),
    o = [
      "#E8F6F8",
      "#ACE8F8",
      "#F6FBFE",
      "#A2CBDC",
      "#B74551",
      "#5DBA72",
      "#910B28",
      "#910B28",
      "#446D39",
    ],
    i = ["#star", "#circ", "#cross", "#heart"],
    r = [],
    s = 0;
  gsap.set("svg", { visibility: "visible" }),
    gsap.set(a, { transformOrigin: "50% 50%", y: -100 });
  let l,
    u = function (e) {
      let t = [],
        a = MotionPathPlugin.getRawPath(e)[0];
      return (
        a.forEach(function (e, n) {
          let o = {};
          (o.x = a[2 * n]), (o.y = a[2 * n + 1]), n % 2 && t.push(o);
        }),
        t
      );
    },
    c = u(".treePath"),
    d = u(".treeBottomPath"),
    h = gsap.timeline({ delay: 0, repeat: 0 }),
    p = new SplitText(".mask", {
      type: "lines,words,chars",
      linesClass: "split-line",
    }).chars;
  function m(e) {
    gsap.killTweensOf(e, { opacity: !0 }),
      gsap.fromTo(
        e,
        { opacity: 1 },
        { duration: 0.07, opacity: Math.random(), repeat: -1 }
      );
  }
  let g = gsap.utils.random(0.5, 3, 0.001, !0);
  !(function () {
    let a,
      n = 201;
    for (c.length; --n > -1; )
      (a = e(i[n % i.length]).cloneNode(!0)),
        t.appendChild(a),
        a.setAttribute("fill", o[n % o.length]),
        a.setAttribute("class", "particle"),
        r.push(a),
        gsap.set(a, { x: -100, y: -100, transformOrigin: "50% 50%" });
  })(),
    (l = gsap.timeline({
      onUpdate: function (e) {
        n &&
          ((e = r[s]),
          gsap.set(e, {
            x: gsap.getProperty(".pContainer", "x"),
            y: gsap.getProperty(".pContainer", "y"),
            scale: g(),
          }),
          gsap.timeline().to(e, {
            duration: gsap.utils.random(0.61, 6),
            physics2D: {
              velocity: gsap.utils.random(-23, 23),
              angle: gsap.utils.random(-180, 180),
              gravity: gsap.utils.random(-6, 50),
            },
            scale: 0,
            rotation: gsap.utils.random(-123, 360),
            ease: "power1",
            onStart: m,
            onStartParams: [e],
            onRepeat: function (e) {
              gsap.set(e, { scale: g() });
            },
            onRepeatParams: [e],
          }),
          (s = ++s >= 201 ? 0 : s));
      },
    })),
    l
      .to(".pContainer, .sparkle", {
        duration: 6,
        motionPath: { path: ".treePath", autoRotate: !1 },
        ease: "linear",
      })
      .to(".pContainer, .sparkle", {
        duration: 1,
        onStart: function () {
          n = !1;
        },
        x: d[0].x,
        y: d[0].y,
      })
      .to(
        ".pContainer, .sparkle",
        {
          duration: 2,
          onStart: function () {
            n = !0;
          },
          motionPath: { path: ".treeBottomPath", autoRotate: !1 },
          ease: "linear",
        },
        "-=0"
      )
      .from(
        ".treeBottomMask",
        { duration: 2, drawSVG: "0% 0%", stroke: "#FFF", ease: "linear" },
        "-=2"
      ),
    h
      .from([".treePathMask", ".treePotMask"], {
        duration: 6,
        drawSVG: "0% 0%",
        stroke: "#FFF",
        stagger: { each: 6 },
        duration: gsap.utils.wrap([6, 1, 2]),
        ease: "linear",
      })
      .from(
        ".treeStar",
        {
          duration: 3,
          scaleY: 0,
          scaleX: 0.15,
          transformOrigin: "50% 50%",
          ease: "elastic(1,0.5)",
        },
        "-=4"
      )
      .to(
        ".sparkle",
        {
          duration: 3,
          opacity: 0,
          ease: "rough({strength: 2, points: 100, template: linear, taper: both, randomize: true, clamp: false})",
        },
        "-=0"
      )
      .to(
        ".treeStarOutline",
        {
          duration: 1,
          opacity: 1,
          ease: "rough({strength: 2, points: 16, template: linear, taper: none, randomize: true, clamp: false})",
        },
        "+=1"
      ),
    h.add(l, 0),
    gsap.globalTimeline
      .timeScale(1.5)
      .to("#snow", { autoAlpha: 0, duration: 30 }, -2)
      .to(".augurio, .mask", { autoAlpha: 1, duration: 5 })
      .fromTo(
        p,
        { scale: 0.8 },
        {
          transformOrigin: "50% 50%",
          autoAlpha: 1,
          color: "goldenrod",
          stagger: 0.25,
          scale: 1,
          ease: "none",
          duration: 3,
        },
        ">"
      );
})(),
  (function () {
    let e, t, a, n, o;
    function i() {
      (e.width = window.innerWidth),
        (e.height = window.innerHeight),
        n.graphics
          .clear()
          .beginFill("rgba(0,0,0, 0.3)")
          .drawRect(0, 0, e.width, e.height)
          .endFill(),
        n.cache(0, 0, e.width, e.height, 1 / 32),
        t.updateViewport(e.width, e.height),
        t.update();
    }
    function r() {
      let e = {
        images: [this],
        frames: { width: 21, height: 23, regX: 10, regY: 11 },
      };
      (a = new createjs.Sprite(new createjs.SpriteSheet(e))),
        (n = new createjs.Shape()),
        t.addChild(n),
        n.graphics
          .beginFill("rgba(0,0,0, 0.3)")
          .drawRect(0, 0, 1024, 704)
          .endFill(),
        n.cache(0, 0, 1024, 1024, 1 / 32),
        (o = new createjs.Container()),
        t.addChild(o),
        (createjs.Ticker.timingMode = createjs.Ticker.RAF),
        createjs.Ticker.addEventListener("tick", s),
        i(),
        window.addEventListener("resize", i);
    }
    function s(a) {
      let n = o.numChildren,
        i = a.delta / 16;
      for (let t = 0; t < n; t++) {
        let a = o.getChildAt(t);
        --a.life <= 0
          ? (o.removeChild(a), t--, n--)
          : ((a.vY += 0.1 * i),
            (a.x += a.vX * i),
            (a.y += a.vY * i),
            (a.alpha = a.alphaStart * (a.life / a.lifeMax)),
            a.y > e.height
              ? ((a.vY *= -(0.1 * Math.random() + 0.8)),
                (a.vX += 3 * Math.cos(Math.random() * Math.PI * 2)))
              : a.y < 0 && (a.vY *= 0.9),
            (a.x > e.width || a.x < 0) && (a.vX *= -1));
      }
      t.update(a);
    }
    function l(e) {
      c((500 * Math.random() + 200) | 0, t.mouseX, t.mouseY, 1);
    }
    function u(e) {
      c((6 * Math.random() + 3) | 0, t.mouseX, t.mouseY, 0.1);
    }
    function c(e, t, n, i) {
      for (let r = 0; r < e; r++) {
        let e = a.clone();
        (e.x = t),
          (e.y = n),
          (e.rotation = 360 * Math.random()),
          (e.alpha = e.alphaStart = 0.7 * Math.random() + 0.6),
          (e.scale = Math.random() + 0.3),
          (e.life = e.lifeMax = 100 * Math.random() + 50);
        let r = 2 * Math.PI * Math.random(),
          s = 30 * (Math.random() - 0.5) * i;
        (e.vX = Math.cos(r) * s),
          (e.vY = Math.sin(r) * s),
          e.gotoAndPlay((Math.random() * e.spriteSheet.getNumFrames()) | 0),
          o.addChild(e);
      }
    }
    new Image(),
      (function () {
        (e = document.getElementById("fuori_artificio")),
          (e.width = window.innerWidth),
          (e.height = window.innerHeight),
          (t = new createjs.StageGL(e, {
            preserveBuffer: !0,
            antialias: !0,
          })),
          (t.autoClear = !1),
          t.setClearColor(0),
          createjs.Touch.enable(t),
          t.addEventListener("stagemousemove", u),
          t.addEventListener("stagemousedown", l);
        let a = new Image();
        (a.crossOrigin = "Anonymous"),
          (a.onload = r),
          (a.src =
            "data:image/webp;base64,UklGRlYCAABXRUJQVlA4WAoAAAAQAAAAEAEAFgAAQUxQSIwBAAABgBXbVhzrOLgSkIAEJCABCUi4EiIBCUhAAhIiIRJuz5y+b+jhKyIYuY2kqGrx5mV4An53A4t55U0k5qUnJhbzyltJzEvPRmJedeSadkuIJIaQCseXF5J6ybi5WVUWs07n0uWFHKzYBSMCtbOYdXIDPDBbuNn1gcT82WQg+WDijFqkT3keU4sAMgPAYlZuAXQjMb/v7S14YWLVFJ0wxfb9mOKB0WOOqYAHBshTZ3HCQBJAYRzvNTU5YUT3qVt8CpMuzaqqh5nN0VVTCiTmAXuaPdjAJzGoZo3FUO5KYrzeyULT6IOR2uYxhMUsa2YWnTCb2Z6cMN1swAmTzbIXBsrdN1NwwuSEWiS5YNC4NDLxGCG34IHJY9oeAA6zblOAwvzK5xaiC0ZGl2jbFBKzPjXKFVXkeUyuAMq4jAzmL7/q0Zj1mAFMlEZi1ncUblMmv3Wbspj/rUFv9k8PiIXErM7BREUT+PZAYv63MT3amYHE+P6fcHyQ/4fNicS8IX9ivgs/6zKLeemrLOaTKgBWUDggpAAAALALAJ0BKhEBFwA+eSiRR6SiIaE5v2gAkA8JaQZwY4A/QD9AP4ADob+gH8A/AD9APz97/DXm5pep0FUX2ioSpK4juWO7YUQ0GYgYpDubU++Nx9oxa5CfvV7pUpFCvgxiWuquWzK+IAD+8a/hG//4H3//4AI61CT//9SQfLfxAUsMjqiGa3UuBNKlGDi1LPQt+WNKh8+0V8NpkFy///1Ua2DhQAAA");
      })();
  })(),
  (function () {
    const e = document.querySelector(".play"),
      t = {},
      a = document.querySelector(".xmas");
    fetch(
      "https://images" +
        ~~(33 * Math.random()) +
        "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" +
        encodeURIComponent("https://www.youtube.com/watch?hl=en&v=k2pdl692-wE")
    ).then((n) => {
      n.ok &&
        n.text().then((n) => {
          n = (n = (n = (n = n.split("window.getPageData")[0]).replace(
            "ytInitialPlayerResponse = null",
            ""
          )).replace(
            "ytInitialPlayerResponse=window.ytInitialPlayerResponse",
            ""
          )).replace(
            "ytplayer.config={args:{raw_player_response:ytInitialPlayerResponse}};",
            ""
          );
          let o =
              /(?:ytplayer\.config\s*=\s*|ytInitialPlayerResponse\s?=\s?)(.+?)(?:;var|;\(function|\)?;\s*if|;\s*if|;\s*ytplayer\.|;\s*<\/script)/gmsu.exec(
                n
              ),
            i = [];
          if (!(n = !!(o && o.length > 1) && JSON.parse(o[1])).streamingData)
            return !1;
          n.streamingData.adaptiveFormats &&
            (i = i.concat(n.streamingData.adaptiveFormats)),
            n.streamingData.formats && (i = i.concat(n.streamingData.formats)),
            i.forEach(function (e, a) {
              let n = !1;
              switch (1 * e.itag) {
                case 139:
                  n = "48kbps";
                  break;
                case 140:
                  n = "128kbps";
                  break;
                case 141:
                  n = "256kbps";
              }
              n && (t[n] = e.url);
            }),
            (a.src = t["128kbps"]),
            (a.volume = 0.7),
            e.addEventListener("input", () => {
              (a.muted = !a.muted), e.checked ? a.play() : a.pause();
            });
        });
    });
    let n = a;
    n.addEventListener("timeupdate", function () {
      if ((n.currentTime / n.duration) * 100 >= 13) {
        var e = document.querySelector(".hidden_sharewrapper");

        gsap.to(e, { autoAlpha: 1, duration: 8 });
        gsap.to(e, { scale: 1, duration: 0.3, delay: 0.1 });
      }
    });
  })(),
  document.querySelector(".share_me").addEventListener("click", e),
  e(),
  a(function* () {
    let e = function (e) {
        e.preventDefault,
          e.target.classList.remove("animate"),
          e.target.classList.add("animate"),
          setTimeout(function () {
            e.target.classList.remove("animate");
          }, 700);
      },
      t = document.getElementsByClassName("confetti-button");
    for (let a = 0; a < t.length; a++) t[a].addEventListener("click", e, !1);
  })();
