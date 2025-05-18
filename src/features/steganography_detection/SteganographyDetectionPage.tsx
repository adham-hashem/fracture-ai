import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import "../../features/css/style.css";
import "./SteganographyDetectionPage.css";

gsap.registerPlugin(ScrollTrigger);

const SteganographyDetectionPage = () => {
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
            <i className="fas fa-eye-slash mr-2" style={{ color: "#706CEE" }}></i>
            Steganography Detection Project
          </h2>
          <p style={{ fontSize: "1.2rem" }}>
            <strong>Enhancing Cybersecurity with AI</strong>
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-info-circle mr-2" style={{ color: "#706CEE" }}></i>
            Project Overview
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            The Steganography Detection project employs a Convolutional Neural Network (CNN) to identify images containing hidden messages. Trained on a custom dataset, the model distinguishes clean images from steganographic ones with high precision and recall, strengthening cybersecurity by detecting covert data embedding.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-cogs mr-2" style={{ color: "#706CEE" }}></i>
            Methodology
          </h2>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-image mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Data Preparation:</strong> Curated a custom dataset of clean and steganographic images.
            </li>
            <li className="mb-2">
              <i className="fas fa-brain mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Model Architecture:</strong> Designed a CNN to extract spatial features from images.
            </li>
            <li className="mb-2">
              <i className="fas fa-chart-line mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Training:</strong> Trained the CNN to achieve high precision and recall in classification.
            </li>
            <li className="mb-2">
              <i className="fas fa-check-circle mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Evaluation:</strong> Validated model performance using metrics like accuracy, precision, and recall.
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-star mr-2" style={{ color: "#706CEE" }}></i>
            Key Features
          </h2>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fas fa-check-circle mr-2" style={{ color: "#706CEE" }}></i>
              High precision and recall in detecting hidden messages
            </li>
            <li className="mb-2">
              <i className="fas fa-brain mr-2" style={{ color: "#706CEE" }}></i>
              Robust CNN architecture for feature extraction
            </li>
            <li className="mb-2">
              <i className="fas fa-database mr-2" style={{ color: "#706CEE" }}></i>
              Custom dataset for targeted training
            </li>
            <li className="mb-2">
              <i className="fas fa-shield-alt mr-2" style={{ color: "#706CEE" }}></i>
              Enhances cybersecurity applications
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-bullseye mr-2" style={{ color: "#706CEE" }}></i>
            Impact
          </h2>
          <p style={{ lineHeight: "1.6" }}>
            This project bolsters cybersecurity by providing a tool to detect hidden data in images, protecting against covert communication. It offers valuable insights for researchers and developers working on AI-driven security solutions.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-tools mr-2" style={{ color: "#706CEE" }}></i>
            Technology Stack
          </h2>
          <ul className="list-unstyled ms-4" style={{ lineHeight: "1.8" }}>
            <li className="mb-2">
              <i className="fab fa-python mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Core Development:</strong> Python with TensorFlow
            </li>
            <li className="mb-2">
              <i className="fas fa-image mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Image Processing:</strong> OpenCV
            </li>
            <li className="mb-2">
              <i className="fas fa-database mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Data Processing:</strong> Pandas, NumPy
            </li>
            <li className="mb-2">
              <i className="fas fa-chart-line mr-2" style={{ color: "#706CEE" }}></i>
              <strong>Visualization:</strong> Matplotlib, Seaborn
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i className="fas fa-users mr-2" style={{ color: "#706CEE" }}></i>
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
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease, background 0.3s ease",
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
            <i className="fas fa-quote-left mr-2" style={{ color: "#706CEE" }}></i>
            Our steganography detection project leverages AI to enhance cybersecurity, offering a powerful tool to uncover hidden data and protect digital communications.
          </p>
        </section>

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </>
  );
};

export default SteganographyDetectionPage;