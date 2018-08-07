import * as f from '../constants';

export function createESQuery(req) {
    let retQuery = [];
    if (req.params.id) {
        retQuery.push({
            term: {
                "employeeid": req.params.id
            }
        });
    } else {
        if (req.body) {
            var clause = req.body;
            let searchType;
            let field;
            let value;
            if (clause.length > 0) {
                clause.forEach(function (obj) {
                    searchType = obj.search_type;
                    field = f.esColumnMapping.get(obj.field);
                    value = obj.value;
                    if (searchType == 'String') {
                        retQuery = createStringMatch(retQuery, field, value);
                    } else if (searchType == 'Number') {
                        retQuery = createNumberMatch(retQuery, field, value);
                    }
                    else{
                        console.log("employeeid:"+obj.employeeid)
                        retQuery.push({
                            term: {
                                "employeeid": obj.employeeid
                            }
                        });
                        
                    }
                })
            }
        }
    }
    return retQuery;
}



function createStringMatch(retQuery, field, value) {
    retQuery.push({
        match: {
            [field]: value
        }
    });
    return retQuery;
}

function createNumberMatch(retQuery, field, value) {
    retQuery.push({
        term: {
            [field]: value
        }
    });
    return retQuery;
}


export function createDSQuery(req) {
    let retQuery = [];
    if (req.params.id) {
        retQuery.push({
            term: {
                "deptId": req.params.id
            }
        });
    } else {
        if (req.body) {
            var clause = req.body;
            let searchType;
            let field;
            let value;
            if (clause.length > 0) {
                clause.forEach(function (obj) {
                    searchType = obj.search_type;
                    field = f.esColumnMapping.get(obj.field);
                    value = obj.value;
                    if (searchType == 'String') {
                        retQuery = createStringMatch(retQuery, field, value);
                    } else if (searchType == 'Number') {
                        retQuery = createNumberMatch(retQuery, field, value);
                    }
                })
            }
        }
    }
    return retQuery;
}



function createStringMatch(retQuery, field, value) {
    retQuery.push({
        match: {
            [field]: value
        }
    });
    return retQuery;
}

function createNumberMatch(retQuery, field, value) {
    retQuery.push({
        term: {
            [field]: value
        }
    });
    return retQuery;
}