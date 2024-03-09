module.exports = (req) => {
    let objectSearch = {
        keyword:""
    }
    if(req.query.keyword){
        objectSearch.keyword = req.query.keyword;
        const regex = new RegExp(req.query.keyword,"i");
        objectSearch.regex = regex;
    }
    return objectSearch;
}