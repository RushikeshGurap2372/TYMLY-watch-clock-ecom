import React, { useEffect, useRef } from "react";

const CollectionBanner = () => {
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  // ensure videos keep looping infinitely
  useEffect(() => {
    const videos = [desktopVideoRef.current, mobileVideoRef.current];
    videos.forEach((video) => {
      if (video) {
        video.play().catch(() => {}); // prevent autoplay error
        video.addEventListener("ended", () => video.play());
      }
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Video Container */}
      <div className="relative">
        {/* Desktop Video */}
        <video
          ref={desktopVideoRef}
          className="hidden md:block w-full h-[80vh] object-cover transition-opacity duration-700 opacity-100"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster="https://cdn.shopify.com/s/files/1/0692/8321/7683/files/New_Brands_LP_Thumbnail.png?v=1762251224"
        >
          <source
            src="https://cdn.shopify.com/videos/c/o/v/3a6dfc6894e44f9abfd5149bbfb0b024.mp4"
            type="video/mp4"
          />
        </video>

        {/* Mobile Video */}
        <video
          ref={mobileVideoRef}
          className="block md:hidden w-full h-[70vh] object-cover transition-opacity duration-700 opacity-100"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster="https://cdn.shopify.com/s/files/1/0692/8321/7683/files/New_Brands_LP_MV_Thumbnail.png?v=1762251223"
        >
          <source
            src="https://cdn.shopify.com/videos/c/o/v/ceb418e570cc4d05aa851b7056dfe090.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg uppercase tracking-widest">
          Discover New Arrivals
        </h1>
      </div>
    </div>
  );
};

export default CollectionBanner;
