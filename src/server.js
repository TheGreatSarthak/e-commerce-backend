import { listen } from ".";
import { connectDB } from "./config/db";

const PORT = 5454;
listen(PORT, async () => {
  await connectDB();
  console.log("ecommerce api listening on PORT : ", PORT);
});
