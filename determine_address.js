var ip = require("ip");
var fs = require('fs');

fs.writeFile("address.json", JSON.stringify({ address: ip.address() }), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Address file created -> IP = " + ip.address());
});