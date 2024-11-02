import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import Loader from "./Loader.jsx";
import { FaStar, FaUserFriends, FaUserTie } from 'react-icons/fa';
import { fetchTrainers } from "../service/TrainerService.jsx";
import { fetchUserSubscriptions, subscribeToTrainer, unsubscribeToTrainer } from "../service/ClientService.jsx";

const TrainersTable = () => {
	const [trainers, setTrainers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState('');
	const [subscriptions, setSubscriptions] = useState([]);
	const navigate = useNavigate();

	const loadTrainers = async () => {
		setLoading(true);
		try {
			const data = await fetchTrainers();
			setTrainers(data);

			const userSubscriptions = await fetchUserSubscriptions();
			setSubscriptions(userSubscriptions);
		} catch (error) {
			setError('Ошибка при загрузке данных тренеров.');
			console.error('Error fetching trainers:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadTrainers();
	}, []);

	const handleSubscribe = async (trainerId) => {
		try {
			await subscribeToTrainer(trainerId);
			setSuccessMessage('Вы успешно подписались на тренера!');
			await loadTrainers();
		} catch (error) {
			setError(error.message);
		}
	};

	const handleUnsubscribe = async (trainerId) => {
		try {
			await unsubscribeToTrainer(trainerId);
			setSuccessMessage('Вы успешно отписались от тренера!');
			await loadTrainers();
		} catch (error) {
			setError(error.message);
		}
	};

	const filteredTrainers = searchTerm
		? trainers.filter(trainer =>
			trainer.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			trainer.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
		)
		: trainers;

	return (
		<div className="container mx-auto p-6">
			<div className="w-full mb-4">
				<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} phText="Поиск тренера"/>
			</div>

			{loading ? (
				<Loader/>
			) : error ? (
				<div className="text-red-500 text-center">{error}</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
					{filteredTrainers.length > 0 ? (
						filteredTrainers.map((trainer) => (
							<div
								key={trainer.id}
								onClick={() => navigate(`/trainer/${trainer.id}`)} // Navigate to TrainerProfile
								className="flex items-center bg-white border border-gray-50 rounded-xl p-2 cursor-pointer transition-transform duration-200 hover:shadow-lg hover:scale-105 active:scale-95 w-full max-w-lg mx-auto"
							>
								{/* Profile Picture */}
								<div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden mr-3 shadow-sm">
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

								{/* User Details */}
								<div className="flex-grow text-left">
									<h3 className="text-base text-gray-500 truncate">
										{trainer.user.firstName} {trainer.user.lastName}
									</h3>

									<div className="flex items-center text-gray-500 space-x-3 mt-1">
										{/* Rating */}
										<div className="flex items-center text-sm">
											<FaStar className="text-yellow-200 mr-1"/>
											<span className="font-medium">{trainer.averageRating} / 5</span>
										</div>

										{/* Separator */}
										<span className="text-gray-300">|</span>

										{/* Followers */}
										<div className="flex items-center text-sm">
											<FaUserFriends className="text-green-500 mr-1"/>
											<span className="font-medium">{trainer.subscribersCount} followers</span>
										</div>
									</div>
								</div>

								{/* Follow Button */}
								<button
									className={`px-3 py-1 text-sm font-semibold rounded-full shadow-md transition duration-150 ${
										subscriptions.includes(trainer.id)
											? 'bg-gray-300 text-white hover:bg-gray-600 active:bg-gray-700'
											: 'bg-green-400 text-white hover:bg-green-600 active:bg-green-700'
									}`}
									onClick={(e) => {
										e.stopPropagation();
										subscriptions.includes(trainer.id)
											? handleUnsubscribe(trainer.id)
											: handleSubscribe(trainer.id);
									}}
								>
									{subscriptions.includes(trainer.id) ? 'Unfollow' : 'Follow'}
								</button>
							</div>
						))
					) : (
						<div className="text-gray-500 text-center">Тренеры не найдены.</div>
					)}
				</div>
			)}
		</div>
	);
};

export default TrainersTable;