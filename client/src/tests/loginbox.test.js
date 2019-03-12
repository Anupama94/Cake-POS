import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { LoginBox } from '../components/Login/LoginBox'
import { shallowToJson } from 'enzyme-to-json';
import { error } from '../apiCalls/errorConstants';
import HttpStatus from 'http-status-codes';

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
    wrapper = shallow(<LoginBox />);
  }
  );

  it("should render correctly", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });


  it('when submit button is clicked without username nor password emailState should be set to has-danger', () => {
    const logInSpy = jest.spyOn(wrapper.instance(), "submitLogin");

    wrapper.instance().forceUpdate();
    expect(logInSpy).not.toHaveBeenCalled();
    wrapper.find('button.login-btn').simulate('click');
    expect(logInSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().validate.emailState).toBe("has-danger");


  });

  it('when submit button is clicked with username but no password password-state should be set to has-danger', () => {
    const logInSpy = jest.spyOn(wrapper.instance(), "submitLogin");
    wrapper.setState({ validate: { emailState: 'has-success' } });
    wrapper.instance().forceUpdate();
    expect(logInSpy).not.toHaveBeenCalled();
    wrapper.find('button.login-btn').simulate('click');
    expect(logInSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().validate.passwordState).toBe("has-danger");


  });


  it('when submit button is clicked with password but no username email-state should be set to has-danger', () => {
    const logInSpy = jest.spyOn(wrapper.instance(), "submitLogin");
    wrapper.setState({ validate: { passwordState: 'has-success' } });
    wrapper.instance().forceUpdate();
    expect(logInSpy).not.toHaveBeenCalled();
    wrapper.find('button.login-btn').simulate('click');
    expect(logInSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().validate.emailState).toBe("has-danger");


  });


  it('when submit button is clicked with invalid username and password authentication should be failed and alert should be displayed', () => {
    const logInSpy = jest.spyOn(wrapper.instance(), "submitLogin");
    jest.unmock('../apiCalls/callApi');

    const apiCall = require('../apiCalls/callApi');
    apiCall.userLogin = jest.fn(() => Promise.reject({
      message: error.AUTH_FAILED.MESSAGE,
      code: error.AUTH_FAILED.CODE
    }));


    wrapper.setState({ validate: { emailState: 'has-success', passwordState: 'has-success' } });
    wrapper.instance().forceUpdate();
    expect(logInSpy).not.toHaveBeenCalled();
    wrapper.find('button.login-btn').simulate('click');
    expect(logInSpy).toHaveBeenCalledTimes(1);
    expect(apiCall.userLogin).toHaveBeenCalledTimes(1);
    apiCall.userLogin({ email: "abcd@123.com", password: "invalidPassword" })
      .catch(err => {
        expect(err.message).toBe(error.AUTH_FAILED.MESSAGE);
        expect(err.code).toBe(error.AUTH_FAILED.CODE);
        expect(wrapper.state().errorAlert.visible).toBe(true);
        expect(wrapper.state().errorAlert.message).toBe(error.AUTH_FAILED.MESSAGE);

      });
    //expect(wrapper.state().errorAlert.visible).toBe(true);

  });


  it('when submit button is clicked with valid username and password, should be routed to the orderlist', () => {
    const logInSpy = jest.spyOn(wrapper.instance(), "submitLogin");
    jest.unmock('../apiCalls/callApi');

    const apiCall = require('../apiCalls/callApi');
    apiCall.userLogin = jest.fn(() => Promise.resolve({ status: HttpStatus.OK }));

    wrapper.setState({ validate: { emailState: 'has-success', passwordState: 'has-success' } });
    wrapper.instance().forceUpdate();
    expect(logInSpy).not.toHaveBeenCalled();
    wrapper.find('button.login-btn').simulate('click');
    expect(logInSpy).toHaveBeenCalledTimes(1);
    expect(apiCall.userLogin).toHaveBeenCalledTimes(1);
    apiCall.userLogin({ email: "abcd@123.com", password: "abc" })
      .then(response => {
        expect(response.status).toBe(HttpStatus.OK);
      });
  });




});
