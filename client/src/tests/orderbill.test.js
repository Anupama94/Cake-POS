import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import Menu from '../components/OrderDetails/Menu';
import { shallowToJson } from 'enzyme-to-json';


describe("Menu Component", () => {

    let wrapper;
    beforeEach(() => { wrapper = shallow(<Menu />); });

    it("should render correctly", () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});


