import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getOneCampus, removeCampus } from '../reducers/campus';
import _ from 'lodash';


class SingleCampus extends Component {
    constructor() {
        super();
      }

  render() {
    const {campus, students} = this.props;
    

    if (!campus) {return (<div> 'Campus Not Found'</div>) }
    else {

    return (
        <div>
            <h1>{campus.name}</h1>
            <h3>{campus.name}'s Students</h3>
            <table className= "students-table">
            <thead>
            <tr>
            <th>Name</th>
            <th>Campus</th> 
            <th>Email</th>
            <th>Age</th>
            <th>Birthday</th>
          </tr>
            </thead>
            <tbody>
          {students.map(student => (
          <tr key={student.id}>
            <td>
              <NavLink to={`/students/${student.id}`}>{student.firstName} {student.lastName}</NavLink>
            </td>
            <td>
              <NavLink to={`/campuses/${student.campusId}`}>{campus.name}</NavLink>
              </td>
              <td>
              <NavLink to={`/students/${student.id}`}>{student.email}</NavLink>
            </td>
            <td>
              <NavLink to={`/campuses/${student.id}`}>{student.age}</NavLink>
              </td>
              <td>
              <NavLink to={`/campuses/${student.id}`}>{student.birthday}</NavLink>
              </td>
          </tr>
          )
        )}
        </tbody> 
        </table>
        <NavLink to="/campuses/add"><button>Add Student</button></NavLink>
          <button type="button">
            <NavLink to={`/campuses/edit/${this.props.campusId}`}>Edit</NavLink>
          </button>
          <button type="button" onClick={(event) => this.props.handleDelete(event, campus)}>Remove</button>
        </div>
      )
    }
    }
}



const mapState = ({campuses, students}, ownProps)  => {
  const paramId = Number(ownProps.match.params.campusId);
  return {
    campus: _.find(campuses, campus => campus.id === paramId),
    students: students.filter(student => student.campusId === paramId)
  };
};

const mapDispatch = function (dispatch, ownProps) {
    return {
      getCampus: function(id) {
        dispatch(getOneCampus(id));
      },
      handleDelete: function (event, campus) {
        event.preventDefault();
        dispatch(removeCampus(campus, ownProps.history));
      }

    }
  }

export default withRouter(connect(mapState, mapDispatch)(SingleCampus))
