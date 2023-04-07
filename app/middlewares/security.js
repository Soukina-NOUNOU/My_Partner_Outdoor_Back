const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const APIError = require('./handlers/APIError');

const security = {
    async checkJWT (req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if(!!token && token.startsWith('Bearer')) {
            token = token.slice(7, token.length);
        }

        if(token) {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if(err) {
                    const err = new APIError ('token_not_valid', 401);
                    next(err);
                } else {
                    req.decoded = decoded;

                    const newToken = jwt.sign({
                        user: decoded.user
                      },
                      JWT_SECRET,
                      {
                        expiresIn: ACCESS_TOKEN_EXPIRATION
                      });
                      res.header('Authorization', 'Bearer ' + newToken);

                      next();
                }
            });
        } else {
            const err = new APIError ('token_required', 401);
            next(err);
        }
    }
};

module.exports = security;