import { body } from "express-validator";

export function RegistrationRules() {
    return [
        body("email")
            .isEmail()
            .withMessage("Invalid email address."),
        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long."),
        body("username")
            .isLength({ min: 3, max: 20 })
            .withMessage("Username must be between 3 and 20 characters.")
            .matches(/^[a-zA-Z0-9_]+$/)
            .withMessage("Username can only contain letters, numbers, and underscores."),
    ];
}