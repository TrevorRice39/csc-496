import React, { Component } from "react";
//import logo from "./recipes_logo.jpg";
import "./App.css";

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
    this.setState({homepage: pageName == "homepage"});
  }
  render() {
    const {recipes, homepage} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          Trevor's Recipes
        </header>
        <nav>
         <Button className = "" onClick = {() => this.switchPage("homepage")} text = "Homepage"/>
         <Button className = "" onClick = {() => this.switchPage("recipes")} text = "Recipes"/>
        </nav>
        <body>
          
        {homepage?
        <Homepage recipes = {recipes}/>
        : <h1>recipes go here</h1>
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

class Homepage extends Component {
  render() {
    const {recipes} = this.props;
    return (
      <div>
      <h1>Homepage</h1>
        <MainContent/>
        <RecipeSummaries recipes = {recipes}/>
      </div>
    )
  }
}

class MainContent extends Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      homepage: [], 
    }
  }
  render() {
    const {homepage} = this.state;
    return (
      <div>
        {homepage.map(res =>
          <div dangerouslySetInnerHTML={{ __html: res.body }} />
          )}
        </div>
    )
  }
  componentDidMount() {
    fetch("http://gtest.dev.wwbtc.com/json/page?_format=json")
      .then(response => response.json())
      .then(result => this.setState({homepage: result}))
      .catch(error => console.log(error));
  }
}


class RecipeSummaries extends Component {
  
  render() {
    const {recipes} = this.props;
    console.log(recipes);
    return (
      <div>
        <h1>A few recipes!</h1>
        {recipes.map(recipe =>

          <div>
            
          {recipe.title}
          :&nbsp;
          <div dangerouslySetInnerHTML={{ __html: recipe.field_summary }} />
          </div>
          )}
      </div>
    )
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
/*
{recipes.map(recipe =>
        <div>
          <h12>{recipe.title}</h12>
          <div dangerouslySetInnerHTML={{ __html: recipe.body }} />
          <img src = {"http://gtest.dev.wwbtc.com" + recipe.field_images.substring(0, recipe.field_images.indexOf(','))}></img>
          </div>
        )} 
*/
export default App;
