import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    const error = new Error("Token requerido");
    error.statusCode = 401;
    return next(error);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    const error = new Error("Token inválido");
    error.statusCode = 401;
    next(error);
  }
};

export const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    req.user = null;
  }

  next();
};

export const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      const error = new Error("Acceso denegado");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
