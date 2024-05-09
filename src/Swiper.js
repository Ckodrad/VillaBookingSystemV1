// Imports
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./SwiperStyles.css"

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPersonSwimming, faBasketball,faFutbol,faTableTennisPaddleBall,faPersonHiking, faPersonBiking} from "@fortawesome/free-solid-svg-icons"


const SwiperSlides = () => {
    return (
        <>
            <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <FontAwesomeIcon icon={faBasketball} bounce size="8x" style={{color: "#b51a00",}} />
          <h2 style={{marginTop:'1.3cm'}}>Two standard basketball courts</h2>
        </SwiperSlide>
        <SwiperSlide>
          <FontAwesomeIcon icon={faPersonSwimming} size="10x" />
          <h2 style={{marginTop:'1cm'}}>Public access swimming pool</h2>
        </SwiperSlide>
        <SwiperSlide>
          <FontAwesomeIcon icon={faFutbol} rotation={180} size="10x" style={{"--fa-primary-color": "#000000", "--fa-secondary-color": "#000000", "--fa-secondary-opacity": "0.5",}} />
          <h2 style={{marginTop:'1cm'}}>One futsal court & one futsal field</h2>
          </SwiperSlide>
        <SwiperSlide>
          <FontAwesomeIcon icon={faTableTennisPaddleBall} size="10x" />
          <h2 style={{marginTop:'1cm'}}>Table tennis </h2>
        </SwiperSlide>
        <SwiperSlide>
          <table >
            <tbody>
              <tr>
                <td><FontAwesomeIcon icon={faPersonHiking} size="8x"/></td>
                <td><FontAwesomeIcon icon={faPersonBiking} size="8x"/></td>
              </tr>
            </tbody>
          </table>
          <h2 style={{marginTop:'1cm'}}>Mini Hiking Trail </h2>
        </SwiperSlide>
        <SwiperSlide>
          <FontAwesomeIcon icon={faPersonHiking} size="10x"/>
          <h2 style={{marginTop:'1cm'}}>Multi Functional Hall </h2>
        </SwiperSlide>
      </Swiper>
        </>
    )
}

export default SwiperSlides;