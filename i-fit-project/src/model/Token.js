class Token {
	constructor(accessToken, expiresIn, refreshToken, refreshExpiresIn) {
		this.accessToken = accessToken;
		this.expiresIn = expiresIn;
		this.refreshToken = refreshToken;
		this.refreshExpiresIn = refreshExpiresIn;
	}
}

export default Token;
