import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PostAuction() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState(0);
  const [closingTime, setClosingTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  const handlePostAuction = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5001/auction',
        { itemName, description, startingBid, closingTime },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      toast.success('Auction posted successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to post auction. Try again.');
    }
  };

  return (
    <div className="post-auction-container">
      <h2>Post New Auction</h2>
      <form onSubmit={handlePostAuction} className="post-auction-form">
        <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <input type="number" placeholder="Starting Bid" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
        <input type="datetime-local" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} required />
        <button type="submit">Post Auction</button>
      </form>
    </div>
  );
}
export default PostAuction;
