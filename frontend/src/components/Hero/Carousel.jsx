import React from "react";
import Slider from "react-slick";

// Note: This component requires the 'react-slick' library and its CSS.
// You must run 'npm install react-slick slick-carousel' and import the CSS 
// ('slick-carousel/slick/slick.css' and 'slick-carousel/slick/slick-theme.css') 
// in your application's entry file (e.g., main.jsx or App.jsx).

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const images = [
  {
    url: "https://content.thewosgroup.com/rolex/certified-pre-owned/landing-page-homepage-push-banner.webp",
    text: "Luxury Watches for Every Style",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0627/5517/files/02-26-20_Aidan_264883.jpg?v=1603213851",
    text: "Modern Smartwatches Collection",
  },
  {
    url: "https://www.bobswatches.com/rolex-blog/wp-content/uploads/2022/06/Best-Luxury-Watches-for-Women.jpg",
    text: "Classic & Vintage Timepieces",
  },
];


  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={index} className="relative h-[80vh]">
            <img
              src={item.url}
              alt={item.text}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-4xl md:text-6xl font-serif drop-shadow-lg">
                {item.text}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;