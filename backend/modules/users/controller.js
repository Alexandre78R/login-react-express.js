const { findByMail, findAll, deleteOne, addOne, updateOne} = require("./model"); 

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const dataUser = req.body;
    // TODO check for email and password

    // TODO hash password

    try {
        const userNew = await addOne(dataUser);
        // TODO send the response
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({ message :  "Server error", err});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [userLogin] = await findByMail(email);
        if (userLogin[0] == null) {
            // TODO invalid email
          } else {
            const { id, email, password: hash, role } = userLogin[0];
  
            // TODO invalid password
  
            // TODO sign JWT with 1h expiration
  
            // TODO send the response and the HTTP cookie
          }
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({ message :  "Server error", err});
    }

}

const browse = async (req, res) => {
    try {
        const usersList = await findAll();
        // TODO send the list of users (without passwords)
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({ message :  "Server error", err});
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
        res.status(500).json({ message :  "Server error", err});
    }
};

const deleteUserOne  = async (req, res) => {
    const id = req.params.id;
    try {
        const userEdit = await deleteOne(id);
        // TODO send the list of users (without passwords)
    } catch (err) {
        console.log('Error', err)
        res.status(500).json({ message :  "Server error", err});
    }
}

module.exports = { browse, register, login, logout, edit, deleteUserOne };