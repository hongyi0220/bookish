import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from './Dialog';

export const MyBooks = props => {
    const state = props.state;
    const books = state.myBooks;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const params = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShadeOn = props.toggleImgShadeOn;
    const imgShadeStyle = state.ui.selected.style;
    const selectedId = state.ui.selected.origin;
    const imgClass = state.ui.selected.class;
    const gridView = state.ui.gridView;
    const removeBook = props.removeBook;
    const foundBook = state.foundBook;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
    const shortenTitle = props.shortenTitle;
    const removeMiddleName = props.removeMiddleName;

    return (
        <div className='results-container'>
            <h2>My Books</h2>
            <div className='my-books-nav'>
                <div className='my-book-nav-item'>Own</div>
                <div className='my-book-nav-item'>Wish List</div>
                <div className='my-book-nav-item'>Incoming Requests</div>
            </div>
            {(books && gridView) ? books.map((b, i) => {
                const ownedby = b.ownedby.length;
                const book = b.book;
                const volumeInfo = book.volumeInfo;
                const bookId = book.id;
                const authorName = volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown';
                // console.log('book.authors:', author);
                const author = removeMiddleName(authorName);
                const title = shortenTitle(volumeInfo.title, 14);
                const imgUrl = imgRootUrl + bookId + params;
                let imgStyle = {
                    backgroundImage: 'url(' + imgUrl + ')',
                };

                return (
                    <div key={i} className='book'>
                        <div className={bookId === selectedId ? 'img' + imgClass : 'img'} style={imgStyle}></div>

                         <div id={bookId} className='img-shade' style={bookId === selectedId ? imgShadeStyle : {}}
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
                        <div className='request-button-container'>
                            <div className='text-wrapper' onClick={() => {removeBook(bookId)}}>Remove this 📘</div>
                        </div>
                    </div>
                );
            }) : ''}
            {/* List-view */}
            {(books && !gridView) ?
            books.map((b, i) => {
                const book = b.book;
                const bookId = b.id;
                const volumeInfo = book.volumeInfo;
                const imgSrc = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
                const title = shortenTitle(volumeInfo.title, 25);
                const authorName = volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown';
                const author = removeMiddleName(authorName);

                return (
                    <div key={i} className='book-list-view'>
                        <div className='img-wrapper'><img src={imgSrc} /></div>
                        <div className='title'>{title}</div>
                        <div className='author'>
                            Author:&nbsp;{author}
                        </div>
                        <div className='request-button-container'>
                            <div className='text-wrapper' onClick={() => {removeBook(bookId)}}>Remove this 📘</div>
                        </div>
                    </div>
                );
            }) : ''}
            {foundBook ? <Dialog state={state} openModal={openModal} closeModal={closeModal}
                imgRootUrl={imgRootUrl} params={params} removeBook={removeBook}/>
            : ''}
        </div>
    );
}
