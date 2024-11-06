import ReasonPhrase from '../constants/reasonPhrase';
import StatusCode from '../constants/statusCode';

class SuccessResponse {
	message: string;
	metadata: object;
	statusCode: number;
	constructor({ message, metadata = {}, reasonStatusCode = ReasonPhrase.OK, statusCode = StatusCode.OK }) {
		this.message = message ?? reasonStatusCode;
		this.metadata = metadata;
		this.statusCode = statusCode;
	}

	send(res, header = {}) {
		return res.status(this.statusCode).json(this);
	}
}

export class Ok extends SuccessResponse {
	constructor({ message, metadata }) {
		super({
			message,
			metadata
		});
	}
}

export class Created extends SuccessResponse {
	constructor({ message, metadata }) {
		super({
			message,
			metadata,
			statusCode: StatusCode.CREATED,
			reasonStatusCode: ReasonPhrase.CREATED
		});
	}
}
