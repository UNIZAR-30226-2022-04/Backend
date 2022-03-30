import crypto from "crypto"
import users from "../../lib/users"
//import CryptoJS from "crypto-js"

// Al ir a http://localhost:3000/api/register te devuelve el siguiente json
export default function handler(req, res) {
    const mensaje = req.body;
    const user = users.find(user => user.username == mensaje.username);

    if (user == null){
        const notifications = 0   // amount of notifications (HARDCODED)
        const coins = 100   // amount of initial coins (HARCODED)
        const bestFour = [  // top 4 friends with the higest score (NO SENSE HERE)
            {"username": "null"},
            {"username": "null"},
            {"username": "null"},
            {"username": "null"}
        ]
        const picture = 0 // ID number of the default profile picture (HARDCODED)
            
        //const salt = crypto.randomBytes(16).toString("hex")

        const query = {
            username: mensaje.username,
            //salt: salt,
            password: mensaje.password,
            //password: CryptoJS.SHA512(salt + mensaje.password).toString(),
        }
        users.push(query);

        // STORE VALUES IN DB HERE

        res.status(200).json({  result:'success',
                                notifications: notifications,
                                coins: coins,
                                bestFour: bestFour,
                                picture: picture});
    } else {
        res.status(200).json({ result:'error',reason:'user_already_registered'});
    }
}