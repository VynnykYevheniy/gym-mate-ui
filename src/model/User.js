class User {
	constructor(
		id,
		login,
		email,
		phoneNumber,
		telegramId,
		firstName,
		lastName,
		age,
		imageId,
		birthday
	) {
		this.birthday = birthday || "";
		this.id = id || null;
		this.login = login || '';
		this.email = email || '';
		this.phoneNumber = phoneNumber || '';
		this.telegramId = telegramId || '';
		this.firstName = firstName || '';
		this.lastName = lastName || '';
		this.age = age || '';
		this.imageId = imageId;
	}
}

export default User;