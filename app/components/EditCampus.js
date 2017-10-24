import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getOneCampus, updateCampus} from '../store';
import _ from 'lodash';

class EditCampus extends Component {
    constructor(props){
        super(props);
        this.state = {name: '', image: ''};
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      console.log("in CDM:", this.props);
      // this.props.getCampus(this.props.match.params.id)
      console.log("what does getCampus return?");
      console.log(this.props.getCampus(this.props.match.params.campusId));
      //this.setState(this.props.campus);
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
    }
 
  render() {
    console.log('state:');
    console.log(this.state);
    const {campus} = this.props;
    console.log(this.props);
    console.log('campus:', campus);

    //do campus.id &&

    return (
      <form onSubmit={(event) => this.handleSubmit(event, this.state)}>
      {
          campus && (
            <div className="form-group">
            <h2>Edit {campus.name}</h2>
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

          )
      }
 
      </form>
    )
  }
}

const mapState = ({campuses}, ownProps)  => {
  const paramId = Number(ownProps.match.params.campusId);
  return {
    campus: _.find(campuses, campus => campus.id === paramId),
  };
};


  const mapDispatch = function (dispatch, ownProps) {
    return {
      handleSubmit: function (event, state) {
        event.preventDefault();
        dispatch(updateCampus(state, ownProps.history));
      },
      getCampus: function(id) {
        dispatch(getOneCampus(id));
      }
    }
  }
  
  export default withRouter(connect(mapState, mapDispatch)(EditCampus));
  
