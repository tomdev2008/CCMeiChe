var User = require('../../model/user');

exports.add = function(req,res,next){
  var carpark = req.body.carpark;
  var address = req.body.address;
  var latlng = req.body.latlng && req.body.latlng.split(",").map(function(item){
    return +item;
  });

  if(!carpark || !latlng || !address){
    return res.status(400).send("missing params");
  }

  User.addAddress(req.user.phone, req.body, function(err){
    if(err){
      if(err.name == "EEXISTS"){
        return res.status(400).send("该地址已存在");
      }else{
        return next(err);
      }
    }
    res.status(200).send({message:"ok"});
  });
}


exports.update = function(req,res,next){
  var index = req.body.index;
  var carpark = req.body.carpark;
  var address = req.body.address;
  var latlng = req.body.latlng && req.body.latlng.split(",").map(function(item){
    return +item;
  });

  if(!carpark || !latlng || !address){
    return res.status(400).send("missing params");
  }

  User.modifyAddress(req.user.phone, index, {
    carpark: carpark,
    latlng: latlng,
    address: address
  }, function(err){
    if(err){
      return next(err);
    }
    res.status(200).send({message:"ok"});
  });
}

