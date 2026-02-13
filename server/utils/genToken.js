import jwt from "jsonwebtoken";
export const genToken = async (userId) => {
  let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
