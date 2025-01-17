import PropTypes from "prop-types";
import { useState } from "react";

function ProfileForm({ userData, onInputChange }) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const fields = [
		{ label: "First Name", name: "firstName", type: "text" },
		{ label: "Last Name", name: "lastName", type: "text" },
		{ label: "Age", name: "age", type: "number" },
		{ label: "Phone Number", name: "phoneNumber", type: "number" },
		{ label: "Email", name: "email", type: "email" },
		{
			label: "Password",
			name: "password",
			type: showPassword ? "text" : "password",
			placeholder: "******",
		},
	];

	return (
		<div className="space-y-6">
			{fields.map(({ label, name, type, placeholder }) => (
				<div key={name} className="mb-4 flex flex-col">
					<label className="text-mb text-gray-500 mb-2">{label}</label>
					<div className="relative">
						<input
							type={type}
							name={name}
							value={name === "password" ? null : userData[name]}
							onChange={onInputChange}
							placeholder={placeholder}
							className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition w-full"
						/>
						{name === "password" && (
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

ProfileForm.propTypes = {
	userData: PropTypes.object.isRequired,
	onInputChange: PropTypes.func.isRequired,
};

export default ProfileForm;
