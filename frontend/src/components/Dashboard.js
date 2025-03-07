import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5001/auctions');
        setItems(res.data);
      } catch (error) {
        toast.error('Error fetching auctions');
      }
    };
    fetchItems();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Auction Dashboard</h2>
      <Link to="/post-auction">
        <button className="post-auction-btn">Post New Auction</button>
      </Link>
      <ul className="auction-list">
        {items.map((item) => (
          <li key={item._id} className="auction-item">
            <Link to={`/auction/${item._id}`}>
              {item.itemName} - Current Bid: ${item.currentBid} {item.isClosed ? '(Closed)' : ''}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
