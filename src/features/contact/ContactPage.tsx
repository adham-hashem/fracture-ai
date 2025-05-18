import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import "./ContactPage.css";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const sectionRefs = useRef<HTMLElement[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<string>("");

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

  // GSAP animations
  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const heading = section.querySelector("h2, h6");
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

    // Form fields animation
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll("input, textarea");
      const button = formRef.current.querySelector(".nextButton");

      gsap.fromTo(
        inputs,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );

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
              trigger: formRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("Sending...");
    setTimeout(() => {
      setFormStatus("Message sent successfully!");
      if (formRef.current) {
        formRef.current.reset();
      }
      setTimeout(() => setFormStatus(""), 3000);
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="container-fluid text-white main-background-color px-5 py-4">
        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-4">
            <i className="fas fa-envelope mr-2" style={{ color: "#FF8080" }}></i>
            Contact Us
          </h2>
          <p className="lead">
            We’re here to help! If you have any questions, feedback, or inquiries about our neural network projects, including fracture detection, feel free to reach out. Our team is eager to assist you.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h6 className="mb-3">
            <i className="fas fa-phone-alt mr-2" style={{ color: "#FF8080" }}></i>
            Reach Out to Us
          </h6>
          <p>You can contact us through the following methods:</p>
          <ul className="list-unstyled ms-4">
            <li className="mb-2">
              <i className="fas fa-envelope mr-2" style={{ color: "#FF8080" }}></i>
              <strong>Email:</strong> support@neuralnetworkprojects.com
            </li>
            <li className="mb-2">
              <i className="fas fa-phone mr-2" style={{ color: "#FF8080" }}></i>
              <strong>Phone:</strong> +201028110927
            </li>
            <li className="mb-2">
              <i className="fas fa-map-marker-alt mr-2" style={{ color: "#FF8080" }}></i>
              <strong>Address:</strong> New Damietta, Damietta, Egypt
            </li>
          </ul>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <h6 className="mb-3">
            <i className="fas fa-users mr-2" style={{ color: "#FF8080" }}></i>
            Our Team
          </h6>
          <p>Meet the dedicated team behind our neural network projects:</p>
          <ul
            className="text-white"
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
                  textAlign: "center",
                }}
                className="team-member"
              >
                {name}
              </li>
            ))}
          </ul>
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
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;