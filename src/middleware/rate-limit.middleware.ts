import rateLimit from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
    max: 100,
    windowMs:  60 * 1000,
    message: 'We have received too many requests from this IP. Please try after one hour.'
  
});