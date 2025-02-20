import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AuctionItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/auction/${id}`);
        setItem(res.data);
      } catch (error) {
        toast.error('Error fetching auction item');
        navigate('/dashboard');
      }
    };

    fetchItem();
  }, [id, navigate]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5001/auction/${id}/bid`,
        { bid: bidAmount },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      toast.success('Bid placed successfully!');
      setBidAmount('');
    } catch (error) {
      toast.error('Failed to place bid');
    }
  };

  if (!item) return <p>Loading auction item...</p>;

  return (
    <div className="auction-item-container">
      <h2>{item.itemName}</h2>
      <p>{item.description}</p>
      <p>Current Bid: ${item.currentBid}</p>
      <p>Closing Time: {new Date(item.closingTime).toLocaleString()}</p>
      {!item.isClosed && (
        <form onSubmit={handleBidSubmit}>
          <input
            type="number"
            placeholder="Enter your bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
          />
          <button type="submit">Place Bid</button>
        </form>
      )}
      {item.isClosed && <p>This auction is closed.</p>}
    </div>
  );
}

export default AuctionItem;
