import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import '../styles/Slider.css';

const Slider = () => {

  return (
    <div className="carousel-wrapper">
      <Swiper
        spaceBetween={40} // Adjust space between slides
        slidesPerView={3} // Show 1 slide at a time in mobile view
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
      >
        <SwiperSlide>
          <div className="card">
            <img src="https://via.placeholder.com/150" alt="Slide 1" className="card-image" />
            <div className="card-content">
              <h3>Titanic - Machine Learning from Disaster</h3>
              <p>Start here! Predict survival on the Titanic...</p>
              <p>Getting Started</p>
              <p>17584 Teams</p>
              <div className="card-footer">
                <span>Knowledge</span>
                <span>Ongoing</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <img src="https://via.placeholder.com/150" alt="Slide 2" className="card-image" />
            <div className="card-content">
              <h3>Another Contest</h3>
              <p>Details about another contest...</p>
              <p>Getting Started</p>
              <p>1234 Teams</p>
              <div className="card-footer">
                <span>Knowledge</span>
                <span>Upcoming</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <img src="https://via.placeholder.com/150" alt="Slide 3" className="card-image" />
            <div className="card-content">
              <h3>Contest 3</h3>
              <p>Details about contest 3...</p>
              <p>Getting Started</p>
              <p>5678 Teams</p>
              <div className="card-footer">
                <span>Knowledge</span>
                <span>Ongoing</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card">
            <img src="https://via.placeholder.com/150" alt="Slide 3" className="card-image" />
            <div className="card-content">
              <h3>Contest 4</h3>
              <p>Details about contest 3...</p>
              <p>Getting Started</p>
              <p>5678 Teams</p>
              <div className="card-footer">
                <span>Knowledge</span>
                <span>Ongoing</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
