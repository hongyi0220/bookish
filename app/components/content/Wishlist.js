import React from 'react';
import ButtonsContainer from '../buttons/ButtonsContainer';

const Wishlist = props => {
    const state = props.state;
    const user = state.user;
    const username = user ? state.user.username : '';
    const shortenString = props.shortenString;
    const removeMiddleName = props.removeMiddleName;
    const imgSrc = props.imgSrc;
    const requestBook = props.requestBook;
    const removeBook = props.removeBook;
    const addBook = props.addBook;
    const doIOwn = props.doIOwn;
    const cancelRequest = props.cancelRequest;
    const books = state.books;
    const wishlist = books ? books.filter(book => book.wishlist.includes(username)) : [];

    return (
        wishlist.map((b, i) => {
            const book = b.book;
            const bookId = book.id;
            const volumeInfo = book.volumeInfo;
            const imgSrc = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
            const title = shortenString(volumeInfo.title, 20);
            const authorName = volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown';
            const author = removeMiddleName(authorName);

            return (
                <div key={i} className='book-list-view'>
                    <div className='img-wrapper'><img src={imgSrc} /></div>
                    <div className='title'>{title}</div>
                    <div className='author'>
                        Author:&nbsp;{author}
                    </div>
                    <ButtonsContainer state={state} requestBook={requestBook} removeBook={removeBook} addBook={addBook}
                        bookId={bookId} doIOwn={doIOwn} cancelRequest={cancelRequest}/>
                </div>
            );
        })
    );
}
export default Wishlist;
