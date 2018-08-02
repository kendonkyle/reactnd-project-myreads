import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BookList extends Component {

    /** Function to sort out books into the shelves we need them to be in */
    sortIntoShelves(books) {
        // debugger;
        const reading = books.filter(book => book.shelf === "currentlyReading");
        const read = books.filter((book) => (book.shelf === "read"));
        const wantToRead = books.filter((book) => (book.shelf === "wantToRead"));

        return { reading: reading, read: read, wantToRead: wantToRead };
    }

    defaultProps = {
        books: [],
        name: "My Reads"
    };

    static propTypes = {
        books: PropTypes.array.isRequired,
        onCategoryChange: PropTypes.func.isRequired,
    };

    render() {
        // debugger;
        const { onCategoryChange, books } = this.props;
        const { reading, read, wantToRead } = this.sortIntoShelves(books);
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf name="Currently Reading" books={reading} onCategoryChange={onCategoryChange} />
                    </div>
                    <div>
                        <Bookshelf name="Want to Read" books={wantToRead} onCategoryChange={onCategoryChange} />
                    </div>
                    <div>
                        <Bookshelf name="Finished Reading" books={read} onCategoryChange={onCategoryChange} />
                    </div>
                </div>
                <div className="open-search">
                    {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
                    <Link to="/search">Add a book</Link>
                    
                </div>
            </div>
        );
    }
}


export default BookList;
