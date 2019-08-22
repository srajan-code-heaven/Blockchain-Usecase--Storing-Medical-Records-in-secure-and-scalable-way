// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
const eutil = require('ethereumjs-util')



// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

// routes will go here
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/validate', function (req, res) {
    const priv = req.param('pkey');
    const rsv = eutil.ecsign(eutil.sha256("srajan"), eutil.toBuffer(priv));
    const pubKey = eutil.ecrecover(eutil.sha256("srajan"), rsv.v, rsv.r, rsv.s);
    const addrBuf = eutil.pubToAddress(pubKey);
    const addr = eutil.bufferToHex(addrBuf);
    console.log(addr);
    res.send(addr);
});
