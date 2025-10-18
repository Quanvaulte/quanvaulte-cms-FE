import React, { useState, useEffect } from "react"
import carousel_1 from "../../Media/GeneralMedia/carousel_1.png"
import carousel_2 from "../../Media/GeneralMedia/carousel_2.png"
import type { JSX } from "react/jsx-runtime"




interface Slide {
  image: string
  caption: JSX.Element
  subText: string
}

const Carousel: React.FC = () => {
  const slides: Slide[] = [
    {
      image: carousel_1,
      caption: (
        <>
          Experience tech{" "}
          <span className="text-[#F9D342] font-semibold">with Practice</span>, not just Videos
        </>
      ),
      subText: "Do more than watch—practice tech for real, Fun pratice sessions awaits you",
    },
    {
      image: carousel_2,
       caption: (
        <>
          Upgrade your skills and unlock {" "}
          <span className="text-[#F9D342] font-semibold">new opportunities</span>{" "}with QuanVault
        </>
      ),
      subText: "Join thousands of learners building their future today.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 9000)

    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="hidden md:flex w-1/2  min-h-screen relative overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className=" absolute inset-0 flex flex-col items-center justify-end mb-9 text-center px-6">
            <h2 className="text-white text-3xl font-semibold  mb-2">
              {slide.caption}
            </h2>
            <p className="text-white text-base opacity-90 max-w-md">
              {slide.subText}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Carousel


