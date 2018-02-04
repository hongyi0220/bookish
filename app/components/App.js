import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { Transition, Icon, Sidebar } from 'semantic-ui-react';
import { Nav } from './Nav';
import { UserNav } from './UserNav';
import { SignupForm } from './forms/SignupForm';
import { LoginForm } from './forms/LoginForm';
import { Profile } from './Profile';
import { SearchResults } from './SearchResults';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            searchResults: null,
            searchValue: '',
            dev: true
        };
        this.retrieveUserSession = this.retrieveUserSession.bind(this);
        this.logout = this.logout.bind(this);
        this.searchForBook = this.searchForBook.bind(this);
        this.getApiKey = this.getApiKey.bind(this);
        this.callGoogleApi = this.callGoogleApi.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.pushToBrowserHistory = this.pushToBrowserHistory.bind(this);
    }

    retrieveUserSession() {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/session';
        fetch(apiRoot + route, {credentials: 'include'})
        .then(res => res.json())
        .then(resJson => {
            console.log('resJson:', resJson);
            this.setState({ user: resJson });
        })
        .catch(err => console.error(err));
    }

    logout() {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/logout';
        fetch(apiRoot + route)
        .catch(err => console.error(err));
        this.setState({ user: null });
        this.props.history.push('/');
    }

    getApiKey() {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/apikey';
        return fetch(apiRoot + route)
        .then(res => res.json())
        .then(resJson => {
            console.log('apiKey???:', resJson);
            return resJson.apiKey;
        })
        .catch(err => console.error(err));
    }

    callGoogleApi(keyword, apiKey) {
        const apiRoot = 'https://www.googleapis.com/books/v1/volumes?q='
        apiKey = '&key=' + apiKey;
        console.log('apiUrl:', apiRoot + keyword + apiKey);
        // keyword += '+';
        // if (!(term === 'intitle' || 'inauthor')) return console.error('Invalid term');
        return fetch(apiRoot + keyword + apiKey)
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(err => console.error(err));
    }

    searchForBook(evt) {
        const keyword = evt.target.value;
        console.log('keyword @ searchForBook:', keyword);
        if (keyword.length) this.getApiKey()
        .then(apiKey => {
            console.log('apiKey:', apiKey);
            this.callGoogleApi(keyword, apiKey)
            .then(books => this.setState({ searchResults: books }))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }

    handleInput(evt) {
        const searchValue = evt.target.value;
        console.log('searchValue @ handleInput:', searchValue);
        this.setState({ searchValue: searchValue });
    }

    pushToBrowserHistory(route) {
        this.props.history.push(route);
    }

    componentDidMount() {
        console.log('cmpDidMnt');
        const socket = socketIOClient();
        this.retrieveUserSession();
    }

    render() {
        const state = this.state;
        const logout = this.logout;
        const handleInput = this.handleInput;
        const searchForBook = this.searchForBook;
        const pushToBrowserHistory = this.pushToBrowserHistory;

        return (
        <div className='app-container'>
            <div className='title-wrapper'>Bookish</div>
            <div className='subtitle-wrapper'>Book trading made easy</div>
            <div className='layout-buttons-container'>
                <Icon className='icon' name='list layout'></Icon>
                <Icon className='icon' name='grid layout'></Icon>
            </div>
            <div className='flexbox-container'>
                <Nav state={state} handleInput={handleInput} searchForBook={searchForBook}
                    pushToBrowserHistory={pushToBrowserHistory}/>
                <div className='content-container'>
                    <Switch>
                        <Route path='/results' render={() => <SearchResults state={state}
                            />}/>
                        <Route path='/profile' render={() => <Profile state={state}/>} />
                        <Route exact path='/login' render={() => <LoginForm />} />
                        <Route path='/signup' render={() => <SignupForm />} />
                    </Switch>
                    {/* <LoginForm />
                    <SignupForm /> */}
                </div>
                <UserNav state={state} logout={logout}/>
            </div>
        </div>);
    }
}

export default withRouter(App);
