const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken"); //simplest way of passing the token to the headers if not using cookies

  if (!accessToken) return res.json({ error: "User not logged in" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken; //yaha pe ek request variable create kiya humne aur isko sabhi routes me accesskar sakte hai

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
