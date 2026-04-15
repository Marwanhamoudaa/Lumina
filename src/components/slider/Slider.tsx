'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  autoPlay?: boolean;
  delay?: number;
}

export default function ProductSlider({ images, autoPlay = true, delay = 5000 }: Props) {
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAutoplay = () => {
    if (isPlaying) {
      swiperRef.current?.autoplay?.stop();
    } else {
      swiperRef.current?.autoplay?.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full group">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={isPlaying ? { delay, disableOnInteraction: false } : false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="rounded-3xl overflow-hidden shadow-2xl"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-125 lg:h-150 overflow-hidden bg-linear-to-br from-slate-900 to-slate-800">

              {/* Background Image with Parallax Effect */}
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Gradient Overlay - Modern Design */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent z-10" />

              {/* Content Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 z-20 p-8 lg:p-12 text-white"
              >
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-emerald-500 rounded-full text-xs font-semibold mb-4">
                    New Arrival
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold mb-3">
                    Summer Collection 2024
                  </h2>
                  <p className="text-white/90 text-sm lg:text-base mb-6">
                    Discover the latest trends and elevate your style with our exclusive collection.
                  </p>
                  <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg">
                    Shop Now →
                  </button>
                </div>
              </motion.div>

              {/* Slide Indicator Dot */}
              <div className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">
                {index + 1} / {images.length}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Modern Design */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-800 w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 mx-auto" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-800 w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 mx-auto" />
      </button>

      {/* Autoplay Control Button */}
      <button
        onClick={toggleAutoplay}
        className="absolute bottom-6 right-6 z-30 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Custom Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideTo(index)}
            className={`transition-all duration-300 rounded-full ${activeIndex === index
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}