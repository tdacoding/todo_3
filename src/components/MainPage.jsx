import styles from './MainPage.module.css';
import Table from './Table';
import { Form } from './Form';
import { SearchForm } from './SearchForm';
import { useEffect, useState, useRef } from 'react';

export const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [reset, setReset] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const formInputRef = useRef(null);

	const table = {
		title: {
			name: 'Задача',
		},
	};

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3000/todos')
			.then((response) => response.json())
			.then((data) => {
				setTodos(data);
			})
			.finally(() => setIsLoading(false));
	}, [reset]);

	const requestAddTodo = (newTodo) => {
		setIsCreating(true);

		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTodo.title,
			}),
		})
			.then((response) => response.json())
			.then((todo) => {
				setTodos((prevTodos) => [...prevTodos, todo]);
			})
			.finally(() => setIsCreating(false));
	};

	const formProps = {
		request: requestAddTodo,
		isCreating,
		formInputRef,
	};
	return (
		<div className={styles.mainpage}>
			<h1>Список задач</h1>
			<Form {...formProps} />
			<SearchForm
				todos={todos}
				setTodos={setTodos}
				reset={reset}
				setReset={setReset}
			/>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div>
					{Object.keys(todos).length > 0 && (
						<Table table={table} todos={todos} />
					)}
				</div>
			)}
		</div>
	);
};
