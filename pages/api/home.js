import { selectPlayerDB } from "../../prisma/queries/SELECT/player";
import users from "../../lib/users"

// Al ir a http://localhost:3000/api/home te devuelve el siguiente json
export default async (req, res) => {
    const mensaje = req.body;

    const user = await selectPlayerDB(mensaje.username);

    // checks the autenticity
    if (user != null){
        if (user.password_hash == mensaje.password){ //cambiar por password + anadir mecanismo hash
            // TODO
            // looks for the top N players within the friends set
            const bestFour = [  // top 4 friends with the higest score
                {"username": users[4].username, "stars": users[4].stars},
                {"username": users[1].username, "stars": users[1].stars},
                {"username": users[2].username, "stars": users[2].stars},
                {"username": users[5].username, "stars": users[5].stars}
            ]
            // END TODO
            const notifications = 2 // sustituir por inferior cuando se puedan mandar notificaciones
            //const notifications = user.receiver.length    // amount of notifications
            res.status(200).json({  result:'success',
                                    picture: user.image_ID,
                                    stars: user.stars,
                                    coins: user.mooncoins,
                                    bestFour, notifications});
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'});
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'});
    }
}