import React, { Component } from "react";
import uuid from "uuid/v4";

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
    fetch("http://localhost:3000/api/comments").then((response) => {
      response.json().then((data) => {
        this.setState({ comments: data });
      });
    });
  }

  addComment(event) {
    event.preventDefault();
    let data = {
      first_name: this.refs.first_name.value,
      comment: this.refs.comment.value,
      id: uuid()
    };
    var request = new Request("http://localhost:3000/api/new-comment", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(data)
    });

    let localData = {
      ...data,
      timestamp: "1970-01-01 00:00:00+00"
    };
    let comments = this.state.comments;
    comments.push(localData);
    this.setState({ comments });

    //This was an attempt to have React state represent new comments as they are added, precluding the necessity of an extra API call every time the user posts new comment... however, getting the timestamp to work between JS and PostgreSQL got confusing, so I skipped it for now
    // let localData = { ...data, timestamp: new Date() };
    // let comments = this.state.comments;
    // comments.push(localData);
    // this.setState({ comments: comments });

    fetch(request).then((response) => {
      response.json().then((data) => {});
    });

    this.refs.first_name.value = "";
    this.refs.comment.value = "";
  }

  render() {
    let title = this.state.title;
    let comments = this.state.comments;
    return (
      <div className="App">
        <h1>{title}</h1>
        <form action="" ref="commentForm">
          <input type="text" ref="first_name" placeholder="first name" />
          <input type="text" ref="comment" placeholder="comment" />
          <button onClick={this.addComment}>Add Comment</button>
        </form>

        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              {comment.first_name} says: "{comment.comment}" at{" "}
              {comment.timestamp.substring(11, 19)} GMT on{" "}
              {comment.timestamp.substring(5, 8) +
                comment.timestamp.substring(8, 10) +
                "-" +
                comment.timestamp.substring(0, 4)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
