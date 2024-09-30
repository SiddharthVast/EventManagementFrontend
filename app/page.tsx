"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import img11 from "../public/img11.jpg";
import danceimg2 from "../public/danceimg2.jpg";
import danceimg3 from "../public/danceimg3.jpg";
import sportimg2 from "../public/sportsing1.jpg";
import sportsimg2 from "../public/sportsimg2.webp";
import chefimg1 from "../public/chefimg1.jpg";

export default function Home() {
  return (
    <main className="main-div-Carousel">
      <section>
        <Swiper
          modules={[Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }} 
          className="swiper-container"
        >
          <SwiperSlide>
            <div className="relative w-full h-[700px]">
              <Image
                src={img11}
                alt="College Event 1"
                fill
                style={{ objectFit: "cover" }}
                className="swiper-image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-[500px]">
              <Image
                src={danceimg2}
                alt="College Event 2"
                fill
                style={{ objectFit: "cover" }}
                className="swiper-image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-[500px]">
              <Image
                src={danceimg3}
                alt="College Event 3"
                fill
                style={{ objectFit: "cover" }}
                className="swiper-image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-[500px]">
              <Image
                src={sportimg2}
                alt="College Event 3"
                fill
                style={{ objectFit: "cover" }}
                className="swiper-image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-[500px]">
              <Image
                src={sportsimg2}
                alt="College Event 3"
                fill
                style={{ objectFit: "cover" }}
                className="swiper-image"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-[500px]">
              <Image
                src={chefimg1}
                alt="College Event 3"
                fill
                style={{ objectFit: "cover" }}
                className="swiper-image"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </main>
  );
}
