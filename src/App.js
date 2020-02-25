import React from "react";
import "./App.css";
import Map from "./Components/Map";
import Header from "./Components/Header";
import Filter from "./Components/Filter";
import NavMenu from "./Components/NavMenu";
import 'bootstrap/dist/css/bootstrap.min.css';

//you dont need to type myinfo.js since it is default file for import

function App() {
  return (
    <div className="App">
    	<NavMenu />
    	<Header />
      	
     	<Map />
    </div>
  );
}

export default App;
