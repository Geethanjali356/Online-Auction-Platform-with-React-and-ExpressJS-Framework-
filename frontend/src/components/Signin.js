import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/signin', { username, password });
      if (res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        toast.success('Signed in successfully!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="signin-container">
      <h2>Signin</h2>
      <form onSubmit={handleSignin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signin</button>
      </form>
    </div>
  );
}
export default Signin;
