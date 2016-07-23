import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';



const UserComponent = (props) => {
  return null;
};



describe('Test suite for UserComponent', () => {
  it('UserComponent should exist', () => {
    let wrapper = shallow(<UserComponent />)
    expect(wrapper).to.exist;
  });
});
