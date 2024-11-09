import React from 'react';
import {FaUserCircle} from 'react-icons/fa';

function EditOptionsDropdown({toggleDropdown, showDropdown, handleEditProfile}) {
	return (
		<div className="fixed bottom-6 right-6 mb-20">
			<button
				aria-label="Edit Profile"
				className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
				onClick={toggleDropdown}
			>
				<FaUserCircle className="h-8 w-8"/>
			</button>
			{showDropdown && (
				<div className="mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
					<ul>
						<li
							onClick={() => handleEditProfile('avatar')}
							className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
						>
							Edit Avatar
						</li>
						<li
							onClick={() => handleEditProfile('contact')}
							className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
						>
							Edit Contact Info
						</li>
						<li
							onClick={() => handleEditProfile('anthropometry')}
							className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
						>
							Edit Anthropometry
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}

export default EditOptionsDropdown;