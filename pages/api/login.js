import { selectPlayerDB } from "../../prisma/queries/SELECT/player";

// Al ir a http://localhost:3000/api/login te devuelve el siguiente json
export default async (req, res) => {
    const mensaje = req.body;

    const user = await selectPlayerDB(mensaje.username);

    // checks if the requested user exists
    if (user != null){
        // checks password
        if (user.password_hash == mensaje.password){ //cambiar por password + anadir mecanismo hash
            res.status(200).json({result:'success'});
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'});
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'});
    }
}