import React from 'react';
import { withRouter } from 'react-router-dom';
import { Transition, Icon, Sidebar } from 'semantic-ui-react';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<div className='app-container'>Welcome to Bookish!</div>);
    }
}

export default withRouter(App);
