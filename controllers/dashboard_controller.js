// render the dashboard page
module.exports.dashboard=function(req,res){
    return res.render('dashboard',{
        title:'dashboard'
    })
}