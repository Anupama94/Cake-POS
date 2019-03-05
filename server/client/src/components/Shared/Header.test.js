import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import Header from './Header';
import { shallowToJson } from 'enzyme-to-json';


describe("<Header />", () => {

    let wrapper;

    beforeEach(() => {
         wrapper = shallow(<Header />); 
    });

    it("should render correctly", () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });


    it('includes an h2 tag that specifies the application name', () => {

        expect(wrapper.find('h2.orangify').text()).toBe("Cake | POS");
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


