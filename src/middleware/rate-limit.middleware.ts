import rateLimit from 'express-rate-limit';

// Instancias de rate limit predefinidas
export const kpiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
    max: 50, // Límite para KPIs
    message: 'Too many requests to KPIs, please try again later.',
    handler: (req, res) => {
        console.log('Rate limit exceeded for KPIs:', req.ip);
        res.status(429).send('Too Many Requests');
    },
});

export const productRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
    max: 1000, // Límite para inventario y ventas
    message: 'Too many requests to Products or Sales, please try again later.',
    handler: (req, res) => {
        console.log('Rate limit exceeded for Products or Sales:', req.ip);
        res.status(429).send('Too Many Requests');
    },
});

export const defaultRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
    max: 500, // Límite predeterminado
    message: 'Too many requests, please try again later.',
    handler: (req, res) => {
        console.log('Rate limit exceeded for Default:', req.ip);
        res.status(429).send('Too Many Requests');
    },
});
