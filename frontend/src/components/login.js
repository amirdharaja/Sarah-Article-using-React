import React, { Component } from 'react';
import '../App.css';
import {
    Button,
    Input,
} from 'reactstrap';

import { Link } from "react-router-dom";


const AUTH_URL = 'http://127.0.0.1:8000/auth/'


class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        }
    }

    login = event => {
        fetch(AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => data.json())
            .then(data => {
                localStorage.setItem('token', data.token)
                if (data.token) {
                    window.location.href = "/";
                }
                else {
                    alert('Login Failure\nCheck your Username and Password');
                }
            })
            .catch(error => console.error(error),
        );
    }

    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({
            credentials: cred
        });
    }

    render() {
        return (
            <div id='login'>
                <img src={require('../resources/login_img.png')} alt='logo' />
                <div>
                    <h1>Log In</h1>
                    <div>
                        <label id='email'>Email</label>
                        <Input
                            type='text'
                            name='username'
                            value={this.state.credentials.username}
                            onChange={this.inputChanged}
                            placeholder='Username'
                            title="Valid Email only is allowed to login" required />
                    </div>
                    <div>
                        <label>Password</label>
                        <Input
                            type='password'
                            name='password'
                            value={this.state.credentials.password}
                            onChange={this.inputChanged}
                            placeholder='Password' required />
                    </div>
                    <Button color="success" type='submit' onClick={this.login}>Submit</Button>
                    <div id="login-register">
                        <h6><a href="/login">Forget Password</a></h6>
                        Dont't have an account?<Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
