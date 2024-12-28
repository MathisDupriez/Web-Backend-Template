import { body } from "express-validator";

export function LoginRules() {
    return [
        body("email")
            .isEmail()
            .withMessage("Invalid email address."),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long."),
    ];
}