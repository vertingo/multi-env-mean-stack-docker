const rateLimit = require("express-rate-limit");



 const LimitRequests = rateLimit({
    windowMs: 10 * 60000, // 10 min en milliseconds
    max: 5, // 5 tentatives 
    message: {
        success : false,
        message: `Vous avez essayé trop de codes. Veuillez réessayer plus tard`
    } 
  });


  exports.LimitRequests = LimitRequests;