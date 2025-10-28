import React from "react"
import bgImage from "../../Media/GeneralMedia/carousel_1.png"

interface ImageSectionProps {
  
  bubbleText: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({bubbleText }) => {
  return (
    <div
    className="relative w-full  md:w-1/2 h-46 md:h-auto  flex flex-col justify-center items-center text-center p-6 overflow-hidden"
    style={{
      backgroundImage:`url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
    >
      <div className="hidden md:block absolute top-5 right-5 md:top-10 md:right-10 max-w-48">
        <div className="relative bg-[#8c879c] shadow-lg px-4 py-2  text-sm text-white rounded-2xl ">
         {bubbleText}
         <div className="absolute left-[-5px] bottom-3 m- w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[#8c879c]"></div>
        </div>
      </div>

      <div className=" absolute inset-0 flex flex-col items-center justify-end mb-9 text-center px-6">
            <h2 className="text-white text-3xl font-semibold  mb-2">
              Hurry up! {" "}
              <span className="text-[#F9D342] font-semibold">Ubong</span>{" "}can’t wait  to learn with you.
            </h2>
            
        
          </div>
    </div>
  );
};

export default ImageSection;
