import React from 'react';
import { Link } from 'react-router-dom';

export const Books = props => {
    const state = props.state;
    const books = state.books;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const params = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShadeOn = props.toggleImgShadeOn;
    const imgShadeStyle = state.ui.imgShade.style;
    const shadeId = state.ui.imgShade.origin;
    const imgClass = state.ui.imgShade.class;
    const isLoggedIn = state.user;
    const gridView = state.ui.gridView;
    // const addBook = props.addBook;
    // const toggleViewFormat = props.toggleViewFormat;
    // console.log('imgClass:',imgClass);
    // console.log('imgShadeStyle:',imgShadeStyle);
    // console.log('shadeId:',shadeId);
    function shortenTitle(title, length) {
        let result;
        if(title.length > length) {
            result = title.slice(0, length) + '...';
            return result;
        }
        else return title;
    }
    function removeMiddleName(name) {
        let result;
        result = name.split(' ');
        if (result.length > 2) return result[0] + ' ' + result[result.length - 1];
        else return name;
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
                        <div className={'shade' + i === shadeId ? 'img' + imgClass : 'img'} style={imgStyle}></div>

                         <div id={'shade' + i} className='img-shade'
                             style={'shade' + i === shadeId ? imgShadeStyle : {}}
                              onMouseOver={toggleImgShadeOn}/*onMouseEnter={toggleImgShade} onMouseLeave={toggleImgShade}*/>

                            {'shade' + i === shadeId ? <div className='view-detail-button'>View Detail</div> : ''}

                        </div>
                        <div className='summary-container'>
                            <div className='title'>
                                {title}
                            </div>
                            <div className='author'>
                                Author:&nbsp;{book.authors}
                            </div>
                        </div>
                        <div className='trade-button-container'>
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
                        <div className='trade-button-container'>
                            {isLoggedIn ?
                                <div className='text-wrapper' onClick={() => {}}>Request 📘</div> :
                             <Link to='/login'><div className='text-wrapper'>Log in & request 📘</div></Link>
                            }
                        </div>
                    </div>
                );
            }) : ''}
        </div>
    );
}
