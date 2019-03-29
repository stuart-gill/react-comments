import React, { Component } from "react";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.first_name,
      comment: this.props.comment
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <form action="" ref="editForm">
          <input
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <button onClick={this.props.editComment}>Submit Edit</button>
        </form>
      </div>
    );
  }
}
