import React from 'react';

function EditProfileModal({isEditing, editSection, formData, handleChange, handleSaveChanges, setIsEditing}) {
	if (!isEditing) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div className="bg-white rounded-lg p-6 max-w-md w-full">
				<h2 className="text-2xl mb-4">Edit {editSection}</h2>
				<form className="space-y-4">
					{editSection === 'avatar' && (
						<div>
							<label className="block text-gray-700">Profile Picture URL</label>
							<input
								type="text"
								name="avatar"
								value={formData.avatar || ''}
								onChange={handleChange}
								className="w-full px-4 py-2 border rounded-lg"
							/>
						</div>
					)}
					{editSection === 'contact' && (
						<>
							<div>
								<label className="block text-gray-700">Phone Number</label>
								<input
									type="text"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Email</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
						</>
					)}
					{editSection === 'anthropometry' && (
						<>
							<div>
								<label className="block text-gray-700">Age</label>
								<input
									type="number"
									name="age"
									value={formData.age}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Weight</label>
								<input
									type="number"
									name="weight"
									value={formData.weight}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Height</label>
								<input
									type="number"
									name="height"
									value={formData.height}
									onChange={handleChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
						</>
					)}
				</form>
				<div className="flex justify-end mt-4">
					<button onClick={() => setIsEditing(false)}
							className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-lg">
						Cancel
					</button>
					<button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditProfileModal;