import React, { Component } from "react";
  
class RecipeSummaries extends Component {
    render() {
        const {recipes} = this.props;
        return (
        <div>
            <h1>A few recipes!</h1>
            {recipes.map(recipe =>
            <div>
            <h4>{recipe.title}:</h4>
            <p className = "recipe_para" dangerouslySetInnerHTML={{ __html: recipe.field_summary }} />
            </div>
            )}
        </div>
        )
    }
}

  export default RecipeSummaries;