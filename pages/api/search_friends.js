import users from "../../lib/users"

// Al ir a http://localhost:3000/api/search_friends te devuelve el siguiente json
export default function handler(req, res) {
    const mensaje = req.body;

    // TODO
    // searches for the user in the DB
    const user = users.find(user => user.username == mensaje.username)
    // END TODO

    // checks the autenticity
    if (user != null){
        if (user.password == mensaje.password){
            // TODO
            // looks for the target user in the DB
            const targetUser = users.find(targetUser => targetUser.username == mensaje.searchedName)
            // END TODO

            if (targetUser != null){
                const picture = targetUser.picture

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