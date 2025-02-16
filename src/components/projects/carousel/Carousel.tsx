import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton, styled, Tooltip } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import Reader from '../reader/Reader';
import SoundGenerator from '../soundGenerator/SoundGenerator';
import Visualizer from '../../visualizer/Visualizer';
import { useInterval } from '../../../hooks/useInterval';

const CarouselWrapper = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 550,
  width: '100%',
});

const CarouselContent = styled('section')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 550,
  width: '100%',
});

const CarouselCardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: '1',
  padding: '10px 25px',
  borderRadius: 15,
  overflow: 'scroll',
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  height: 'inherit',
}));

const CarouselCount = styled('div')(({ theme }) => ({}));

type CarouselCardProps = {
  children: ReactNode;
};

const CarouselCard: FC<CarouselCardProps> = ({ children }) => {
  return (
    <CarouselCardContainer id="carouselCardContainer">
      {children}
    </CarouselCardContainer>
  );
};

type CarouselContainerProps = {
  children: ReactNode[];
  interval?: number;
};

const CarouselContainer: FC<CarouselContainerProps> = ({
  children,
  interval,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  useInterval(() => handleRightClick(), interval);

  const handleLeftClick = () => {
    if (activeCardIndex === 0) {
      setActiveCardIndex(children.length - 1);
    } else {
      setActiveCardIndex((prev) => prev - 1);
    }
  };

  const handleRightClick = () => {
    if (activeCardIndex === children.length - 1) {
      setActiveCardIndex(0);
    } else {
      setActiveCardIndex((prev) => prev + 1);
    }
  };

  return (
    <CarouselWrapper id="carouselWrapper">
      <CarouselContent id="carouselContent">
        <Tooltip title="Previous Experiment">
          <IconButton onClick={handleLeftClick}>
            <ArrowBack fontSize="large" />
          </IconButton>
        </Tooltip>
        {children?.[activeCardIndex] || <p>no cards defined</p>}
        <Tooltip title="Next Experiment">
          <IconButton onClick={handleRightClick}>
            <ArrowForward fontSize="large" />
          </IconButton>
        </Tooltip>
      </CarouselContent>
      <CarouselCount>
        {activeCardIndex + 1}/{children.length}
      </CarouselCount>
    </CarouselWrapper>
  );
};

const Carousel = () => {
  return (
    <CarouselContainer>
      <CarouselCard>
        <SoundGenerator />
      </CarouselCard>
      <CarouselCard>
        <Reader />
      </CarouselCard>
      <CarouselCard>
        <Visualizer />
      </CarouselCard>
    </CarouselContainer>
  );
};

export default Carousel;
