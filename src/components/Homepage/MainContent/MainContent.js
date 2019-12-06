import React, { Component } from "react";

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
            <p className = "recipe_para" dangerouslySetInnerHTML={{ __html: res.body }} />
            )}
          </div>
      )
    }
    componentDidMount() {
      fetch(process.env.REACT_APP_RECIPE_URL)
        .then(response => response.json())
        .then(result => this.setState({homepage: result}))
        .catch(error => console.log(error));
    }
  }

export default MainContent;