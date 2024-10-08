import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WelcomeComponent = () => {
	const { t } = useTranslation();

	return (
		<main className="flex flex-col justify-center p-6 pb-12">
			<div className="mx-auto mt-0 w-full max-w-md rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:mt-5 sm:p-10">
				<div className="mt-0 space-y-6">
					<h1 className="text-4xl font-bold text-black mb-4 text-center">
						{t('welcome.message', { appName: 'Gym Mate' })}
					</h1>
					<p className="text-lg text-gray-700 mb-6 text-center">
						{t('welcome.description', { appName: 'Gym Mate' })}
					</p>
					<Link to="/signin">
						<button
							className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-150 transform hover:scale-105 w-full mt-4">
							{t('welcome.getStarted')}
						</button>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default WelcomeComponent;