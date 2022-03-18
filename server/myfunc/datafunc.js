var findall = function(model){
    return new Promise((resolve, reject) => {
        model.find({}
            ,{'product_id':1,'history_parameters':1}
            ,function(err,doc){
            //console.log(doc);
            resolve(doc);
            //return doc;
        })
    })
}

var selectID = function(model,ID){
    return new Promise((resolve, reject)=>{
        model.find({product_id:ID},
            function(err,doc){
                resolve(doc);
            })
    })
}

module.exports = {findall,selectID};