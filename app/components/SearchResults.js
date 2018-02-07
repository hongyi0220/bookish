import React from 'react';
import { Link } from 'react-router-dom';
// import { Header, Image, Modal, Icon } from 'semantic-ui-react';
import { Dialog } from './Dialog';

export const SearchResults = props => {
    const state = props.state;
    const searchResult = state.searchResult;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const params = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShadeOn = props.toggleImgShadeOn;
    const imgShadeStyle = state.ui.selected.style;
    const selectedId = state.ui.selected.origin;
    const imgClass = state.ui.selected.class;
    const isLoggedIn = state.user;
    const gridView = state.ui.gridView;
    const addBook = props.addBook;
    // const findBookById = props.findBookById;
    const foundBook = state.foundBook;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
    // const isModalOepn = state.ui.isModalOpen;
    console.log('searchResult',searchResult);

    const shortenTitle = props.shortenTitle;
    const removeMiddleName = props.removeMiddleName;
    // const requestButtonHeight = 65;
    // const requestButtonStyles = {
    //     borderTop: '1px solid rgb(242,242,242)',
    //     height: requestButtonHeight + 'px',
    //     background: 'radial-gradient(circle at center, #22A7F0 0, #19B5FE, #89C4F4 100%)'
    // }
    // const textWrapperStyles = {
    //     color: 'black',
    //     textAlign: 'center',
    //     lineHeight: requestButtonHeight + 'px',
    //     fontSize: '1.4em'
    // }

    return (
        <div className='results-container'>
            {(searchResult && gridView) ? searchResult.items.map((item, i) => {
                const book = item.volumeInfo;
                const bookId = item.id;
                const authorName = book.authors ? book.authors[0] : 'Unknown';
                // console.log('book.authors:', author);
                const author = removeMiddleName(authorName);
                const title = shortenTitle(book.title, 18);
                // const imageSrc = book.imageLinks ? book.imageLinks.thumbnail : '';
                const imgUrl = imgRootUrl + item.id + params;
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
                                Author:&nbsp;{author}
                            </div>
                        </div>
                        <div className='request-button-container'>
                            {isLoggedIn ?
                                <div className='text-wrapper' onClick={() => {addBook(bookId)}}>I own this 📘</div> :
                             <Link to='/login'><div className='text-wrapper'>Log in & add 📘</div></Link>}
                        </div>
                    </div>
                );
            }) : ''}
            {(searchResult && !gridView) ?
            searchResult.items.map((item, i) => {
                const book = item.volumeInfo;
                const bookId = item.id;
                const imgSrc = book.imageLinks ? book.imageLinks.thumbnail : '';
                const title = shortenTitle(book.title, 25);
                const authorName = book.authors ? book.authors[0] : 'Unknown';
                // console.log('book.authors:',book.authors);
                // console.log('book.authors[0]:',book.authors[0]);
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
                                <div className='text-wrapper' onClick={() => {addBook(bookId)}}>I own this 📘</div> :
                             <Link to='/login'><div className='text-wrapper'>Log in & add 📘</div></Link>}
                        </div>
                    </div>
                );
            }) : ''}
            {foundBook ? <Dialog state={state} openModal={openModal} closeModal={closeModal}
                imgRootUrl={imgRootUrl} params={params}/>
            : ''}
        </div>
    );
}
