import React from "react";

const LoadingSpinner = ({ size = "md", color = "black" }) => {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const colorClasses = {
    black: "border-t-black",
    white: "border-t-white",
    primary: "border-t-[#f6ad55]",
    gray: "border-t-gray-400",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-solid ${sizeClasses[size]} border-${color}-transparent ${colorClasses[color]}`}
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
