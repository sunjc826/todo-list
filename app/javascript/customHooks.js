import { useState } from "react";
import { useLocation } from "react-router-dom";
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  const [modalHeader, setModalHeader] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  return {
    modalOpen,
    toggleModal,
    modalHeader,
    setModalHeader,
    modalContent,
    setModalContent,
  };
};
