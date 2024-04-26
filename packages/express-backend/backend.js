// backend.js
import userService from "./services/user-service.js";
import express from "express";
import cors from "cors";

console.log(userService.findAllUsers)
const users = [userService.findAllUsers]

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  user.id = Math.random();
  users["users_list"].push(user);
  return user;
};

const deleteUser = (id) => {
  users["users_list"] = users["users_list"].filter(
    (user) => user["id"] != id
  );
};


const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job
  );
};

const findUserByNameAndJob = (name,job) => {
  return users["users_list"].filter(
    (user) => (user["job"] === job && user["name"] === name)
  );
};

app.get("/users", (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  userService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id)
  .then((result) => {
  if (result) {
  res.send(result);
  } else {
  res.status(404).send(`Not Found: ${id}`);
  }
  })
  .catch((error) => {
  res.status(500).send(error.name);
  });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService
    .addUser(userToAdd)
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      res.status(500).send(error.name);
      });
});

app.delete("/users/:id", (req,res) => {
  const id = req.params["id"];
  if (id === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    deleteUser(id);
    res.send(204);
  }
});
