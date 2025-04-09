const TableHeader = (props) => {
	const { table } = props;

	return (
		<thead>
			<tr>
				{Object.keys(table).map((column) => {
					return (
						<th key={column}>
							<div style={{ display: 'flex' }}>{table[column].name}</div>
						</th>
					);
				})}
			</tr>
		</thead>
	);
};

export default TableHeader;
