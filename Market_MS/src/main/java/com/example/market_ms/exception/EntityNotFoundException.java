package com.example.market_ms.exception;

import lombok.Getter;

public class EntityNotFoundException extends jakarta.persistence.EntityNotFoundException {

    @Getter
    private ErrorCodes errorCode;

    public EntityNotFoundException() {
        super();
    }

    public EntityNotFoundException(String message) {
        super(message);
    }

    public EntityNotFoundException(String message, Throwable cause) {
        super();
    }


}

