const mongoose = require('mongoose');
const url = "mongodb+srv://QuanLi:liquanliquan@cluster0.1x0en.mongodb.net/prediction?retryWrites=true&w=majority";

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true })
.then(res =>{
    res && console.log('connection success');
}).catch(err=>{
    err && console.log('connection failed')
});

const testSchema = new mongoose.Schema({
  _id : {type: Number},
  product_id : {type: Number},
  history : {type: Array},
  future : {type: Array}
});

const daily_salesSchema = new mongoose.Schema({
  _id: {type: Number},
  product_id: {type: Number},
  history_parameters: {type: Array},
  history_discount_info: {type: Array},
  history_discounts: {type: Array},
  history_sales: {type: Array},
  future_parameters: {type: Array},
  future_discount_info: {type: Array},
  future_discounts: {type: Array},
  future_sales: {type: Array}
})

const Testmodel = mongoose.model('testmodel', testSchema,'test');
const Daily_SalesModel = mongoose.model('daily_salesModel', daily_salesSchema,'daily_sales');

module.exports = {
  Testmodel,
  Daily_SalesModel
};