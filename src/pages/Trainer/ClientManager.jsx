import {useTranslation} from 'react-i18next';
import {currentUser} from "../../service/UserService.jsx";
import {useEffect, useState} from "react";
import Loader from "../../components/Loader.jsx";
import RatingStar from "../../assets/RatingStar.svg";
import SidebarClientsList from "./SidebarClientsList.jsx";



const ClientManager = () => {
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


    return (
        <>
            <SidebarClientsList/>
        <main className=" flex items-center justify-center flex-col p-4 pb-12 ">

            {/* Profile Section */}
            <section className="w-full max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg border border-gray-400">
                <div
                    className="flex flex-row items-center justify-between sm:items-start sm:space-x-6 ">
                    {/* Profile Picture */}
                    <div
                        className="w-32 h-32 rounded-full overflow-hidden shadow-xl flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 ring-2 ring-white border-4 border-blue-300">
                        <img src={RatingStar} className="h-6 w-6" alt="RatingStar"/>
                    </div>

                    {/* User Info */}
                    <div className="text-right sm:text-right">
                        <h2 className="text-3xl font-semibold">{`${user.firstName} Trainer ${user.lastName}`} Trainer</h2>
                        <p className="text-gray-500 mb-4">{user.login} Trenerok</p>
                    </div>

                </div>




            </section>
            <section className="w-full max-w-4xl p-6 text-center bg-white rounded-lg shadow-lg border border-gray-400">

            </section>


        </main>
        </>
    );
};

export default ClientManager;