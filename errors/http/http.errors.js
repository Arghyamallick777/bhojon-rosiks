const BaseError = require("../base.error");
const {HttpStatusCodes} = require('../../config/enum.config');

class BadRequestError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.BAD_REQUEST,
        stack = null,
        name = "BadRequestError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.BAD_REQUEST;
        super(name, statusCode, isOperational, description, stack);
    }
}

class UnauthorizedError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.UNAUTHORIZED,
        stack = null,
        name = "UnauthorizedError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.UNAUTHORIZED;
        super(name, statusCode, isOperational, description, stack);
    }
}


class PaymentRequiredError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.PAYMENT_REQUIRED,
        stack = null,
        name = "PaymentRequiredError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.PAYMENT_REQUIRED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class ForbiddenError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.FORBIDDEN,
        stack = null,
        name = "ForbiddenError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.FORBIDDEN;
        super(name, statusCode, isOperational, description, stack);
    }
}

class NotFoundError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.NOT_FOUND,
        stack = null,
        name = "NotFoundError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.NOT_FOUND;
        super(name, statusCode, isOperational, description, stack);
    }
}

class MethodNotAllowedError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.METHOD_NOT_ALLOWED,
        stack = null,
        name = "MethodNotAllowedError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.METHOD_NOT_ALLOWED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class NotAcceptableError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.NOT_ACCEPTABLE,
        stack = null,
        name = "NotAcceptableError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.NOT_ACCEPTABLE;
        super(name, statusCode, isOperational, description, stack);
    }
}

class ProxyAuthenticationRequiredError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.PROXY_AUTHENTICATION_REQUIRED,
        stack = null,
        name = "ProxyAuthenticationRequiredError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.PROXY_AUTHENTICATION_REQUIRED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class RequestTimeoutError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.REQUEST_TIMEOUT,
        stack = null,
        name = "RequestTimeoutError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.REQUEST_TIMEOUT;
        super(name, statusCode, isOperational, description, stack);
    }
}

class ConflictError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.CONFLICT,
        stack = null,
        name = "ConflictError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.CONFLICT;
        super(name, statusCode, isOperational, description, stack);
    }
}

class GoneError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.GONE,
        stack = null,
        name = "GoneError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.GONE;
        super(name, statusCode, isOperational, description, stack);
    }
}

class LengthRequiredError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.LENGTH_REQUIRED,
        stack = null,
        name = "LengthRequiredError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.LENGTH_REQUIRED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class PreconditionFailedError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.PRECONDITION_FAILED,
        stack = null,
        name = "PreconditionFailedError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.PRECONDITION_FAILED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class PayloadTooLargeError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.PAYLOAD_TOO_LARGE,
        stack = null,
        name = "PayloadTooLargeError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.PAYLOAD_TOO_LARGE;
        super(name, statusCode, isOperational, description, stack);
    }
}

class UriTooLongError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.URI_TOO_LONG,
        stack = null,
        name = "UriTooLongError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.URI_TOO_LONG;
        super(name, statusCode, isOperational, description, stack);
    }
}

class UnsupportedMediaTypeError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.UNSUPPORTED_MEDIA_TYPE,
        stack = null,
        name = "UnsupportedMediaTypeError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.UNSUPPORTED_MEDIA_TYPE;
        super(name, statusCode, isOperational, description, stack);
    }
}

class RangeNotSatisfiableError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.RANGE_NOT_SATISFIABLE,
        stack = null,
        name = "RangeNotSatisfiableError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.RANGE_NOT_SATISFIABLE;
        super(name, statusCode, isOperational, description, stack);
    }
}

class ExpectationFailedError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.EXPECTATION_FAILED,
        stack = null,
        name = "ExpectationFailedError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.EXPECTATION_FAILED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class ImATeapotError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.IM_A_TEAPOT,
        stack = null,
        name = "ImATeapotError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.IM_A_TEAPOT;
        super(name, statusCode, isOperational, description, stack);
    }
}

class MisdirectedRequestError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.MISDIRECTED_REQUEST,
        stack = null,
        name = "MisdirectedRequestError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.MISDIRECTED_REQUEST;
        super(name, statusCode, isOperational, description, stack);
    }
}

class UnprocessableEntityError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.UNPROCESSABLE_ENTITY,
        stack = null,
        name = "UnprocessableEntityError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.UNPROCESSABLE_ENTITY;
        super(name, statusCode, isOperational, description, stack);
    }
}

class LockedError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.LOCKED,
        stack = null,
        name = "LockedError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.LOCKED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class FailedDependencyError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.FAILED_DEPENDENCY,
        stack = null,
        name = "FailedDependencyError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.FAILED_DEPENDENCY;
        super(name, statusCode, isOperational, description, stack);
    }
}

class UpgradeRequiredError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.UPGRADE_REQUIRED,
        stack = null,
        name = "UpgradeRequiredError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.UPGRADE_REQUIRED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class PreconditionRequiredError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.PRECONDITION_REQUIRED,
        stack = null,
        name = "PreconditionRequiredError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.PRECONDITION_REQUIRED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class TooManyRequestsError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.TOO_MANY_REQUESTS,
        stack = null,
        name = "TooManyRequestsError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.TOO_MANY_REQUESTS;
        super(name, statusCode, isOperational, description, stack);
    }
}

class RequestHeaderFieldsTooLargeError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.REQUEST_HEADER_FIELDS_TOO_LARGE,
        stack = null,
        name = "RequestHeaderFieldsTooLargeError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.REQUEST_HEADER_FIELDS_TOO_LARGE;
        super(name, statusCode, isOperational, description, stack);
    }
}

class UnavailableForLegalReasonsError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ClientErrors.UNAVAILABLE_FOR_LEGAL_REASONS,
        stack = null,
        name = "UnavailableForLegalReasonsError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ClientErrors.UNAVAILABLE_FOR_LEGAL_REASONS;
        super(name, statusCode, isOperational, description, stack);
    }
}



// 5XX onwards
class InternalServerError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.INTERNAL_SERVER_ERROR,
        stack = null,
        name = "InternalServerError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.INTERNAL_SERVER_ERROR;
        super(name, statusCode, isOperational, description, stack);
    }
}

class NotImplemented extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.NOT_IMPLEMENTED,
        stack = null,
        name = "NotImplementedError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.NOT_IMPLEMENTED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class BadGatewayError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.BAD_GATEWAY,
        stack = null,
        name = "BadGatewayError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.BAD_GATEWAY;
        super(name, statusCode, isOperational, description, stack);
    }
}

class ServiceUnavailableError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.SERVICE_UNAVAILABLE,
        stack = null,
        name = "ServiceUnavailableError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.SERVICE_UNAVAILABLE;
        super(name, statusCode, isOperational, description, stack);
    }
}

class GatewayTimeoutError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.GATEWAY_TIMEOUT,
        stack = null,
        name = "GatewayTimeoutError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.GATEWAY_TIMEOUT;
        super(name, statusCode, isOperational, description, stack);
    }
}

class HttpVersionNotSupportedError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.HTTP_VERSION_NOT_SUPPORTED,
        stack = null,
        name = "HttpVersionNotSupportedError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.HTTP_VERSION_NOT_SUPPORTED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class VariantAlsoNegotiatesError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.VARIANT_ALSO_NEGOTIATES,
        stack = null,
        name = "VariantAlsoNegotiatesError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.VARIANT_ALSO_NEGOTIATES;
        super(name, statusCode, isOperational, description, stack);
    }
}

class InsufficientStorageError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.INSUFFICIENT_STORAGE,
        stack = null,
        name = "InsufficientStorageError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.INSUFFICIENT_STORAGE;
        super(name, statusCode, isOperational, description, stack);
    }
}

class LoopDetectedError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.LOOP_DETECTED,
        stack = null,
        name = "LoopDetectedError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.LOOP_DETECTED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class NotExtendedError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.NOT_EXTENDED,
        stack = null,
        name = "NotExtendedError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.NOT_EXTENDED;
        super(name, statusCode, isOperational, description, stack);
    }
}

class NetworkAuthenticationRequiredError extends BaseError {
    constructor(
        description,
        statusCode = HttpStatusCodes.ServerErrors.NETWORK_AUTHENTICATION_REQUIRED,
        stack = null,
        name = "NetworkAuthenticationRequiredError",
        isOperational = true
    ) {
        statusCode = statusCode || HttpStatusCodes.ServerErrors.NETWORK_AUTHENTICATION_REQUIRED;
        super(name, statusCode, isOperational, description, stack);
    }
}

module.exports = {

    BadRequestError,
    UnauthorizedError,
    PaymentRequiredError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    NotAcceptableError,
    ProxyAuthenticationRequiredError,
    RequestTimeoutError,
    ConflictError,
    GoneError,
    LengthRequiredError,
    PreconditionFailedError,
    PayloadTooLargeError,
    UriTooLongError,
    UnsupportedMediaTypeError,
    RangeNotSatisfiableError,
    ExpectationFailedError,
    ImATeapotError,
    MisdirectedRequestError,
    UnprocessableEntityError,
    LockedError,
    FailedDependencyError,
    UpgradeRequiredError,
    PreconditionRequiredError,
    TooManyRequestsError,
    RequestHeaderFieldsTooLargeError,
    UnavailableForLegalReasonsError,

    InternalServerError,
    NotImplemented,
    BadGatewayError,
    ServiceUnavailableError,
    GatewayTimeoutError,
    HttpVersionNotSupportedError,
    VariantAlsoNegotiatesError,
    InsufficientStorageError,
    LoopDetectedError,
    NotExtendedError,
    NetworkAuthenticationRequiredError,
}
