import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import {
    Button,
    Navbar,
    NavbarBrand,
    Nav,
    NavbarText
} from 'reactstrap';


const USERS_URL = 'http://127.0.0.1:8000/sarah/users/'

var isLoggedIn = false;
if (localStorage.getItem('token')) {
    isLoggedIn = true
}

class Register extends Component {

    state = {
        credentials: {
            username: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
        }
    }

    logout() {
        localStorage.clear();
        window.location.href = '/login';
        alert('Logout Success')
    }

    register = event => {
        this.state.credentials.email = this.state.credentials.username
        fetch(USERS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => data.json())
            .then(data => {
                if (data.email){
                    window.location.href = "/login";
                    alert('Registration Success\nNow you can Login')
                }
                else alert('Faild, Retry with valid Input')
            })
            .catch(error => console.error(error))
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
            <div>
                <Navbar id='Navbar' expand="md">
                    <NavbarBrand href="/"><h1 id="heading">SARAH</h1></NavbarBrand>
                    <span>
                        <h1 id="logo">S</h1>
                    </span>
                    
                    <h5 id="sub-heading">ARTICLES</h5>
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <NavbarText>
                        <Link to="/">
                            <Button color='light' id='navButton'>Home</Button>
                        </Link>
                        {isLoggedIn || <Link to="/login">
                            <Button color='light' id='avButton'>Login</Button>
                        </Link>}
                        {isLoggedIn && <Link to="/login">
                            <Button color='danger' id='navButton' onClick={this.logout}>Logout</Button>
                        </Link>}
                    </NavbarText>
                </Navbar>

                <div id='register'>
                    <div className='container'>
                        <h5>NEW USER REGISTRATION</h5>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">First Name</span>
                            </div>
                            <input type="text" name="first_name" className="form-control" value={this.state.credentials.first_name} onChange={this.inputChanged} placeholder="First Name" required />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Last Name</span>
                            </div>
                            <input type="text" name="last_name" className="form-control" value={this.state.credentials.last_name} onChange={this.inputChanged} placeholder="Last Name" required />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Email</span>
                            </div>
                            <input type="email" name="username" className="form-control" value={this.state.credentials.username} onChange={this.inputChanged} placeholder="Email ID ( Username )" required />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Password</span>
                            </div>
                            <input type="password" name="password" className="form-control" value={this.state.credentials.password} onChange={this.inputChanged} placeholder="Password" required />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Re - Enter</span>
                            </div>
                            <input type="password" name="confirm_password" className="form-control" value={this.state.credentials.confirm_password} onChange={this.inputChanged} placeholder="Confirm Password" required />
                        </div>
                        <br />
                        <Button color="primary" type='submit' onClick={this.register}>SUBMIT</Button>
                    </div>


                </div>

            </div>
        );
    }
}

export default Register;
