import React from 'react'; 
import {Link} from 'react-router-dom'


const Manual =() => {
  return (
    <div className="App manual-ctr">
        <h1>Welcome to Quizbuzz, Plz go thru this manual once!</h1>
        <p>Let's see..depending on your general knowledge and memory, you will select the options out of 4<br/>
        Then, timer will be set from the beginning of test and the dashboard will indicate the status of your test</p>
        <div>
        <span className="left"><Link to="/">Back</Link></span>
        <span className="right"><Link to="/play">Play</Link></span>
    </div>
    </div>
    
  );
}

export default Manual;