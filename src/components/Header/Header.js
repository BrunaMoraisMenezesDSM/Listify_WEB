import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const handleReload = () => {
    window.location.href = '/';
  };

  return (
    <header className="header-task">
      <div className="container-task">
        <div className="btn-back">
          <Link to="/">
            <button onClick={handleReload} className="btn-back">
              <img src="/icons/back.png" alt="Ícone" />
            </button>
          </Link>
        </div>
        <div className="title">
          <h1>Listify</h1>
          <h4>Simplify, organize, achieve.</h4>
        </div>
      </div>
    </header>
  );
}

export default Header;