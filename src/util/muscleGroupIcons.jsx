// utils/muscleGroupIcons.js
import {
	FaBiking,
	FaChevronUp,
	FaChild,
	FaDumbbell,
	FaHandRock,
	FaHeartbeat,
	FaRunning,
	FaSwimmer,
	FaWalking
} from 'react-icons/fa';

export const muscleGroupIcons = {
	"Ноги": <FaRunning className="text-green-500" />,
	"Бицепс": <FaHandRock className="text-blue-500" />,
	"Предплечье": <FaDumbbell className="text-purple-500" />,
	"Плечи": <FaChevronUp className="text-orange-500" />,
	"Трицепс": <FaBiking className="text-yellow-500" />,
	"Икры": <FaWalking className="text-red-500" />,
	"Спина": <FaSwimmer className="text-teal-500" />,
	"Грудь": <FaHeartbeat className="text-pink-500" />,
	"Пресс": <FaChild className="text-green-500" />,
};