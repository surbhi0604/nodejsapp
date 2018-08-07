'use strict';
import * as f from '../../constants';
import {
    saveDSData,
    executeSearch,
    deleteDSDataByQuery,
    updateDSData
} from '../../core/core-queryExecute'
import {
    createDSQuery
} from '../../core/core-querybuilder'


exports.createDepartment = function (req, res) {
    checkValidRequest(req);
    var clause = req.body;
    if (clause.length > 0) {
        clause.forEach(function (req) {
            saveDSData(req, f.DEPARTMENT_INDEX, f.DEPARTMENT_TYPE, (response) => {
                res.json(response);
            });
        });
    }
}

function checkValidRequest(req) {
    if (!req.body) return res.sendStatus(400);
}

exports.listDepartment = function (req, res) {
    let query = {
        "query": {
            "match_all": {}
        },
        "size": f.MAX_RESULTS
    };

    executeSearch(f.DEPARTMENT_INDEX, f.DEPARTMENT_TYPE, f.MAX_RESULTS,
        JSON.stringify(query), (response) => {
            res.json(response);
        });
}

exports.searchDepartment = function (req, res) {
    checkValidRequest(req);
    let retQuery = createESQuery(req);

    let query = {
        "query": {
            "constant_score": {
                "filter": {
                    "bool": {
                        "must": retQuery
                    }
                }
            }
        },
        "size": f.MAX_RESULTS
    };

    console.log('query:' + JSON.stringify(query));

    executeSearch(f.DEPARTMENT_INDEX, f.DEPARTMENT_TYPE, f.MAX_RESULTS,
        JSON.stringify(query), (response) => {
            res.json(response);
        });
}



exports.deleteDepartment = function (req, res) {
    let retQuery = createDSQuery(req);

    let query = {
        "query": {
            "constant_score": {
                "filter": {
                    "bool": {
                        "must": retQuery
                    }
                }
            }
        }
    };

    console.log('query:' + JSON.stringify(query));

    executeSearch(f.DEPARTMENT_INDEX, f.DEPARTMENT_TYPE, f.MAX_RESULTS,
        JSON.stringify(query), (response) => {
            //console.log('response' + JSON.stringify(response));
            deleteDSDataByQuery(f.DEPARTMENT_INDEX, f.DEPARTMENT_TYPE, response.hits.hits[0]._id, (resp) => {
                res.json(resp);
            });
        });
}

exports.updateDepartment = function (req, res) {
    checkValidRequest(req);
    let retQuery = createDSQuery(req);

    let query = {
        "query": {
            "constant_score": {
                "filter": {
                    "bool": {
                        "must": retQuery
                    }
                }
            }
        },
        "size": f.MAX_RESULTS
    };

    console.log('query:' + JSON.stringify(query));

    executeSearch(f.DEPARTMENT_INDEX, f.DEPARTMENT_TYPE, f.MAX_RESULTS,
        JSON.stringify(query), (response) => {
            var clause = req.body;
            if (clause.length > 0) {
                clause.forEach(function (req) {
                    if(response && response.hits && response.hits.hits[0]){
                    updateDSData(req, f.DEPARTMENT_INDEX, f.DEPARTMENT_TYPE,response.hits.hits[0]._id, (response) => {
                        res.json(response);
                    });
                }
                });
            
            }
        
        });
      
        
}