import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { Transition, Icon, Sidebar } from 'semantic-ui-react';
import { Nav } from './Nav';
import { Auth } from './Auth';
import { SignupForm } from './forms/SignupForm';
import { LoginForm } from './forms/LoginForm'

class App extends React.Component {
    constructor() {
        super();
        //	AIzaSyDHUrQvtLU4zjnACT-2TlctA1RFA_2DxuQ
    }

    componentDidMount() {
        const socket = socketIOClient();

    }

    render() {
        return (<div className='app-container'>
            <div className='title-wrapper'>Bookish</div>
            <div className='subtitle-wrapper'>Book trading made easy</div>
            <div className='layout-buttons-container'>
                <Icon name='list layout'></Icon>
                <Icon name='grid layout'></Icon>
            </div>
            <div className='flexbox-container'>
                <Nav />
                <div className='content-container'>
                    {/* <Switch>
                        <Route exact path='/login' render={() => <LoginForm />} />
                        <Route path='/signup' render={() => <SignupForm />} />
                    </Switch> */}
                    <LoginForm />
                    <SignupForm />
                </div>
                <Auth />
            </div>
        </div>);
    }
}

export default withRouter(App);
