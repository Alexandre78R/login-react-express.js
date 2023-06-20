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
                res.status(200).send({
                  id,
                  email,
                  role,
                  token,
                });
              } else {
                res.status(403).send({
                  error: "Invalid password",
                });
            }
  
            // TODO sign JWT with 1h expiration
  
            // TODO send the response and the HTTP cookie
          }
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error : err.message});
    }

}

const browse = async (req, res) => {
    try {
        const usersList = await findAll();
        // TODO send the list of users (without passwords)
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error : err.message});
    }
} 

const logout = (req, res) => {
    // TODO remove JWT token from HTTP cookies
};

const edit = async (req, res) => {
    const user = req.body;

    user.id = parseInt(req.params.id, 10);

    try {
        const userEdit = await updateOne(user);
        // TODO send the list of users (without passwords)
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error : err.message});
    }
};

const deleteUserOne  = async (req, res) => {
    const id = req.params.id;
    try {
        const userEdit = await deleteOne(id);
        // TODO send the list of users (without passwords)
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({error : err.message});
    }
}

module.exports = { browse, register, login, logout, edit, deleteUserOne };