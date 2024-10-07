class ApiError extends Error {
	constructor(message, status, timestamp) {
		super();
		this.message = message;
		this.status = status;
		this.timestamp = timestamp;
	}
}
export default ApiError;