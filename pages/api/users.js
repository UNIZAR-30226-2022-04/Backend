import users from "../../lib/users"

// Al ir a http://localhost:3000/api/users te devuelve el siguiente json
export default function handler(req, res) {
    res.status(200).json(users);
}