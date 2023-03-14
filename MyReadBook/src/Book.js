/*
title str 
  subtitle str 
  authors list 
  publisher str 
  publishedDate str 
  description str 
  industryIdentifiers list 
  readingModes dict 
      text str 
      image str 
  pageCount int 
  printType str 
  categories list 
  averageRating int 
  ratingsCount int 
  maturityRating str 
  allowAnonLogging str 
  contentVersion str 
  panelizationSummary dict 
      containsEpubBubbles str 
      containsImageBubbles str 
  imageLinks dict 
      smallThumbnail str 
      thumbnail str 
  language str 
  previewLink str 
  infoLink str 
  canonicalVolumeLink str 
  id str 
  shelf str 
*/
import PropTypes from "prop-types";

const Shelveoptions = [
  {
    label: "None",
    value: "None",
  },
  {
    label: "Read",
    value: "Read",
  },
  {
    label: "currentlyReading",
    value: "currentlyReading",
  },
  {
    label: "wantToRead",
    value: "wantToRead",
  },
];

const Book = ({hanldeDetailClick,book,books,MoveToShelve}) => {

  
  const isUserbook = books.filter(userbook => userbook.id === book.id ) ;
 
  const selectedshelf = isUserbook.length > 0 ? (isUserbook[0].shelf) : ("None")
  
  

  const  handleSHeleveChange = ((book,event) => {
    event.preventDefault();
    book["shelf"] = event.target.value
    MoveToShelve(book);
    });

return(
    <li key={book.id}>
       <div   className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
              (book["imageLinks"] && book["imageLinks"]["smallThumbnail"])? ('url("'+book["imageLinks"]["smallThumbnail"]+'")'): ("")
            }}
          ></div>
          <div className="book-shelf-changer">
          <select value={selectedshelf} onChange={(event) => handleSHeleveChange(book,event)}>
               <option  key="none" value="none" disabled> Move to... </option>
               {Shelveoptions.map(shelve =>{
                 return (<option key={shelve.label} value={shelve.value}>{shelve.value === selectedshelf? ("✔️ " ) :( <>&nbsp;&nbsp;&nbsp;&nbsp;</> )}{shelve.label} </option>)}
                   )}
            </select>
          </div>
        </div>
        <div onClick={(event) => hanldeDetailClick("show",book.title,book.description)} className="book-title" >{book.title}</div>
        <div className="book-authors">
            By : { (book["authors"]) ? (book.authors) : ("")} 
        </div>
      </div>
    </li>)
    }

Book.propTypes = {
      books: PropTypes.array.isRequired,
      book: PropTypes.object.isRequired,
      MoveToShelve: PropTypes.func.isRequired,
      hanldeDetailClick: PropTypes.func.isRequired,
    };

export default Book 
