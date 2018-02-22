import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dialog from './Dialog';

const SearchResults = props => {
    const state = props.state;
    const myBooks = state.myBooks;
    const searchResult = state.searchResult;
    const imgShadeStyle = state.ui.selected.style;
    const selectedId = state.ui.selected.evtOrigin;
    const imgClass = state.ui.selected.class;
    const isLoggedIn = state.user;
    const gridView = state.ui.gridView;
    const foundBook = state.foundBook;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const imgSrcParams = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShadeOn = props.toggleImgShadeOn;
    const addBook = props.addBook;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
    const shortenString = props.shortenString;
    const removeMiddleName = props.removeMiddleName;
    const removeBook = props.removeBook;
    const doIOwn = props.doIOwn;
    const requestBook = props.requestBook;

    return (
        <div className='results-container'>
            <div className='books-container'>
                {(searchResult && gridView) ? searchResult.items.map((item, i) => {
                    const book = item.volumeInfo;
                    const bookId = item.id;
                    const authorName = book.authors ? book.authors[0] : 'Unknown';
                    const author = removeMiddleName(authorName);
                    const title = shortenString(book.title, 18);
                    const imgUrl = imgRootUrl + item.id + imgSrcParams;
                    let imgStyle = {
                        backgroundImage: 'url(' + imgUrl + ')',
                    };

                    return (
                        <div key={i} className='book'>
                            <div className={bookId === selectedId ? 'img' + imgClass : 'img'} style={imgStyle}></div>

                             <div id={bookId} className='img-shade'
                                 style={bookId === selectedId ? imgShadeStyle : {}}
                                  onMouseOver={toggleImgShadeOn}>

                                {bookId === selectedId ?
                                    <div className='view-detail-button' onClick={openModal}>View Detail</div>
                                : ''}

                            </div>
                            <div className='summary-container'>
                                <div className='title'>
                                    {title}
                                </div>
                                <div className='author'>
                                    Author:&nbsp;{author}
                                </div>
                            </div>
                            <div className='button-container'>
                                {(() => {
                                    if (isLoggedIn) {
                                        const button = doIOwn(bookId, myBooks) ?
                                        <div className='text-wrapper' onClick={() => {removeBook(bookId)}}>Disown this 📘</div> :
                                        <div className='text-wrapper' onClick={() => {addBook(bookId)}}>I own this 📘</div>;
                                        return button;
                                    } else {
                                        return <Link to='/login'><div className='text-wrapper'>Log in & add 📘</div></Link>
                                    }
                                })()}
                            </div>

                        </div>
                    );
                }) : ''}
                {(searchResult && !gridView) ?
                searchResult.items.map((b, i) => {
                    const book = b.volumeInfo;
                    const bookId = b.id;
                    const imgSrc = book.imageLinks ? book.imageLinks.thumbnail : '';
                    const title = shortenString(book.title, 25);
                    const authorName = book.authors ? book.authors[0] : 'Unknown';
                    const author = removeMiddleName(authorName);

                    return (
                        <div key={i} className='book-list-view'>
                            <div className='img-wrapper'><img src={imgSrc} /></div>
                            <div className='title'>{title}</div>
                            <div className='author'>
                                Author:&nbsp;{author}
                            </div>
                            <div className='button-container'>
                                {(() => {
                                    if (isLoggedIn) {
                                        const button = doIOwn(bookId, myBooks) ?
                                        <div className='text-wrapper' onClick={() => {removeBook(bookId)}}>Disown this 📘</div> :
                                        <div className='text-wrapper' onClick={() => {addBook(bookId)}}>I own this 📘</div>;
                                        return button;
                                    } else {
                                        return <Link to='/login'><div className='text-wrapper'>Log in & add 📘</div></Link>
                                    }
                                })()}
                            </div>
                        </div>
                    );
                }) : ''}
            </div>

            {foundBook ? <Dialog state={state} openModal={openModal} closeModal={closeModal}
                imgRootUrl={imgRootUrl} imgSrcParams={imgSrcParams} requestBook={requestBook} removeBook={removeBook}
                addBook={addBook} bookId={foundBook.id} doIOwn={doIOwn}/>
            : ''}
        </div>
    );
}
export default SearchResults;

SearchResults.propTypes = {
    state: PropTypes.object.isRequired,
    toggleImgShadeOn: PropTypes.func,
    addBook: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    shortenString: PropTypes.func,
    removeMiddleName: PropTypes.func,
    removeBook: PropTypes.func,
    doIOwn: PropTypes.func,
    requestBook: PropTypes.func
}
