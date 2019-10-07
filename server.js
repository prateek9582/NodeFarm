//overview or Home Page => "HomePage", "/", ""
//Product Page => "product"
///api => "/api"(display data.json to browser)
//Error 404

var http = require("http");
var fs = require("fs");
var url = require("url");
var template = fs.readFileSync("./templates/product.html");
template = template+"";
var json = fs.readFileSync("data.json");
json = JSON.parse(json);
var htemplate = fs.readFileSync("./templates/overview.html");
htemplate += "";
var ctemplate = fs.readFileSync("./templates/card.html");
ctemplate += "";

function replace(product, template){
    template = template.replace(/#image#/g, product.image);
    template = template.replace(/#from#/g, product.from);
    template = template.replace(/#productname#/g, product.productName);
    template = template.replace(/#nutrients#/g, product.nutrients);
    template = template.replace(/#quantity#/g, product.quantity);
    template = template.replace(/#price#/g, product.price);
    template = template.replace(/#description#/g, product.description);
    template = template.replace(/{id}/g, product.id);
    template = template.replace(/#back#/g, "/");
    if(!product.organic){
        template = template.replace(/#not-organic#/g, "not-organic");
    }
    return template;
}


// file = file.replace(/Fresh Avocados/g,rn);//harr place p replace krane k lie ese likhna pada  agr normally likhte to ek br hi replace krta
var server = http.createServer(function(req, res){
    var nurl = url.parse(req.url, true);
    if(req.url == "/"  || req.url == "/homepage" || req.url == ""){
        var result = "";
        for(var i = 0 ; i < json.length ; i++){
            result += replace(json[i],ctemplate);
        }
        ctemplate = result;
        htemplate = htemplate.replace(/#cardsarea#/g, ctemplate);
        res.write(htemplate);
    }
    else if(nurl.pathname == "/product"){
        var id = nurl.query.id;
        var productname = replace(json[id],template);
        res.write(productname);
    }
    else if(req.url == "/api"){
        res.write(file1);
    }
    else{
        res.write("Error 404");
    }
    res.end();
});
var port = process.env.PORT || 3000;

server.listen(port, function(){
    console.log("server is listening at port 3000");
})
