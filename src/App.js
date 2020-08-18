import React from 'react'; 
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import Home from './components/Home';
import Manual from './components/Manual';
import Play from './components/Play';

//this is a comment
//addded to demonstrate the github
function App() {
  return (
    <div className="App">
       <Router>
          <Route path="/" exact component={Home}/>
          <Route path="/quiz/manual" exact component={Manual}/>
          <Route path="/play" exact component={Play}/>
       </Router>
    </div>
  );
}

export default App;
