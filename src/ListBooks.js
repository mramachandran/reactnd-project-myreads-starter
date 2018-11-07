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
    onSearchQuery: PropTypes.func.isRequired,
    handleSearchBar: PropTypes.func.isRequired,
    showingSearchBooks: PropTypes.array
  }

  state = {
    query: '',
    displayShelf : '',
    showSearchPage: false,  
  }
 
  clearQuery = () => {
    this.setState({ query: '' })
  }
//books={books} onSearchQuery={(search,maxResults) => {onSearchQuery(search,maxResults)}
  //handleSearchBar = (showSearchPage)  => {
      //this.setState({ showSearchPage: showSearchPage })
  //}
   isRealValue(obj)
  {
    return obj && obj !== 'null' && obj !== 'undefined';
  }

  render() {    
    const { books, onShelfChange, onSearchQuery,showingSearchBooks,handleSearchBar } = this.props
    const { query, displayShelf,showSearchPage } = this.state
    const maxResults = 20

    const shelves = {
    currentlyReading: ['Currently Reading', 'currentlyReading'],
    wantToRead: ['Want to Read', 'wantToRead'],
    read: ['Read', 'read']
    }
    
     console.log("search books in result - ListBook " + showingSearchBooks)

    return (   
      
      <div className="app">
      {this.state.showSearchPage ?( 
             <SearchBooks onSearchQuery={(search,maxResults) => {onSearchQuery(search,maxResults)}}
                          books={ books }
						  showingSearchBooks={ showingSearchBooks }	
                          onShelfChange={ (books,shelf) => { onShelfChange(books,shelf) } }
						  handleSearchBar={ (showSearchPage) => { handleSearchBar(showSearchPage) } }
      /> 
//calling SearchComponent to be displayed - do not have proptyes check as we just need to display the search page
        ) :
      (
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
			<div className="list-books-content">
                { Object.keys(shelves).map((shelf) =>
                    <BookShelf key={shelf}
                      shelf={shelves[shelf][1]}
                      title={shelves[shelf][0]}
                      books={ books }
					  showingSearchBooks = {showingSearchBooks}
                      onShelfChange={ (books,shelf) => { onShelfChange(books,shelf) } }
      				/>
    				)}
				
     	    </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
      </div>
        )}
      </div>
    )
  }
}

export default ListBooks
