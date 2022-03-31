import crypto from "crypto"
import users from "../../lib/users"
//import CryptoJS from "crypto-js"

// Al ir a http://localhost:3000/api/register te devuelve el siguiente json
export default function handler(req, res) {
    const mensaje = req.body;

    // TODO
    // searches for the user in the DB
    const user = users.find(user => user.username == mensaje.username);
    // END TODO

    // checks is the username is already taken
    if (user == null){
            
        //const salt = crypto.randomBytes(16).toString("hex")

        const query = {
            username: mensaje.username,
            //salt: salt,
            password: mensaje.password,
            //password: CryptoJS.SHA512(salt + mensaje.password).toString(),
            picture: 0, // ID number of the default profile picture (HARDCODED)
            stars: 0,   // amount of initial stars (HARDCODED)
            coins: 100  // amount of initial coins (HARCODED)
        }
        users.push(query);

        // TODO STORE VALUES IN DB HERE

        // if(la introduccion ha ido bien){
            res.status(200).json({result:'success'});
        //} else error
    } else {
        res.status(200).json({ result:'error',reason:'user_already_registered'});
    }
}