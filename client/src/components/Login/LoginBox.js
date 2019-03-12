import React from 'react';
import './Login.css';
import { Form, FormGroup, Label, Input, FormFeedback, Col, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import auth from '../../authentication/auth';
import { userLogin } from '../../apiCalls/callApi';



export class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    }
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }


  submitLogin = () => {
    
    if ((this.state.validate.emailState !== 'has-success') && (this.state.validate.passwordState !== 'has-success')) {
      this.setState({ validate: { emailState: 'has-danger', passwordState: this.state.validate.passwordState } });
    }

    else if ((this.state.validate.emailState === 'has-success') && (this.state.validate.passwordState !== 'has-success')) {
      this.setState({ validate: { emailState: this.state.validate.emailState, passwordState: 'has-danger' } });
    }
    else if ((this.state.validate.emailState !== 'has-success') && (this.state.validate.passwordState === 'has-success')) {
      this.setState({ validate: { emailState: 'has-danger', passwordState: this.state.validate.passwordState } });
    }
    else {
      userLogin({ email: this.state.email, password: this.state.password })
        .then((response) => {
          auth.login(() => {
            this.context.router.history.push("/OrderList");
          })
        })
        .catch(err => {
          this.setState({ email: '', password: '' });
          this.setState({ validate: { emailState: 'has-danger' } });
          this.setState({ errorAlert: { visible: true, message: err.message } });
        });
    }


  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRex.test(e.target.value)) {
      this.setState({ validate: { emailState: 'has-success', passwordState: this.state.validate.passwordState } });
    } else {
      this.setState({ validate: { emailState: 'has-danger', passwordState: this.state.validate.passwordState } });
    }

  }


  validatePassword(e) {
    if (e.target.value) {
      this.setState({ validate: { emailState: this.state.validate.emailState, passwordState: 'has-success' } });
    }
    else {
      this.setState({ validate: { emailState: this.state.validate.emailState, passwordState: 'has-danger' } });
    }
  }


  handleChange = async (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  }


  render() {
    const { email, password } = this.state;

    return (
      <div className="inner-container">
        <div className="header">
          Log In
          </div>
        <div className="box">

          <Form>
            <Col>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                  value={email}
                  valid={this.state.validate.emailState === 'has-success'}
                  invalid={this.state.validate.emailState === 'has-danger'}
                  onChange={(e) => {
                    this.validateEmail(e)
                    this.handleChange(e)
                  }}
                />

                <FormFeedback invalid>
                  Uh oh! Looks like there is an issue with your email. Please input a correct email.
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  required
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Password"
                  value={password}
                  valid={this.state.validate.passwordState === 'has-success'}
                  invalid={this.state.validate.passwordState === 'has-danger'}
                  onChange={(e) => {
                    this.validatePassword(e)
                    this.handleChange(e)
                  }
                  }
                />
                <FormFeedback invalid>
                  *Password is required!
                </FormFeedback>
              </FormGroup>
            </Col>
          </Form>

          <Alert color="danger" isOpen={this.state.errorAlert.visible}>
            {this.state.errorAlert.message}
          </Alert>

          <button type="button" className="login-btn" onClick={this.submitLogin}> Login </button>
        </div>
      </div>

    );
  }
}

export default LoginBox;