
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];

        if (token) {
            try {
                const user = jwt.verify(token, "mynameisseraj");
                req.user = user;
                console.log(user);
                if (user.type == 'Instructor') {
                    return next();
                }
                return res.status(500).json({ success: false, message: "Access denied for " + user.type })
            } catch (e) {
                return res.status(500).json({ message: "Invalid Token" })
            }
        }

        return res.status(500).json({ message: "Authorization token must be [Bearer token]" })

    }

    return res.status(500).json({ message: "Please Provide Authorization Token" })
}



