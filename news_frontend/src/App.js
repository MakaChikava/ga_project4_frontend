import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateBookmark from "./components/CreateBookmark.jsx";
import EditBookmark from "./components/EditBookmark";
import API from "./components/NewsApi.jsx";
const App = () => {

let [bookmarks, setBookmarks] = useState([])

// =========== GET BOOKMARKED ARTICLES ============== //

const getBookmarks = () =>{
  axios
    .get('http://localhost:8000/articles')
    .then((res)=>{
      setBookmarks(res.data)
      console.log(res.data)
    })
}


// =============== CREATE BOOKMARK ============ //

const handleCreate = (newBookmark) =>{
  axios
    .post('http://localhost:8000/articles', newBookmark)
    .then((res)=>{
      console.log(res)
      getBookmarks()
    })
}

// =================== DELETE BOOKMARK ============= //

const handleDelete = (event) =>{
console.log(event)
  axios
    .delete(`http://localhost:8000/articles/${event.target.value}`)
    .then((res)=>{
      getBookmarks()
    })
}

 // =============== UPDATE BOOKMARK ============ //
  const handleUpdate = (editBookmark) => {
    console.log(editBookmark);
    axios
      .put(`http://localhost:8000/articles/${editBookmark.id}`, editBookmark)
      .then((res) => {
        getBookmarks();
      });
  };

useEffect(()=>{
  getBookmarks()
}, [])

  return (
    <>
    <h1>News App</h1>
    <API/>
    <h1>Bookmarks</h1>

    
    <CreateBookmark handleCreate={handleCreate}/>

    {bookmarks.map((bookmark)=>{
      return(
        <div className='bookmark' key={bookmark.id}>
          <h5>written by: {bookmark.author}</h5>
          <h3>Title:{bookmark.title}</h3>
          <p>Description: {bookmark.description}</p>
          <h4>url: {bookmark.url}</h4>
          <h5>Published at: {bookmark.publishedAt}</h5>
           <EditBookmark handleUpdate={handleUpdate}   news={bookmark}/>
          <button onClick={handleDelete} value={bookmark.id}>Delete</button>
        </div>
      )
    })}
    
    </>
  );
};

export default App;
