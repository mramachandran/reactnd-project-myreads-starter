import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import { debounce } from "debounce";

class BooksApp extends React.Component {
  
  constructor(props,context) {
     super(props, context)   
    //Credit: https://stackoverflow.com/questions/39176248/react-js-cant-read-property-of-undefined
     this.refreshPage = this.refreshPage.bind(this);
     this.resetPage = this.resetPage.bind(this);
  }
  
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: [],
    shelfChangeOccured: false,
    showingBooks: []
  }
  componentDidMount() {
     BooksAPI.getAll().then((books) => {
       this.setState({ books:books })
     })
  }

 refreshPage() {
        BooksAPI.getAll().then((books) => {
       this.setState({ books:books })
     })
 }
  
 resetPage() {       
       //this.setState({ books:{} })
     
 }

  handleShelfChange(book,shelf) {
    BooksAPI.update(book,shelf).then(this.refreshPage)
}

  handleSearchBar = (showSearchPage)  => {
    console.log("showSearchStatus is " + showSearchPage)
      this.setState({ showSearchPage: showSearchPage })
      if(showSearchPage === false) {
        console.log("clearing out previous searches")
        this.state.showSearchPage === false
        this.setState({ showingBooks:[] })
      }
  }

   updateQuery = debounce((text) => {
     this.setState({ query: text.trim() }) 
   },500)

  
  searchQuery = debounce((query,maxResults) => {
    console.log("searching for " + query)
    //if(query.trim().length>0) {
        BooksAPI.search(query,maxResults).then((books) => {
           this.setState({ showingBooks:books })
           console.log(this.state.showingBooks)
         })
         .catch(error => alert(error.message))

  },500)
   
  render() {  

     const { query, displayShelf, showSearchPage,book,showingSearchBooks } = this.state

     console.log("show result page - App.js " + this.state.showSearchPage)

    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks
            onShelfChange={(book,shelf) => {this.handleShelfChange(book,shelf)}}
            onSearchQuery={(search,maxResults) => {this.searchQuery(search,maxResults)}}
            books={this.state.books}
			showingSearchBooks = {this.state.showingBooks}
            handleSearchBar={ () => { this.handleSearchBar(showSearchPage) } }
           />
          )}/>
        )}/>
        <Route exact path='/search' render={({ history }) => (
			<SearchBooks onSearchQuery={(search,maxResults) => {this.searchQuery(search,maxResults)}}
                          books={ this.state.books }
  						  showingSearchBooks = {this.state.showingBooks}
                          onShelfChange={ (books,shelf) => { this.handleShelfChange(books,shelf) } }
						  handleSearchBar={ (showSearchPage) => { this.handleSearchBar(showSearchPage) 
                          history.push('/')
                         } }
           />


          )}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
