import express from "express";
import cors from "cors";


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
  addUser(userToAdd);
  res.status(200).end();
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  deleteUserById(id);
  res.status(200).end();
});

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

function findUserById(id) {
  return users["users_list"].filter((user) => user["id"] === id);
}

function addUser(user) {
  users["users_list"].push(user);
}

function deleteUserById(id) {
  users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
