import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {updateCampus} from '../store';

class EditCampus extends Component {
    constructor(props){
        super(props);
        this.state = this.props.campus
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeName(event){
        this.setState({ name: event.target.value })
    }
    handleChangeImage(event){
        this.setState({ image: event.target.value })
    }
    handleSubmit(event, state){
        const {name, image, id} = this.state;
        const edit = {name, image, id}
        if (name) edit.name = name;
        if (image) edit.image = image;
       this.props.updateCampus(edit, state)
    }
 
  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event, this.state)}>
        <div className="form-group">
            <h2>Edit Campus</h2>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input
                  value={this.state.name}
                  className="form-control"
                  type="text"
                  onChange={this.handleChangeName}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Image File Name</label>
              <div className="col-xs-10">
                <input
                  value={this.state.image}
                  className="form-control"
                  onChange={this.handleChangeImage}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Submit Edits
                  </button>
              </div>
            </div>
        </div>
      </form>
    )
  }
}

const mapState = function (state) {
    return {
      campuses: state.campuses
    }
  }
  
  const mapDispatch = function (dispatch, ownProps) {
    return {
      handleSubmit: function (event, state) {
        event.preventDefault();
        dispatch(updateCampus(state, ownProps.history));
      }
    }
  }
  
  export default withRouter(connect(mapState, mapDispatch)(EditCampus));
  