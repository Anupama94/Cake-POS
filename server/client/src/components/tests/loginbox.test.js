import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Login from '../Login/Login'
import { shallowToJson } from 'enzyme-to-json';


describe("LoginBox Component", () => {

    let wrapper;
    let initialState = {
        email: '',
        password: '',
        validate: {
          emailState: '',
          passwordState: ''
        },
        errorAlert: {
          visible: false,
          message: ''
        }
      };

    beforeEach(() => {
         wrapper = shallow(<Login />); 
        }
    );

    it("should render correctly", () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });


    it('when submit button is clicked without username nor password emailState should be set to has-danger', () => {
        //const submitButton = wrapper.find('button.login-btn').toBeTruthy;
        //expect(foodlist.text()).to.equal("mock menu item name").toBeTruthy;
        //expect(wrapper.find('h2.orangify').text()).toBe("Cake | POS");
    });

   

});
