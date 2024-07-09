import React from 'react';
import './Profile.css';

function Profile() {
  // Заглушка для данных пользователя
  const user = {
    email: 'user@example.com'
  };

  return (
    <div className="profile">
      <h2>Профиль пользователя</h2>
      <p>Электронная почта: {user.email}</p>
    </div>
  );
}

export default Profile;