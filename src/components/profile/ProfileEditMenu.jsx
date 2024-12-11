import {useState} from "react";
import {FaRulerCombined, FaUserCircle} from "react-icons/fa";
import {motion} from "framer-motion";
import {MdEdit} from "react-icons/md";
import useModal from "../useModal.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import EditBodyModal from "./EditBodyModal.jsx";
import PropTypes from "prop-types";

const ProfileEditMenu = ({onRefresh}) => {
	const {openModal, closeModal, isModalOpen} = useModal(); // Get modal control functions
	const [showDropdown, setShowDropdown] = useState(false);
	const [activeModal, setActiveModal] = useState(""); // Track active modal (profile or body)

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleModalOpen = (modalName) => {
		setActiveModal(modalName);
		openModal(modalName); // Open modal based on name
	};

	const handleModalClose = () => {
		setActiveModal(null); // Reset active modal
		closeModal(); // Close currently opened modal
		onRefresh();
		setShowDropdown(false);
	};

	return (
		<div className="relative">
			{/* Overlay for closing modal when clicked outside */}
			{showDropdown && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={toggleDropdown} // Close when clicking outside the menu
				/>
			)}

			<div className="fixed bottom-6 right-6 mb-12 z-50">
				<motion.div animate={showDropdown ? "open" : "closed"} className="relative">
					{/* Dropdown menu */}
					<motion.ul
						initial={dropdownVariants.closed}
						variants={dropdownVariants}
						className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute bottom-[100%] right-0 translate-y-[-10%] w-36 overflow-hidden"
					>
						<Option
							icon={<FaUserCircle className="text-green-500"/>}
							text="Profile"
							onClick={() => handleModalOpen("profile")}
						/>
						<Option
							icon={<FaRulerCombined className="text-green-500"/>}
							text="Body"
							onClick={() => handleModalOpen("body")}
						/>
					</motion.ul>

					{/* Edit button */}
					<button
						aria-label="Edit Profile"
						aria-haspopup="true"
						aria-expanded={showDropdown}
						onClick={toggleDropdown}
						className="w-14 h-14 flex items-center justify-center rounded-full bg-green-400 text-white shadow-lg hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						<MdEdit className="h-6 w-6"/>
					</button>
				</motion.div>
			</div>

			{/* Conditionally render modals based on active state */}
			{activeModal === "profile" && (
				<EditProfileModal isOpen={isModalOpen} onClose={handleModalClose}/>
			)}
			{activeModal === "body" && (
				<EditBodyModal isOpen={isModalOpen} onClose={handleModalClose}/>
			)}
		</div>
	);
};

function Option ({icon, text, onClick}) {
	return <motion.li
		variants={itemVariants}
		onClick={onClick}
		className="flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-green-100 text-gray-700 hover:text-green-500 transition-colors cursor-pointer"
	>
		{icon}
		<span>{text}</span>
	</motion.li>
}

const dropdownVariants = {
	open: {
		scaleY: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.1,
		},
	},
	closed: {
		scaleY: 0,
		transition: {
			when: "afterChildren",
		},
	},
};

const itemVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			when: "beforeChildren",
		},
	},
	closed: {
		opacity: 0,
		y: -10,
		transition: {
			when: "afterChildren",
		},
	},
};

ProfileEditMenu.propTypes = {
	onRefresh: PropTypes.func.isRequired,
}
export default ProfileEditMenu;