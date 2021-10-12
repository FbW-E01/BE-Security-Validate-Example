import express from 'express';
import { validationResult } from 'express-validator';
import userValidators from './validators/userValidators.js';

// Prepare express app and add request logging middleware
const server = express();
server.use(express.json());
server.use((req,res,next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Add our single endpoint, this time including some validators!
server.post(
    '/users',
    userValidators,
    (req, res) => {
        console.log(req.body);

        // Check validation result based on the defined userValidators
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            // Send response - here showing only the error messages
            res.json({
                errors: result.errors.map(e => e.msg)
            });
            return;
        }

        // no validation errors? Cool!
        res.send(":)");
    }
);

// Start our app :)
server.listen(9001, () => {
    console.log("Listening on http://localhost:9001");
})