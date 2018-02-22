import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from './Dialog';

const Books = props => {
    const state = props.state;
    const username = state.user ? state.user.username : '';
    const books = state.books ? state.books.filter(b => !b.ownedby.includes(username) && !b.wishlist.includes(username)) : [];
    const myBooks = state.myBooks;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const imgSrcParams = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShadeOn = props.toggleImgShadeOn;
    const imgShadeStyle = state.ui.selected.style;
    const selectedId = state.ui.selected.evtOrigin;
    const imgClass = state.ui.selected.class;
    const isLoggedIn = state.user;
    const removeBook = props.removeBook;
    const addBook = props.addBook;
    const gridView = state.ui.gridView;
    const foundBook = state.foundBook;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
    const shortenString = props.shortenString;
    const removeMiddleName = props.removeMiddleName;
    const doIOwn = props.doIOwn;
    const requestBook = props.requestBook;

    return (
        <div className='results-container'>
            <div className='books-container'>
                {(books && gridView) ? books.map((b, i) => {
                    const ownedby = b.ownedby.length;
                    const book = b.book;
                    const volumeInfo = book.volumeInfo;
                    const bookId = book.id;
                    const authorName = volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown';
                    const author = removeMiddleName(authorName);
                    const title = shortenString(volumeInfo.title, 10);
                    const imgUrl = imgRootUrl + bookId + imgSrcParams;
                    let imgStyle = {
                        backgroundImage: 'url(' + imgUrl + ')'
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
                                <div className='title'>{title}</div>
                                <div className='author'>
                                    Author:&nbsp;{author}
                                </div>
                                <div className='owned-by'>
                                    Owners:&nbsp;{ownedby}
                                </div>
                            </div>
                            <div className='button-container'>
                                {(() => {
                                    if (isLoggedIn) {
                                        const button = doIOwn(bookId, myBooks) ?
                                        <div className='text-wrapper' onClick={() => {removeBook(bookId)}}>Disown this 📘</div> :
                                        <div className='text-wrapper' onClick={() => {requestBook(bookId)}}>Request this 📘</div>;
                                        return button;
                                    } else {
                                        return <Link to='/login'><div className='text-wrapper'>Log in & request 📘</div></Link>
                                    }
                                })()}
                            </div>
                        </div>
                    );
                }) : ''}
                {(books && !gridView) ?
                books.map((b, i) => {
                    const book = b.book;
                    const bookId = book.id;
                    const volumeInfo = book.volumeInfo;
                    const imgSrc = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
                    const title = shortenString(volumeInfo.title, 25);
                    const authorName = volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown';
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
                                        <div className='text-wrapper' onClick={() => {requestBook(bookId)}}>Request this 📘</div>;
                                        return button;
                                    } else {
                                        return <Link to='/login'><div className='text-wrapper'>Log in & request 📘</div></Link>
                                    }
                                })()}
                            </div>
                        </div>
                    );
                }) : ''}
            </div>
            {foundBook ? <Dialog state={state} openModal={openModal} closeModal={closeModal}
                imgRootUrl={imgRootUrl} imgSrcParams={imgSrcParams} requestBook={requestBook} removeBook={removeBook}
                addBook={addBook} bookId={foundBook.id}/>
            : ''}
        </div>
    );
}
export default Books;
