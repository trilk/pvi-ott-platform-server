const router = require("express").Router();
const Customers = require("../model/Customers");

//ROUTER POST
router.post("/register", async (req, res) => {
  const customer = new Customers({
    CustomerName: req.body.customerName,
    CustomerDesc: req.body.customerDesc,
  });
  try {
    const saveCustomer = await customer.save();
    res.send(saveCustomer);
  } catch (error) {
    res.status(400).send(error);
  }
});

//ROUTER GET
module.exports = router;
