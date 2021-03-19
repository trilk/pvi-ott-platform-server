const router = require("express").Router();
const Customers = require("../model/Customers");

// define response
const { __success, __network } = require("../define_response");

//ROUTER POST
router.post("/register", async (req, res) => {
  const customer = new Customers({
    CustomerName: req.body.customerName,
    CustomerDesc: req.body.customerDesc,
  });
  try {
    const saveCustomer = await customer.save();
    return res.send(__success());
  } catch (error) {
    return res.status(400).send(__network());
  }
});

//ROUTER GET
module.exports = router;
