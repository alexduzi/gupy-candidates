import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchBlog } from '../../actions';

class CandidateShow extends Component {
  componentDidMount() {
    // this.props.fetchBlog(this.props.match.params._id);
  }

  renderImage() {
    if (this.props.blog.imageUrl) {
      return (
        <img
          src={
            'https://s3-us-west-2.amazonaws.com/my-blog-bucket-123/' +
            this.props.blog.imageUrl
          }
          alt=""
        />
      );
    }
  }

  render() {
    if (!this.props.blog) {
      return '';
    }

    const { title, content } = this.props.blog;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        {this.renderImage()}
      </div>
    );
  }
}

export default (CandidateShow);