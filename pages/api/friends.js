import users from "../../lib/users"

// Al ir a http://localhost:3000/api/friends te devuelve el siguiente json
export default async (req, res) => {
    const mensaje = req.body;

    // searches for the user in the DB
    const user = await selectPlayerDB(mensaje.username);
    // TODO
    // looks for friends
    const friends = [users[0].username,users[1].username];
    // checks notifications
    const notifications = [users[2].username,users[3].username];  // pending users
    // END TODO

    // checks the autenticity
    if (user != null){
        if (user.password == mensaje.password){
            res.status(200).json({friends ,notifications});
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'}); //wrong_validation?
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'}); //wrong_validation y unificar ifs?
    }
}