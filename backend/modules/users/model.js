const db = require("../../config/db");

const findByMail = (email) => {
    return db
        .execute("select * from user where email = ?", [email])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const findAll = () => {
    return db
        .query("select * from user")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const addOne = (user) => {
    const { email, password, role } = user;
    return db
        .execute("insert into user (email, password, role) values (?, ?, ?)",
        [email, password, role])
        .then(([data]) => {
            console.log("data -> ", data)
            return { id: data.insertId, ...user };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
}

const deleteOne = (id) => {
    return db
        .execute("delete from user where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const updateOne = (user) => {
    return db
        .execute("update user set email = ?, password = ?, role = ? where id = ?",
        [user.email, user.password, user.role, user.id])
        .then(([data]) => {
            return { id: data.insertId, ...avis };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
}


module.exports = { findByMail, findAll, deleteOne, addOne, updateOne}