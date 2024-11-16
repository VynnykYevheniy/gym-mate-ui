import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/generic/Footer.jsx'; // Импортируйте ваш компонент Footer

const PrivateRoute = () => {
	const token = localStorage.getItem('token');
	return token ? (
		<>
			<Outlet /> {/* Дочерние маршруты будут отображаться здесь */}
			<Footer /> {/* Футер отображается только для авторизованных пользователей */}
		</>
	) : (
		<Navigate to="/signin" /> // Перенаправление на страницу входа, если не авторизован
	);
};

export default PrivateRoute;
