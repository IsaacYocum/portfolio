import React from 'react';
import './ExperimentsCarousel.css';
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Pomodoro from './pomodoro/pomodoro';
import SoundGenerator from './soundGenerator/SoundGenerator';
import Reader from './reader/Reader';
import Visualizer from '../visualizer/Visualizer';

const carousel: KeenSliderPlugin = (slider) => {
  const z = 300;
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on('created', () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on('detailsChanged', rotate);
};

const ExperimentsCarousel = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: '.carousel__cell',
      renderMode: 'custom',
      mode: 'free-snap',
    },
    [carousel]
  );

  return (
    <div className="wrapper">
      <div className="scene">
        <div className="carousel keen-slider" ref={sliderRef}>
          <div className="carousel__cell number-slide1">
            <SoundGenerator />
          </div>
          <div className="carousel__cell number-slide2">
            <Reader />
          </div>
          <div className="carousel__cell number-slide3">
            <Pomodoro />
          </div>
          <div className="carousel__cell number-slide4">
            <Visualizer />
          </div>
          <div className="carousel__cell number-slide5">5</div>
          <div className="carousel__cell number-slide6">6</div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentsCarousel;
