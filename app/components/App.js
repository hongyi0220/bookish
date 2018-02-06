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
import { Books } from './Books';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            searchResult: null,
            searchValue: '',
            books: null,
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
        this.addBook = this.addBook.bind(this);
        this.getBooks = this.getBooks.bind(this);
    }

    retrieveUserSession() {
        console.log('retrieving user session');
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/session';
        fetch(apiRoot + route, {credentials: 'include'})
        .then(res => res.json())
        .then(resJson => {
            // console.log('resJson:', resJson);
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
            // console.log('apiKey???:', resJson);
            return resJson.apiKey;
        })
        .catch(err => console.error(err));
    }

    callGoogleApi(keyword, apiKey) {
        const apiRoot = 'https://www.googleapis.com/books/v1/volumes?q='
        apiKey = '&key=' + apiKey;
        // console.log('apiUrl:', apiRoot + keyword + apiKey);
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

        // console.log('keyword @ searchForBook:', keyword);

        // if (dev) this.setState({ searchResult: sample });
        // else
        if (keyword.length) this.getApiKey()
        .then(apiKey => {
            // console.log('apiKey:', apiKey);
            this.callGoogleApi(keyword, apiKey)
            .then(books => this.setState({ searchResult: books }))
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
        // console.log('shadeId:', shadeId);
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
        // console.log('viewFormat toggled:', this.state.ui.gridView);
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                gridView: isGridView
            }
        });
    }

    addBook(bookId) {
        console.log('adding book');
        const books = this.state.searchResult.items;
        console.log('books@ addBook:', books);
        function findBook(bookId) {
            let found;
            for (let i = 0; i < books.length; i++) {
                const id = books[i].id;
                console.log('id @ findBook:', id);
                console.log('bookId @ findBookk:', bookId);
                if (bookId === id) {
                    found = books[i];
                    break;
                }
            }
            return found;
        }
        console.log('foundbook:', findBook(bookId));
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/addbook';
        const username = this.state.user.username;

        return fetch(apiRoot + route, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book: findBook(bookId),
                username: username
            })
        })
        .catch(err => console.error(err));
    }

    getBooks() {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/getbooks';

        return fetch(apiRoot + route)
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(err => console.error(err));
    }

    componentWillMount() {
        // console.log('cmpWillMnt called');
        // this.retrieveUserSession();
    }

    componentDidMount() {
        console.log('cmpDidMnt');
        // const socket = socketIOClient();
        this.retrieveUserSession();
        this.getBooks()
        .then(books => this.setState({ books: books }, () => console.log('state after getBooks:', this.state)))
        .catch(err => console.error(err));
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
        const addBook = this.addBook;
        // console.log('history:', this.props.history.location.pathname);


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
                        <Route path='/books' render={() => <Books state={state}
                            toggleImgShade={toggleImgShade}/>}/>
                        <Route path='/search' render={() => <SearchResults state={state}
                            toggleImgShade={toggleImgShade} addBook={addBook}/>}/>
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
