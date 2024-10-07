class User {
	constructor(id, login, password, email, phoneNumber, telegramId, firstName, lastName) {
		this.id = id;
		this.login = login;
		this.password = password;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.telegramId = telegramId;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}

export default User;