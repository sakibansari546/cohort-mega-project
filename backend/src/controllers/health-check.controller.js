import ApiResponse from "../utils/api-response.js";

const healthCheck = async (req, res) => {
  const user = {
    name: "Sakib",
    email: "sakib@gmail.com",
  };
  res.status(200).json(new ApiResponse(200, { user }, "Server is running!"));
};

export { healthCheck };
