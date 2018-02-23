import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dialog from './Dialog';
import Own from './Own';
import Wishlist from './Wishlist';
import IncomingRequests from './IncomingRequests';

const MyBooks = props => {
    const state = props.state;
    const myBooks = state.myBooks;
    const imgShadeStyle = state.ui.selected.style;
    const selectedId = state.ui.selected.evtOrigin;
    const imgClass = state.ui.selected.class;
    const gridView = state.ui.gridView;
    const foundBook = state.foundBook;
    const clicked = state.ui.myBooksNavItemClicked.class;
    const evtOrigin = state.ui.myBooksNavItemClicked.evtOrigin;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const imgSrcParams = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShadeOn = props.toggleImgShadeOn;
    const addBook = props.addBook;
    const removeBook = props.removeBook;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
    const shortenString = props.shortenString;
    const removeMiddleName = props.removeMiddleName;
    const requestBook = props.requestBook;
    const cancelRequest = props.cancelRequest;
    const approveRequest = props.approveRequest;
    const highlightMyBooksNavItem = props.highlightMyBooksNavItem;


    return (
        <div className='results-container'>
            <h2>My Books</h2>
            <div className='my-books-nav' onClick={highlightMyBooksNavItem}>
                <Link to='/mybooks/own'><div className={evtOrigin === 'own' ? 'my-book-nav-item' + clicked : 'my-book-nav-item'}
                    id='own'>Own</div></Link>
                <Link to='/mybooks/wishlist'><div className={evtOrigin === 'wish' ? 'my-book-nav-item' + clicked : 'my-book-nav-item'}
                    id='wish'>Wish List</div></Link>
                <Link to='/mybooks/incoming-requests'><div className={evtOrigin === 'request' ? 'my-book-nav-item' + clicked : 'my-book-nav-item'}
                    id='request'>Incoming Requests</div></Link>
            </div>
            <Switch>
                <Route path='/mybooks/wishlist' render={() => <Wishlist state={state} imgRootUrl={imgRootUrl} imgSrcParams={imgSrcParams}
                    addBook={addBook} removeBook={removeBook} shortenString={shortenString} removeMiddleName={removeMiddleName}
                    requestBook={requestBook} cancelRequest={cancelRequest}/>}/>
                <Route path='/mybooks/incoming-requests' render={() => <IncomingRequests state={state} imgRootUrl={imgRootUrl} imgSrcParams={imgSrcParams}
                    addBook={addBook} removeBook={removeBook} shortenString={shortenString} removeMiddleName={removeMiddleName}
                    requestBook={requestBook} approveRequest={approveRequest}/>}/>
                <Route path='/mybooks/own' render={() => <Own state={state} imgRootUrl={imgRootUrl} imgSrcParams={imgSrcParams}
                    addBook={addBook} removeBook={removeBook} shortenString={shortenString} removeMiddleName={removeMiddleName}
                    requestBook={requestBook}/>}/>
            </Switch>
        </div>
    );
}
export default MyBooks;
MyBooks.propTypes = {
    state: PropTypes.object.isRequired,
    toggleImgShadeOn: PropTypes.func,
    addBook: PropTypes.func,
    removeBook: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    shortenString: PropTypes.func,
    removeMiddleName: PropTypes.func,
    requestBook: PropTypes.func,
    cancelRequest: PropTypes.func,
    approveRequest: PropTypes.func,
    highlightMyBooksNavItem: PropTypes.func

}
