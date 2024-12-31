const createOrder = async (req, res) => {
const response = req.body;
response.message = 'Order created successfully';
response.customerId = 'gfnvbn ';
console.log(req.body)
res.send(response);
}

module.exports = {createOrder}