import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../reducers/student';
import {withRouter} from 'react-router-dom';

export class AddStudent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',  
      email: '',
      age: '',
      birthday: '',
      campusId: '',
      campusName: 'Choose Campus'
    }
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);    
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
    this.handleChangeCampus = this.handleChangeCampus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, state) {
    this.setState({firstName: '', lastName: '', email: '', age: '', birthday: '', campusId: ''})
    this.props.handleSubmit(event, state);
  }

  handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangeAge(event) {
    this.setState({ age: event.target.value });
  }

  handleChangeBirthday(event) {
    this.setState({birthday: event.target.value });
  }

  handleChangeCampus(event) {
    this.setState({ campusId: event.target.value});  
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event, this.state)}>
        <div className="form-group">
            <h2>New Student</h2>
            <div className="form-group">
              <label className="col-xs-2 control-label">First Name</label>
              <div className="col-xs-10">
                <input
                  value={this.state.firstName}
                  className="form-control"
                  type="text"
                  onChange={this.handleChangeFirstName}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Last Name</label>
              <div className="col-xs-10">
                <input
                  value={this.state.lastName}
                  className="form-control"
                  type="text"
                  onChange={this.handleChangeLastName}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Email</label>
              <div className="col-xs-10">
                <input
                  value={this.state.email}
                  className="form-control"
                  type="email"
                  onChange={this.handleChangeEmail}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Age</label>
              <div className="col-xs-10">
                <input
                  value={this.state.age}
                  className="form-control"
                  type="text"
                  onChange={this.handleChangeAge}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Birthday</label>
              <div className="col-xs-10">
                <input
                  value={this.state.birthday}
                  className="form-control"
                  type="text"
                  onChange={this.handleChangeBirthday}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Campus</label>
              <select value={this.state.campusId} onChange={this.handleChangeCampus} className="form-control" name="campus">
                <option>Choose Campus</option>
                {this.props.campuses.map(campus => {
                  return (
                    <option key={campus.id} value={campus.id}>{campus.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={
                    this.state.firstName.length && this.state.campusId.length ? false : true
                  }
                >
                  Add Student
                  </button>
              </div>
            </div>
        </div>
      </form>
    )
  }
}

const mapState = ({campuses, students}) => ({campuses, students});

const mapDispatch = function (dispatch, ownProps) {
  return {
    handleSubmit: function (event, state) {
      event.preventDefault();
      dispatch(createStudent(state, ownProps.history));
    }
  }
}



export default withRouter(connect(mapState, mapDispatch)(AddStudent));