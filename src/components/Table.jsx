import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({ table, todos }) => {
	return (
		<table>
			<TableHeader table={table} />
			<TableBody todos={todos} table={table} />
		</table>
	);
};

export default Table;
