import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import DisplaySearchResults from  './DisplaySearchResults'
import { debounce } from "debounce";

class SearchBooks extends Component {

  constructor(props) {
        super(props);
        //this.updateQuery = debounce(this.updateQuery,5000);
    }
  
 state = {
    query: '',
    maxResults: 20
  }

  printChange(e) {
    this.updateQuery(e.target.value);
  }

//Credit : https://www.youtube.com/watch?v=KXao_qwl05k
   updateQuery = debounce((text) => {
     this.setState({ query: text }) 
   },500)

  
  componentWillUnmount() {
    //this.updateQuery.cancel();
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }  
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    showingSearchBooks: PropTypes.array.isRequired,
    onSearchQuery : PropTypes.func.isRequired,
    handleSearchBar: PropTypes.func.isRequired
  }


  render() {
    
    const { books, onSearchQuery,onShelfChange,handleSearchBar,showingSearchBooks } = this.props
    const { query, displayShelf, showSearchPage } = this.state

    const shelves = {
        SearchResults: ['Display Results', 'displayResults']
      }

      return (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => handleSearchBar(false)}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}

                <input type="text" placeholder="Search by title or author" onChange={e => onSearchQuery(e.target.value,20)}/>
              </div>
            </div>
            <div className="search-books-results">
              <div className="list-books-content">
                { Object.keys(shelves).map((shelf) =>
                  <DisplaySearchResults key={"searchResults"}
                    shelf={shelves[shelf][1]}
                    title={shelves[shelf][0]}
                    books={ books }
                    showingSearchBooks = {showingSearchBooks}
                    onShelfChange={ (books,shelf) => { onShelfChange(books,shelf) } }
                  />
   				 )}
  				</div>
            </div>
          
          </div>                
        )
    }

}

export default SearchBooks