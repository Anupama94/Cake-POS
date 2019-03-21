import React from 'react';
import './Login.css';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Col } from 'reactstrap';
import { LoginBox } from './LoginBox';
import { RegisterBox } from './RegisterBox';


class LoginOrRegister extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
    };
  }

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }

  render() {
    return (
      <div className="root-container">
        <div className="box-controller">
          <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")}
            onClick={this.showLoginBox.bind(this)}>
            Log In
          </div>
          <div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")}
            onClick={this.showRegisterBox.bind(this)}>
            Register
          </div>
        </div>
        <div className="box-container">
          {this.state.isLoginOpen && <LoginBox />}
          {this.state.isRegisterOpen && <RegisterBox />}
        </div>
      </div>

    );
  }
}



class Login extends React.Component {

  render() {
    return (
      <LoginOrRegister></LoginOrRegister>

    );
  }
}

export default Login;