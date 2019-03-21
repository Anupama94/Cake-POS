import React from 'react';
import './Login.css';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Col } from 'reactstrap';


export class RegisterBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'username': '',
            'email': '',
            'password': '',
            validate: {
                usernameState: '',
                emailState: '',
                passwordState: ''
            },
        }
        this.handleChange = this.handleChange.bind(this);
    }


    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state;
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }


    validatePassword(e) {
        const passwordRex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
        const { validate } = this.state;
        if (passwordRex.test(e.target.value)) {
            validate.passwordState = 'has-success'
        } else {
            validate.passwordState = 'has-danger'
        }
        this.setState({ validate })
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    }

    validateUsername(e) {
        /* validate against the database */

    }
    submitRegister(e) {
        e.preventDefault();
        if (this.state.validate.emailState === 'has-success') {
            alert();
        }
    }


    render() {

        const { email, password, } = this.state;

        return (
            <div className="inner-container">
                <div className="header">
                    Register
                </div>
                <div className="box">

                    <Form>
                        <Col>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={email}
                                    valid={this.state.validate.usernameState === 'has-success'}
                                    invalid={this.state.validate.usernameState === 'has-danger'}
                                    onChange={(e) => {
                                        this.validateUsername(e)
                                        this.handleChange(e)
                                    }}
                                />

                                <FormFeedback>
                                    Uh oh! This username is taken!
                                 </FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label>Email</Label>
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

                                <FormFeedback>
                                    Uh oh! Looks like there is an issue with your email. Please input a correct email.
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        this.validatePassword(e)
                                        this.handleChange(e)
                                    }}
                                />
                                <FormFeedback invalid>
                                    Uh oh! Looks like there is an issue with your email. Please input a correct email.
                                </FormFeedback>
                                <FormText>Password should contain at least four characters, at least one number and both lower and uppercase letters and special characters.</FormText>
                            </FormGroup>
                        </Col>
                    </Form>

                    <button type="button"
                        className="login-btn"
                        onClick={this.submitRegister.bind(this)}> Register
                    </button>
                </div>
            </div>

        );
    }
}

export default RegisterBox;


