const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => {
    console.log(req.method, req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('body :', req.body, 'query :', req.query);
    req.date = new Date();
    next();
});

require('./src/app/routes')(app);
app.use((req, res) => res.status(404).json({ status: false, message: "Route Not Found", data: [] }));
app.use((err, req, res, next) => {
    console.log("request error: ", err)
    return res.status(400).json({ status: false, message: "Error In Request", data: [] })
})

const PORT = devConfig.PORT || 6262;

app.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}`);


    // try {
    //     const url = await ngrok.connect(PORT);
    //     console.log(`Ngrok tunnel: ${url}`);
    // } catch (error) {
    //     console.error("Error starting ngrok:", error);
    // }
});