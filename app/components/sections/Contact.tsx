import Image from "next/image";
import {
  FaWhatsapp,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { motion } from "framer-motion";


export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-6 md:py-12 justify-center text-white px-6"
    >
      <div className="max-w-7xl w-full">
        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium">Contact Me</h2>
          <p className="text-white/70 mt-2 ">
            Let’s create something amazing together — drop me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="text-center mx-auto text-white leading-relaxed max-w-xl font-lato">
              I’m passionate about crafting interfaces that are not only visually
              appealing but also intuitive and user-friendly. I enjoy
              collaborating with teams, solving design challenges, and building
              digital experiences that leave a lasting impression. Feel free to
              reach out — I’d love to hear about your ideas!
            </p>

            {/* CONTACT CARD */}
            <div
              className=" flex justify-center
                mt-8 p-8 rounded-4xl
                bg-white/5 border border-white/10
                backdrop-blur-md
                shadow-[0_0_25px_rgba(0,229,134,0.15)]
              "
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-18 sm:gap-14">

                {/* LEFT */}
                <div className="space-y-3">
                  <ContactItem
                    icon={<FaWhatsapp />}
                    label="WhatsApp"
                    link="https://wa.me/+94743528374"
                  />
                  <ContactItem
                    icon={<FaEnvelope />}
                    label="Email"
                    link="mailto:sadeeshanilakshi25@gmail.com?subject=Portfolio%20Contact"
                  />
                  <ContactItem
                    icon={<FaGithub />}
                    label="GitHub"
                    link="https://github.com/SadeeNilakshi"
                  />
                </div>

                {/* RIGHT */}
                <div className="space-y-3">
                  <ContactItem
                    icon={<FaLinkedin />}
                    label="LinkedIn"
                    link="https://www.linkedin.com/in/sadeesha-nilakshini-a592b529a/"
                  />
                  <ContactItem
                    icon={<FaYoutube />}
                    label="YouTube"
                    link="https://youtube.com/@thatfrontendgirl"
                  />
                  <ContactItem
                    icon={<FaTiktok />}
                    label="TikTok"
                    link="https://www.tiktok.com/@thatfrontendgirl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center overflow-hidden">
  <motion.div
    initial={{ opacity: 0, y: 120 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
  duration: 2,
  ease: [0.22, 1, 0.36, 1], // premium easing
}}
    viewport={{ once: false }} // 👈 IMPORTANT: re-animates every time
  >
    <Image
      src="/my_img4.png"
      alt="Sadeesha Nilakshini"
      width={500}
      height={550}
      className="object-contain"
    />
  </motion.div>
</div>

        </div>
      </div>
    </section>
  );
}

/* ================= COMPONENT ================= */

function ContactItem({
  icon,
  label,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      className="
        flex items-center gap-2 sm:gap-4
        group min-w-0
      "
    >
      <div
        className="
          w-9 h-9 sm:w-11 sm:h-11
          rounded-full
          bg-[#1e1e1e]
          flex items-center justify-center
          text-sm sm:text-base
          text-white
          shadow-inner
          group-hover:bg-[#00E586]
          group-hover:text-black
          transition
          shrink-0
        "
      >
        {icon}
      </div>

      <span
        className="
          text-xs sm:text-sm
          text-white
          group-hover:text-[#00E586]
          transition
          truncate
        "
      >
        {label}
      </span>
    </a>
  );
}

