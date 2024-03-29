import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { closeModal } from '../../slices/modalSlice';
import { deleteCard } from '../../slices/dataSlice.js';

const ModalOnRemove = () => {
  const { t } = useTranslation();

  const selector = useSelector((state) => state.modal);
  const { isShown, targetId } = selector.modal;

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(deleteCard(id));
    dispatch(closeModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isShown} centered data-testid="modal-for-delete">
      <Modal.Header closeButton>
        <Modal.Title data-testid="modal-title">{t('deleteQuestion')}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={() => handleRemove(targetId)} variant="outline-danger" data-testid="modal-delete">
          {t('delete')}
        </Button>
        <Button onClick={handleClose} variant="outline-sucsess" data-testid="modal-close">
          {t('cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalOnRemove;
