import React from "react";

type GlowIconProps = {
  children: React.ReactNode;
  className?: string;
};

const GlowIcon = ({ children, className = "" }: GlowIconProps) => {
  return (
    <div className={`group absolute pointer-events-auto ${className}`}>
      {/* GLOW EFFECT */}
      <div
        className="
          absolute
          inset-[-35%]
          rounded-full
          bg-[radial-gradient(circle,rgba(0,180,255,0.75)_0%,rgba(0,180,255,0.35)_30%,transparent_70%)]
          blur-2xl
          opacity-0
          scale-75
          transition-all
          duration-500
          group-hover:opacity-100
          group-hover:scale-110
        "
      />

      {/* ICON */}
      <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
        {children}
      </div>
    </div>
  );
};

export default GlowIcon;