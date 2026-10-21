const https = require("https");
const fs = require("fs");

https.get("https://dummy-weld-seven.vercel.app/assets/index-B52oePs3.js", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    fs.writeFileSync("/tmp/bundle.js", data);
    console.log("Bundle saved to /tmp/bundle.js, length:", data.length);
  });
});
