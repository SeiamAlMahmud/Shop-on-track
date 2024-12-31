const createOrder = async (req, res) => {
const response = req.body;
console.log(req.body)
res.send(response);
}

module.exports = {createOrder}