import React, { Component } from "react";
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
          <Button className = "nav_button" onClick = {() => this.switchPage("homepage")} text = "Homepage"/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Button className = "nav_button" onClick = {() => this.switchPage("recipes")} text = "Recipes"/>
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

class RecipePage extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      recipeIndex: 0,
    }

    this.previousRecipe = this.previousRecipe.bind(this);
    this.nextRecipe = this.nextRecipe.bind(this);
  }

  nextRecipe() {
    const {recipeIndex} = this.state;
    const {recipes} = this.props;
    if (recipeIndex < recipes.length - 1) {
      this.setState({recipeIndex: recipeIndex+1})
    }
  }

  previousRecipe() {
    const {recipeIndex} = this.state;
    if (recipeIndex > 0) {
      this.setState({recipeIndex: recipeIndex-1})
    }
  }
  render() {
    const {recipeIndex} = this.state;
    const {recipes} = this.props;
    return (
      <div>
      <Recipe recipe = {recipes[recipeIndex]}/>
      <Button className = "nav_button" onClick = {() => this.previousRecipe()} text = "<< Previous"/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button className = "nav_button" onClick = {() => this.nextRecipe()} text = "Next >>"/>
      </div>
    )
  }
}

class Recipe extends Component {
  
  constructor(props) {
    super(props);

    this.getImages = this.getImages.bind(this);
  }

  getImages() {
    const {recipe} = this.props;
    var urls_string = recipe.field_images;
    var urls = [];

    var commaIndex = urls_string.indexOf(',');
    while (commaIndex != -1) {
      var url = urls_string.substring(0, commaIndex);
      urls.push(url);
      urls_string = url;
      commaIndex = urls_string.indexOf(',');
    }

    if (urls_string.length > 0) {
      urls.push(urls_string);
    }
    return urls;
  }
  render() {
    const {recipe} = this.props;
    const images = this.getImages();
    console.log(images);
    return (
      <div>
        {typeof recipe != 'undefined'?
        <body>
          <h1>{recipe.title}</h1> 
          {typeof images !== 'undefined'?
            images.map(url =>
              <img src = {"http://gtest.dev.wwbtc.com" + url}></img>
            )
            : <div></div>
          }
          <h2>Preparation</h2>
          <p className = "recipe_para" dangerouslySetInnerHTML={{ __html: recipe.body}}></p>
          <h2>Ingredients</h2>
          <p className = "recipe_para">{recipe.field_ingredients}</p>
          
        </body>
          : <div></div>
          }
      </div>
    )
  }
}

export default App;
