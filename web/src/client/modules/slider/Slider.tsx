import React from 'react';
import {BaseUserComponentProps} from '../../components/component-mapper';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slide from './Slide';

export type SlideProps = {
    image: string,
    title: string,
    description: string
}

type SliderModuleState = {
    slides: SlideProps[]
}

interface SliderModuleProps extends BaseUserComponentProps {
    state: SliderModuleState
}

const SliderModule: React.FC<SliderModuleProps> = ({state}) => {
    return (
        <div>
            <Slider>
                {state.slides.map((slide, i) => {
                    return (
                       <Slide slide={slide} key={i}/>
                    );
                })}
            </Slider>
        </div>
    );
};

export default SliderModule;
