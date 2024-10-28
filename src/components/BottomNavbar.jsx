import {Link} from "react-router-dom";
import UserSvg from '../assets/image/UserSvg.svg';
import CalendarSvg from '../assets/image/CalendarSvg.svg';
import WorkoutSvg from '../assets/image/WorkoutSvg.svg';
import Trainer from '../assets/Trainer.svg'

export default function BottomNavbar() {
    return (
        <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg z-50 h-16">
            <div className="flex justify-between items-center p-4">
                <Link to="/" onClick className="flex flex-col items-center text-gray-500 hover:text-green-600">
                    <img src={UserSvg} alt="Error Icon" className="h-5 w-5 text-red-400"/>

                    <span>Profile</span>
                </Link>
                <Link to="/calendar" className="flex flex-col items-center text-gray-500 hover:text-green-600">
                    <img src={CalendarSvg} alt="Error Icon" className="h-5 w-5 text-red-400"/>
                    <span className="material-icons">Calendar</span>
                </Link>
                <Link to="/training" className="flex flex-col items-center text-gray-500 hover:text-green-600">
                    <img src={WorkoutSvg} alt="Error Icon" className="h-5 w-5 text-red-400"/>
                    <span>Workout</span>
                </Link>
                <Link to="/trainer" className="flex flex-col items-center text-gray-500 hover:text-green-600">
                    <img src={Trainer} alt="Error Icon" className="h-5 w-5 text-red-400"/>
                    <span>Trainer</span>
                </Link>

            </div>
        </div>
    );
}