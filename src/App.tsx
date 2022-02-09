import React, { useState } from 'react';
import './App.css';
import Entry from './entry/Entry';
import BookList from './books/BookList';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Header from './common/Header';
import ClientsList from './clients/ClientsList';
import { auth } from './firebase/utils';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(auth.currentUser !== null);

  auth.onAuthStateChanged(user => {
    if (user) {
      // Already logged in
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  })

  if (!loggedIn) {
    return <Entry logIn={() => setLoggedIn(true)}/>;
  }

  return(
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />}/>
        <Route path="/clients" element={<ClientsList />}/>
      </Routes>
    </>

  );
}

export default App;
