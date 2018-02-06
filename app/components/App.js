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
import { sample } from './sampleData';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            searchResults: null,
            searchValue: '',
            dev: true,
            ui: {
                imgShade: {
                    origin: null,
                    style: {},
                    class: ''
                },
                gridView: true
            }
        };
        this.retrieveUserSession = this.retrieveUserSession.bind(this);
        this.logout = this.logout.bind(this);
        this.searchForBook = this.searchForBook.bind(this);
        this.getApiKey = this.getApiKey.bind(this);
        this.callGoogleApi = this.callGoogleApi.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.pushToBrowserHistory = this.pushToBrowserHistory.bind(this);
        this.toggleImgShade = this.toggleImgShade.bind(this);
        this.toggleViewFormat = this.toggleViewFormat.bind(this);
    }

    retrieveUserSession() {
        console.log('retrieving user session');
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/session';
        fetch(apiRoot + route, {credentials: 'include'})
        .then(res => res.json())
        .then(resJson => {
            console.log('resJson:', resJson);
            this.setState({ user: resJson }, () => console.log('set user in state'));
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
        const dev = this.state.dev;

        console.log('keyword @ searchForBook:', keyword);

        // if (dev) this.setState({ searchResults: sample });
        // else
        if (keyword.length) this.getApiKey()
        .then(apiKey => {
            console.log('apiKey:', apiKey);
            this.callGoogleApi(keyword, apiKey)
            .then(books => this.setState({ searchResults: books }))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
        this.pushToBrowserHistory('/search');
    }

    handleInput(evt) {
        const searchValue = evt.target.value;
        console.log('searchValue @ handleInput:', searchValue);
        this.setState({ searchValue: searchValue });
    }

    pushToBrowserHistory(route) {
        this.props.history.push(route);
    }

    toggleImgShade(evt) {
        const shadeId = evt.target.id;
        console.log('shadeId:', shadeId);
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                imgShade: {
                    ...this.state.ui.imgShade,
                    origin: this.state.ui.imgShade.origin ? null : shadeId,
                    style: this.state.ui.imgShade.style.hasOwnProperty('backgroundColor') ?
                    {} : {backgroundColor: 'rgba(0,0,0,.4)'},
                    class: this.state.ui.imgShade.class ? '' : ' zoom'
                }
            }
        })
    }

    toggleViewFormat(evt) {
        const id = evt.target.id;
        const isGridView = id === 'grid';
        console.log('viewFormat toggled:', this.state.ui.gridView);
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                gridView: isGridView
            }
        });
    }

    componentWillMount() {
        console.log('cmpWillMnt called');
        // this.retrieveUserSession();
    }

    componentDidMount() {
        console.log('cmpDidMnt');
        // const socket = socketIOClient();
        this.retrieveUserSession();
        // console.log('history:', this.props.history.location.pathname);
    }

    render() {
        const state = this.state;
        const logout = this.logout;
        const handleInput = this.handleInput;
        const searchForBook = this.searchForBook;
        const pushToBrowserHistory = this.pushToBrowserHistory;
        const toggleImgShade = this.toggleImgShade;
        const toggleViewFormat = this.toggleViewFormat;
        const browsingLocation = this.props.history.location.pathname;
        console.log('history:', this.props.history.location.pathname);
        return (
        <div className='app-container'>
            <div className='title-wrapper'>Bookish</div>
            <div className='subtitle-wrapper'>Book trading made easy</div>
            <Route path='/search' render={() => <div className='layout-buttons-container'>
                <Icon id='list' className='icon' name='list layout' onClick={toggleViewFormat}></Icon>
                <Icon id='grid' className='icon' name='grid layout' onClick={toggleViewFormat}></Icon>
            </div>}/>
            <Route path='/books' render={() => <div className='layout-buttons-container'>
                <Icon className='icon' name='list layout' onClick={toggleViewFormat}></Icon>
                <Icon className='icon' name='grid layout' onClick={toggleViewFormat}></Icon>
            </div>}/>
            {/* {browsingLocation === ('/search' || '/books') ?
            <div className='layout-buttons-container'>
                <Icon className='icon' name='list layout' onClick={toggleViewFormat}></Icon>
                <Icon className='icon' name='grid layout' onClick={toggleViewFormat}></Icon>
            </div> : ''} */}
            <div className='flexbox-container'>
                <Nav state={state} handleInput={handleInput} searchForBook={searchForBook}
                    pushToBrowserHistory={pushToBrowserHistory}/>
                <div className='content-container'>
                    <Switch>
                        <Route path='/search' render={() => <SearchResults state={state}
                            toggleImgShade={toggleImgShade}/>}/>
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
