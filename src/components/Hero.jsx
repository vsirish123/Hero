import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // ✅ Timeline for smooth sequence
      const tl = gsap.timeline();

      tl.from(".letter", {
        opacity: 0,
        y: 60,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
      })
      .from(".stat", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");

      // ✅ Scroll animation
      gsap.to(imageRef.current, {
        y: -200,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ".split("");

  return (
    <section
  ref={containerRef}
  className="min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden"
>

      {/* TEXT */}
      <div className="relative z-20 text-center">

        <h1 className="text-white text-5xl md:text-6xl font-bold tracking-[0.4em] flex flex-wrap justify-center">
          {text.map((char, index) => (
            <span
              key={index}
              className="letter inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* STATS */}
        <div className="flex gap-10 mt-10 justify-center">
          {[
            { value: "120%", label: "Growth" },
            { value: "85%", label: "Engagement" },
            { value: "240%", label: "Revenue" },
          ].map((stat, index) => (
            <div key={index} className="stat text-center">
              <h2 className="text-white text-3xl font-bold">
                {stat.value}
              </h2>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>

      {/* IMAGE */}
      <img
  ref={imageRef}
  src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
  alt="car"
  className="mt-10 w-[600px] md:w-[800px]"
/>
    </section>
  );
};

export default Hero;