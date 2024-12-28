import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import sanitizeHtml from "sanitize-html";

// Configuration avancée pour sanitizeHtml
const sanitizeOptions: sanitizeHtml.IOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'], // Tags autorisés (modifiable selon vos besoins)
    allowedAttributes: {
        a: ['href'], // Attributs autorisés pour les balises spécifiques
    },
    allowedIframeHostnames: [], // Optionnel : liste des hôtes autorisés pour les iframes
    disallowedTagsMode: "discard", // Supprime les tags non autorisés
    selfClosing: [], // Ajout de balises auto-fermantes si besoin (par ex. img, br)
    transformTags: {
        // Exemple de transformation : force les balises <b> à devenir <strong>
        b: "strong",
        i: "em",
    },
};

// Fonction générique pour nettoyer une entrée (supporte string, object, array)
const sanitizeInput = (value: any): any => {
    if (typeof value === "string") {
        return sanitizeHtml(value, sanitizeOptions); // Nettoie les chaînes de caractères
    } else if (typeof value === "object" && value !== null) {
        // Pour objets ou tableaux : nettoie récursivement
        return Array.isArray(value)
            ? value.map(sanitizeInput)
            : Object.fromEntries(
                    Object.entries(value).map(([key, val]) => [key, sanitizeInput(val)])
                );
    }
    return value; // Autres types (number, boolean, etc.) : inchangés
};

// Middleware de validation et nettoyage complet
export const validateAndSanitize = (rules: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            // Nettoyage de req.body
            req.body = sanitizeInput(req.body);

            // Nettoyage de req.query
            req.query = sanitizeInput(req.query);

            // Nettoyage de req.params
            req.params = sanitizeInput(req.params);

            // Exécute les validations définies par les règles
            await Promise.all(rules.map((rule) => rule.run(req)));

            // Gestion des erreurs de validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }

            next(); // Tout est valide et nettoyé, passe au middleware suivant
        } catch (error) {
            // Gestion des erreurs inattendues
            res.status(500).json({ 
                message: "An error occurred during validation/sanitization.", 
                error: (error as any)?.message || "Unknown error" 
            });
        }
    };
};
