import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../reducers/campus';

export class AddCampus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      image: ''
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event, this.state)}>
        <div className="form-group">
            <h2>New Campus</h2>
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
                  disabled={this.state.name.length ? false : true}
                >
                  Add Campus
                  </button>
              </div>
            </div>
        </div>
      </form>
    )
  }

  handleSubmit(event, state) {
    this.setState({name: '', image: ''});
    this.props.handleSubmit(event, state);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeImage(event) {
    this.setState({ image: event.target.value });
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
      evt.preventDefault();
      dispatch(postCampus(state, ownProps.history));
    }
  }
}

export default connect(mapState, mapDispatch)(AddCampus);
