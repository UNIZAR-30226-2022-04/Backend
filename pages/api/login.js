let users = [
    {
        "username": "Jaime",
        "password": "Jaime1234"
    },
    {
        "username": "Pilar",
        "password": "Pilar1234"
    },
    {
        "username": "Ismael",
        "password": "Ismael1234"
    },
    {
        "username": "Adrian",
        "password": "Adrian1234"
    },
    {
        "username": "Jorge",
        "password": "Jorge1234"
    },
    {
        "username": "Jesus",
        "password": "Jesus1234"
    }
]

// Al ir a http://localhost:3000/api/login te devuelve el siguiente json
export default function handler(req, res) {
    const mensaje = req.body;
    const user = users.find(user => user.username == mensaje.username)

    if (user != null){
        if (user.password == mensaje.password){
            res.status(200).json({ result:'success',reason:''});
        } else {
            res.status(200).json({ result:'error',reason:'wrong_password'});
        }
    } else {
        res.status(200).json({ result:'error',reason:'user_not_found'});
    }
}