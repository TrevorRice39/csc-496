import React, { Component } from "react";
import RecipeSummaries from './RecipeSummaries/RecipeSummaries.js';
import MainContent from './MainContent/MainContent.js';

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
  
  export default Homepage;