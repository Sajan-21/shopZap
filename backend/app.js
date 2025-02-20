const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require('./db/connect');
mongoConnect();
const cors = require('cors');
const authRouter = require('./routes/auth-routes');
const adminRouter = require('./routes/admin-routes');
const sellerRouter = require('./routes/seller-routes');
const userRouter = require('./routes/user-routes');

app.use(cors());
app.use(express.static('../client'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(authRouter);
app.use(adminRouter);
app.use(sellerRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
})