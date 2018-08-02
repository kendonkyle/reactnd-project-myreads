import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class BookSearch extends Component {

    /** Keeping search  */
    constructor(props)   {
        super(props);
        this.state = {
            searchBooks: [],
            searchTerm: "",
            books: props.books
        }
    }
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        onCategoryChange: PropTypes.func.isRequired,
    };

    handleChange=(event) => {
        this.setState({searchTerm: event.target.value});
        if(event.target.value.length > 0)   {
            this.searchBooks(event.target.value);
        } else {
            this.setState({searchBooks: []});
        }
    }

    searchBooks=(query) => {
        BooksAPI.search(query).then((books) => {
            /** make sure I have an array of books */
            if(books === 'undefined') {
                this.setState(() => ({
                    searchBooks: []
                }))
            }
            if(books.constructor === Array) {
                /** 
                 * set all the books to none shelf and update shelf to the current 
                 * values we have in our state 
                 */
                let sbooks = books.map((book) => {
                    book.shelf = "none";
                    for (const shelfbook of this.state.books) {
                        if(shelfbook.id === book.id) {
                            book.shelf = shelfbook.shelf;
                        }
                    }
                   return book;
                })
                // debugger;
                /** Update the state with our new list */
                this.setState(() => ({
                    searchBooks: sbooks
                }))
            }
        });
    }


    render() {
        const { onCategoryChange } = this.props;
        return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
                type="text" 
                placeholder="Search by title or author" 
                value={this.state.searchTerm} 
                onChange={this.handleChange}
                minLength={2}
                debounceTimeout={600}
                />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map((book) => (<Book book={book} onCategoryChange={onCategoryChange} />))}
          </ol>
        </div>
      </div>
    )}
}

export default BookSearch;