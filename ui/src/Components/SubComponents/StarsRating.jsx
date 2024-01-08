import React from 'react';

const StarRating = ({ numStars }) => {
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    stars.push(
      <i key={i} className="fa-solid fa-star text-orange"></i>
    );
  }

  return (
    <div className="mb-2">
      {stars}
    </div>
  );
};

export default StarRating