import React, { useState } from 'react';
import './App.css';
import Entry from './entry/Entry';
import Books from './books/Books';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import ClientsList from './clients/ClientsList';
import { auth } from './firebase/utils';
import Header from './header/Header';

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

  return(
    <>
      <Header showLinks={loggedIn}/>

      {!loggedIn
        ? <Entry logIn={() => setLoggedIn(true)}/>
        : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />}/>
            <Route path="/clients" element={<ClientsList />}/>
          </Routes>
        )
      }
    </>

  );
}

export default App;
