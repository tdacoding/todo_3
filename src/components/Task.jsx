import styles from './Task.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export const Task = () => {
	const [todo, setTodo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const params = useParams();
	const curId = +params.id;

	const requestDeleteTodo = (todo) => {
		fetch('http://localhost:3000/todos/' + todo.id, {
			method: 'DELETE',
		}).then(() => {
			setTodos((prevTodos) =>
				prevTodos.filter((curTodo) => curTodo.id !== todo.id),
			);
		});
	};

	const requestEditTodo = (todo) => {
		fetch('http://localhost:3000/todos/' + todo.id, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todo.title,
			}),
		})
			.then((response) => response.json())
			.then((updatedTodo) => {
				setTodos((prevTodos) =>
					prevTodos.map((curTodo) => (curTodo.id === todo.id ? todo : curTodo)),
				);
			});
	};
	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3000/todos')
			.then((response) => response.json())
			.then((data) => {
				setTodo(data.filter((curTodo) => curTodo.id === curId)[0]);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<>
			<h1>Текущая задача</h1>
			{isLoading ? <div className={styles.loader}></div> : <div>{todo.title}</div>}
		</>
	);
};
