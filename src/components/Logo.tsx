import React from 'react';

export const Logo = ({ className = "w-12 h-12", variant = "light" }: { className?: string, variant?: "light" | "dark" }) => {
  const bgColor = variant === "light" ? "bg-white" : "bg-black";
  const textColor = variant === "light" ? "text-black" : "text-white";
  const ringColor = variant === "light" ? "border-white" : "border-black";
  const stemColor = variant === "light" ? "bg-white" : "bg-black";
  const innerTextColor = variant === "light" ? "text-black" : "text-white";

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* The "O" Ring */}
      <div className={`aspect-square h-full rounded-full border-[12px] md:border-[16px] ${ringColor} flex-shrink-0`} />
      
      {/* The Stem with Text */}
      <div className={`absolute right-0 top-0 bottom-0 w-[35%] ${stemColor} flex flex-col items-center justify-center overflow-hidden`}>
        <div className={`rotate-[-90deg] whitespace-nowrap font-heading text-[6px] md:text-[8px] leading-none tracking-tighter ${innerTextColor} flex flex-col items-center`}>
          <span>ONLY DJS</span>
          <span>MAGAZINE</span>
        </div>
      </div>
    </div>
  );
};

export const BrandLogo = ({ size = "md", light = true }: { size?: "sm" | "md" | "lg", light?: boolean }) => {
  const dimensions = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-32 w-32"
  };

  const colorClass = light ? "text-white" : "text-black";
  const bgClass = light ? "bg-white" : "bg-black";
  const innerText = light ? "text-black" : "text-white";

  return (
    <div className={`relative flex items-center ${dimensions[size]}`}>
      {/* Main Circle */}
      <div className={`h-full aspect-square rounded-full border-[10px] md:border-[14px] ${light ? 'border-white' : 'border-black'}`} />
      
      {/* Vertical Bar */}
      <div className={`absolute right-0 top-0 bottom-0 w-[38%] ${bgClass} flex items-center justify-center`}>
        <div className="rotate-[-90deg] flex flex-col items-center leading-[0.8] tracking-tighter">
          <span className={`font-heading text-[5px] md:text-[7px] ${innerText}`}>ONLY DJS</span>
          <span className={`font-heading text-[5px] md:text-[7px] ${innerText}`}>MAGAZINE</span>
        </div>
      </div>
    </div>
  );
};
