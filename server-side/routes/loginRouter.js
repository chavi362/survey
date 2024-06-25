// const express = require("express");
// const loginRouter = express.Router();
// const { loginUser } = require('../controllers/userController');

// loginRouter.post("/", async (req, res) => {
//     console.log("**************", req.body);
//     await loginUser(req, res);
// });

// module.exports = loginRouter;



// const express = require("express");
// const loginRouter = express.Router();
// const { postLogin} = require('../controllers/loginController');
// console.log("hi im here!!!");
// loginRouter.post("/", async (req, res) => {
//     console.log("req loginnnnnnnnnn:", req.body);
//     try {
//       console.log("hi im here2!!!");
//         res.send(await controller.postLogin(JSON.stringify(req.body)));
//     } catch (err) {
//         res.status(404).send({ok: false});
//     }
// });

// module.exports = loginRouter;



const express = require("express");
const loginRouter = express.Router();
const { postLogin } = require('../controllers/loginController');



loginRouter.post("/", async (req, res) => {
  console.log("Received POST request to /login");
  console.log("Request body:", req.body);

  try {
    const result = await postLogin(req.body);
    console.log(result);
    console.log("Login successful, sending response...");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in loginRouter:", err.message);
    res.status(404).json({ ok: false, error: err.message });
  }
});

module.exports = loginRouter;
