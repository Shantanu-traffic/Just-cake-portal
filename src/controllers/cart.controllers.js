const { createError } = require("../middleware/errorHandler.middleware");
const { CartServices } = require("../services");
// add to cart
const addToCart = async (req, res, next) => {
  const { product_id, user_id, quantity, total_price } = req.body;
  if (!product_id || !user_id || !quantity || !total_price) {
    return next(
      createError("Provide all details", 400, "add to cart controller error")
    );
  }
  try {
    const result = await CartServices.Cart.addToCart(req.body);
    return res.status(200).json({
      success: true,
      message: "Item added into cart successfully",
      result: result,
    });
  } catch (error) {
    return next(
      createError(error.message, 500, "add to cart controller error")
    );
  }
};

// delete

const deleteCartItem = async (req, res, next) => {
  const { cart_id } = req.params;

  if (!cart_id) {
    return next(
      createError("Provide cart id", 500, "delete cart item controller")
    );
  }
  try {
    const result = await CartServices.Cart.deleteCartItem(cart_id);
    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      result,
    });
  } catch (error) {
    return next(createError(error.message, 500, "delete cart item controller"));
  }
};

// get all item

const getAllCartItemForUser = async (req, res, next) => {
  const { user_id } = req.query;

  if (!user_id) {
    return next(
      createError("Provide user id ", 400, "get all cart item controller")
    );
  }
  try {
    const result = await CartServices.Cart.getAllCartItemForUser(user_id);
    if (result.length <= 0) {
      return next(
        createError("No Data Found", 400, "get all cart item controller")
      );
    }
    return res.status(200).json({
      success: true,
      message: "fetch all data successfully",
      result,
    });
  } catch (error) {
    return next(
      createError(error.message, 500, "get all cart item controller")
    );
  }
};

const proudctQty = async (req, res, next) => {
  const { cart_id, quantity, total_price, isIncreaseQty } = req.body;
  if (!cart_id) {
    return next(createError("Provide cart id", 400, "product qty"));
  }
  if (quantity < 0 || total_price < 0) {
    return next(
      createError("Provide +ve number", 400, "product qty contorller")
    );
  }
  try {
    const result = await CartServices.Cart.cartProductQty(req.body);
    return res.status(200).json({
      success: true,
      message: isIncreaseQty
        ? "Proudct Quanty Increase"
        : "Product Quantity Descreases",
      result,
    });
  } catch (error) {
    return next(createError(error.message, 500, "productQty controller"));
  }
};

const editCartItem = async (req, res, next) => {
  console.log("req.boyd",req.body)
  const { note, cart_id } = req.body;
  if (!note || !cart_id) {
    return next(
      createError("Provide all details", 400, "edit cart item controller")
    );
  }
  try {
    const result = await CartServices.Cart.cartAddNotes(req.body);

    return res.status(200).json({
      success: true,
      message: "Notes added succesffully",
      cart_id:result
    });

  } catch (error) {
    return next(createError(error.message, 500, "edit cart controller"));
  }
};
module.exports = {
  addToCart,
  deleteCartItem,
  getAllCartItemForUser,
  proudctQty,
  editCartItem,
};
