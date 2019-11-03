import React, { Component } from "react";
import Recipe from './Recipe/Recipe.js';
import {Button} from '../../App.js';

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
export default RecipePage;