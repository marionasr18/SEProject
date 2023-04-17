import React, { useState } from 'react';
import './AcceptDeclinePlayers.css';
const events = [
    { id: 1, name: 'Event 1' },
    { id: 2, name: 'Event 2' },
    { id: 3, name: 'Event 3' },
    { id: 4, name: 'Event 4' },
    { id: 5, name: 'Event 5' },
  ];
const AcceptDeclinePlayers = ({ event, onSwipe }) => {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);

  const handleSwipe = (accepted) => {
    if (accepted) {
      onSwipe('right');
    } else {
      onSwipe('left');
    }
    setPosition(0);
  };

  const handleStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMove = (e) => {
    if (!isDragging) {
      return;
    }

    setCurrentX(e.touches[0].clientX);
    setPosition(currentX - startX);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (position > 100) {
      handleSwipe(true);
    } else if (position < -100) {
      handleSwipe(false);
    } else {
      setPosition(0);
    }
  };

  return (
    <div
      className="swipeable-card"
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      style={{ transform: `translateX(${position}px)` }}
    >
      <div className="card-content">
        <h3>{events.name}</h3>
        {/* <img src={events.image} alt={events.name} /> */}
        {events.name}        <p>{events.id}</p>
      </div>
    </div>
  );
};

export default AcceptDeclinePlayers;
