import React from 'react';
import { Link } from 'react-router-dom';

export const SearchResults = props => {
    const state = props.state;
    const searchResults = state.searchResults;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const params = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShade = props.toggleImgShade;
    const imgShadeStyle = state.ui.imgShade.style;
    const shadeId = state.ui.imgShade.origin;
    const imgClass = state.ui.imgShade.class;
    const isLoggedIn = state.user;
    const gridView = state.ui.gridView;
    // const toggleViewFormat = props.toggleViewFormat;
    console.log('imgClass:',imgClass);
    console.log('imgShadeStyle:',imgShadeStyle);
    console.log('shadeId:',shadeId);
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
            {(searchResults && gridView) ? searchResults.items.map((item, i) => {
                const book = item.volumeInfo;
                const authorName = book.authors ? book.authors[0] : 'Unknown';
                console.log('book.authors:', author);
                const author = removeMiddleName(authorName);
                const title = shortenTitle(book.title, 18);
                // const imageSrc = book.imageLinks ? book.imageLinks.thumbnail : '';
                const imgUrl = imgRootUrl + item.id + params;
                let imgStyle = {
                    backgroundImage: 'url(' + imgUrl + ')',
                };

                return (
                    <div key={i} className='book'>
                        <div className={'shade' + i === shadeId ? 'img' + imgClass : 'img'} style={imgStyle}></div>

                         <div id={'shade' + i} className='img-shade'
                             style={'shade' + i === shadeId ? imgShadeStyle : {}}
                              onMouseEnter={toggleImgShade} onMouseLeave={toggleImgShade}>

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
                            {isLoggedIn ? <div className='text-wrapper'>Request 📘</div> :
                             <Link to='/login'><div className='text-wrapper'>Log in & request 📘</div></Link>}
                        </div>
                    </div>
                );
            }) : ''}
            {(searchResults && !gridView) ?
            searchResults.items.map((item, i) => {
                const book = item.volumeInfo;
                const imgSrc = book.imageLinks ? book.imageLinks.thumbnail : '';
                const title = shortenTitle(book.title, 25);
                const authorName = book.authors ? book.authors[0] : 'Unknown';
                const author = removeMiddleName(authorName);
                console.log('book.authors:', author);

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
                            {isLoggedIn ? <div className='text-wrapper'>Request 📘</div> :
                             <Link to='/login'><div className='text-wrapper'>Log in & request 📘</div></Link>}
                        </div>
                    </div>
                );
            }) : ''}
        </div>
    );
}
