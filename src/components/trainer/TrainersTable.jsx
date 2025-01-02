import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../SearchBar.jsx';
import TrainerCard from './TrainerCard.jsx';
import {fetchTrainers} from '../../service/TrainerService.jsx';
import {fetchUserSubscriptions, subscribeToTrainer, unsubscribeToTrainer} from '../../service/ClientService.jsx';

const TrainersTable = () => {
	const [trainers, setTrainers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [error, setError] = useState(null);
	const [subscriptions, setSubscriptions] = useState([]);
	const navigate = useNavigate();

	const loadTrainers = async () => {
		try {
			const data = await fetchTrainers();
			setTrainers(data);

			const userSubscriptions = await fetchUserSubscriptions();
			setSubscriptions(userSubscriptions);
		} catch (error) {
			setError('Ошибка при загрузке данных тренеров.');
			console.error('Error fetching trainers:', error);
		}
	};

	useEffect(() => {
		loadTrainers();
	}, []);

	const handleSubscribe = async (trainerId) => {
		try {
			await subscribeToTrainer(trainerId);
			await loadTrainers();
		} catch (error) {
			setError(error.message);
		}
	};

	const handleUnsubscribe = async (trainerId) => {
		try {
			await unsubscribeToTrainer(trainerId);
			await loadTrainers();
		} catch (error) {
			setError(error.message);
		}
	};

	const filteredTrainers = searchTerm
		? trainers.filter((trainer) =>
			trainer.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			trainer.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
		)
		: trainers;

	return (
		<div className="container mx-auto p-6">
			<div className="w-full mb-4">
				<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} phText="Поиск тренера"/>
			</div>

			{error && <div className="text-red-500 text-center">{error}</div>}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
				{filteredTrainers.length > 0 ? (
					filteredTrainers.map((trainer) => (
						<TrainerCard
							key={trainer.id}
							trainer={trainer}
							navigate={navigate}
							isSubscribed={subscriptions.includes(trainer.id)}
							onSubscribe={handleSubscribe}
							onUnsubscribe={handleUnsubscribe}
						/>
					))
				) : (
					<div className="text-gray-500 text-center">Тренеры не найдены.</div>
				)}
			</div>
		</div>
	);
};
export default TrainersTable;