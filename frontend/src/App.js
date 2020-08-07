import React, { useState } from 'react';
import './App.css';
// import Login from './components/login';
// import Articles from './components/articles';
// import Register from './components/register';




function App() {

  const [token, setToken] = useState('');

  // const userLogin = (tok) => {
  //   setToken(tok);
  //   localStorage.setItem('token', tok)
  //   console.log(tok);
    // if (tok) {
    //   alert('Login Success\nWelcome to SARAH Articles')
    // }
    // else {
    //   alert('Login Failure\nCheck your Username and Password');
    // }
  // }

  return (
    <div className="App">
      {/* <Login userLogin={userLogin} /> */}
      {/* <Articles token={localStorage.getItem('token')}/> */}
      {/* <Register token={localStorage.getItem('token')}/> */}
    </div>
  );
}

export default App;
