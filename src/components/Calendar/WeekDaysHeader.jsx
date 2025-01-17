import moment from 'moment';

const WeekDaysHeader = () => {
	const weekDaysShort = [...moment.weekdaysShort().slice(1), moment.weekdaysShort()[0]];

	return (
		<div className="grid grid-cols-7 gap-1 mb-4">
			{weekDaysShort.map((day) => (
				<div
					key={day}
					className="flex items-center justify-center text-center font-bold text-secondTextColor p-2"
				>
					{day}
				</div>
			))}
			<div className="col-span-7 border-b-2 border-secondTextColor mt-1" />
		</div>
	);
};

export default WeekDaysHeader;