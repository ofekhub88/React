
import { Link} from "react-router-dom";
import    Book from "./Book"
import PropTypes from "prop-types";
import { useState } from "react"
import BookDetails from "./BookDetails";



const BookShelves =  ( {  books ,MoveToShelve}) => {
  const shelves = ["Read","currentlyReading","wantToRead"] 
  const [showDetails, setShowDetails] = useState({"title": "None"}); 



const BookPerShelves =(shelf) =>{
   
   return(books.filter(book => book.shelf === shelf));
  };
  const hanldeDetailClick = (eventAction,title,bookDetails) => {
    if (eventAction === "show") {
       setShowDetails({"title": title ,"details": bookDetails})
    } else {
      setShowDetails({"title": "None"} )
    }
  };

 return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
             <h1>MyReads  </h1>
               ( click on Title to see the book details)
          </div>

          <div className="list-books-content">
            <div className="flex-container">
      
            {shelves.map(shelf => {
             return(  shelf === "none" ? ("") : 
              (<div key={shelf} className="bookshelf">
       
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="flex-child">
                  <ol className="books-grid">
          
                  {BookPerShelves(shelf).map((book) => {
                  return(<Book key={book.id}
                        hanldeDetailClick = {hanldeDetailClick}
                        book = {book}
                        books={books}
                        MoveToShelve = {MoveToShelve} />)
                     })
                     }
                  </ol>
                </div>
              </div> ))
              })}
            </div>
          </div>
          {showDetails.title !== "None" ? 
      (<BookDetails  BookDetails={showDetails} hanldeDetailClick={hanldeDetailClick} />) 
       :
        ("")}
          <div className="open-search">
            <Link to="/search">Add a book </Link>
          </div>
        </div>
    </div>
  );
}

BookShelves.propTypes = {
  books: PropTypes.array.isRequired,
  MoveToShelve: PropTypes.func.isRequired,
};

export default BookShelves;