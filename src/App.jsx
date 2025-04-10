import { MainPage } from './components/MainPage';
import { Task } from './components/Task';
import { Route, Routes, Navigate } from 'react-router-dom';

export const App = () => {
	const NotFound = () => <div>404</div>;
	return (
		<Routes>
			<Route path="*" element={<Navigate to="/404" />} />
			<Route path="/" element={<MainPage />} />
			<Route path="/404" element={<NotFound />} />
			<Route path="task/:id" element={<Task />} />
		</Routes>
	);
};
