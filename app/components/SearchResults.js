import React from 'react';

export const SearchResults = props => {
    const state = props.state;
    const searchResults = state.searchResults;
    // const imgRootUrl = 'http://books.google.com/books/content?id=';
    // const params = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';

    return (
        <div className='results-container'>
            {searchResults ? searchResults.items.map(item => {
                const book = item.volumeInfo;
                const imageSrc = book.imageLinks ? book.imageLinks.smallThumbnail : '';
                return (
                    <div className='book'>
                        <div className='title'>
                            Title:&nbsp;{book.title}
                            <img style={{height: 65 + 'px'}} src={imageSrc}/>
                        </div>
                        <div className='author'>
                            Author:&nbsp;{book.authors}
                        </div>
                    </div>
                );
            }) : ''}
        </div>
    );
}
