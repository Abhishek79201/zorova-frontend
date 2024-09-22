import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";


const ButtonSkeleton = () => {
  return (
    <Skeleton height={15} width={80} duration={5000} highlightColor="#3E1B7C" />
  );
};

export default ButtonSkeleton;