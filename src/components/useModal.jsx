import { useState } from 'react';

const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Opens the modal
	const openModal = () => {
		setIsModalOpen(true);
	};

	// Closes the modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};

export default useModal;