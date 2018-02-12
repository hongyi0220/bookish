import React from 'react';
import ButtonsContainer from '../buttons/ButtonsContainer';

const Own = props => {
    const state = props.state;
    const username = state.user.username;
    const imgSrc = props.imgSrc;
    const requestBook = props.requestBook;
    const removeBook = props.removeBook;
    const addBook = props.addBook;
    const bookId = props.bookId;
    const doIOwn = props.doIOwn;
    const shortenTitle = props.shortenTitle;
    const removeMiddleName = props.removeMiddleName;
    const books = state.books.filter(book => book.ownedby.includes(username));
    return (
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
                    <ButtonsContainer state={state} requestBook={requestBook} removeBook={removeBook} addBook={addBook}
                        bookId={bookId} doIOwn={doIOwn}/>
                </div>
            );
        })
    );
}
export default Own;
