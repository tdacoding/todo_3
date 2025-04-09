import styles from './Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fieldsSchema } from '../data/validationConfig';

export const Form = ({ request, isCreating, isEditing, formInputRef }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			title: '',
		},
		resolver: yupResolver(fieldsSchema),
		mode: 'onChange',
	});
	const { ref, ...rest } = register('title');

	const sendFormData = (newTodo) => {
		request(newTodo);
		reset();
	};

	const error = errors.title?.message;

	return (
		<form className={styles.form} onSubmit={handleSubmit(sendFormData)}>
			<input
				className={styles.input}
				name="title"
				type="text"
				placeholder="Новая задача"
				autoComplete="off"
				{...rest}
				ref={(e) => {
					ref(e);
					formInputRef.current = e;
				}}
			/>
			{error && <div className={styles.error}>{error}</div>}

			<button
				className={styles.button}
				type="submit"
				disabled={!isValid || isCreating}
			>
				{isEditing ? 'Сохранить изменения' : 'Добавить задачу'}
			</button>
		</form>
	);
};
