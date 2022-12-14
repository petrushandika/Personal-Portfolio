"use client"

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface AnimationLottieProps {
  animationPath: any;
  width?: string | number;
}

const AnimationLottie = ({ animationPath, width }: AnimationLottieProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width: '95%',
    }
  };

  return (
    <Lottie {...defaultOptions} />
  );
};

export default AnimationLottie;

