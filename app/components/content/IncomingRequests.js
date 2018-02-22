import React from 'react';
import ButtonsContainer from '../buttons/ButtonsContainer';

const IncomingRequests = props => {
    const state = props.state;
    const user = state.user;
    const username = user ? state.user.username : '';
    const imgSrc = props.imgSrc;
    const requestBook = props.requestBook;
    const removeBook = props.removeBook;
    const addBook = props.addBook;
    const doIOwn = props.doIOwn;
    const shortenString = props.shortenString;
    const removeMiddleName = props.removeMiddleName;
    const approveRequest = props.approveRequest;
    const books = state.books;
    const incomingRequests = books.filter(book => book.wishlist.length && book.ownedby.includes(username));
    return (
        incomingRequests.map((b, i) => {
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
                    <ButtonsContainer state={state} requestBook={requestBook} removeBook={removeBook} addBook={addBook}
                        bookId={bookId} doIOwn={doIOwn} approveRequest={approveRequest}/>
                </div>
            );
        })
    );
}
export default IncomingRequests;
