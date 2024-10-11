class User {
	constructor(
		id,
		login,
		email,
		phoneNumber,
		telegramId,
		firstName,
		lastName,
		height,
		weight,
		age
	) {
		this.id = id || null;
		this.login = login || '';
		this.email = email || '';
		this.phoneNumber = phoneNumber || '';
		this.telegramId = telegramId || '';
		this.firstName = firstName || '';
		this.lastName = lastName || '';
		this.height = height || '';
		this.weight = weight || '';
		this.age = age || '';
	}

	// Method to update user information
	updateUserData(data) {
		Object.assign(this, data);
	}

	// Method to get user data as an object
	getUserData() {
		return {
			id: this.id,
			login: this.login,
			email: this.email,
			phoneNumber: this.phoneNumber,
			telegramId: this.telegramId,
			firstName: this.firstName,
			lastName: this.lastName,
			height: this.height,
			weight: this.weight,
			age: this.age
		};
	}
}

export default User;