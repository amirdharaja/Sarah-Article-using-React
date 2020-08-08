import React, { Component } from 'react';
import '../App.css';
import {
    Button,
    Input,
} from 'reactstrap';

import { Link } from "react-router-dom";


const AUTH_URL = 'http://127.0.0.1:8000/sarah/login/'


class OTP extends Component {

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
                else if (data.OTP) {
                    window.location.href = "/otp/verification";
                    var a = process.getCookie('otp')
                }
                else{
                    alert('Login Failure\nCheck your Username and Password')
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
                    <h1>OTP Verification</h1>
                    <div>
                        <label id='email'>OTP</label>
                        <Input
                            type='text'
                            name='otp'
                            value={this.state.credentials.username}
                            onChange={this.inputChanged}
                            placeholder='Enter 4 Digit OTP'
                            title="Valid OTP only is allowed to activate your account" required />
                    </div>
                    <Button color="success" type='submit' onClick={this.login}>Verify</Button>
                    <div id="login-register">
                        <h6><a href="/login">Forget Password</a></h6>
                        Dont't have an account?<Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default OTP;
