import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header>
      <img
        src="https://img.icons8.com/clouds/100/000000/animal-shelter.png"
        alt="Cat and Dog"
      />
      <h1>Petful</h1>
      <nav>
        <Link to={'/'}>Home</Link> | <Link to={'/adopt'}>Adopt</Link>
      </nav>
    </header>
  );
}

export default Header;
