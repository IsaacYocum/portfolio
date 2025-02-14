import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton, styled, Tooltip } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import Reader from '../reader/Reader';
import SoundGenerator from '../soundGenerator/SoundGenerator';
import Visualizer from '../../visualizer/Visualizer';
import { useInterval } from '../../../hooks/useInterval';

const CarouselWrapper = styled('section')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 550,
  width: '100%',
});

const CarouselCardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'scroll',
  flex: '1',
  padding: '10px 25px',
  borderRadius: 15,
  backgroundColor: theme.palette.background.paper,
  height: 'inherit',
}));

const ArrowContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

type CarouselCardProps = {
  children: ReactNode;
};

const CarouselCard: FC<CarouselCardProps> = ({ children }) => {
  return <CarouselCardContainer>{children}</CarouselCardContainer>;
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
    <CarouselWrapper>
      <ArrowContainer>
        <Tooltip title="Previous Experiment">
          <IconButton onClick={handleLeftClick}>
            <ArrowBack fontSize="large" />
          </IconButton>
        </Tooltip>
      </ArrowContainer>
      {children?.[activeCardIndex] || <p>no cards defined</p>}
      <ArrowContainer>
        <Tooltip title="Next Experiment">
          <IconButton onClick={handleRightClick}>
            <ArrowForward fontSize="large" />
          </IconButton>
        </Tooltip>
      </ArrowContainer>
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
