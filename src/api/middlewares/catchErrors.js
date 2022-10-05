import config from "../../config";

const catchErrors = () => async (err, req, res, next) => {
  if (err) {
    const { code, message, trace } = err;
    return res.status(code || 400).json({
      error: {
        code: code || 400,
        message,
        trace: config.env !== "production" ? trace : null
      }
    });
  }
  return next();
};

export default catchErrors;
