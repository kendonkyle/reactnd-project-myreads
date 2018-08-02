import React from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import BookList from './BookList';
import BookSearch from './BookSearch';

import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    /** Here we get all of the books that we have shelved from the API */
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books
      }))
    });
  }

  onCategoryChange = (book, event) => {
    /**
     * We manage the book shelf state internally so there is no need to refresh teh data adter the update
     * We will just log the update
     */
    BooksAPI.update(book, event.target.value).then(() => { console.log("book updated")});
    /** Set the shelf that the book should belong to and update the state */
    book.shelf = event.target.value;
    this.setState((currentState) => {
      let theBooks = currentState.books.filter((mybook) => (mybook.id !== book.id));
      return {books: theBooks.concat([book])}
    });
  }

  render() {
    return (
      <div className="app">

        <Route path="/search" render={() => (
          <BookSearch onCategoryChange={this.onCategoryChange} books={this.state.books} />
        )} />

        <Route exact path="/" render={() => (
          <BookList onCategoryChange={this.onCategoryChange} books={this.state.books} />
        )} />

      </div>
    )
  }
}

export default BooksApp
