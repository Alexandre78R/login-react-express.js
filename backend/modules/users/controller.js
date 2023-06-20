const { findByMail, findAll, deleteOne, addOne, updateOne} = require("./model"); 

const jwt = require("jsonwebtoken");

const argon2 = require("argon2");

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: "Please specify both email and password" });
      return;
    }

    const dataUser = {
        email : email,
        password : password,
        role : "ROLE_USER"
    }

    try {

        const hash = await argon2.hash(dataUser.password);
        dataUser.password = hash;

        const userNew = await addOne(dataUser);
         res.status(201).send(userNew);
         
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error : err.message});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userLogin = await findByMail(email);
        if (userLogin.length === 0) {
            res.status(403).send({
                error: "Invalid email",
            });
          } else {

            const { id, email, role } = userLogin[0];
            const hash = userLogin[0].password;
            
            const checkPassword = await argon2.verify(hash, password)
            
            if (checkPassword) {
                const token = jwt.sign(
                    { id: id, role: role },
                    process.env.JWT_AUTH_SECRET,
                    {
                      expiresIn: "1h",
                    }
                  );
                  res
                  .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                  })
                  .status(200)
                  .send({
                    id,
                    email,
                    role,
                  });
              } else {
                res.status(403).send({
                  error: "Invalid password",
                });
            }
          }
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error : err.message});
    }

}

const browse = async (req, res) => {
    try {
        const usersList = await findAll();
        res.send(
            usersList.map((user) => {
              return {
                id: user.id,
                email: user.email,
                role: user.role,
              };
            })
        );
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error : err.message});
    }
} 

const logout = (req, res) => {
    return res.clearCookie("access_token").sendStatus(200);
}

const edit = async (req, res) => {
    const user = req.body;

    user.id = parseInt(req.params.id, 10);

    try {

        const hash = await argon2.hash(user.password);
        user.password = hash;

        const userEdit = await updateOne(user);
        const { affectedRows, id, email, role } = userEdit;
        if (affectedRows === 1) {
            res.status(200).json({id, email, role})
        } else {
            res.status(404).json({ message : "No user found"})
        }
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error : err.message});
    }
};

const deleteUserOne  = async (req, res) => {
    try {
        const userDelete = await deleteOne(req.params.id);
        const { affectedRows } = userDelete;
        if (affectedRows === 1) {
            res.status(200).json({affectedRows, message: "user delete"})
        } else {
            res.status(404).json({ message : "No user found"})
        }
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error : err.message});
    }
}

module.exports = { browse, register, login, logout, edit, deleteUserOne };