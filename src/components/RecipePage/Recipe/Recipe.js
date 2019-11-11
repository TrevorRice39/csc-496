import React, { Component } from "react";

class Recipe extends Component {
  
    constructor(props) {
      super(props);
  
      //this.getImages = this.getImages.bind(this);
    }
  
    render() {
      const {recipe} = this.props;
      const images = getImages(recipe.field_images);
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
const getImages = (urls_string) => {
    var urls = [];

    var blankIndex = urls_string.indexOf(' ');
    while (blankIndex != -1) {
      var url = urls_string.substring(0, blankIndex-1);
      urls.push(url);
      urls_string = urls_string.substring(blankIndex+1);
      blankIndex = urls_string.indexOf(' ');
    }

    if (urls_string.length > 0) {
      urls.push(urls_string);
    }
    return urls;
}
export {
    getImages,
}
export default Recipe;