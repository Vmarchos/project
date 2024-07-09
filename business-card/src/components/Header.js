import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Трекер Криптовалют</h1>
      <p>Цены на криптовалюты в реальном времени</p>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/login">Войти</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/profile">Профиль</Link>
      </nav>
    </header>
  );
}

export default Header;
