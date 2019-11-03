import React from 'react';
import renderer from 'react-test-renderer';
import "isomorphic-fetch";

import Homepage from './components/Homepage/Homepage.js';
import { tsExternalModuleReference } from '@babel/types';

describe('Homepage', () => {
    test('snapshot renders', () => {
      const recipe  = [{title: "title", body: "body", field_images: "image1", view_node: "node", field_ingredients: "ingredient1", field_summary: "summary"}];
      const component = renderer.create(<Homepage recipes = {recipe}/>);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true);
    });
});
