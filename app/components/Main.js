import Navbar from './Navbar';
import Home from './Home';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddCampus from './AddCampus';
import AddStudent from './AddStudent';
import EditCampus from './EditCampus';
import EditStudent from './EditStudent';
import NotFound from './NotFound';
import {withRouter} from 'react-router';
import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { getAllCampuses, getAllStudents } from '../store';

class Main extends Component {

  componentWillMount() {
    const campusesThunk = getAllCampuses();
    const studentsThunk = getAllStudents();
    // store.dispatch(campusesThunk);
    // store.dispatch(studentsThunk);
    this.props.getAllCampuses();
    this.props.getAllStudents();
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={AllCampuses} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Route exact path="/students" component={AllStudents} />
            <Route path="/students/:studentId" component={SingleStudent} />
            <Route path="/add/campus" component={AddCampus} />
            <Route path="/add/student" component={AddStudent} />
            {/* <Route path="/campuses/edit" component={EditCampus} />
            <Route path="/students/edit" component={EditStudent} /> */}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapDispatch = { getAllCampuses, getAllStudents };

export default withRouter(connect(null, mapDispatch)(Main));
 
