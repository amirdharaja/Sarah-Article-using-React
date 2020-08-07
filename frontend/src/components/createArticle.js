import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Button,
    Navbar,
    NavbarBrand,
    Nav,
    NavbarText
} from 'reactstrap';


const ARTICLES_URL = 'http://127.0.0.1:8000/sarah/articles/'
var TOTAL_ARTICLE

var isLoggedIn = false;
if (localStorage.getItem('token')) {
    isLoggedIn = true;
}
else {
    isLoggedIn = false;
}

class CreateArticle extends Component {

    state = {
        credentials: {
            title: '',
            content: '',
        }
    }

    logout() {
        localStorage.clear();
        window.location.href = '/login';
        alert('Logout Success')
    }

    createArticle = () => {
        fetch(ARTICLES_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => data.json())
            .then(data => {
                this.setState({ articles: data })
                alert('New Article Created')
                window.location.href = '/article/create';
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
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <NavbarText>
                        <Link to="/">
                            <Button color='light' id='navButton'>Home</Button>
                        </Link>
                        {isLoggedIn || <Link to="/login">
                            <Button color='light' id='navButton'>Login</Button>
                        </Link>}
                        {isLoggedIn && <Link to="/login">
                            <Button color='danger' id='navButton' onClick={this.logout}>Logout</Button>
                        </Link>}
                    </NavbarText>
                </Navbar>

                {isLoggedIn && <div id='newArticle' className='container'>
                    <label>Article Title</label>
                    <input type='text' className='form-control' name='title' value={this.state.credentials.title} onChange={this.inputChanged} placeholder='Article Title' /><br />
                    <label>Article Content</label>
                    <textarea className='form-control' name='content' value={this.state.credentials.content} onChange={this.inputChanged} placeholder='Article Content' rows='5'></textarea>
                    <br />
                    <Button color='light' id='createArticleButton' onClick={this.createArticle}>CREATE ARTICLE</Button>
                </div>}
                <a href='/login'>{isLoggedIn || <Button color='primary' id='loadArticle'>Click, Login to continue...</Button>}</a>
            </div>
        );
    }
}

export default CreateArticle;
