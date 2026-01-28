import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="w-full bg-black/60 backdrop-blur-md border-t border-white/10 text-white px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">

        {/* TEXT */}
        <p className="text-center text-sm sm:text-lg font-lato text-white/80 max-w-xl">
          Crafted with code, creativity, and a dash of curiosity — thanks for visiting!
        </p>

        {/* CONTACT INFO */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 w-full sm:w-auto">

          {/* WhatsApp */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 flex items-center justify-center text-[#00E586]">
              <FaWhatsapp className="text-sm sm:text-base" />
            </div>
            <span className="text-xs sm:text-sm text-white">
              +94&nbsp;743&nbsp;528&nbsp;374
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 flex items-center justify-center text-[#00E586]">
              <FaEnvelope className="text-sm sm:text-base" />
            </div>
            <span className="text-xs sm:text-sm text-white truncate max-w-[220px] sm:max-w-none">
              sadeeshanilakshi25@gmail.com
            </span>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full max-w-md border-t border-white/30" />

        {/* FOOTER BOTTOM */}
        <div className="text-[10px] sm:text-xs text-white/70 flex flex-wrap justify-center items-center gap-1 text-center">
          <span>Copyright ©</span>
          <strong className="text-white font-semibold">Sadeesha.dev</strong>
          <span>All Rights Reserved.</span>
        </div>

      </div>
    </footer>
  );
}

