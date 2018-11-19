import React, { Component } from 'react';
import PropTypes from 'prop-types'

class DisplaySearchResults extends Component {
  state = {
    showingSearchBooks: true
  }  


  static propTypes = {
    books: PropTypes.array.isRequired,
    showingSearchBooks: PropTypes.array,
    //onShelfChange: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,  
  }

  render() {
    const { shelf,title, books, searchBooks,onShelfChange } = this.props
    const { showingSearchBooks } = this.state

    //console.log("books displayed " + books)
    //console.log("showingSearchBooks displayed " + showingSearchBooks)
     return (         
         <div className="bookshelf">  
                     <h2 className="bookshelf-title">{title}</h2>
     					 <div className="bookshelf-books">       
                           	<ol className="books-grid"> 								
      								{searchBooks.map((book) => (
 								           <li key={book.id} className='book'>
                                               <div className="book-top">
 												{(book.imageLinks!==undefined)?(
     										       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>):(<div className="book-cover" style={{ width: 128, height: 193}}></div>) }
										
                                                    <div className="book-shelf-changer"   onChange={(event) => onShelfChange(book,event.target.value)}>>
														{(book.shelf!==undefined)?(
                                                          <select defaultValue={book.shelf}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead" >Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                          </select>
														):
														(
                                                          <select defaultValue="none">
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead" >Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                          </select>                                                          
                                                          )
														}
                                                     </div>
                                              </div>
                          				 <div className="book-title">{book.title}</div>
                          				<div className="book-authors">{book.authors}</div>
										</li>
        						    ))}
                               </ol>
                         </div>   
                </div>
        
     ) 
  }
}

export default DisplaySearchResults