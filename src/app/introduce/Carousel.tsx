import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Carousel1 from '@/components/Carousel/Carousel1';
import Carousel2 from '@/components/Carousel/Carousel2';
import Carousel3 from '@/components/Carousel/Carousel3';

interface Props {
  accessToken: string | null;
}

function Carousel({ accessToken }: Props) {
  return (
    <section className="flex h-auto relative item-center overflow-hidden">
      <div className="flex justify-center item-center w-mobile h-auto">
        <Swiper
          modules={[Navigation]}
          className="w-mobile h-auto"
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}>
          <SwiperSlide>
            <Carousel1 accessToken={accessToken} />
          </SwiperSlide>
          <SwiperSlide>
            <Carousel2 accessToken={accessToken} />
          </SwiperSlide>
          <SwiperSlide>
            <Carousel3 accessToken={accessToken} />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Carousel;
