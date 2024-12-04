import rateLimit from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
    max: 5,
    windowMs:  60 * 1000,
    message: 'We have received too many requests from this IP. Please try after one hour.',
    handler: (req, res) => {
      console.log('Rate limit exceeded for IP:', req.ip);
      res.status(429).send('Too Many Requests');
    },
  
});