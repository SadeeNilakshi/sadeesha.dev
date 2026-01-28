export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0E16]">
      <div className="relative">
        <div className="relative w-28 h-28">
          <div
            className="absolute w-full h-full rounded-full 
                       border-[3px] border-white/10 
                       border-r-[#00E586] border-b-[#00E586] 
                       animate-spin"
            style={{ animationDuration: "3s" }}
          />

          <div
            className="absolute w-full h-full rounded-full 
                       border-[3px] border-white/10 
                       border-t-[#00E586] 
                       animate-spin"
            style={{
              animationDuration: "2s",
              animationDirection: "reverse",
            }}
          />
        </div>

        <div
          className="absolute inset-0 rounded-full blur-md 
                     bg-gradient-to-tr 
                     from-[#00E586]/20 via-transparent to-[#00E586]/10 
                     animate-pulse"
        />
      </div>
    </div>
  );
}
