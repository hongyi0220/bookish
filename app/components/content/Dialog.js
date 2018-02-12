import React from 'react';
import { Header, Image, Modal, Icon } from 'semantic-ui-react';
import ButtonsContainer from '../buttons/ButtonsContainer';

const Dialog = props => {
    const state = props.state;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
    const isModalOepn = state.ui.isModalOpen;
    const isLoggedIn = state.user;
    const foundBook = state.foundBook;
    const imgRootUrl = props.imgRootUrl;
    const imgSrcParams = props.imgSrcParams;
    const requestBook = props.requestBook;
    const removeBook = props.removeBook;
    const addBook = props.addBook;
    const bookId = props.bookId;
    const doIOwn = props.doIOwn;

    return (
        <Modal dimmer={'blurring'} open={isModalOepn} onClose={closeModal} closeIcon>
            <Modal.Header>{foundBook.volumeInfo.title}</Modal.Header>
            <Modal.Content image>
                <Image wrapped size='medium' src={imgRootUrl + foundBook.id + imgSrcParams}/>
                <Modal.Description>
                    <Header>{foundBook.volumeInfo.title}</Header>
                    <p>{foundBook.volumeInfo.description}</p>
                    <p>Author:&nbsp;{foundBook.volumeInfo.authors}</p>
                    <p>Category:&nbsp;{foundBook.volumeInfo.categories}</p>
                    <p>Published date:&nbsp;{foundBook.volumeInfo.publishedDate}</p>
                    <p>Page count:&nbsp;{foundBook.volumeInfo.pageCount}</p>
                </Modal.Description>
            </Modal.Content>
            <ButtonsContainer state={state} requestBook={requestBook} removeBook={removeBook} addBook={addBook}
                bookId={bookId} doIOwn={doIOwn}/>
        </Modal>
    );
}
export default Dialog;
