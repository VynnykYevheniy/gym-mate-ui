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
import feedbackMen1 from '../../assets/image/feedback-men-1.png';
import feedbackWomen1 from '../../assets/image/feedback-women-1.png';

const WelcomeComponent = () => {
	const { t } = useTranslation();

	return (
		<main className="flex flex-col justify-center p-2 ">

			{/* Hero Section */}
			<section className="mx-auto mt-0 w-full max-w-5xl p-8 text-center">
				<div className="mt-0 space-y-8">
					<h1 className="text-3xl font-extrabold text-secondTextColor text-center">
						{t('welcome.message')}
						<span className="text-primary font-extrabold"> Gym Mate</span>
					</h1>
					<p className="text-xl text-secondTextColor text-center">
						<span className="text-primary font-bold">Gym Mate</span>, {t('welcome.description')}
					</p>
					<Link to="/signin">
						<button className="bg-primary text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-primaryHover transition duration-200 transform hover:scale-105 w-full mt-6">
							{t('welcome.getStarted')}
						</button>
					</Link>
				</div>
			</section>

			{/* Product Information Section */}
			<section className="mx-auto max-w-5xl p-8">
				<h2 className="text-3xl font-extrabold mb-4">
					{t('welcome.featuresTitle')}
					<span className="text-primary font-extrabold"> Gym Mate</span>?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{[
						{
							icon: <i className="fa-solid fa-dumbbell text-yellow-300"></i>,
							title: t('welcome.feature1.title'), // "Track Your Progress"
							//description: t('welcome.feature1.description') // "Keep a detailed log of your workouts and track your performance."
						},
						{
							icon: <i className="fa-solid fa-person-running text-blue-600"></i>,
							title: t('welcome.feature2.title'), // "Custom Workouts"
							//description: t('welcome.feature2.description') // "Create and save personalized workout routines tailored to your needs."
						},
						{
							icon: <i className="fa-solid fa-heart-pulse text-red-600"></i>,
							title: t('welcome.feature3.title'), // "Stay Motivated"
							description: t('welcome.feature3.description') // "Receive motivational tips and reminders to keep you on track."
						},
						{
							icon: <i className="fa-solid fa-chart-line text-green-500"></i>,
							title: t('welcome.feature4.title'), // "Community Support"
							//description: t('welcome.feature4.description') // "Join a community of like-minded individuals and share your journey."
						},
						{
							icon: <i className="fa-solid fa-heart text-orange-500"></i>,
							title: t('welcome.feature5.title'), // "Fitness Challenges"
							//description: t('welcome.feature5.description') // "Participate in challenges to push your limits and achieve more."
						},
						{
							icon: <i className="fa-solid fa-person-swimming text-teal-500"></i>,
							title: t('welcome.feature6.title'), // "Nutrition Tracking"
							//description: t('welcome.feature6.description') // "Log your meals and track your nutrition to fuel your workouts."
						},
						{
							icon: <i className="fa-solid fa-bicycle text-red-800"></i>,
							title: t('welcome.feature7.title'), // "Progress Insights"
							//description: t('welcome.feature7.description') // "Get insights and analytics on your fitness journey over time."
						},
						{
							icon: <i className="fa-solid fa-user-group text-purple-600"></i>,
							title: t('welcome.feature8.title'), // "Live Classes"
							//	description: t('welcome.feature8.description') // "Join live workout classes with trainers and connect with others."
						},
					].map((feature, index) => (
						<div key={index}
							 className="flex p-6  h-6 items-center transition-transform transform hover:scale-105 text-center">

							<div
								className="flex flex-col text-2xl  md:flex-row md:items-center md:justify-between w-1/4">
								{feature.icon}
							</div>
							<span className="text-m">{feature.title}</span>
							{//<span className="text-secondTextColor">{feature.description}</span>
							}
						</div>
					))}
				</div>
				{//<p className="text-secondTextColor mb-8">{t('welcome.featuresDescription')}</p>
				}
			</section>

			{/* Client Testimonials Section */}
			<section className="mx-auto max-w-5xl p-8 text-center bg-white ">
				<h2 className="relative text-2xl font-extrabold mb-8  bg-clip-text text-primary">
					{t('welcome.testimonialsTitle')}
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
						<section key={index} className="flex flex-col items-center p-6 bg-gray-50  transition-transform transform hover:scale-105">
							<img src={client.image} alt={`Client ${index + 1}`} className="w-32 h-32 rounded-full border-4 border-primary mb-4" />
							<p className="italic text-secondTextColor mb-2">&#34;{client.testimonial}&#34;</p>
							<p className="mt-2 font-semibold text-secondTextColor">{client.author}</p>
						</section>
					))}
				</div>
			</section>

			{/* FAQ Section */}
			<section className="mx-auto mt-10 max-w-5xl p-10 text-center">
				<h2 className="text-4xl font-extrabold mb-4 text-primary">{t('welcome.faqTitle')}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[
						{ question: t('welcome.faq1.question'), answer: t('welcome.faq1.answer') },
						{ question: t('welcome.faq2.question'), answer: t('welcome.faq2.answer') },
						{ question: t('welcome.faq3.question'), answer: t('welcome.faq3.answer') },
						{ question: t('welcome.faq4.question'), answer: t('welcome.faq4.answer') },
						{ question: t('welcome.faq5.question'), answer: t('welcome.faq5.answer') },
						{ question: t('welcome.faq6.question'), answer: t('welcome.faq6.answer') },
					].map((item, index) => (
						<div key={index} className="bg-gray-50 p-6 rounded-lg transition-transform transform hover:scale-105 w-full">
							<h4 className="font-semibold text-lg">{item.question}</h4>
							<p className="text-secondTextColor mt-2">{item.answer}</p>
						</div>
					))}
				</div>
			</section>

			{/* Blog Section */}
			<section className="mx-auto mt-10 max-w-5xl p-8 text-center">
				<h2 className="text-4xl font-extrabold mb-4 text-primary">{t('welcome.blogTitle')}</h2>
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
							<div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-200 w-full">
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