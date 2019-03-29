import React, { Component } from "react";

export default class Edit extends Component {
  render() {
    return (
      <div>
        <form action="" ref="editForm">
          <input
            type="text"
            ref="edit_first_name"
            placeholder={this.props.first_name}
          />
          <input
            type="text"
            ref="edit_comment"
            placeholder={this.props.comment}
          />
          <button onClick={this.props.editComment}>Submit Edit</button>
        </form>
      </div>
    );
  }
}
