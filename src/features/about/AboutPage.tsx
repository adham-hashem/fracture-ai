import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/style.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const sectionRefs = useRef<HTMLElement[]>([]);

  // Add refs to sections
  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
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
    sectionRefs.current.forEach((section) => {
      const heading = section.querySelector("h2");
      const content = section.querySelectorAll("p, ul, li");

      // Heading animation
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }

      // Content animation
      if (content.length > 0) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <div
        ref={containerRef}
        className="container-fluid text-white main-background-color px-5 py-4"
        style={{ minHeight: "100vh" }}
      >
        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-project-diagram mr-2" style={{ color: "#FF8080" }}></i>
            Project Overview
          </h2>
          <p style={{ fontSize: "1.2rem" }}>
            <strong>Neural Network Innovation for Medical Imaging</strong>
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-info-circle mr-2" style={{ color: "#FF8080" }}></i>
            About Our Project
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            Our team has developed a cutting-edge neural network project addressing real-world challenges in medical imaging:
          </p>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-x-ray mr-2" style={{ color: "#FF8080" }}></i>
              <strong>Fracture Detection:</strong> A neural network model achieving 80% accuracy in detecting bone fractures using the FracAtlas dataset. It leverages Local Binary Patterns (LBP), Gated Recurrent Units (GRU), and Gradient Boosting to classify X-ray images, enhancing diagnostic efficiency.
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-star mr-2" style={{ color: "#FF8080" }}></i>
            Key Features
          </h2>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-brain mr-2" style={{ color: "#FF8080" }}></i>
              Advanced Neural Network Model (GRU)
            </li>
            <li className="mb-2">
              <i className="fas fa-image mr-2" style={{ color: "#FF8080" }}></i>
              Image Processing for Medical Applications
            </li>
            <li className="mb-2">
              <i className="fas fa-chart-bar mr-2" style={{ color: "#FF8080" }}></i>
              High Accuracy (80%) in Fracture Classification
            </li>
            <li className="mb-2">
              <i className="fas fa-database mr-2" style={{ color: "#FF8080" }}></i>
              Utilization of FracAtlas Dataset
            </li>
            <li className="mb-2">
              <i className="fas fa-code mr-2" style={{ color: "#FF8080" }}></i>
              Robust Implementation with TensorFlow and Scikit-Learn
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-bullseye mr-2" style={{ color: "#FF8080" }}></i>
            Objective & Impact
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            Our project aims to advance AI applications in medical imaging. The fracture detection model supports healthcare professionals by improving diagnostic accuracy, providing a valuable tool for researchers and practitioners, and fostering innovation in AI-driven medical solutions.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-tools mr-2" style={{ color: "#FF8080" }}></i>
            Technology Stack
          </h2>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fab fa-python mr-2" style={{ color: "#FF8080" }}></i>
              <strong>Core Development:</strong> Python with TensorFlow, Scikit-Learn, and OpenCV
            </li>
            <li className="mb-2">
              <i className="fas fa-database mr-2" style={{ color: "#FF8080" }}></i>
              <strong>Data Processing:</strong> Pandas, NumPy
            </li>
            <li className="mb-2">
              <i className="fab fa-react mr-2" style={{ color: "#FF8080" }}></i>
              <strong>Frontend:</strong> React for web interface
            </li>
            <li className="mb-2">
              <i className="fas fa-chart-line mr-2" style={{ color: "#FF8080" }}></i>
              <strong>Visualization:</strong> Matplotlib, Seaborn for performance analysis
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-users mr-2" style={{ color: "#FF8080" }}></i>
            Our Team
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
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <p style={{ lineHeight: "1.6", fontStyle: "italic" }}>
            <i className="fas fa-quote-left mr-2" style={{ color: "#FF8080" }}></i>
            Our neural network project represents a commitment to solving real-world problems through AI. By advancing medical imaging, we aim to create impactful solutions that inspire and empower the global AI community.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-user-tie mr-2" style={{ color: "#FF8080" }}></i>
            Project Supervisor
          </h2>
          <p style={{ fontSize: "1.2rem", fontWeight: 500, textAlign: "center" }}>
            Our supervisor is: Dr. Mona Elbedwehy
          </p>
        </section>

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;