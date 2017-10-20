import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {addCampus, getAllCampuses } from '../reducers/campus';

class AllCampuses extends Component {
  constructor(props){
    super(props);
  }


  render(){
    const campuses = this.props.campuses;
    if (campuses) {
      return (
        <div >
          <div className="title-top">
            <h2 className="title-top-text">All Campuses</h2>
          </div>
          <div className="campuses-box">
            {campuses.map(campus => (
              <div className="campus-box" key={campus.id}>
                <NavLink to={`/campuses/${campus.id}`} className="campus">
                  <img src={campus.image} />
                </NavLink>
                <div className="row">
                  <NavLink to={`/campuses/${campus.id}`} className="campus">
                    <h2>{campus.name}</h2>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          <div>
          <NavLink to="/campuses/add"><button>Add Campus</button></NavLink>
          </div>
  
        </div>
      );
    }
    else {
      return (
        <div>No Campuses</div>
      )
    }
  }
}

  const mapState = ({campuses}) => ({campuses});


 export default withRouter(connect(mapState)(withRouter(AllCampuses)));
