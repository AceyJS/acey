export default async (req, res) => {
    const response = await fetch(`https://jobs.github.com/positions.json?search=${req.query.title}`)
    if (response.status == 200){
        const json = await response.json()
        res.status(200).json(json)
        return
    }
    res.status(response.status)
}