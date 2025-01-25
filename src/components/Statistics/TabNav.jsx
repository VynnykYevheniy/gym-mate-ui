import PropTypes from "prop-types";

const TabNav = ({activeTab, setActiveTab}) => {
	return (
		<div className="flex border-b">
			{['MUSCLE', 'EXERCISE'].map((tab) => (
				<button
					key={tab}
					className={`flex-1 py-2 px-4 text-center ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
					onClick={() => setActiveTab(tab)}
				>
					{tab}
				</button>
			))}
		</div>
	);
};

TabNav.propTypes = {
	activeTab: PropTypes.string.isRequired,
	setActiveTab: PropTypes.func.isRequired,

}
export default TabNav;