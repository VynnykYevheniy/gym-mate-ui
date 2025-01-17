import PropTypes from 'prop-types';
import { FaBirthdayCake, FaArrowsAltV } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';
import StatsList from './StatsList.jsx';

const UserStats = ({ user, body }) => {
	const stats = [
		{
			icon: <FaBirthdayCake className="user-stat-icon" />,
			value: `${user?.age || 0} y.o`,
		},
		{
			icon: <GiWeight className="user-stat-icon" />,
			value: `${body?.weight || 75} kg`,
		},
		{
			icon: <FaArrowsAltV className="user-stat-icon" />,
			value: `${body?.height || 175} cm`,
		},
	];

	return <StatsList stats={stats} />;
};

UserStats.propTypes = {
	user: PropTypes.shape({
		age: PropTypes.number, // Вік користувача (необов'язковий, але якщо є, то повинен бути числом)
	}).isRequired, // Поле user є обов'язковим
	body: PropTypes.shape({
		weight: PropTypes.number, // Вага (необов'язкова, але якщо є, то повинен бути числом)
		height: PropTypes.number, // Зріст (необов'язковий, але якщо є, то повинен бути числом)
	}).isRequired, // Поле body є обов'язковим
};

export default UserStats;
