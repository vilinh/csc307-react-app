import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
    res.status(404).send("Resource not found.");
  else {
    result = { users_list: result };
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd["id"] = generateId();
  addUser(userToAdd);
  res.status(201).send({ new_user: userToAdd });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let deleted = deleteUserById(id);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).send("resource not found");
  }
});

function generateId() {
  return uuidv4();
}

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

function findUserByNameJob(name, job) {
  return users["users_list"].filter(
    (user) => user["id"] === id && user["job"] === job
  );
}

function findUserById(id) {
  return users["users_list"].filter((user) => user["id"] === id);
}

function addUser(user) {
  users["users_list"].push(user);
}

function deleteUserById(id) {
  let userInList = false;
  users["users_list"] = users["users_list"].filter((user) => {
    if (user["id"] === id) {
      userInList = true;
    }
    return user["id"] !== id;
  });
  return userInList;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
