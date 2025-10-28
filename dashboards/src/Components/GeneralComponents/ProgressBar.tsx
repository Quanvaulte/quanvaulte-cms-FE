import React from "react";

interface ProgressBarProps {
  pageNum: number;
  totalPages: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ pageNum, totalPages }) => {
  const progress = Math.min((pageNum / totalPages) * 100, 100);

  return (
    <div className="flex items-center w-full space-x-6 sm:space-x-8 md:space-x-9">
      
      <div className="flex-1 h-2 sm:h-3 bg-[#e8eafc] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#2C43EB] rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      
      <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e8eafc] relative">
        <span className="text-[#2C43EB] text-xl sm:text-base font-bold leading-none">
          {pageNum}
        </span>
        <span className=" text-black text-[9px] sm:text-xs leading-none">
          /{totalPages}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;

