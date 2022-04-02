import users from "../../lib/users"

// Al ir a http://localhost:3000/api/manage_friends te devuelve el siguiente json
export default function handler(req, res) {
    const mensaje = req.body;

    const user = await selectPlayerDB(mensaje.username);

    // checks the autenticity
    if (user != null){
        if (user.password == mensaje.password){
            
            // TODO 
            // looks for the target user in the DB
            const targetUser = users.find(user => user.username == mensaje.targetUser)
            // END TODO

            if (targetUser != null){
                if (mensaje.type == "add"){
                    // TODO MAKE FRIENDSHIP PETITION HERE
                } else if (mensaje.type == "delete"){
                    // TODO DELETE FRIENDSHIP PETITION HERE
                }
            }
            res.status(200).json({  result:'success'});
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'});
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'});
    }
}