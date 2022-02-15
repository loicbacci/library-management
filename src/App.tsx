import React, { useState } from 'react';
import './App.css';
import Entry from './entry/Entry';
import Books from './books/Books';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Clients from './clients/Clients';
import { auth } from './firebase/utils';
import Header from './header/Header';
import Loans from './loans/Loans';

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

  const header = <Header showLinks={loggedIn}/>

  if (!loggedIn) {
    return (
      <>
        {header}
        <Entry logIn={() => setLoggedIn(true)}/>
      </>
    )
  }

  return(
    <>
      {header}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<Books />} />

        <Route path="/clients" element={<Clients />}/>
        <Route path="/clients/:clientId" element={<Clients />}/>

        <Route path="/loans" element={<Loans />}/>
        <Route path="/loans/:loanId" element={<Loans />}/>
      </Routes>
    </>

  );
}

export default App;
