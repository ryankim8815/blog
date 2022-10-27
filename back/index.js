// import "dotenv/config";
const app = require("./src/app");

// const PORT = process.env.SERVER_PORT || 5000;
const PORT = 5002;

app
  .listen(PORT, () => {
    console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
  })
  .on("error", (err) => console.log(err));
