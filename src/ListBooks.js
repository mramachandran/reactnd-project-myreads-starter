import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    //onSearchQuery: PropTypes.func.isRequired,
    //showSearchBar: PropTypes.func.isRequired,
    //showingSearchBooks: PropTypes.array,
    //resetSearchQuery: PropTypes.func.isRequired
    //showSearchPage: PropTypes.bool.isRequired
    handleRequestToClear: PropTypes.func.isRequired
  }

  state = {
    query: '',
    displayShelf : ''
  }
 
componentDidMount()
{
  console.log('finished mounting listbooks');
  this.props.handleRequestToClear()
}

   isRealValue(obj)
  {
    return obj && obj !== 'null' && obj !== 'undefined';
  }

  render() {    
    const {  onShelfChange,books,searchBooks,handleRequestToClear } = this.props
    const { query,  displayShelf} = this.state
    const maxResults = 20

    const shelves = {
    currentlyReading: ['Currently Reading', 'currentlyReading'],
    wantToRead: ['Want to Read', 'wantToRead'],
    read: ['Read', 'read']
    }    

    return (   
      <div className="app">
         <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
			<div className="list-books-content">
                { Object.keys(shelves).map((shelf) =>
                    <BookShelf key={shelf}
                      shelf={shelves[shelf][1]}
                      title={shelves[shelf][0]}
                      books={books}
				      searchBooks={searchBooks}
                      onShelfChange={ (books,shelf) => { onShelfChange(books,shelf) } }
      				/>
    				)}
				
     	    </div>
            <Link to="/search" className="open-search">Add a book</Link>
      </div>
      </div>
    )
  }
}

export default ListBooks
