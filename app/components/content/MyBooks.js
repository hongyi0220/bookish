import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dialog from './Dialog';
import Own from './Own';
import Wishlist from './Wishlist';
import IncomingRequests from './IncomingRequests';

const MyBooks = props => {
    const state = props.state;
    const myBooks = state.myBooks;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const imgSrcParams = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShadeOn = props.toggleImgShadeOn;
    const imgShadeStyle = state.ui.selected.style;
    const selectedId = state.ui.selected.evtOrigin;
    const imgClass = state.ui.selected.class;
    const gridView = state.ui.gridView;
    const addBook = props.addBook;
    const removeBook = props.removeBook;
    const foundBook = state.foundBook;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
    const shortenString = props.shortenString;
    const removeMiddleName = props.removeMiddleName;
    const requestBook = props.requestBook;
    const cancelRequest = props.cancelRequest;
    const approveRequest = props.approveRequest;

    return (
        <div className='results-container'>
            <h2>My Books</h2>
            <div className='my-books-nav'>
                <Link to='/mybooks/own'><div className='my-book-nav-item'>Own</div></Link>
                <Link to='/mybooks/wishlist'><div className='my-book-nav-item'>Wish List</div></Link>
                <Link to='/mybooks/incoming-requests'><div className='my-book-nav-item'>Incoming Requests</div></Link>
            </div>
            <Switch>
                <Route path='/mybooks/own' render={() => <Own state={state} imgRootUrl={imgRootUrl} imgSrcParams={imgSrcParams}
                    addBook={addBook} removeBook={removeBook} shortenString={shortenString} removeMiddleName={removeMiddleName}
                    requestBook={requestBook}/>}/>
                <Route path='/mybooks/wishlist' render={() => <Wishlist state={state} imgRootUrl={imgRootUrl} imgSrcParams={imgSrcParams}
                    addBook={addBook} removeBook={removeBook} shortenString={shortenString} removeMiddleName={removeMiddleName}
                    requestBook={requestBook} cancelRequest={cancelRequest}/>}/>
                <Route path='/mybooks/incoming-requests' render={() => <IncomingRequests state={state} imgRootUrl={imgRootUrl} imgSrcParams={imgSrcParams}
                    addBook={addBook} removeBook={removeBook} shortenString={shortenString} removeMiddleName={removeMiddleName}
                    requestBook={requestBook} approveRequest={approveRequest}/>}/>
            </Switch>
        </div>
    );
}
export default MyBooks;
