import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import Navigation styles
import 'swiper/css/pagination'; // Import Pagination styles
import { Navigation, Pagination } from 'swiper/modules';
import '../styles/Slider.css'; // Import your custom CSS

const Slider = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={2}
      navigation
      pagination={{
        clickable: true,
        el: '.swiper-pagination', // Ensure the class matches
      }}
      loop={true}
      modules={[Navigation, Pagination]}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};

export default Slider;
