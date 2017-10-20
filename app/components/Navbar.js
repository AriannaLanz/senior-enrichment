import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <NavLink to="/"> <h2>Margaret Hamilton Interplanetary Academy</h2> </NavLink>
      <div className='navbar-buttons'>
        <NavLink to="/campuses"><button>Campuses</button></NavLink>
        <NavLink to="/students"><button>Students</button></NavLink>
    </div>
  </nav>
);

export default Navbar;
