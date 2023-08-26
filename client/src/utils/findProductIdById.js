const findProductIdById = (data, id) => {
  const product = data.find((item) => item.product_id === id);
  return product ? product : null;
};

export { findProductIdById };
