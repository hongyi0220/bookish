import React from 'react';
import { Header, Image, Modal, Icon } from 'semantic-ui-react';
import ButtonsContainer from '../buttons/ButtonsContainer';
import PropTypes from 'prop-types';

const Dialog = props => {
    const state = props.state;
    const isModalOepn = state.ui.isModalOpen;
    const isLoggedIn = state.user;
    const foundBook = state.foundBook;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
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
Dialog.propTypes = {
    state: PropTypes.object.isRequired,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    imgRootUrl: PropTypes.string,
    imgSrcParams: PropTypes.string,
    requestBook: PropTypes.func,
    removeBook: PropTypes.func,
    addBook: PropTypes.func,
    bookId: PropTypes.func,
    doIOwn: PropTypes.func
}
