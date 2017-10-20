import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {store} from '../store';


class AllStudents extends Component {
    constructor(props){
        super(props);
      }
      
  render(){
    const students = this.props.students;
    console.log(students);
    // console.log(students.forEach(student => console.log(student.campusId)))
    console.log(students.forEach(student => console.log(student.campus)))    
    return (
      <div>
        <div className="titlerow">
          <h2 className="title is-2">All Students</h2>
        </div>
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
            {(student.campus)
            ? (<NavLink to={`/campuses/${student.campusId}`}>{student.campus}</NavLink>)
            : "No Campus Listed"}
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
        <NavLink to="/students/add"><button>Add Student</button></NavLink>
      </div>
    );
  }
}

const mapState = ({students, campuses}) => ({students, campuses});
  
export default withRouter(connect(mapState)(AllStudents));
