import users from "../../lib/users"

// Al ir a http://localhost:3000/api/friends te devuelve el siguiente json
export default function handler(req, res) {
    const mensaje = req.body;
    const user = users.find(user => user.username == mensaje.username);
    const friends = [users[0].username,users[1].username];
    const pending = [users[2].username,users[3].username];  //usuarios pendientes
    if (user != null){
        if (user.password == mensaje.password){
            res.status(200).json({friends ,notifications:pending});
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'}); //wrong_validation?
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'}); //wrong_validation y unificar ifs?
    }
}