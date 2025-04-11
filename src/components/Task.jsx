import styles from './Task.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export const Task = () => {
	const [todo, setTodo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const params = useParams();
	const curId = +params.id;
	const navigate = useNavigate();

	const requestDeleteTodo = () => {
		fetch('http://localhost:3000/todos/' + todo.id, {
			method: 'DELETE',
		}).finally(navigate('/'));
	};

	const requestEditTodo = () => {
		fetch('http://localhost:3000/todos/' + todo.id, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todo.title,
			}),
		});
	};
	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3000/todos')
			.then((response) => response.json())
			.then((data) => {
				const curTodo = data.filter((curTodo) => curTodo.id === curId)[0];
				setTodo(curTodo);
				if (!curTodo) {
					throw new Error('id не найден!');
				}
			})
			.catch(() => navigate('/404'))
			.finally(() => setIsLoading(false));
	}, [curId]);

	const delHandler = () => {
		if (confirm('Удалить задачу?')) requestDeleteTodo();
	};

	const editHandler = () => {
		const isEdit = !isEditing;
		setIsEditing(!isEditing);
		if (!isEdit) {
			requestEditTodo();
		}
	};

	return !todo ? (
		''
	) : (
		<div className={styles.task}>
			<h1>Текущая задача</h1>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : isEditing ? (
				<textarea
					className={styles.titleTextarea}
					value={todo.title}
					onChange={(event) => {
						setTodo({ ...todo, title: event.target.value });
					}}
					autoFocus
					spellCheck="false"
				></textarea>
			) : (
				<div>{todo.title}</div>
			)}
			<div className={styles.btnDiv}>
				<button className={styles.editBtn} onClick={editHandler}>
					{isEditing ? 'Сохранить' : 'Редактировать'}
				</button>
				<button className={styles.delBtn} onClick={delHandler}>
					Удалить
				</button>
			</div>
			<div className={styles.btnDiv}>
				<button
					className={styles.backBtn}
					onClick={() => {
						navigate('/');
					}}
				>
					К списку задач
				</button>
			</div>
		</div>
	);
};
