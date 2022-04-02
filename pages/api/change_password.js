import { selectPlayerDB } from "../../prisma/queries/SELECT/player";

// Al ir a http://localhost:3000/api/change_password te devuelve el siguiente json
export default async (req, res) => {
    const message = req.body;

    const user = await selectPlayerDB(message.username);

    // checks if the requested user exists
    if (user != undefined){
        // checks password
        if (user.password_hash == message.password){ //cambiar por password + anadir mecanismo hash
            // TODO
            // changePasswordDB(user.username,message.newPassword)
            // END TODO
            res.status(200).json({result:'success'});
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'});
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'});
    }
}