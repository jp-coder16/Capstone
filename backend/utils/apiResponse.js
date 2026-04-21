const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({ success: true, data, message });
};

const errorResponse = (res, message = 'Error', statusCode = 500) => {
  res.status(statusCode).json({ success: false, message });
};

module.exports = { successResponse, errorResponse };