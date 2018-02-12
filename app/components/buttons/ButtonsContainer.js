import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import AddButton from './AddButton';
import RequestButton from './RequestButton';
import RemoveButton from './RemoveButton';
import CancelRequestButton from './CancelRequestButton';
import ApproveButton from './ApproveButton';

const ButtonsContainer = props => {
    const state = props.state;
    const myBooks = state.myBooks;
    const addBook = props.addBook;
    const removeBook = props.removeBook;
    const requestBook = props.requestBook;
    const bookId = props.bookId;
    const doIOwn = props.doIOwn;
    const approveRequest = props.approveRequest;
    const cancelRequest = props.cancelRequest;
    // const requestButtonHeight = 65;
    // const requestButtonStyles = {
    //     borderTop: '1px solid rgb(242,242,242)',
    //     height: requestButtonHeight + 'px',
    //     background: 'radial-gradient(circle at center, #22A7F0 0, #19B5FE, #89C4F4 100%)',
    //     cursor: 'pointer'
    // };
    // const textWrapperStyles = {
    //     color: 'white',
    //     textAlign: 'center',
    //     lineHeight: requestButtonHeight + 'px',
    //     fontSize: '1.4em'
    // };

    return (
        <div className='buttons-container'>
            <Switch>
                <Route path='/mybooks/incoming-requests' render={() => <ApproveButton state={state} addBook={addBook}
                removeBook={removeBook} requestBook={requestBook} bookId={bookId} approveRequest={approveRequest}/>}/>

                <Route path='/mybooks/wishlist' render={() => <CancelRequestButton state={state} addBook={addBook}
                removeBook={removeBook} requestBook={requestBook} bookId={bookId} cancelRequest={cancelRequest}/>}/>

                <Route path='/mybooks/own' render={() => <RemoveButton state={state} addBook={addBook}
                removeBook={removeBook} requestBook={requestBook} bookId={bookId}/>}/>

                <Route path='/search' render={() => doIOwn(bookId, myBooks) ?
                    <RemoveButton state={state} addBook={addBook}
                    removeBook={removeBook} requestBook={requestBook} bookId={bookId}/>
                    : <AddButton state={state} addBook={addBook}
                        removeBook={removeBook} requestBook={requestBook} bookId={bookId}/>}/>

                <Route path='/books' render={() => <RequestButton state={state} addBook={addBook}
                removeBook={removeBook} requestBook={requestBook} bookId={bookId}/>}/>
            </Switch>
        </div>
    );
}
export default ButtonsContainer;
