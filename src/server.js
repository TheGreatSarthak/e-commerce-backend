const app = require(".");
const { connectDB } = require("./config/db");

const PORT = 5454;
app.listen(PORT, async () => {
  await connectDB();
  console.log("ecommerce api listening on PORT : ", PORT);
});
