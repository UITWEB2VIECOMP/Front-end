import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Userinfo } from '../pages/Competition';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import '../styles/Slider.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosUrl from '../../config/AxiosConfig';
import { Userinfo2 } from "../pages/Main";

const Slider = ({ target, page }) => {
  const navigate = useNavigate();
  const { role, token } = page==="compe" ? useContext(Userinfo):useContext(Userinfo2)


  const [contestData, setContestData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContestData = async (token) => {
    try {
      const res = await axiosUrl.get(`/api/homepage/get-${target}`, {
        headers: {
          token: token,
        },
      });
      setContestData(res.data.data);
      console.log('Contest Response:', res);
      setLoading(false);
    } catch (err) {
      console.error('Verification failed: ', err);
      setLoading(false);
      if (err.response?.data?.message === "Token has expired") {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    if (!role || !token) {
      navigate('/login');
    } else {
      fetchContestData(token);
    }
  }, [role, token, target, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const swiperItems = contestData.map((data) => (
    <SwiperSlide key={data.contest_id}>
      <Link to={`/contest/${data.contest_id}`}>
        <div className="card">
          <img src={data.contest_image} alt="Slide 1" className="card-image" />
          <div className="card-content">
            <h3>{data.contest_name}</h3>
            <p>
              {data.contest_description.length > 100
                ? `${data.contest_description.substring(0, 100)}...`
                : data.contest_description}
            </p>
            <p>Getting Started</p>
            <div className="card-footer">
              <span>{data.prizes_description}</span>
              <span>{target.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </Link>
    </SwiperSlide>
  ));
  return (
    <div className="carousel-wrapper">
      <Swiper
        spaceBetween={40} // Adjust space between slides
        slidesPerView={3} // Show 3 slides at a time in default view
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
        {swiperItems}
      </Swiper>
    </div>
  );
};

export default Slider;
