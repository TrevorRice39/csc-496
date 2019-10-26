import React, { Component } from "react";
import logo from "./recipes_logo.jpg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
    };
  }
  render() {
    const {result} = this.state;
    console.log(result);
    return (
      <div className="App">
        {result.map(r =>
          <div>
            <h12>{r.title}</h12>
            <div dangerouslySetInnerHTML={{ __html: r.body }} />
            <img src = {"http://gtest.dev.wwbtc.com" + r.field_images.substring(0, r.field_images.indexOf(','))}></img>
            
            <div> {r.field_images.substring(0, r.field_images.indexOf(','))}</div>
            </div>
          )}
        {/* <header className="App-header">
          <div>CSC 496 Recipes</div>
        </header>
        <body>
        
        </body>
        <footer>
          Trevor Rice
          <br></br>
          CSC 499
          <br></br>
          trevor_rice39@mymail.eku
          <a href="https//:github.com/TrevorRice39">Github</a>
        </footer> */}
      </div>
    );
  }

  setResult(result) {
    this.setState({result : result});
  }
  componentDidMount() {
    fetch("http://gtest.dev.wwbtc.com/json/rec")
      .then(response => response.json())
      .then(result => this.setResult(result))
      .catch(error => console.log(error));
  }
}

export default App;
