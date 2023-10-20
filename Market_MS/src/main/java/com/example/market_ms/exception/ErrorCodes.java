package com.example.market_ms.exception;

public enum ErrorCodes  {


        ETUDIANT_NOT_FOUND(1000),
        ETUDIANT_NOT_VALID(1001),
        ETUDIANT_ALREADY_IN_USE(1002),

        CLASSE_NOT_FOUND(2000),
        CLASSE_NOT_VALID(2001),
        CLASSE_ALREADY_IN_USE(2002),

        PARENT_NOT_FOUND(3000),
        PARENT_NOT_VALID(3001),
        PARENT_ALREADY_IN_USE(3002),


        MATIERE_NOT_FOUND(5000),
        MATIERE_NOT_VALID(5001),


        ECOLE_NOT_FOUND(6000),
        ECOLE_NOT_VALID(6001),

        PROFESSEUR_NOT_FOUND(7000),
        PROFESSEUR_NOT_VALID(7001),
        PROFESSEUR_ALREADY_IN_USE(7002),


        UTILISATEUR_NOT_FOUND(12000),
        UTILISATEUR_NOT_VALID(12001),
        UTILISATEUR_ALREADY_EXISTS(12002),
        UTILISATEUR_CHANGE_PASSWORD_OBJECT_NOT_VALID(12003),

        BAD_CREDENTIALS(12003),

        INVALID_OPERATION(13000),
        FORBIDDEN(14000),


        // Liste des exception techniaues
        UPDATE_PHOTO_EXCEPTION(14000),
        UNKNOWN_CONTEXT(14001);

        private int code;

        ErrorCodes(int code) {

            this.code = code;
        }

        public int getCode() {
            return code;
        }

    }



