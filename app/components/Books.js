import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from './Dialog';

export const Books = props => {
    const state = props.state;
    const books = state.books;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const params = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShadeOn = props.toggleImgShadeOn;
    const imgShadeStyle = state.ui.selected.style;
    const selectedId = state.ui.selected.origin;
    const imgClass = state.ui.selected.class;
    const isLoggedIn = state.user;
    const gridView = state.ui.gridView;
    // const addBook = props.addBook;
    // const toggleViewFormat = props.toggleViewFormat;
    // console.log('imgClass:',imgClass);
    // console.log('imgShadeStyle:',imgShadeStyle);
    // console.log('shadeId:',shadeId);

    const foundBook = state.foundBook;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
    // const isModalOepn = state.ui.isModalOpen;
    const shortenTitle = props.shortenTitle;
    const removeMiddleName = props.removeMiddleName;
    const requestButtonHeight = 65;
    const requestButtonStyles = {
        borderTop: '1px solid rgb(242,242,242)',
        height: requestButtonHeight + 'px',
        background: 'radial-gradient(circle at center, #22A7F0 0, #19B5FE, #89C4F4 100%)'
    }
    const textWrapperStyles = {
        color: 'black',
        textAlign: 'center',
        lineHeight: requestButtonHeight + 'px',
        fontSize: '1.4em'
    }

    return (
        <div className='results-container'>
            {(books && gridView) ? books.map((book, i) => {
                book = book.book;
                const volumeInfo = book.volumeInfo;
                const bookId = book.id;
                const authorName = volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown';
                // console.log('book.authors:', author);
                const author = removeMiddleName(authorName);
                const title = shortenTitle(volumeInfo.title, 18);
                // const imageSrc = book.imageLinks ? book.imageLinks.thumbnail : '';
                const imgUrl = imgRootUrl + bookId + params;
                let imgStyle = {
                    backgroundImage: 'url(' + imgUrl + ')',
                };

                return (
                    <div key={i} className='book'>
                        <div className={bookId === selectedId ? 'img' + imgClass : 'img'} style={imgStyle}></div>

                         <div id={bookId} className='img-shade'
                             style={bookId === selectedId ? imgShadeStyle : {}}
                              onMouseOver={toggleImgShadeOn}/*onMouseEnter={toggleImgShade} onMouseLeave={toggleImgShade}*/>

                            {bookId === selectedId ?
                                <div className='view-detail-button' onClick={openModal}>View Detail</div>
                            : ''}

                        </div>
                        <div className='summary-container'>
                            <div className='title'>
                                {title}
                            </div>
                            <div className='author'>
                                Author:&nbsp;{book.authors}
                            </div>
                        </div>
                        <div className='request-button-container'>
                            {isLoggedIn ?
                                <div className='text-wrapper' onClick={() => {}}>Request 📘</div> :
                             <Link to='/login'><div className='text-wrapper'>Log in & request 📘</div></Link>
                            }
                        </div>
                    </div>
                );
            }) : ''}
            {(books && !gridView) ?
            books.map((book, i) => {
                book = book.book;
                const volumeInfo = item.volumeInfo;
                const bookId = book.id;
                const imgSrc = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
                const title = shortenTitle(volumeInfo.title, 25);
                const authorName = volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown';
                const author = removeMiddleName(authorName);
                // console.log('book.authors:', author);

                return (
                    <div key={i} className='book-list-view'>
                        <div className='img-wrapper'>
                            <img src={imgSrc} />
                        </div>
                        <div className='title'>
                            {title}
                        </div>
                        <div className='author'>
                            Author:&nbsp;{author}
                        </div>
                        <div className='request-button-container'>
                            {isLoggedIn ?
                                <div className='text-wrapper' onClick={() => {}}>Request 📘</div> :
                             <Link to='/login'><div className='text-wrapper'>Log in & request 📘</div></Link>
                            }
                        </div>
                    </div>
                );
            }) : ''}
            {foundBook ? <Dialog state={state} openModal={openModal} closeModal={closeModal}
                imgRootUrl={imgRootUrl} params={params} requestButtonHeight={requestButtonHeight}
                requestButtonStyles={requestButtonStyles} textWrapperStyles={textWrapperStyles}/>
            : ''}
        </div>
    );
}
