import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { config } from "../../constants/config";

const Hero = () => {
  return (
    <section className="relative mx-auto min-h-screen w-full flex flex-col justify-between overflow-hidden">
      {/* Background Decorative Tech Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 right-[-10%] w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] rounded-full bg-[#915EFF]/15 blur-[120px]" />
        <div className="absolute top-[40%] left-[-10%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-indigo-500/10 blur-[130px]" />
      </div>

      {/* Main Hero Content */}
      <div
        className={`relative z-10 mx-auto max-w-7xl pt-[120px] pb-12 sm:pb-16 ${styles.paddingX} flex-1 flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-14 w-full`}
      >
        {/* Left Side: Pin line + Text + Buttons */}
        <div className="flex flex-row items-start gap-4 sm:gap-5 w-full lg:max-w-[60%]">
          <div className="mt-5 flex flex-col items-center justify-center">
            <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
            <div className="violet-gradient h-40 w-1 sm:h-72" />
          </div>

          <div className="flex-1">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm <span className="text-[#915EFF]">{config.hero.name}</span>
            </h1>
            <p className={`${styles.heroSubText} text-white-100 mt-2 max-w-2xl`}>
              {config.hero.p[0]} <br className="hidden sm:block" />
              {config.hero.p[1]}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="bg-[#915EFF] hover:bg-[#7e47f3] text-white text-sm sm:text-base font-medium py-3 px-7 rounded-xl transition-all duration-300 shadow-md shadow-primary text-center"
              >
                Get in Touch
              </a>
              <a
                href="public/resume.pdf"
                download="resume.pdf"
                className="border-2 border-[#915EFF] hover:bg-[#915EFF]/10 text-white text-sm sm:text-base font-medium py-3 px-7 rounded-xl transition-all duration-300 shadow-md text-center"
              >
                Resume
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Responsive Portfolio Image Showcase */}
        <div className="flex items-center justify-center w-full lg:w-auto shrink-0">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px] xl:w-[420px] xl:h-[420px] flex items-center justify-center">
            {/* Ambient Background Aura */}
            <div className="absolute inset-4 rounded-full bg-[#915EFF]/25 blur-3xl animate-pulse" />

            {/* Auto-glowing Profile Silhouette */}
            <motion.img
              src="/photo.png"
              alt="Profile"
              className="relative z-10 w-full h-full object-contain select-none"
              animate={{
                filter: [
                  "drop-shadow(0 0 6px rgba(145, 94, 255, 0.4)) drop-shadow(0 0 15px rgba(145, 94, 255, 0.2))",
                  "drop-shadow(0 0 18px rgba(145, 94, 255, 0.95)) drop-shadow(0 0 40px rgba(145, 94, 255, 0.55))",
                  "drop-shadow(0 0 6px rgba(145, 94, 255, 0.4)) drop-shadow(0 0 15px rgba(145, 94, 255, 0.2))",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative pb-8 sm:pb-10 flex w-full items-center justify-center z-20">
        <a href="#about">
          <div className="border-secondary flex h-[58px] w-[32px] sm:h-[64px] sm:w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;