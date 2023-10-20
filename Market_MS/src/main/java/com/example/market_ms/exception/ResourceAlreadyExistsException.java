package com.example.market_ms.exception;

import lombok.Getter;

public class ResourceAlreadyExistsException extends RuntimeException {

    @Getter
    private ErrorCodes errorCode;

    public ResourceAlreadyExistsException(String message) {
        super(message);
    }

    public ResourceAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public ResourceAlreadyExistsException(String message, Throwable cause, ErrorCodes errorCode) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public ResourceAlreadyExistsException(String message, ErrorCodes errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
