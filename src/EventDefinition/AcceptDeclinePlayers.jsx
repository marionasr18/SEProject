import React, { useState } from 'react';
import './AcceptDeclinePlayers.css';
const requests = [
  { name: "John", message: "Hey, can you help me move this weekend?" },
  { name: "Alice", message: "Do you want to grab lunch next week?" },
  { name: "Bob", message: "Can you review my code and give me feedback?" },
];
const AcceptDeclinePlayers = ({ event, onSwipe }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [declinedRequests, setDeclinedRequests] = useState([]);

  const acceptRequest = () => {
    const currentRequest = requests[currentIndex];
    setAcceptedRequests([...acceptedRequests, currentRequest]);
    setCurrentIndex(currentIndex + 1);
  };

  const declineRequest = () => {
    const currentRequest = requests[currentIndex];
    setDeclinedRequests([...declinedRequests, currentRequest]);
    setCurrentIndex(currentIndex + 1);
  };

  const currentRequest = requests[currentIndex];

  if (!currentRequest) {
    return <p>No more requests!</p>;
  }

  return (
    <div>
      <h2>Request from {currentRequest.name}</h2>
      <p>{currentRequest.message}</p>
      <button onClick={acceptRequest}>Accept</button>
      <button onClick={declineRequest}>Decline</button>
    </div>
  );
};

export default AcceptDeclinePlayers;
