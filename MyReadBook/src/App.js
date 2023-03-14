import "./App.css";
import { useState , useEffect} from "react";
import BookShelves from "./BookShelves";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchBook from "./SearchBook";


function App() {
  const [books, setBooks] = useState([]);
 
  useEffect(() => {
      const getBooks = async () => {
      const res = await BooksAPI.getAll();
      console.log(res);
      setBooks(res);
    };
     getBooks();
  }, []);

const MoveToShelve=((book) => {
   const total = BooksAPI.update(book,book.shelf).then(res => {console.log(res);});
   let new_books = books.filter(fbook => fbook.id !== book.id ); 
   new_books.push(book);
   setBooks(new_books);
    });



  return (
    <div>
     
    <Routes>
     <Route exact path="/" 
            element={
            <BookShelves
            books={books}
            MoveToShelve = {MoveToShelve}
             />}
     />
     <Route path="/search" 
            element={
            <SearchBook
            books={books}
            MoveToShelve = {MoveToShelve}
             />}
     />

     
    </Routes>
 </div>

  );
}

export default App;
