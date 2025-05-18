import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/style.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import NeuralNetwork from "../../app/images/FractureDetection.jpg";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);

  // Add refs to sections
  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Ensure scroll to top on initial load
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "auto" });

    const timer = setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Measure container height
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.scrollHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // GSAP animations
  useEffect(() => {
    // Main content animation
    if (mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      mainContentRef.current.classList.add("animate__animated", "animate__fadeInUp");
    }

    // Button animation
    if (buttonContainerRef.current) {
      const buttons = buttonContainerRef.current.querySelectorAll(".btn-grad");
      if (buttons.length > 0) {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.5,
          }
        );
        buttons.forEach((btn) => {
          btn.classList.add("animate__animated", "animate__pulse", "animate__fast");
        });
      }
    }

    // Section animations
    sectionRefs.current.forEach((section) => {
      const img = section.querySelector("img");
      const text = section.querySelectorAll("h2, p, li");
      const button = section.querySelector(".learn-more-button");

      section.classList.add("animate__animated", "animate__fadeIn");

      if (img) {
        gsap.fromTo(
          img,
          { y: -50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
        img.classList.add("animate__animated", "animate__zoomIn");
      }

      if (text.length > 0) {
        gsap.fromTo(
          text,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
        text.forEach((el) => {
          el.classList.add("animate__animated", "animate__fadeInLeft");
        });
      }

      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
        button.classList.add("animate__animated", "animate__bounceIn");
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <div ref={containerRef} className="main-background-color">
        <div className="main-content" ref={mainContentRef}>
          <div className="main-content-h1-container">
            <h1 className="main-content-h1">
              {"FractureAI".split("Fracture").map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span style={{ color: "#FF8080" }}>Fracture</span>
                  )}
                </React.Fragment>
              ))}
            </h1>
          </div>
          <p className="main-content-p">
            Explore our neural network project for fracture detection, achieving 80% accuracy using GRU and Gradient Boosting on the FracAtlas dataset to enhance medical imaging diagnostics. 🚀
          </p>
          <div className="button-container" ref={buttonContainerRef}>
            <Link to="/fracture-detection" className="btn-grad">
              Fracture Detection
            </Link>
          </div>
        </div>

        <div className="container-fluid main-background-color">
          <section
            ref={addToSectionRefs}
            className="div-background-color empowering-section mb-2 mx-5 rounded-div"
            style={{ padding: "80px 40px 40px 40px" }}
          >
            <div className="row">
              <div className="col-md-6 mb-5">
                <h2 className="text-white mb-5">
                  Advancing Medical Imaging with <span className="main-color">Fracture Detection</span>
                </h2>
                <p className="text-white mb-5">
                  Our neural network model achieves 80% accuracy in detecting bone fractures using the FracAtlas dataset. By leveraging Local Binary Patterns (LBP), Gated Recurrent Units (GRU), and Gradient Boosting, it classifies X-ray images as fractured or non-fractured, enhancing diagnostic efficiency in medical imaging.
                </p>
                <Link
                  to="/fracture-detection"
                  className="btn py-2 px-5 learn-more-button"
                  style={{ border: "none" }}
                >
                  Learn More
                </Link>
              </div>
              <div className="col-md-6">
                <img
                  src={NeuralNetwork}
                  className="img-fluid rounded shadow-lg"
                  alt="Fracture Detection Project"
                />
              </div>
            </div>
          </section>

          <section
            ref={addToSectionRefs}
            className="mx-5"
            style={{ padding: "20px 0 20px 0" }}
          >
            <div className="row">
              <div className="col-md-12 mb-5">
                <h2 className="text-white text-center mb-5">
                  About the Developers
                </h2>
                <ul
                  className="text-white text-center"
                  style={{
                    listStyle: "none",
                    padding: 0,
                    maxWidth: "600px",
                    margin: "0 auto",
                  }}
                >
                  {[
                    "Samah Ashraf Dawoud",
                    "Adham Hashem Elbeshbeshy",
                    "Mawada Kamel Abdullah",
                    "Ebrahim Elmetwaly Elbehairy",
                    "Azza Ahmed Radwan",
                  ].map((name, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 500,
                        margin: "15px 0",
                        padding: "10px 20px",
                        background: "rgba(245, 246, 245, 0.1)",
                        border: "1px solid #FF8080",
                        borderRadius: "8px",
                        transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                      }}
                      className="team-member"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            ref={addToSectionRefs}
            className="mx-5 mb-5"
            style={{ padding: "20px 0" }}
          >
            <h2 className="text-white text-center mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
              <i className="fas fa-user-tie mr-2" style={{ color: "#FF8080" }}></i>
              Project Supervisor
            </h2>
            <p className="text-white text-center" style={{ fontSize: "1.2rem", fontWeight: 500 }}>
              Our supervisor is: Dr. Mona Elbedwehy
            </p>
          </section>

          <ScrollButtons containerHeight={containerHeight} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;