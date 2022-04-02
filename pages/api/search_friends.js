import { selectPlayerDB } from "../../prisma/queries/SELECT/player";

// Al ir a http://localhost:3000/api/search_friends te devuelve el siguiente json
export default async (req, res) => {
    const mensaje = req.body;

    const user = await selectPlayerDB(mensaje.username);

    // checks the autenticity
    if (user != null){
        if (user.password_hash == mensaje.password){ //cambiar por password + anadir mecanismo hash

            const targetUser = await selectPlayerDB(mensaje.searchedName);

            if (targetUser != null){
                const picture = targetUser.image_ID

                // TODO
                // checks friendship
                const isFriend = true
                // END TODO
                res.status(200).json({  result:'success',
                                    isFound: true, picture, isFriend});
            } else {
                res.status(200).json({  result:'success',
                                    isFound: false});
            }
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'});
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'});
    }
}