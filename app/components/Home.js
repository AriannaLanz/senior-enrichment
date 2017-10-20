import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  console.log('rendered');  
    return (
      <div>
        <h2>Welcome to the Margaret Hamilton Interplanetary Academy of JavaScript!</h2>
        <h3>Home Page</h3>
        <div>
          <Link className="thumbnail" to="/campuses">All Campuses</Link>
        </div>
        <div>
          <Link className="thumbnail" to="/students">All Students</Link>
        </div>
      </div>
    );
  }

  export default Home;

