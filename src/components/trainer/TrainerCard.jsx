import {FaStar, FaUserFriends, FaUserTie} from 'react-icons/fa';
import PropTypes from "prop-types";

const TrainerCard = ({trainer, navigate, isSubscribed, onSubscribe, onUnsubscribe}) => {
	return (
		<div
			onClick={() => navigate(`/trainer/${trainer.id}`)}
			className="flex items-center bg-white border border-gray-50 rounded-xl p-2 cursor-pointer transition-transform duration-200 hover:shadow-lg hover:scale-105 active:scale-95 w-full max-w-lg mx-auto"
		>
			<div
				className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden mr-3 shadow-sm">
				{trainer.user.photoUrl ? (
					<img
						src={trainer.user.photoUrl}
						alt={`${trainer.user.firstName} ${trainer.user.lastName}`}
						className="w-full h-full object-cover"
					/>
				) : (
					<FaUserTie className="text-blue-500 text-xl"/>
				)}
			</div>

			<div className="flex-grow text-left">
				<h3 className="text-base text-gray-500 truncate">
					{trainer.user.firstName} {trainer.user.lastName}
				</h3>
				<div className="flex items-center text-gray-500 space-x-3 mt-1">
					<div className="flex items-center text-sm">
						<FaStar className="text-yellow-200 mr-1"/>
						<span className="font-medium">{trainer.averageRating} / 5</span>
					</div>
					<span className="text-gray-300">|</span>
					<div className="flex items-center text-sm">
						<FaUserFriends className="text-green-500 mr-1"/>
						<span className="font-medium">{trainer.subscribersCount} followers</span>
					</div>
				</div>
			</div>

			<button
				className={`px-3 py-1 text-sm font-semibold rounded-full shadow-md transition duration-150 ${
					isSubscribed
						? 'bg-gray-300 text-white hover:bg-gray-600 active:bg-gray-700'
						: 'bg-green-400 text-white hover:bg-green-600 active:bg-green-700'
				}`}
				onClick={(e) => {
					e.stopPropagation();
					isSubscribed ? onUnsubscribe(trainer.id) : onSubscribe(trainer.id);
				}}
			>
				{isSubscribed ? 'Unfollow' : 'Follow'}
			</button>
		</div>
	);
};

TrainerCard.propTypes = {
	trainer: PropTypes.shape({
		id: PropTypes.number.isRequired,
		user: PropTypes.shape({
			firstName: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired,
			photoUrl: PropTypes.string,
		}).isRequired,
		averageRating: PropTypes.number.isRequired,
		subscribersCount: PropTypes.number.isRequired,
	}).isRequired,
	navigate: PropTypes.func.isRequired,
	isSubscribed: PropTypes.bool.isRequired,
	onSubscribe: PropTypes.func.isRequired,
	onUnsubscribe: PropTypes.func.isRequired,
};

export default TrainerCard;