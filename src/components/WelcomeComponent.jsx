import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
	FaBicycle,
	FaChartLine,
	FaDumbbell,
	FaHeartbeat,
	FaMountain,
	FaRunning,
	FaSwimmer,
	FaUserFriends
} from 'react-icons/fa';
import feedbackMen1 from '../assets/image/feedback-men-1.png';
import feedbackWomen1 from '../assets/image/feedback-women-1.png';

const WelcomeComponent = () => {
	const { t } = useTranslation();

	return (
		<main className="flex flex-col justify-center p-10 pb-12">

			{/* Hero Section */}
			<section className="mx-auto mt-0 w-full max-w-5xl p-8 text-center bg-white rounded-lg shadow-lg">
				<div className="mt-0 space-y-8">
					<h1 className="text-6xl font-extrabold text-black text-center">
						{t('welcome.message')}
						<span className="text-green-500 font-extrabold"> Gym Mate</span>
					</h1>
					<p className="text-xl text-gray-700 text-center">
						<span className="text-green-500 font-bold">Gym Mate</span>, {t('welcome.description')}
					</p>
					<Link to="/signin">
						<button className="bg-green-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200 transform hover:scale-105 w-full mt-6">
							{t('welcome.getStarted')}
						</button>
					</Link>
				</div>
			</section>

			{/* Product Information Section */}
			<section className="mx-auto mt-10 max-w-5xl p-8 text-center bg-white rounded-lg shadow-lg">
				<h2 className="text-5xl font-extrabold mb-4">
					{t('welcome.featuresTitle')}
					<span className="text-green-500 font-extrabold"> Gym Mate</span>?
				</h2>
				<p className="text-gray-600 mb-8">{t('welcome.featuresDescription')}</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{[
						{
							icon: <FaDumbbell size={60} className="text-yellow-300 mb-3" />,
							title: t('welcome.feature1.title'), // "Track Your Progress"
							description: t('welcome.feature1.description') // "Keep a detailed log of your workouts and track your performance."
						},
						{
							icon: <FaRunning size={60} className="text-blue-600 mb-3" />,
							title: t('welcome.feature2.title'), // "Custom Workouts"
							description: t('welcome.feature2.description') // "Create and save personalized workout routines tailored to your needs."
						},
						{
							icon: <FaHeartbeat size={60} className="text-red-600 mb-3" />,
							title: t('welcome.feature3.title'), // "Stay Motivated"
							description: t('welcome.feature3.description') // "Receive motivational tips and reminders to keep you on track."
						},
						{
							icon: <FaChartLine size={60} className="text-green-500 mb-3" />,
							title: t('welcome.feature4.title'), // "Community Support"
							description: t('welcome.feature4.description') // "Join a community of like-minded individuals and share your journey."
						},
						{
							icon: <FaMountain size={60} className="text-orange-500 mb-3" />,
							title: t('welcome.feature5.title'), // "Fitness Challenges"
							description: t('welcome.feature5.description') // "Participate in challenges to push your limits and achieve more."
						},
						{
							icon: <FaSwimmer size={60} className="text-teal-500 mb-3" />,
							title: t('welcome.feature6.title'), // "Nutrition Tracking"
							description: t('welcome.feature6.description') // "Log your meals and track your nutrition to fuel your workouts."
						},
						{
							icon: <FaBicycle size={60} className="text-red-800 mb-3" />,
							title: t('welcome.feature7.title'), // "Progress Insights"
							description: t('welcome.feature7.description') // "Get insights and analytics on your fitness journey over time."
						},
						{
							icon: <FaUserFriends size={60} className="text-purple-600 mb-3" />,
							title: t('welcome.feature8.title'), // "Live Classes"
							description: t('welcome.feature8.description') // "Join live workout classes with trainers and connect with others."
						},
					].map((feature, index) => (
						<div key={index} className="p-6 bg-gray-100 shadow-md rounded-lg flex flex-col items-center transition-transform transform hover:scale-105">
							{feature.icon}
							<h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
							<p className="text-gray-500">{feature.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Client Testimonials Section */}
			<section className="mx-auto mt-10 max-w-5xl p-8 text-center bg-white rounded-lg shadow-lg">
				<h2 className="relative text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-black to-green-600">
					{t('welcome.testimonialsTitle')}
					<span className="absolute left-0 right-0 bottom-0 transform translate-y-2 h-1 bg-gradient-to-r from-black to-green-600" />
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
						},
					].map((client, index) => (
						<div key={index} className="flex flex-col items-center p-6 bg-gray-50 shadow-md rounded-lg transition-transform transform hover:scale-105">
							<img src={client.image} alt={`Client ${index + 1}`} className="w-32 h-32 rounded-full border-4 border-green-500 mb-4 shadow-md" />
							<p className="italic text-gray-600 mb-2">&#34;{client.testimonial}&#34;</p>
							<p className="mt-2 font-semibold text-gray-800">{client.author}</p>
						</div>
					))}
				</div>
			</section>

			{/* Tips Section */}
			<section className="mx-auto mt-10 max-w-5xl p-8 text-center bg-white rounded-lg shadow-lg">
				<h2 className="text-5xl font-extrabold mb-4">{t('welcome.tipsTitle')}</h2>
				<p className="text-gray-600 mb-8">{t('welcome.tipsDescription')}</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<ul className="list-disc list-inside space-y-4 text-left max-w-xl mx-auto">
						<li className="flex items-center">
							<span className="text-green-500 mr-2">🌟</span>
							{t('welcome.tip1')}
						</li>
						<li className="flex items-center">
							<span className="text-green-500 mr-2">🏆</span>
							{t('welcome.tip2')}
						</li>
						<li className="flex items-center">
							<span className="text-green-500 mr-2">📅</span>
							{t('welcome.tip3')}
						</li>
					</ul>
					<div className="flex flex-col items-center">
						<h3 className="text-2xl font-semibold mb-4">Quick Tips for Success</h3>
						<p className="text-gray-500 mb-6">Consistency is key! Follow these tips to elevate your workout experience.</p>
					</div>
				</div>
				<img
					src="https://img-cdn.pixlr.com/image-generator/history/6712be64d8f092ce67f856c1/cfcc8311-48de-4336-afc1-cef1a9147a3e/preview.webp"
					alt="Motivation"
					className="rounded-lg shadow-md w-full h-auto mt-6" // Добавляем отступ сверху
				/>
			</section>

			{/* FAQ Section */}
			<section className="mx-auto mt-10 max-w-5xl p-10 text-center bg-white rounded-lg shadow-lg">
				<h2 className="text-6xl font-extrabold mb-4">{t('welcome.faqTitle')}</h2>
				<p className="text-gray-600 mb-10">{t('welcome.faqDescription')}</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[
						{ question: t('welcome.faq1.question'), answer: t('welcome.faq1.answer') },
						{ question: t('welcome.faq2.question'), answer: t('welcome.faq2.answer') },
						{ question: t('welcome.faq3.question'), answer: t('welcome.faq3.answer') },
						{ question: t('welcome.faq4.question'), answer: t('welcome.faq4.answer') },
						{ question: t('welcome.faq5.question'), answer: t('welcome.faq5.answer') },
						{ question: t('welcome.faq6.question'), answer: t('welcome.faq6.answer') },
					].map((item, index) => (
						<div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full">
							<h4 className="font-semibold text-lg">{item.question}</h4>
							<p className="text-gray-600 mt-2">{item.answer}</p>
						</div>
					))}
				</div>
			</section>

			{/* Blog Section */}
			<section className="mx-auto mt-10 max-w-5xl p-8 text-center bg-white rounded-lg shadow-lg">
				<h2 className="text-5xl font-extrabold mb-4">{t('welcome.blogTitle')}</h2>
				<p className="text-gray-600 mb-8">{t('welcome.blogDescription')}</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{[
						{
							title: t('welcome.blogPost1Title'),
							summary: t('welcome.blogPost1Summary'),
							link: '/blog/post1'
						},
						{
							title: t('welcome.blogPost2Title'),
							summary: t('welcome.blogPost2Summary'),
							link: '/blog/post2'
						},
					].map((post, index) => (
						<Link to={post.link} key={index}>
							<div className="p-6 bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200 w-full">
								<h3 className="text-xl font-semibold mb-2">{post.title}</h3>
								<p className="text-gray-500">{post.summary}</p>
							</div>
						</Link>
					))}
				</div>
			</section>

		</main>
	);
};

export default WelcomeComponent;