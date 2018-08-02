import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Bookshelf extends Component {
    static defaultProps = {
        name: "untitled",
        books: [],
    };
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        name: PropTypes.string,
        onCategoryChange: PropTypes.func.isRequired,
    };

    render() {
        // debugger;
        const { name, books, onCategoryChange } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onCategoryChange={onCategoryChange} />
                        </li>)
                    )}
                    </ol>
                </div>
            </div>
        )
    };
}

export default Bookshelf;