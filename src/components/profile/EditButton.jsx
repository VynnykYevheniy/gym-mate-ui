import { FaUserCircle, FaEdit, FaAddressCard, FaRulerCombined } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const EditOptionsDropdown = ({ toggleDropdown, showDropdown, handleEditProfile }) => {
	return (
		<div className="fixed bottom-6 right-6 mb-12">
			<motion.div animate={showDropdown ? 'open' : 'closed'} className="relative">
				{/* Выпадающее меню */}
				<motion.ul
					initial={dropdownVariants.closed}
					variants={dropdownVariants}
					className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute bottom-[100%] right-0 translate-y-[-10%] w-36 overflow-hidden z-50"
				>
					<Option
						icon={<FaUserCircle className="text-green-500" />}
						text="Avatar"
						onClick={() => handleEditProfile('avatar')}
					/>
					<Option
						icon={<FaAddressCard className="text-green-500" />}
						text="Contacts"
						onClick={() => handleEditProfile('contact')}
					/>
					<Option
						icon={<FaRulerCombined className="text-green-500" />}
						text="Body"
						onClick={() => handleEditProfile('anthropometry')}
					/>
				</motion.ul>

				{/* Кнопка */}
				<button
					aria-label="Edit Profile"
					aria-haspopup="true"
					aria-expanded={showDropdown}
					onClick={toggleDropdown}
					className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
				>
					<FaEdit className="h-6 w-6" />
				</button>
			</motion.div>
		</div>
	);
};

const Option = ({ icon, text, onClick }) => {
	return (
		<motion.li
			variants={itemVariants}
			onClick={onClick}
			className="flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-green-100 text-gray-700 hover:text-green-500 transition-colors cursor-pointer"
		>
			{icon}
			<span>{text}</span>
		</motion.li>
	);
};
Option.propTypes = {
	icon: PropTypes.object,
	text: PropTypes.string,
	onClick: PropTypes.func
}

EditOptionsDropdown.propTypes = {
	toggleDropdown: PropTypes.func.isRequired,
	showDropdown: PropTypes.bool.isRequired,
	handleEditProfile: PropTypes.func.isRequired,
};

export default EditOptionsDropdown;

// Анимация для меню
const dropdownVariants = {
	open: {
		scaleY: 1,
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.1,
		},
	},
	closed: {
		scaleY: 0,
		transition: {
			when: 'afterChildren',
		},
	},
};

// Анимация для пунктов меню
const itemVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			when: 'beforeChildren',
		},
	},
	closed: {
		opacity: 0,
		y: -10,
		transition: {
			when: 'afterChildren',
		},
	},
};