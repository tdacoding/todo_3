import { MainPage } from './components/MainPage';
import { Task } from './components/Task';
import { Route, Routes, useNavigate } from 'react-router-dom';

export const App = () => {
	const NotFound = () => <div>404</div>;
	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
			<Route path="/" element={<MainPage />} />

			<Route path="task/:id" element={<Task />} />
		</Routes>
	);
};
