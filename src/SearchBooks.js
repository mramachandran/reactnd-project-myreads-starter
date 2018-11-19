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
    displayShelf: '',
    showSearchPage: false

  }

  printChange(e) {
    this.updateQuery(e.target.value);
  }

//Credit : https://www.youtube.com/watch?v=KXao_qwl05k
   updateQuery = debounce((text) => {
     this.setState({ query: text }) 
     console.log("displaying results for " + text)
   },500)

    componentWillMount() {
     this.clearQuery()
    }

  componentWillUnmount() {
    this.clearQuery()
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }  
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    searchBooks: PropTypes.array.isRequired,
    //showingSearchBooks: PropTypes.array.isRequired,
    onSearchQuery : PropTypes.func.isRequired,
    //showSearchBar: PropTypes.func.isRequired
  }

   isRealValue(obj)
   {
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length>0;
   }

  render() {
    
    const { onSearchQuery,books,searchBooks,onShelfChange } = this.props
    const { query, displayShelf, showSearchPage } = this.state
  
    const shelves = {
    currentlyReading: ['', 'displayResults'],
    }  

      return (
          <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search"></Link>
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
                        <DisplaySearchResults key={shelf}
                          shelf={shelves[shelf][1]}
                          title={shelves[shelf][0]}
                          books={books}   
						  searchBooks={searchBooks}
						  onShelfChange={(books,shelf) => { onShelfChange(books,shelf) } }
                        />
                       )}			
                      </div>
                    
            </div>
          
          </div>                
        )
    }

}

export default SearchBooks