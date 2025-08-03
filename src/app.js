const express = require('express');

const app = express();
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((req,res)=>{
    res.send("Hello from DevTinder Node Server");
});

app.use("/user",(req,res)=>{
    res.send("Hello from User Route");
})