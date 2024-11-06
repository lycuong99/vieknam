import ReasonPhrase from '../constants/reasonPhrase';
import StatusCode from '../constants/statusCode';

export class ErrorResponse extends Error {
	status: number;
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

export class ConflictRequestError extends ErrorResponse {
	constructor(message = ReasonPhrase.CONFLICT, status = StatusCode.CONFLICT) {
		super(message, status);
	}
}

export class BadRequestError extends ErrorResponse {
	constructor(message = ReasonPhrase.BAD_REQUEST, status = StatusCode.BAD_REQUEST) {
		super(message, status);
	}
}

export class AuthFailError extends ErrorResponse {
	constructor(message = ReasonPhrase.UNAUTHORIZED, status = StatusCode.UNAUTHORIZED) {
		super(message, status);
	}
}

export class NotFoundError extends ErrorResponse {
	constructor(message = ReasonPhrase.NOT_FOUND, status = StatusCode.NOT_FOUND) {
		super(message, status);
	}
}

export class ForbiddenError extends ErrorResponse {
	constructor(message = ReasonPhrase.FORBIDDEN, status = StatusCode.FORBIDDEN) {
		super(message, status);
	}
}
