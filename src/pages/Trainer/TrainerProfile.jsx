import {FaArrowsAltV, FaPhone, FaTelegramPlane, FaUserCircle} from 'react-icons/fa'; // Height icon
import {GiWeight} from 'react-icons/gi'; // Keeping the GiWeight for weight representation
import {useTranslation} from 'react-i18next';
import {currentUser} from "../../service/UserService.jsx";
import {useEffect, useState} from "react";
import Loader from "../../components/generic/Loader.jsx";
import RatingStar from "../../assets/RatingStar.svg";
import UserPng from "../../assets/png/user.png";
import ImageCarousel from "../../components/Trainer/ImageCarousel.jsx";

const images = [
    { id: "1", url: "https://blog.springworks.in/wp-content/uploads/2021/07/14-Jul-21-Employee-Training-and-Development-Program-Examples-1024x1024-1.jpg" },
    { id: "34", url: "https://media.istockphoto.com/id/1395337483/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D1%96-%D1%82%D0%B0-%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%BD%D1%96-%D0%B7%D0%B0%D0%BB%D0%B8.jpg?s=2048x2048&w=is&k=20&c=Ea-E8f3tLUUUtEFoDDsepoHEswK7_2kVEZHkjazIgtE=" },
    { id: "21", url: "https://img.freepik.com/premium-vector/people-training-apparatus-gym-various-types-physical-exercises-isometric-illustration-horizontal_276366-257.jpg?w=1380" },
    { id: "33", url: "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2018/11/Group-Fitness-Class-Performing-A-Variety-Of-Exercises-1.jpg?w=940&h=529&crop=1&quality=86&strip=all" },
];

const TrainerProfile = () => {
    const {t} = useTranslation();
    const [user, setUser] = useState(null);



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await currentUser();
                console.log(user);
                setUser(user);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchUserData(); // Call the function to fetch user data
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    if (!user) {
        return <Loader/>; // Optional: Add a loading state while fetching user data
    }
    const handleEditProfile = () => {
        // Логика для открытия формы редактирования профиля
    };


    return (
        <main className=" flex items-center justify-center flex-col p-4 pb-12 ">
            {/* profile Section */}
            <section className="w-full max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="flex flex-row items-center justify-between sm:items-start sm:space-x-6 ">
                    {/* profile Picture */}
                    <div>
                    <div
                        className="w-32 h-32 rounded-full overflow-hidden shadow-xl flex flex-col items-center justify-center ">
                        {//<FaUserCircle className="h-24 w-24 text-white" /> {/* profile icon */}

                        }

                        <img src={UserPng} alt="User" />


                    </div>
                        {/* Rating Block */}
                        <div className="flex items-center mt-2 justify-center">
                            <img src={RatingStar} className="h-6 w-6" alt="RatingStar" />
                            <span className="ml-2 text-gray-500 text-lg font-semibold">4.7</span>
                            <span className="text-gray-300">(356)</span>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="text-right sm:text-right">
                        <h2 className="text-3xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
                        <p className="text-gray-500 mb-4">@{user.login}</p>


                    </div>

                </div>
                <section className="w-full max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg border border-gray-100">
                <div
                    className=" items-center justify-between sm:items-start sm:space-x-6 ">
                    {/* User Info */}
                    <div className="text-right sm:text-right">
                        <p className="text-gray-500 mb-4">
                            - Evaluate clients’ fitness levels and health conditions<br/>
                            - Build individualized exercise programs<br/>
                            - Explain exercises in detail and suggest alternatives if needed<br/>
                            - Monitor progress of clients’ fitness levels<br/>
                            - Explain safe and proper use of gym equipment<br/>
                            - Lead both individual and group training sessions<br/>
                            - Advise customers on how to change nutritional and lifestyle habits as needed
                        </p>
                    </div>


                </div>
                </section>
                {/* Additional Stats */}
                <ul className="py-4 my-6 text-gray-700 flex items-center justify-around border-1 shadow-mb w-full  rounded-lg
				pb-4 border-y-2">
                    <li className="flex flex-col items-center justify-center">
                        <div
                            className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
                            <GiWeight className="h-10 w-10 text-white"/> {/* Weight icon */}
                        </div>
                        <div className="text-lg font-semibold">{user.weight || 75} kg</div>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                        <div
                            className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
                            <FaArrowsAltV className="h-10 w-10 text-white"/> {/* Height icon */}
                        </div>
                        <div className="text-lg font-semibold">{user.height || 185} cm</div>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                        <div
                            className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg ring-2 ring-white border-4 border-blue-300">
                            <FaUserCircle className="h-10 w-10 text-white"/> {/* Placeholder for age */}
                        </div>
                        <div className="text-lg font-semibold">{user.age || 24} y.o</div>
                    </li>
                </ul>




            </section>
            <section className="w-full max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg border border-gray-400">
                {/* profile Details */}
                <ul className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    {[
                        {
                            icon: <FaPhone className="mr-3 text-blue-600" />,
                            label: t('userProfile.phoneNumber'),
                            value: user.phoneNumber || '+380681231337',
                            bgColor: 'bg-blue-100',
                            textColor: 'text-blue-600',
                        },
                        {
                            icon: <FaTelegramPlane className="mr-3 text-teal-600" />,
                            label: t('@tg_user'),
                            value: user.email,
                            bgColor: 'bg-teal-100',
                            textColor: 'text-teal-600',
                        },
                    ].map((item, index) => (
                        <li
                            key={index}
                            className={`flex items-center justify-between border-2 p-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl ${item.bgColor}`}>
                            <div
                                className={`flex items-center justify-center rounded-full ${item.bgColor}`}>
                                {item.icon}
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <span className={`${item.textColor} font-medium`}>{item.value}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="w-full max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="">
                    <h1 className="text-2xl text-center mb-8"></h1>
                    <ImageCarousel images={images}/>
                </div>
            </section>
            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 mb-20">
                <button
                    aria-label="Edit Profile"
                    onClick={handleEditProfile}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition">
                    <FaUserCircle className="h-8 w-8"/>
                </button>
            </div>

        </main>

    );
};

export default TrainerProfile;