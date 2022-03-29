// Al ir a http://localhost:3000/api/hello te devuelve el siguiente json
export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' })
}
