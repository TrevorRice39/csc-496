import React from 'react';
import renderer from 'react-test-renderer';
import "isomorphic-fetch";
import {mount} from 'enzyme';
import App, {Button} from './App.js';
import Homepage from './components/Homepage/Homepage.js';
import Recipe, {getImages} from './components/RecipePage/Recipe/Recipe.js';
import RecipePage from './components/RecipePage/RecipePage.js';
import { tsExternalModuleReference } from '@babel/types';
import ShallowRenderer from 'react-test-renderer/shallow';



describe('App', () => {
  it('renders the homepage', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Homepage).length).toEqual(1);
  });
})
describe('Recipe', () => {
  it('renders the recipe page', () => {
    // in your test:
    const renderer = new ShallowRenderer();
    renderer.render(<RecipePage props = {[]} />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('div');
    var expected = [
      <Recipe recipe = {undefined}/>,
        <Button className = "nav_button" onClick = {() => this.previousRecipe()} text = "<< Previous"/>,
        <span>       </span>,
        <Button className = "nav_button" onClick = {() => this.nextRecipe()} text = "Next >>"/>
    ]
    expect(JSON.stringify(result.props.children)).toEqual(JSON.stringify(expected))
  });
})
describe('Homepage', () => {
    test('snapshot renders', () => {
      const recipe  = [{title: "title", body: "body", field_images: "image1", view_node: "node", field_ingredients: "ingredient1", field_summary: "summary"}];
      const component = renderer.create(<Homepage recipes = {recipe}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

describe('Recipe', () => {
  describe ('getImages', () => {
    it('should parse urls', () => {
      const url_string = "url1.com, url2.com, url3.com";
      const parsed_urls = getImages(url_string);
      expect(parsed_urls).toEqual(["url1.com", "url2.com", "url3.com"]);
    });
  });
});
