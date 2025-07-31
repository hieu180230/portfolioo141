import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Panel from './panel';

const Carousel = ({ data }) => {

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      initialSlide={2}
      centeredSlides={true}
      spaceBetween={50}
      slidesPerView={2}
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
        navigation: 'true'
      }}
      loop
    >
      {data.map((p_project, index) => (
        <SwiperSlide key={index}>
          <img src={p_project.img_url} className="relative z-10" loading="lazy" />
          <Panel panel_style="swiper-panel">
            <h1>{p_project.title}</h1>
            <p>{p_project.description}</p>
          </Panel>
        </SwiperSlide>
      ))}
      {/* Previous Button */}
      <svg
        className="swiper-button-prev directional-button"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        style={{ width: '54px', height: '54px' }}
      >
        <defs>
          <linearGradient
            id="center_gradient"
            gradientUnits="userSpaceOnUse"
            x1="12.6005"
            y1="47.5209"
            x2="86.6005"
            y2="47.5209"
          >
            <stop offset="0" style={{ stopColor: 'var(--accent-alt)' }} />
            <stop offset="0.5" style={{ stopColor: 'var(--accent)' }} />
            <stop offset="1" style={{ stopColor: 'var(--accent-hover)' }} />
          </linearGradient>
          <linearGradient
            id="top_gradient"
            gradientUnits="userSpaceOnUse"
            x1="53.4222"
            y1="27.9995"
            x2="53.4222"
            y2="67.0005"
          >
            <stop offset="0" style={{ stopColor: 'var(--accent-alt)' }} />
            <stop offset="1" style={{ stopColor: 'var(--accent-hover)' }} />
          </linearGradient>
        </defs>
        <circle
          fill="url(#top_gradient)"
          className="outer-ring"
          cx="50"
          cy="50"
          r="45"
        />
        <circle className="outer-ring-background" cx="50" cy="50" r="41" />
        <g>
          <circle
            fill="url(#center_gradient)"
            className="inner-ring"
            cx="50"
            cy="50"
            r="35"
          />
          <circle className="inner-ring-background" cx="50" cy="50" r="30" />
          <path
            fill="url(#top_gradient)"
            className="Arrow_2_gT PreviousDirectionTranslateHack_1tV9"
            d="M48.78,28l-19,19l19,20l6-5l-10-11l21-0.07V43h-21l10-10L48.78,28z"
          />
        </g>
      </svg>

      {/* Next Button */}
      <svg
        className="swiper-button-next directional-button"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        style={{ width: '54px', height: '54px' }}
      >
        <defs>
          <linearGradient
            id="center_gradient_next"
            gradientUnits="userSpaceOnUse"
            x1="12.6005"
            y1="47.5209"
            x2="86.6005"
            y2="47.5209"
          >
            <stop offset="0" style={{ stopColor: 'var(--accent-alt)' }} />
            <stop offset="0.5" style={{ stopColor: 'var(--accent)' }} />
            <stop offset="1" style={{ stopColor: 'var(--accent-hover)' }} />
          </linearGradient>
          <linearGradient
            id="top_gradient_next"
            gradientUnits="userSpaceOnUse"
            x1="53.4222"
            y1="27.9995"
            x2="53.4222"
            y2="67.0005"
          >
            <stop offset="0" style={{ stopColor: 'var(--accent-alt)' }} />
            <stop offset="1" style={{ stopColor: 'var(--accent-hover)' }} />
          </linearGradient>
        </defs>
        <circle
          fill="url(#top_gradient_next)"
          className="outer-ring"
          cx="50"
          cy="50"
          r="45"
        />
        <circle className="outer-ring-background" cx="50" cy="50" r="41" />
        <g>
          <circle
            fill="url(#center_gradient_next)"
            className="inner-ring"
            cx="50"
            cy="50"
            r="35"
          />
          <circle className="inner-ring-background" cx="50" cy="50" r="30" />
          <path
            fill="url(#top_gradient_next)"
            className="Arrow_2_gT NextDirectionTranslateHack_1tV9"
            d="M51.22,28l19,19l-19,20l-6-5l10-11l-21-0.07V43h21l-10-10L51.22,28z"
          />
        </g>
      </svg>
    </Swiper >
  )
}

export default Carousel
