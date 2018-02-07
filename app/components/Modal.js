<Modal dimmer={'blurring'} open={isModalOepn} onClose={closeModal} closeIcon>
    <Modal.Header>{foundBook.volumeInfo.title}</Modal.Header>
    <Modal.Content image>
        <Image wrapped size='medium' src={imgRootUrl + foundBook.id + params}/>
        <Modal.Description>
            <Header>{foundBook.volumeInfo.title}</Header>
            {/* const foundBookAuthor = foundBook.volumeInfo.authors;
            const foundBookCategory = foundBook.volumeInfo.categories;
            const foundBookPageCount = foundBook.volumeInfo.pageCount;
            foundBook.volumeInfo.publishedDate; */}
            {/* <div className='book-info-container'> */}
                <p>{foundBook.volumeInfo.description}</p>
                <p>Author:&nbsp;{foundBook.volumeInfo.authors}</p>
                <p>Category:&nbsp;{foundBook.volumeInfo.categories}</p>
                <p>Published date:&nbsp;{foundBook.volumeInfo.publishedDate}</p>
                <p>Page count:&nbsp;{foundBook.volumeInfo.pageCount}</p>
            {/* </div> */}
        </Modal.Description>
    </Modal.Content>
    <div className='request-button-container' style={requestButtonStyles}>
        {isLoggedIn ?
            <div className='text-wrapper' onClick={() => {addBook(bookId)}}>I own this 📘</div> :
            <Link to='/login'>
                <div className='text-wrapper' style={textWrapperStyles}>Log in & add 📘</div>
            </Link>}
    </div>
</Modal>
