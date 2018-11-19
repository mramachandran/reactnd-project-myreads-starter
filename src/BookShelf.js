import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookShelf extends Component {
    
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,  
  }

   isRealValue(obj)
   {
     console.log('type of objet is ' + typeof(obj))
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length>0;
   }


  render() {
    const {shelf,title,books, searchBooks,onShelfChange } = this.props
     //console.log(books)
     return ( 
        
         <div className="bookshelf">  
                     <h2 className="bookshelf-title">{title}</h2>
     					 <div className="bookshelf-books">       
                            {books && typeof books !== "undefined" ?( 
								<ol className="books-grid"> 								
      								{books.filter((book) => book.shelf===shelf).map((book) => (
 								           <li key={book.id} className='book'>
                                               <div className="book-top">                          
     										       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                    <div className="book-shelf-changer"   onChange={(event) => onShelfChange(book,event.target.value)}>
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

export default BookShelf