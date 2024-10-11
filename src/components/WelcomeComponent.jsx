import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {FaChartLine, FaDumbbell, FaHeartbeat, FaRunning} from 'react-icons/fa'; // Иконки FontAwesome
import feedbackMen1 from '../assets/image/feedback-men-1.png';
import feedbackWomen1 from '../assets/image/feedback-women-1.png';

const WelcomeComponent = () => {
	const {t} = useTranslation();

	return (
		<main className="flex flex-col justify-center p-6 pb-12">
			{/* Hero Section */}
			<section className="mx-auto mt-0 w-full max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg">
				<div className="mt-0 space-y-8">
					<h1 className="text-4xl font-extrabold text-black text-center">
						{t('welcome.message')}
						<span className="text-green-500 font-extrabold"> Gym Mate</span>
					</h1>
					<p className="text-lg text-gray-700 text-center">
						<span className="text-green-500 font-bold">Gym Mate</span>, {t('welcome.description')}
					</p>
					<Link to="/signin">
						<button
							className="bg-green-500 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:bg-green-600 transition duration-200 transform hover:scale-105 w-full mt-6">
							{t('welcome.getStarted')}
						</button>
					</Link>
				</div>
			</section>

			{/* Product Information Section */}
			<section className="mx-auto mt-10 max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg">
				<h2 className="text-3xl font-extrabold mb-4">
					{t('welcome.featuresTitle')}
					<span className="text-green-500 font-extrabold"> Gym Mate</span>?
				</h2>
				<p className="text-gray-600 mb-8">{t('welcome.featuresDescription')}</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					{[
						{
							icon: <FaDumbbell size={40} className="text-yellow-300 mb-3"/>,
							title: t('welcome.feature1.title'),
							description: t('welcome.feature1.description')
						},
						{
							icon: <FaRunning size={40} className="text-blue-600 mb-3"/>,
							title: t('welcome.feature2.title'),
							description: t('welcome.feature2.description')
						},
						{
							icon: <FaHeartbeat size={40} className="text-red-600 mb-3"/>,
							title: t('welcome.feature3.title'),
							description: t('welcome.feature3.description')
						},
						{
							icon: <FaChartLine size={40} className="text-green-500 mb-3"/>,
							title: t('welcome.feature4.title'),
							description: t('welcome.feature4.description')
						},
					].map((feature, index) => (
						<div key={index}
							 className="p-6 bg-gray-100 shadow-md rounded-lg flex flex-col items-center transition-transform transform hover:scale-105">
							{feature.icon}
							<h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
							<p className="text-gray-500">{feature.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Client Testimonials Section */}
			<section className="mx-auto mt-10 max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg">
				<h2 className="relative text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-black to-green-600">
					{t('welcome.testimonialsTitle')}
					<span
						className="absolute left-0 right-0 bottom-0 transform translate-y-2 h-1 bg-gradient-to-r from-black to-green-600"/>
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
					{[
						{
							image: feedbackMen1,
							testimonial: t('welcome.testimonial1'),
							author: t('welcome.testimonialAuthor1')
						},
						{
							image: feedbackWomen1,
							testimonial: t('welcome.testimonial2'),
							author: t('welcome.testimonialAuthor2')
						}
					].map((client, index) => (
						<div key={index}
							 className="flex flex-col items-center p-6 bg-gray-50 shadow-md rounded-lg transition-transform transform hover:scale-105">
							<img
								src={client.image}
								alt={`Client ${index + 1}`}
								className="w-24 h-24 rounded-full border-4 border-green-500 mb-4 shadow-md"
							/>
							<p className="italic text-gray-600 mb-2">&#34;{client.testimonial}&#34;</p>
							<p className="mt-2 font-semibold text-gray-800">{client.author}</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
};

export default WelcomeComponent;