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
            foundBook: null,
            dev: true,
            ui: {
                selected: {
                    origin: null,
                    style: {},
                    class: ''
                },
                gridView: true,
                isModalOpen: false
            }
        };
        this.retrieveUserSession = this.retrieveUserSession.bind(this);
        this.logout = this.logout.bind(this);
        this.searchForBook = this.searchForBook.bind(this);
        this.getApiKey = this.getApiKey.bind(this);
        this.callGoogleApi = this.callGoogleApi.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.pushToBrowserHistory = this.pushToBrowserHistory.bind(this);
        this.toggleImgShadeOn = this.toggleImgShadeOn.bind(this);
        this.toggleImgShadeOff = this.toggleImgShadeOff.bind(this);
        this.toggleViewFormat = this.toggleViewFormat.bind(this);
        this.addBook = this.addBook.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.findBookById = this.findBookById.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.shortenTitle = this.shortenTitle.bind(this);
        this.removeMiddleName = this.removeMiddleName.bind(this);
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

    toggleImgShadeOn(evt) {
        // console.log('evt.target @ toggleImgShadeON:', evt.target);
        // console.log('evt.target.classON:',evt.target.className);
        const browsingLocation = this.props.history.location.pathname;
        const bookId = evt.target.id;
        const books = browsingLocation === '/search' ? this.state.searchResult.items : this.state.books.map(b => b.book);
        // const className = evt.target.className;
        // console.log('evt.currentTarget:',evt.currentTarget);

        if (evt.target === evt.currentTarget) {
            this.setState({
                ...this.state,
                ui: {
                    ...this.state.ui,
                    selected: {
                        ...this.state.ui.selected,
                        origin: bookId,
                        style: {backgroundColor: 'rgba(0,0,0,.4)'},
                        class: ' zoom'
                    }
                }
            });
            this.findBookById(bookId, books);
        }
        evt.stopPropagation();
    }

    toggleImgShadeOff(evt) {
        // console.log('evt.target @ toggleImgShadeOFF:', evt.target);
        // console.log('evt.target.classOFF:',evt.target.className);
        // const className = evt.target.className;
        // if (className !== 'view-detail-button') {
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                selected: {
                    ...this.state.ui.selected,
                    origin: null,
                    style: {},
                    class: ''
                }
            }
        });
        // }
        // evt.stopPropagation();
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

    findBookById(bookId, from) {
        let found;
        for (let i = 0; i < from.length; i++) {
            const id = from[i].id;
            // console.log('id @ findBook:', id);
            // console.log('bookId @ findBookk:', bookId);
            if (bookId === id) {
                found = from[i];
                break;
            }
        }
        this.setState({ foundBook: found }/*, () => console.log('book found:', this.state.foundBook)*/);
        return found;
    }

    addBook(bookId) {
        // console.log('adding book');
        const books = this.state.searchResult.items;
        // console.log('books@ addBook:', books);
        const foundBook = this.findBookById(bookId, books);
        // function findBook(bookId) {
        //     let found;
        //     for (let i = 0; i < books.length; i++) {
        //         const id = books[i].id;
        //         console.log('id @ findBook:', id);
        //         console.log('bookId @ findBookk:', bookId);
        //         if (bookId === id) {
        //             found = books[i];
        //             break;
        //         }
        //     }
        //     return found;
        // }
        // console.log('foundbook:', foundBook);
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
                book: foundBook,
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

    openModal(evt) {
        // console.log('openModal()');
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                isModalOpen: true
            }
        }, () => console.log('isModalOpen:', this.state));
        evt.stopPropagation();
    }

    closeModal() {
        console.log('closeModal()');
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                isModalOpen: false
            }
        });
        // evt.stopPropagation();
    }

    shortenTitle(title, length) {
        let result;
        if(title.length > length) {
            result = title.slice(0, length) + '...';
            return result;
        }
        else return title;
    }

    removeMiddleName(name) {
        let result;
        result = name.split(' ');
        if (result.length > 2) return result[0] + ' ' + result[result.length - 1];
        else return name;
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
        const toggleImgShadeOn = this.toggleImgShadeOn;
        const toggleImgShadeOff = this.toggleImgShadeOff;
        const toggleViewFormat = this.toggleViewFormat;
        const browsingLocation = this.props.history.location.pathname;
        const addBook = this.addBook;
        const findBookById = this.findBookById;
        const openModal = this.openModal;
        const closeModal = this.closeModal;
        const shortenTitle =this.shortenTitle;
        const removeMiddleName = this.removeMiddleName;
        // console.log('history:', this.props.history.location.pathname);

        return (
        <div className='app-container' onMouseOver={toggleImgShadeOff}>
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
                            toggleImgShadeOn={toggleImgShadeOn} openModal={openModal}
                            closeModal={closeModal} shortenTitle={shortenTitle} removeMiddleName={removeMiddleName}/>}/>
                        <Route path='/search' render={() => <SearchResults state={state}
                            toggleImgShadeOn={toggleImgShadeOn} addBook={addBook} openModal={openModal}
                            closeModal={closeModal} shortenTitle={shortenTitle} removeMiddleName={removeMiddleName}/>}/>
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
