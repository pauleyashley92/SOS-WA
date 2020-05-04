import React from "react";
import Filter from "./Components/Filter";
import NavMenu from "./Components/NavMenu";
import About from "./Components/About";
import Faq from "./Components/faq";
import Footer from "./Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//comment
function App() {
  return (
    <div className="App">
      <Router>
      <Route path="/" exact render={
		()=>{
			return (
			<div>
		  	  <NavMenu />
      		  <Filter />
     		  <Footer />
      		</div>
			)
		}
	}/>
      <Route path="/faq" exact render={
		()=>{
			return (
			<Faq />
			)
		}
	}/>

<Route path="/about" exact render={
		()=>{
			return (
			<About />
			
			)
		}
	}/>
        </Router>
    </div>
  );
}

export default App;
