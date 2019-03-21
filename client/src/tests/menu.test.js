import React from 'react';
import { shallow } from 'enzyme';
import Menu from '../components/OrderDetails/Menu';
import { shallowToJson } from 'enzyme-to-json';


describe("Menu Component", () => {

    let wrapper;
    let initialState = {
        items: [{name: "mock menu item name", category: "food", _id: "1"}, {name: "mock menu item name", category: "beverage", _id: "2"}]
    }

    beforeEach(() => { wrapper = shallow(<Menu />); });

    it("should render correctly", () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});


