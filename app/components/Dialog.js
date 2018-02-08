import React from 'react';
import { Header, Image, Modal, Icon } from 'semantic-ui-react';
import { ButtonsContainer } from './buttons/ButtonsContainer';

export const Dialog = props => {
    const state = props.state;
    const openModal = props.openModal;
    const closeModal = props.closeModal;
    const isModalOepn = state.ui.isModalOpen;
    const isLoggedIn = state.user;
    const foundBook = state.foundBook;
    const imgRootUrl = props.imgRootUrl;
    const params = props.params;

    return (
        <Modal dimmer={'blurring'} open={isModalOepn} onClose={closeModal} closeIcon>
            <Modal.Header>{foundBook.volumeInfo.title}</Modal.Header>
            <Modal.Content image>
                <Image wrapped size='medium' src={imgRootUrl + foundBook.id + params}/>
                <Modal.Description>
                    <Header>{foundBook.volumeInfo.title}</Header>
                    <p>{foundBook.volumeInfo.description}</p>
                    <p>Author:&nbsp;{foundBook.volumeInfo.authors}</p>
                    <p>Category:&nbsp;{foundBook.volumeInfo.categories}</p>
                    <p>Published date:&nbsp;{foundBook.volumeInfo.publishedDate}</p>
                    <p>Page count:&nbsp;{foundBook.volumeInfo.pageCount}</p>
                </Modal.Description>
            </Modal.Content>
            <ButtonsContainer state={state} />
        </Modal>
    );
}
