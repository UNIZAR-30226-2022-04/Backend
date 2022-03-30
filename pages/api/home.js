import users from "../../lib/users"

// Al ir a http://localhost:3000/api/home te devuelve el siguiente json
export default function handler(req, res) {
    const mensaje = req.body;
    const user = users.find(user => user.username == mensaje.username)

    if (user != null){
        if (user.password == mensaje.password){
            const notifications = 3   // amount of notifications (DB NEEDED)
            const coins = 403   // amount of coins (DB NEEDED)
            const bestFour = [  // top 4 friends with the higest score (DB NEEDED)
                {"username": users[4].username, "score": 2706},
                {"username": users[1].username, "score": 2048},
                {"username": users[2].username, "score": 1414},
                {"username": users[5].username, "score": 1024}
            ]
            const picture = 7 // ID number of the profile picture (DB NEEDED)
            res.status(200).json({  result:'success',
                                    notifications: notifications,
                                    coins: coins,
                                    bestFour: bestFour,
                                    picture: picture});
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'});
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'});
    }
}