import rateLimit from 'express-rate-limit';

export const dynamicRateLimitMiddleware = (req, res, next) => {
  // Configuración de rate limit según la ruta
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
    max: () => {
      if (req.path.includes('/kpis')) {
        return 50; // Límite más bajo para KPIs
      } else if (req.path.includes('/products') || req.path.includes('/sales')) {
        return 1000; // Límite más alto para inventario y ventas
      }
      return 500; // Límite predeterminado
    },
    message: 'Too many requests, please try again later.',
    handler: (req, res) => {
      console.log('Rate limit exceeded for IP:', req.ip, 'on path:', req.path);
      res.status(429).send('Too Many Requests');
    },
  });

  return limiter(req, res, next);
};
