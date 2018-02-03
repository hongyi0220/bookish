import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { Transition, Icon, Sidebar } from 'semantic-ui-react';
import { Nav } from './Nav';
import { UserNav } from './UserNav';
import { SignupForm } from './forms/SignupForm';
import { LoginForm } from './forms/LoginForm'

class App extends React.Component {
    constructor() {
        super();
        //	AIzaSyDHUrQvtLU4zjnACT-2TlctA1RFA_2DxuQ
        this.state = {
            user: null,
            dev: true
        };
        this.retrieveUserSession = this.retrieveUserSession.bind(this);
        this.logout = this.logout.bind(this);
    }

    retrieveUserSession() {
        const dev = this.state.dev;
        const apiUrl = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/session';
        fetch(apiUrl + route, {credentials: 'include'})
        .then(res => res.json())
        .then(resJson => {
            console.log('resJson:', resJson);
            this.setState({ user: resJson });
        })
        .catch(err => console.error(err));
    }

    logout() {
        const dev = this.state.dev;
        const apiUrl = dev ? 'http://localhost:8080' : 'http://myappurl';
        const route = '/logout';
        fetch(apiUrl + route)
        .catch(err => console.error(err));
        this.setState({ user: null });
        this.props.history.push('/');
    }

    componentDidMount() {
        console.log('cmpDidMnt');
        const socket = socketIOClient();
        this.retrieveUserSession();
    }

    render() {
        const isLoggedIn = this.state.user;
        // const username = isLoggedIn ? isLoggedIn.username : '';
        const logout = this.logout;

        return (<div className='app-container'>
            <div className='title-wrapper'>Bookish</div>
            <div className='subtitle-wrapper'>Book trading made easy</div>
            <div className='layout-buttons-container'>
                <Icon className='icon' name='list layout'></Icon>
                <Icon className='icon' name='grid layout'></Icon>
            </div>
            <div className='flexbox-container'>
                <Nav />
                <div className='content-container'>
                    <Switch>
                        <Route exact path='/login' render={() => <LoginForm />} />
                        <Route path='/signup' render={() => <SignupForm />} />
                    </Switch>
                    {/* <LoginForm />
                    <SignupForm /> */}
                </div>
                <UserNav isLoggedIn={isLoggedIn} logout={logout}/>
            </div>
        </div>);
    }
}

export default withRouter(App);
