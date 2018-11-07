import React, { Component } from 'react';
import PropTypes from 'prop-types'

class DisplaySearchResults extends Component {
  state = {
    
  }  
    
  static propTypes = {
    books: PropTypes.array.isRequired,
    showingSearchBooks: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,  
  }

   isRealValue(obj)
  {
    return obj && obj !== 'null' && obj !== 'undefined';
  }

  render() {
    const { books,shelf,title, onShelfChange,showingSearchBooks } = this.props
    //const { shelfTitle, displayShelf,bookTitle,bookAuthor } = this.state

     console.log("display search results " + showingSearchBooks)
     //TODO: catch exception when no books are on shelf

     return (         
         <div className="bookshelf">  
                     <h2 className="bookshelf-title">{title}</h2>
     					 <div className="bookshelf-books">       
                            {this.isRealValue(showingSearchBooks) ?( 
								<ol className="books-grid"> 								
      								{showingSearchBooks.map((book) => (
 								           <li key={book.id} className='book'>
                                               <div className="book-top">
     										       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                    <div className="book-shelf-changer"  onChange={(event) => onShelfChange(book,event.target.value)}>
                                                          <select defaultValue={shelf}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead" >Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                          </select>
                                                     </div>
                                              </div>
                          				 <div className="book-title">{book.title}</div>
                          				<div className="book-authors">{book.authors}</div>
										</li>
        						    ))}
                               </ol>
                          
                     
                              ) :
								( 
                                   <ol className="books-grid" /> 
                                 )}
                            
                         </div>   
                </div>
        
     ) 
  }
}

export default DisplaySearchResults