import React, { Component } from "react";

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
export default Recipe;