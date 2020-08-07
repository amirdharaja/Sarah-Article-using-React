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
    isLoggedIn = true
}

class Article extends Component {

    state = {
        articles: []
    }

    logout() {
        localStorage.clear();
        window.location.href = '/login';
        alert('Logout Success')
    }

    loadArticles = () => {
        fetch(ARTICLES_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => data.json())
            .then(data => {
                this.setState({ articles: data })
                TOTAL_ARTICLE = data.length;
            })
            .catch(error => console.error(error))
    }
    render() {
        return (
            <div>
                <Navbar id='mainNavbar' expand="md">
                    <NavbarBrand href="/"><h1 id="heading">SARAH</h1></NavbarBrand>
                    <span>
                        <h1 id="logo">S</h1>
                    </span>

                    <h5 id="sub-heading">ARTICLES</h5>
                    <h5 id="title">OUR ENCHANTING</h5>
                    <h1 id="title1">Smashing Articles</h1>
                    <h5 id="discription">All Smashing articles, sorted chronologically. Over less than 1 year, we've
                                        published articles {TOTAL_ARTICLE}, written by hard-working authors. Still counting...</h5>
                    <img id="nav-img" src={require('../resources/home.gif')} alt="Home img" />
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <NavbarText>
                        {isLoggedIn || <Link to="/register">
                            <Button color='light' id='mainNavButton'>Register</Button>
                        </Link>}
                        {isLoggedIn || <Link to="/login">
                            <Button color='light' id='mainNavButton'>Login</Button>
                        </Link>}
                        {isLoggedIn && <Link to="/article/create">
                            <Button color='primary' id='mainNavButton'>New Article</Button>
                        </Link>}
                        {isLoggedIn && <Link to="/login">
                            <Button color='danger' id='mainNavButton' onClick={this.logout}>Logout</Button>
                        </Link>}
                    </NavbarText>
                </Navbar>

                {this.state.articles.map(articles => {
                    return (
                        <div id='articles' className='container'>
                            <div key={articles.id}>
                                <img id="article-picture" src={require('../resources/article.jpg')} alt="Article img" />
                                <h5>{articles.title}</h5>
                                <h6>{articles.content}</h6>
                                <br /><hr />
                            </div>
                        </div>
                    )
                })}
                {isLoggedIn && <Button color='primary' id='loadArticle' onClick={this.loadArticles}>Load Articles</Button>}
                <a href='/login'>{isLoggedIn || <Button color='primary' id='loadArticle'>Click, Login to continue...</Button>}</a>
            </div>
        );
    }
}

export default Article;
