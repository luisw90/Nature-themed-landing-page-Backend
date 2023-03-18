const express = require("express");
const cors = require("cors");
const { json } = require("express");

const app = express();
const PORT = process.env.PORT || 3001;
const themesRouter = require('./routes/themes');
const usersRouter = require('./routes/users');

app.use(cors());
app.use(json());

app.use('/themes', themesRouter)
app.use('/users', usersRouter)

app.use("*", (_, res) => {
  res.status(400).json({
    message: "Incorrect endpoint!",
  });
});

app.listen(PORT, () =>
  console.log(`Backend running on localhost:${PORT}`)
);
