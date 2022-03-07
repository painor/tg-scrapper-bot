const Trade = require('../models/trades');

exports.showMain = (req,res) => {
    res.render('index');
}

exports.getTrades = async (req, res) => {
    let trades, results;
    results = {
        msg : 'OK',
        status : 200,
        data : null
    }
    try{
        trades = await Trade.find();
        results.data = trades;
        res.send(results);
    }catch(err){
        results.msg = 'ERROR';
        results.status = 400;
        results.data = err;
        res.send(results);
    }
}
