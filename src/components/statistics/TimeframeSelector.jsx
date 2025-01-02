import PropTypes from "prop-types";

const TimeframeSelector = ({timeframe, onTimeframeChange}) => (
	<div className="flex space-x-4 justify-center">
		{['Week', 'Month', 'Year'].map((frame) => (
			<button
				key={frame}
				className={`px-4 py-2 rounded ${
					timeframe === frame ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'
				}`}
				onClick={() => onTimeframeChange(frame)}
			>
				{frame}
			</button>
		))}
	</div>
);

TimeframeSelector.propTypes = {
	timeframe: PropTypes.string.isRequired,
	onTimeframeChange: PropTypes.func.isRequired,
}
export default TimeframeSelector;