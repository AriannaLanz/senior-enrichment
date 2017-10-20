import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOneStudent, removeStudent } from '../reducers/student'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';

class SingleStudent extends Component {

  constructor() {
    super();
  }
  render() {
    const { student, campuses } = this.props;

    if (!student) { return (<div> 'Student Not Found'</div>) }

    else {
      //Shannon and Caryn helped me with this
      const [campus] = campuses.filter(campus => student.campusId === campus.id);
      console.log('campus', campus);
      return (
        <div>
          <h1>{student.firstName} {student.lastName}</h1>
          <h2>Email: {student.email}</h2>
          {(typeof campus !== 'undefined')
            ? (<h2> Campus: <NavLink to={`/campuses/${campus.id}`}>{campus.name}</NavLink></h2>)
            : (<h2> No Campus Listed </h2>)}
          <h2>Age: {student.age}</h2>
          <h2>Birthday: {student.birthday}</h2>
          <button type="button">
            <NavLink to={`/students/edit/${student.id}`}>Edit</NavLink>
          </button>
          <button type="button" onClick={(event) => this.props.handleDelete(event, student)}>Remove</button>
        </div>
      )
    }
  }
}

const mapState = ({ campuses, students }, ownProps) => {
  const paramId = Number(ownProps.match.params.studentId);
  return {
    student: _.find(students, student => student.id === paramId),
    campuses: campuses
  };
};

const mapDispatch = function (dispatch, ownProps) {
  return {
    handleDelete: function (event, student) {
      event.preventDefault();
      dispatch(removeStudent(student, ownProps.history));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleStudent));