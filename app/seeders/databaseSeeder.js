const seeder = require('mongoose-seed');
const dotenv = require('dotenv');
dotenv.config();
const DB_CONNECTION = process.env.MONGO_URL;

seeder.connect(DB_CONNECTION, () => {
    seeder.loadModels([
        './app/models/trades.js',
    ]);
    seeder.clearModels(['Trade'], function(){
        seeder.populateModels(data, function (err, done) {
            if (err){
                return console.log(`Seed error`, err);
            }
            if (done){
                return console.log(`Seed successful`, done);
            }
            seeder.disconnect();
        });
    });
});

const data = [
    {
        'model' : 'Trade',
        'documents' : [
            {
                "name" : "ETH",
                "ca" : '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
                "stopLoss" : "2700",
                "takingProfit" : "2750",
                "amountSell" : '100',
                "buyingPrice" : '2710'
            },
            {
                "name" : "ADA",
                "ca" : '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
                "stopLoss" : "0.8912",
                "takingProfit" : "0.9500",
                "amountSell" : '100',
                "buyingPrice" : '0.9100'
            },
            {
                "name" : "CAKE",
                "ca" : '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
                "stopLoss" : "6.3500",
                "takingProfit" : "6.8000",
                "amountSell" : '100',
                "buyingPrice" : '6.6000'
            }
        ]
    }
]
