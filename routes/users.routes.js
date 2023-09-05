const express = require("express");
const router = express.Router();
const db = require("../ultils/database");

// Create User
router.post("/", async (req, res) => {
  let { name, email, age } = req.body;
  let createUser = await db.execute(
    "INSERT INTO users (name, email, age) VALUES (?,?,?)",
    [name, email, age]
  );

  res.json({ createUser, message: "Create user success" });
});

// GET All users
router.get("/", async (req, res) => {
  try {
    let users = await db.execute("SELECT * FROM users ");
    let rowUser = users[0];
    console.log(rowUser);
    res.json({
      users: rowUser,
      message: "Lấy toàn bộ user",
    });
  } catch (error) {
    res.json({
      messenge: "K thấy user",
    });
  }
});

// GET one
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let findUser = await db.execute(`SELECT * FROM users WHERE user_id = ${id}`);
  let rowUser = findUser[0];
  console.log(rowUser);
  if (rowUser === 0) {
    res.json({
      message: ` User với id = ${id} k tồn tại`,
    });
  } else {
    res.json(rowUser);
  }
});

//  Update User
router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let { name, email, age } = req.body;
  try {
    let updateUser = await db.execute(`SELECT * FROM users WHERE user_id = ?`, [
      id,
    ]);
    let rowUser = updateUser[0];
    console.log(rowUser);
    if (rowUser === 0) {
      res.json({
        message: `User với id = ${id} k tồn tại`,
      });
    } else {
      await db.execute(
        `UPDATE users SET name = ?, email = ?,age = ? WHERE user_id = ?`,
        [
          name || rowUser[0].name,
          email || rowUser[0].email,
          age || rowUser[0].age,
          id,
        ]
      );
      res.json({
        message: "Update success",
      });
    }
  } catch (error) {
    res.json({
      messenge: "Update not success",
    });
  }
});


//Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM users WHERE user_id = ?", [id]);
    let data = await db.execute("SELECT * FROM users");
    res.json({
      message: "Đã delete thành công",
      user: data[0],
    });
  } catch (error) {
    res.json({
      message: "Delete not success",
    });
  }
});


module.exports = router;
