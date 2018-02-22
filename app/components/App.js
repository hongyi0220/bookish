import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Transition, Icon } from 'semantic-ui-react';
import Nav from './navs/Nav';
import UserNav from './navs/UserNav';
import SignupForm from './forms/SignupForm';
import LoginForm from './forms/LoginForm';
import Profile from './content/Profile';
import SearchResults from './content/SearchResults';
import sample from './sampleData';
import Books from './content/Books';
import MyBooks from './content/MyBooks';
import SignupSuccess from './content/SignupSuccess';
import About from './content/About';
import Footer from './content/Footer';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            searchResult: null,
            searchValue: '',
            books: null,
            myBooks: null,
            foundBook: null,
            dev: true,
            pathname: null,
            ui: {
                selected: {
                    evtOrigin: null,
                    style: {},
                    class: ''
                },
                navItemClicked: {
                    evtOrigin: null,
                    class: ''
                },
                gridView: true,
                isModalOpen: false,
                loginClicked: false
            }
        };
        this.setSession = this.setSession.bind(this);
        this.logout = this.logout.bind(this);
        this.searchForBook = this.searchForBook.bind(this);
        this.getApiKey = this.getApiKey.bind(this);
        this.callGoogleApi = this.callGoogleApi.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.toggleImgShadeOn = this.toggleImgShadeOn.bind(this);
        this.toggleImgShadeOff = this.toggleImgShadeOff.bind(this);
        this.toggleViewFormat = this.toggleViewFormat.bind(this);
        this.addBook = this.addBook.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.findBookById = this.findBookById.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.shortenString = this.shortenString.bind(this);
        this.removeMiddleName = this.removeMiddleName.bind(this);
        this.getMyBooks = this.getMyBooks.bind(this);
        this.removeBook = this.removeBook.bind(this);
        this.doIOwn = this.doIOwn.bind(this);
        this.requestBook = this.requestBook.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
        this.approveRequest = this.approveRequest.bind(this);
        this.changeEmojiToPerson = this.changeEmojiToPerson.bind(this);
        this.changeEmojiToShadow = this.changeEmojiToShadow.bind(this);
        this.borderNavItem = this.borderNavItem.bind(this);
    }

    setSession() {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/user';
        return fetch(apiRoot + route, {credentials: 'include'})
        .then(res => {
            return res.json()
        })
        .then(resJson => {
            return resJson
        })
        .catch(err => console.error(err));
    }

    logout() {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/logout';
        this.setState({ user: null });
        fetch(apiRoot + route, {credentials: 'include'})
        .catch(err => console.error(err));
        location.reload();
    }

    getApiKey() {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/apikey';
        return fetch(apiRoot + route)
        .then(res => res.json())
        .then(resJson => {
            return resJson.apiKey;
        })
        .catch(err => console.error(err));
    }

    callGoogleApi(keyword, apiKey) {
        const apiRoot = 'https://www.googleapis.com/books/v1/volumes?q='
        apiKey = '&key=' + apiKey;
        return fetch(apiRoot + keyword + apiKey)
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(err => console.error(err));
    }

    searchForBook(evt) {
        const keyword = evt.target.value;
        const dev = this.state.dev;

        if (keyword.length) this.getApiKey()
        .then(apiKey => {
            this.callGoogleApi(keyword, apiKey)
            .then(books => this.setState({ searchResult: books }))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }

    handleInput(evt) {
        const searchValue = evt.target.value;
        this.setState({ searchValue: searchValue });
    }

    navigateTo(route) {
        this.props.history.push(route);
        this.setState({ pathname: route });
    }

    toggleImgShadeOn(evt) {
        const browsingLocation = this.props.history.location.pathname;
        const bookId = evt.target.id;
        const books = browsingLocation === '/search' ? this.state.searchResult.items : this.state.books.map(b => b.book);

        if (evt.target === evt.currentTarget) {
            this.setState({
                ...this.state,
                ui: {
                    ...this.state.ui,
                    selected: {
                        ...this.state.ui.selected,
                        evtOrigin: bookId,
                        style: {backgroundColor: 'rgba(0,0,0,.4)'},
                        class: ' zoom'
                    }
                }
            });
            this.findBookById(bookId, books);
        }
        evt.stopPropagation();
    }

    toggleImgShadeOff() {
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                selected: {
                    ...this.state.ui.selected,
                    evtOrigin: null,
                    style: {},
                    class: ''
                }
            }
        });
    }

    toggleViewFormat(evt) {
        const id = evt.target.id;
        const isGridView = id === 'grid';

        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                gridView: isGridView
            }
        });
        evt.stopPropagation();
    }

    findBookById(bookId, from) {
        let found;
        for (let i = 0; i < from.length; i++) {
            const id = from[i].id;
            if (bookId === id) {
                found = from[i];
                break;
            }
        }
        this.setState({ foundBook: found });
        return found;
    }

    addBook(bookId) {
        const books = this.state.searchResult.items;
        const foundBook = this.findBookById(bookId, books);
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/book/:id/:username';
        const username = this.state.user.username;

        return fetch(apiRoot + route, {
            method: 'POST',
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

    removeBook(bookId) {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const username = this.state.user.username;
        const route = '/book/' + bookId + '/' + username;

        return fetch(apiRoot + route, {
            method: 'DELETE'
        })
        .catch(err => console.error(err));
    }

    requestBook(bookId) {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/request/' + bookId + '/' + username;
        const username = this.state.user.username;

        return fetch(apiRoot + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bookId: bookId,
                username: username
            })
        })
        .catch(err => console.error(err));
    }

    cancelRequest(bookId) {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const username = this.state.user.username;
        const route = '/request/' + bookId + '/' + username;

        fetch(apiRoot + route, {
            method: 'DELETE'
        })
        .catch(err => console.error(err));
    }

    approveRequest(bookId) {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const username = this.state.user.username;
        const route = '/request/' + bookId + '/' + username;

        return fetch(apiRoot + route, {
            method: 'PUT'
        })
        .catch(err => console.error(err));
    }

    getBooks() {
        const dev = this.state.dev;
        const apiRoot = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/all-books';

        return fetch(apiRoot + route)
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(err => console.error(err));
    }

    openModal(evt) {
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                isModalOpen: true
            }
        });
        evt.stopPropagation();
    }

    closeModal() {
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                isModalOpen: false
            }
        });
    }

    shortenString(title, length) {
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

    getMyBooks(username, from) {
        let myBooks;
        myBooks = from.filter(b => {
            return ~b.ownedby.indexOf(username);
        });
        return myBooks;
    }

    doIOwn(bookId, from) {
        const user = this.state.user;
        const username = user ? user.username : '';
        if (from) {
            const matched = from.filter(b => b.bookId === bookId);
            if (matched.length) return ~matched[0].ownedby.indexOf(username);
        }
        else return false;
    }

    borderNavItem(evt) {
        const id = evt.target.id;
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                navItemClicked: {
                    ...this.state.ui.navItemClicked,
                    evtOrigin: id,
                    class: ' clicked'
                }
            }
        });
        evt.stopPropagation();
    }

    changeEmojiToShadow(evt) {
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                loginClicked: false
            }
        });
    }

    changeEmojiToPerson(evt) {
        const emoji = ['🧙','🧛','🧝','🧟'][Math.floor(Math.random() * 4)];
        this.setState({
            ...this.state,
            ui: {
                ...this.state.ui,
                loginClicked: true,
                emoji: emoji
            }
        });
        evt.stopPropagation();
    }

    componentDidMount() {
        this.getBooks()
        .then(books => {
            this.setSession()
            .then(user => {
                if (user) {
                    const username = user.username;
                    this.setState({
                        user: user,
                        books: books,
                        myBooks: this.getMyBooks(username, books)
                    });
                } else {
                    this.setState({
                        books: books
                    });
                }
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }

    render() {
        const state = this.state;
        const logout = this.logout;
        const handleInput = this.handleInput;
        const searchForBook = this.searchForBook;
        const navigateTo = this.navigateTo;
        const toggleImgShadeOn = this.toggleImgShadeOn;
        const toggleImgShadeOff = this.toggleImgShadeOff;
        const toggleViewFormat = this.toggleViewFormat;
        const browsingLocation = this.props.history.location.pathname;
        const addBook = this.addBook;
        const findBookById = this.findBookById;
        const openModal = this.openModal;
        const closeModal = this.closeModal;
        const shortenString =this.shortenString;
        const removeMiddleName = this.removeMiddleName;
        const removeBook = this.removeBook;
        const cancelLogout = this.cancelLogout;
        const doIOwn = this.doIOwn;
        const requestBook = this.requestBook;
        const cancelRequest = this.cancelRequest;
        const approveRequest = this.approveRequest;
        const borderNavItem = this.borderNavItem;
        const changeEmojiToShadow = this.changeEmojiToShadow;
        const changeEmojiToPerson = this.changeEmojiToPerson;

        return (
        <div className='app-container' onMouseOver={toggleImgShadeOff} onClick={changeEmojiToShadow}>
            <Footer />
            <div className='title-wrapper'>Bookish</div>
            <div className='subtitle-wrapper'>Book trading made easy</div>
            <Route path='/(search|books)' render={() => <div className='layout-buttons-container'>
                <Icon id='list' className='icon' name='list layout' onClick={toggleViewFormat}></Icon>
                <Icon id='grid' className='icon' name='grid layout' onClick={toggleViewFormat}></Icon>
            </div>}/>

            <div className='flexbox-container'>
                <Nav state={state} handleInput={handleInput} searchForBook={searchForBook}
                    navigateTo={navigateTo} borderNavItem={borderNavItem}/>

                <div className='content-container'>
                    <Switch>
                        <Route path='/about' component={About} />
                        <Route path='/signup/success' render={() => <SignupSuccess state={state}/>}/>

                        <Route path='/mybooks' render={() => <MyBooks state={state} toggleImgShadeOn={toggleImgShadeOn}
                            openModal={openModal} removeBook={removeBook} closeModal={closeModal} shortenString={shortenString}
                            removeMiddleName={removeMiddleName} addBook={addBook} cancelRequest={cancelRequest}
                            approveRequest={approveRequest}/>}/>

                        <Route path='/search' render={() => <SearchResults state={state} toggleImgShadeOn={toggleImgShadeOn}
                            addBook={addBook} openModal={openModal} closeModal={closeModal} shortenString={shortenString}
                            removeMiddleName={removeMiddleName} removeBook={removeBook} doIOwn={doIOwn}/>}/>

                        <Route path='/profile' render={() => <Profile state={state}/>} />
                        <Route path='/login' render={() => <LoginForm state={state}
                            changeEmojiToPerson={changeEmojiToPerson}/>} />

                        <Route path='/signup' render={() => <SignupForm state={state}
                            changeEmojiToPerson={changeEmojiToPerson}/>} />

                        <Route path='/' render={() => <Books state={state} toggleImgShadeOn={toggleImgShadeOn}
                            openModal={openModal} closeModal={closeModal} shortenString={shortenString} addBook={addBook}
                            removeMiddleName={removeMiddleName} doIOwn={doIOwn} requestBook={requestBook} removeBook/>}/>
                    </Switch>
                    <Route path='/signup/invalid-username' render={() => <div className='error-msg'>It seems the username is taken.. boo!</div>} />
                    <Route path='/login/error' render={() => <div className='error-msg'>Wrong username and or password..?</div>} />
                </div>
                <UserNav state={state} logout={logout} shortenString={shortenString} borderNavItem={borderNavItem}/>
            </div>
        </div>);
    }
}

export default withRouter(App);
