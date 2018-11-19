import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import { debounce } from "debounce";

class BooksApp extends React.Component {
  
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchBooks: [],
    maxResults: 20
  }

/** Removes the book from searchResults and 
** adds books from shelf with matching id. 
**/ 
removeBook= (book) => {
    this.setState((state) => ({
      searchBooks: state.searchBooks.filter((c) => c.id !== book.id)
    }))
    this.addBook(book)
  }

addBook=(book) => {
  this.state.searchBooks.push(book)
  }


updateSearchResults (searchResults) {

  searchResults.map((searchItem) => {
     
             this.state.books.map((bookItem) => {
               if(searchItem.id === bookItem.id){
                  //array1.push(bookItem);
                  //console.log(" match" + bookItem.shelf)
                 this.removeBook(bookItem)
                }
               else {
                 //console.log(searchItem.shelf)
               }
           })
        })
}

  searchQuery = debounce((query,maxResults) => {
    console.log("searching for " + query + " for this many results " + maxResults)
    if(query.trim().length>0) {
        BooksAPI.search(query,maxResults).then((_searchResults) => {
          console.log("hitting search api")
          console.log(_searchResults.error)
           if(_searchResults.error === 'empty query') {
              //if there is no result
              //alert('empty query')
      			this.setState({ searchBooks:[] })
   			}
          else {
           console.log("hitting search api" + _searchResults) 
           //this.updateShelfToNone(_searchResults)
           this.setState({ searchBooks:_searchResults })
           this.updateSearchResults(_searchResults)
          }
           
         })
         .catch(this.setState({ searchBooks:[] }))
    }else {
      this.setState({ searchBooks:[] })
    }
   },500)          


  apiGetBooks() {
        BooksAPI.getAll().then((books) => {
        this.setState({ books:books })
     }) 
  }

  clearSearchRequests() {
     this.setState({ searchBooks:[] })
  }

  componentDidMount() {
	this.apiGetBooks()
  }

 /* call api to update shelf and then once the promise has been successfully resolved, update booklist
 */
  handleShelfChange(book,shelf) {
    console.log('changing shelf')
    BooksAPI.update(book,shelf). then ( () => {
         this.apiGetBooks() 
      }
    )
  }


  render() {  
   
    //console.log(this.state.searchBooks.error)
    const { books, searchBooks } = this.state

    //console.log(books)
    
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks
            onShelfChange={(book,shelf) => {this.handleShelfChange(book,shelf)}}
            books={books}
			searchBooks={searchBooks}
            handleRequestToClear={() => {this.clearSearchRequests()}} 
           />
  
          )}/>
        <Route path='/search' render={({ history }) => (
			<SearchBooks onSearchQuery={(search,maxResults) => {
                         this.searchQuery(search,maxResults)
        					}					
 							}
                          books={ this.state.books }
						  searchBooks={ this.state.searchBooks }	
						  onShelfChange={(book,shelf) => {
                            							this.handleShelfChange(book,shelf)
												} }
							
           />
          )}/>
      </div>
    )
  }
}

export default BooksApp
