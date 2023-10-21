import "./App.scss";
import trees1 from "./assets/trees1.svg";
import trees2 from "./assets/trees2.svg";
import mountainImg from "./assets/mountain.svg";
import { useCallback, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const numberOfStars = 20;
  const sky = useRef(null);
  const landing = useRef(null);
  const tree1 = useRef(null);
  const tree2 = useRef(null);
  const mountain = useRef(null);

  const random = (range, unit) => {
    let randNum = Math.floor(Math.random() * range) + 1;
    return `${randNum}${unit}`;
  };

  const parallax = () => {
    const parallax = gsap.timeline({
      defaults: {
        ease: "none",
        duration: 1,
      },
      scrollTrigger: {
        anticipatePin: 1,
        scrub: 1,
        trigger: landing.current,
        pin: true,
        start: "top top",
        end: "bottom top",
      },
    });

    gsap.set(tree1.current, {
      left: "50%",
      x: "-50%",
    });

    gsap.set(tree2.current, {
      left: "50%",
      x: "-50%",
    });

    parallax
      .to(tree1.current, {
        // height: "55vh",
        scale: 1.2,
        filter: "blur(0px)",
      })
      .to(
        tree2.current,
        {
          bottom: "-3vh",
          scale: 1.05,
        },
        "-=1"
      )
      .to(
        mountain.current,
        {
          filter: "blur(4px)",
          bottom: "6vh",
        },
        "-=1"
      )
      .to(
        sky.current,
        {
          filter: "blur(2px)",
          background: "linear-gradient(to top, #434343 -50%, black 100%)",
        },
        "-=1"
      );
  };

  const injectStars = useCallback(() => {
    for (let i = 0; i < numberOfStars; i++) {
      let star = document.createElement("div");
      star.classList.add("landing__sky__star");

      let widthAndHeight = random(5, "px");
      star.style.height = star.style.width = widthAndHeight;

      star.style.left = random(100, "%");
      star.style.top = random(100, "%");

      sky.current.appendChild(star);

      const delay = Math.floor(Math.random() * 4);

      gsap.to(star, {
        duration: 1,
        opacity: 0.5,
        scale: 0.5,
        delay: delay,
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  useEffect(() => {
    injectStars();
    parallax();
  }, [injectStars]);

  return (
    <div className="App">
      <div className="landing" ref={landing}>
        <div className="landing__sky" ref={sky}></div>
        <div className="landing__trees">
          <img
            className="landing__trees__tree landing__trees__tree--1"
            src={trees1}
            alt=""
            ref={tree1}
          />
          <img
            className="landing__trees__tree landing__trees__tree--2"
            src={trees2}
            alt=""
            ref={tree2}
          />
          <img
            className="landing__trees__mountain"
            src={mountainImg}
            alt=""
            ref={mountain}
          />
        </div>
        <div className="landing__floor"></div>
      </div>

      <div className="section">
        <h1>React + GSAP</h1>
        <h2>Parallax Effect</h2>
        <p>
          I'm <span>Sead Sabanovic</span>, a passionate Frontend and UI
          Developer. Feel free to use any of my open-source contributions to
          enhance and innovate your own development endeavors. Your success is
          my success, and I'm here to support the development community in any
          way I can. If you're interested in connecting or exploring my work,
          please feel free to follow me on{" "}
          <a
            href="https://www.linkedin.com/in/ssabanovic/"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>{" "}
          and check out my projects on my{" "}
          <a
            href="https://github.com/SeadSabanovic"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>{" "}
          profile. I look forward to connecting with you!
        </p>
      </div>
    </div>
  );
}

export default App;
