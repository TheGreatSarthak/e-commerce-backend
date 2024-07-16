import Category from "../models/categoryModel";
import Product from "../models/productModel";

const createProduct = async (reqData) => {
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });

  return await product.save();
};

const deleteProduct = async (productId) => {
  const product = await findProductById(productId);

  await Product.findByIdAndDelete(productId);

  return "Product Deleted Successfully";
};

const updateProduct = async (productId, reqData) => {
  return await Product.findByIdAndUpdate(productId, reqData);
};

const findProductById = async (id) => {
  const product = await Product.findById(id).populate("category").exec();

  if (!product) {
    throw new Error(`Product not found with id : ${id}`);
  }

  return product;
};

const getAllProducts = async (reqQuery) => {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 10;
  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );

    const colorRegeX =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegeX);
  }
};
