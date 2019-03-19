import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Simple Comments Application",
      comments: []
    };
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    console.log("component has mounted");
  }

  addComment(event) {
    event.preventDefault();
    let data = {
      first_name: this.refs.first_name.value,
      comment: this.refs.comment.value
    };
    var request = new Request("http://localhost:3000/api/new-comment", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(data)
    });

    fetch(request).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
    this.refs.first_name.value = "";
    this.refs.comment.value = "";
  }

  render() {
    let title = this.state.title;
    return (
      <div className="App">
        <h1>{title}</h1>
        <form action="" ref="commentForm">
          <input type="text" ref="first_name" placeholder="first name" />
          <input type="text" ref="comment" placeholder="comment" />
          <button onClick={this.addComment}>Add Comment</button>
        </form>
      </div>
    );
  }
}

export default App;
