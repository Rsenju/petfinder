import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, PawPrint, Quote } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { testimonials } from '../../data/mockData';

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative py-12">
      <Swiper
        title={null}
        aria-label="Depoimentos"
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full py-12"
        breakpoints={{
          320: {
            slidesPerView: 1,
            coverflowEffect: { depth: 50, modifier: 1 }
          },
          640: {
            slidesPerView: 2,
            coverflowEffect: { depth: 100, modifier: 2 }
          },
          1024: {
            slidesPerView: 3,
            coverflowEffect: { depth: 100, modifier: 2.5 }
          },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="max-w-md">
            {({ isActive }) => (
              <div 
                className={`
                  bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl 
                  transform transition-all duration-500
                  ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60'}
                  border border-gray-100 dark:border-gray-700
                  h-full flex flex-col
                `}
              >
                <Quote className="w-10 h-10 text-blue-200 dark:text-blue-800 mb-4" />
                
                <p className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed mb-6 flex-grow">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonial.role}
                    </p>
                    {testimonial.pet && (
                      <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm mt-1">
                        <PawPrint className="w-3 h-3" />
                        <span>{testimonial.pet}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botões e indicadores customizados (mantidos) */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group">
          <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-8 bg-blue-600' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group">
          <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </button>
      </div>
    </div>
  );
}