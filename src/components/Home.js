import React from 'react'; 
import {Link} from 'react-router-dom'
import Play from './Play'


const Home =() => {
  return (
    <div className="App">
       <div id="home">
           <section>
               <h1>Quizbuzz</h1>
               
               <div className="play-ctr">
                   <ul>
                       <li><Link to="/quiz/manual">Start</Link></li>
                   </ul>
               </div>
               <div className="auth">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
               </div>
           </section>
       </div>
    </div>
  );
}

export default Home;