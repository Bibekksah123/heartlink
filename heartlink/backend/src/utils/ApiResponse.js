class ApiResponse {
  static success(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  static created(res, data, message = "Created") {
    return ApiResponse.success(res, data, message, 201);
  }

  static paginated(res, data, meta, message = "Success") {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message,
      data,
      meta,
    });
  }

  static noContent(res) {
    return res.status(204).send();
  }
}

export default ApiResponse;


