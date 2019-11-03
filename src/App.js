import React, { Component } from "react";
import './App.css';
import Homepage from './components/Homepage/Homepage.js';
import RecipePage from './components/RecipePage/RecipePage.js';
import { isModuleDeclaration } from "@babel/types";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      homepage: true,
    };
    this.switchPage = this.switchPage.bind(this);
  }

  switchPage(pageName) {
    this.setState({homepage: pageName === "homepage"});
  }
  render() {
    const {recipes, homepage} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          
          <div>
          Recipes Bazaar
          &nbsp;&nbsp;
          <Button className = "nav_button bouncy" style="animation-delay:0.07s;" onClick = {() => this.switchPage("homepage")} text = "Homepage"/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Button className = "nav_button bouncy" style="animation-delay:1.00s;" onClick = {() => this.switchPage("recipes")} text = "Recipes"/>
         </div>
        </header>
        <body>
        {homepage?
        <Homepage recipes = {recipes}/>
        :
        <RecipePage recipes = {recipes}/>
        }
        </body>
        <footer>
          Trevor Rice
          <br></br>
          CSC 496
        </footer>
      </div>
    );
  }

  componentDidMount() {
    fetch("http://gtest.dev.wwbtc.com/json/rec")
      .then(response => response.json())
      .then(result => this.setState({recipes: result, loading: false}))
      .catch(error => console.log(error));

  }
}

class Button extends Component {
  render() {
    const {className, onClick, text} = this.props;
    return (
      <button
      onClick = {onClick}
      className = {className}
      >{text}</button>
    )
  }
}

export {
  Button,
}
export default App;
