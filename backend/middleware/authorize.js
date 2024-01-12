const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = authorize

function authorize(roles = []) {

    // roles param  (Role.Client or 'client') 
    // ([Role.Admin, Role.Client] or ['admin', 'clinet'])

    if (typeof roles === 'string') { roles = [roles] }

    return [

        // authorize based on user role
        (req, res, next) => {

            try {
                const headerstoken = req.headers.authorization;
                if(req.headers.authorization){
                if (headerstoken.startsWith('Bearer ')) {
                    token = headerstoken.split(' ')[1];
                    const decodedToken = jwt.verify(token, config.secret_key);
                    const token_role = decodedToken.role;
                    if (roles.length && !roles.includes(token_role)) {
                        throw new Error('Unauthorized');
                    } else {
                        next()
                    }
                }
                else {
                    throw new Error('token is not supplied');
                }
            }else{throw new Error('token not found');}
            } catch (err) {
                res.status(401).json({
                    success: false,
                    message: err.message
                })
            }
        }
    ]
}



