import users from "../../lib/users"

// Al ir a http://localhost:3000/api/login te devuelve el siguiente json
export default function handler(req, res) {
    const mensaje = req.body;
    const user = users.find(user => user.username == mensaje.username)

    if (user != null){
        if (user.password == mensaje.password){
            res.status(200).json({result:'success'});
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'});
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'});
    }
}