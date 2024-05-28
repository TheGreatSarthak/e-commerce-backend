import app from "./index.js";
import connectDB from "./config/db.js";

const PORT = 5454;
app.listen(PORT, async () => {
  await connectDB();
  console.log("ecommerce api listening on PORT : ", PORT);
});
