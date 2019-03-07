import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import Menu from '../components/OrderDetails/Menu';
import { shallowToJson } from 'enzyme-to-json';


describe("Menu Component", () => {

    let wrapper;
    let initialState = {
        selectedOrderId: "",
        selectedOrder: [],
        totalPayable: 0,
        status: ""
    };

    beforeEach(() => { wrapper = shallow(<Menu />); });

    it("should render correctly", () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });


    it('list of menu items are displayed', () => {
        
        //const foodlist = wrapper.find('ListGroupItem.foodList').to.have.lengthOf(4);
        //expect(foodlist.text()).to.equal("mock menu item name").toBeTruthy;
        //expect(wrapper.find('h2.orangify').text()).toBe("Cake | POS");
    });

    // it("should handle the click event", () => {
    //     const logOutSpy = jest.spyOn(wrapper.instance(), "logout");
    //     const context = {
    //         history : {
    //             push: jest.fn()
    //         }
    //     }
    //     const logOutAuthSpy = jest.fn();
    //
    //     window.confirm = jest.fn(() => true);
    //     wrapper.instance().forceUpdate();
    //     const logoutButton = wrapper.find('#logout-btn');
    //     expect(logOutSpy).not.toHaveBeenCalled();
    //     logoutButton.simulate('click');
    //     expect(logOutSpy).toHaveBeenCalledTimes(1);
    //     expect(window.confirm).toBeCalled();
    // })


    // it('includes a Button to logout', () => {
    //     const logoutButton = wrapper.find('Button').text().toBeTruthy;
    //     logoutButton.simulate('click');
    // });

});


