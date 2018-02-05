import React from 'react';

export const SearchResults = props => {
    const state = props.state;
    const searchResults = state.searchResults;
    const imgRootUrl = 'http://books.google.com/books/content?id=';
    const params = '&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api';
    const toggleImgShade = props.toggleImgShade;
    const imgShadeStyle = state.ui.imgShade.style;
    const shadeId = state.ui.imgShade.origin;
    console.log('imgShadeStyle:',imgShadeStyle);
    console.log('shadeId:',shadeId);
    // let layerStyle = {};
    // function dim() {
    //     layerStyle = {
    //         backgroundColor : 'rgba(0,0,0,.4)'
    //     }
    // }

    return (
        <div className='results-container'>
            {searchResults ? searchResults.items.map((item, i) => {
                const book = item.volumeInfo;
                function shortenTitle(title, length) {
                    let result;
                    if(title.length > length) {
                        result = title.slice(0, length) + '...';
                        return result;
                    }
                    else return title;
                }
                // function dim() {
                //     layerStyle.backgroundColor = 'rgba(0,0,0,.4)';
                // }
                const title = shortenTitle(book.title, 18);
                // const imageSrc = book.imageLinks ? book.imageLinks.thumbnail : '';
                const imgUrl = imgRootUrl + item.id + params;
                let imgStyle = {
                    backgroundImage: 'url(' + imgUrl + ')',
                };
                // let layerStyle = {}
                // function dim() {
                //     layerStyle = {
                //         backgroundColor : 'rgba(0,0,0,.4)'
                //     }
                // }
                return (
                    <div key={i} className='book'>
                        {/* <img src={imgSrc}/> */}
                        <div className='img' style={imgStyle}></div>

                         <div id={'shade' + i} className='img-shade'
                             style={'shade' + i === shadeId ? imgShadeStyle : {}}
                              onMouseEnter={toggleImgShade} onMouseLeave={toggleImgShade}>

                            <div className='view-detail-button'>View Detail</div>

                        </div>
                        <div className='summary-container'>
                            <div className='title'>
                                {title}
                            </div>
                            <div className='author'>
                                Author:&nbsp;{book.authors}
                            </div>
                        </div>
                    </div>
                );
            }) : ''}
        </div>
    );
}
