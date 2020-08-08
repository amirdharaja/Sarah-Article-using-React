import React, { Component } from 'react';
import '../App.css';
import {
    Button,
    Input,
} from 'reactstrap';

import { Link } from "react-router-dom";



const OTP_VERIFICATION_URL = 'http://127.0.0.1:8000/sarah/login/otp/verification/'


class OTP extends Component {

    state = {
        credentials: {
            otp: '',
            id: localStorage.getItem('user_id')
        }
    }

    otpVerification = event => {
        console.log(localStorage.getItem('backendOTP'))
        // console.log(this.state.credentials.otp)
        if (localStorage.getItem('backendOTP') === this.state.credentials.otp) {
            alert('OTP Verification success, Your account has been activated')
            fetch(OTP_VERIFICATION_URL, {
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
                    }
                    else {
                        alert('Login Failure\nCheck your Username and Password')
                    }
                })
                .catch(error => console.error(error)
            ,
                );
        }
        else{
            alert('Wrong OTP, Try again')
            window.location.href = "/otp/verification";
        }
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
                            type='number'
                            name='otp'
                            value={this.state.credentials.username}
                            onChange={this.inputChanged}
                            placeholder='Enter 4 Digit OTP'
                            title="Valid OTP only is allowed to activate your account" required />
                    </div>
                    <Button color="success" type='submit' onClick={this.otpVerification}>Verify</Button>
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
