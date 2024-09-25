import React from 'react';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const ShimmerLoader = () => {
  return (
    <div className="p-4">
      <div className="mb-4">
        <div 
          className="h-8 bg-gray-200 rounded"
          style={{
            backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
            backgroundSize: '800px 104px',
            animation: `${shimmer} 1s linear infinite forwards`,
          }}
        />
      </div>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mb-4 flex">
          <div 
            className="w-16 h-16 bg-gray-200 rounded mr-4"
            style={{
              backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
              backgroundSize: '800px 104px',
              animation: `${shimmer} 1s linear infinite forwards`,
            }}
          />
          <div className="flex-1">
            <div 
              className="h-4 bg-gray-200 rounded mb-2"
              style={{
                backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
                backgroundSize: '800px 104px',
                animation: `${shimmer} 1s linear infinite forwards`,
              }}
            />
            <div 
              className="h-4 bg-gray-200 rounded w-5/6"
              style={{
                backgroundImage: 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
                backgroundSize: '800px 104px',
                animation: `${shimmer} 1s linear infinite forwards`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerLoader;