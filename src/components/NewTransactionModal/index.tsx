import React from "react";
import Modal from "react-modal";

interface NewTransactionModal {
  isOpen: boolean,
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModal) {

  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <h2>Cadastrar transação</h2>
      </Modal>
  )
}