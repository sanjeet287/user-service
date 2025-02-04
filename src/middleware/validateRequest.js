import {validationResult} from 'express-validator';

 const validateRequest = (validations) => {
    return async (req, res, next) => {
        //console.log("Validations Received:", validations);

        if (!Array.isArray(validations)) {
            return res.status(500).json({ error: "Validations must be an array" });
        }

        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};

export default validateRequest;