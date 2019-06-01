import React, { Component } from 'react';
import { graphql } from "react-apollo";
import { getBookQuery } from '../schema/schema'

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if ( ! book ) {
      return (<div><p>No book selected ..</p></div>)
    } 
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All Books by this Author</p>
        <ul className="other-books">
          {
            book.author.books.map(b => {
              return <li key={b.id}>{b.name}</li>
            })
          }
        </ul>
      </div>
    )
  }

  render() {
    console.log("BookDetails:", this.props);

    return (
      <div id="book-details">         
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
