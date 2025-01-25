import PropTypes from "prop-types";

const TimeframeFilter = ({timeframe, setTimeframe}) => {
	return (
		<section>
			<div className="flex space-x-4 justify-center">
				{['WEEK', 'MONTH', 'YEAR'].map((frame) => (
					<button
						key={frame}
						className={`px-4 py-2 rounded ${timeframe === frame ? 'bg-primary text-primaryHover' : 'bg-primary text-white'}`}
						onClick={() => setTimeframe(frame)}
					>
						{frame}
					</button>
				))}
			</div>
		</section>
	);
};

TimeframeFilter.propTypes = {
	timeframe: PropTypes.string.isRequired,
	setTimeframe: PropTypes.func.isRequired,
}

export default TimeframeFilter;
