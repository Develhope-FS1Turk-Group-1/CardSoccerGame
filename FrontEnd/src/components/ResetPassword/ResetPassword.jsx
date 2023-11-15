import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your server to update the password
      const response = await axios.post('http://localhost:3050/reset-password', {
        resetToken,
        newPassword,
      });

      // Assuming your server sends a success message
      if (response.data.success) {
        // Redirect to the login page after successful password reset
        navigate('/login');
      } else {
        setError('Password reset failed. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Internal server error. Please try again later.');
    }
  };

  return (
    <div className='soccerHomepage'>
      <div className='soccerAllContainer'>
        <div className='soccerSmallContainer'>
          <h1 style={{ marginBottom: '0px' }}>Password Reset</h1>
          <form onSubmit={handleResetPassword} style={{ maxWidth: '300px' }}>
            <input type="hidden" name="resetToken" value={resetToken} />
            <input
              style={{ marginBottom: '20px' }}
              type="password"
              className="logInInput"
              id="newPassword"
              name="newPassword"
              placeholder='New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className='logInButton'>Reset Password</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
