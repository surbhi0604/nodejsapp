'use strict';
import * as f from '../../constants';
import {
    saveESData,
    executeSearch,
    deleteESDataByQuery,
    updateESData
} from '../../core/core-queryexecute'
import {
    createESQuery
} from '../../core/core-querybuilder'


exports.createEmployee = function (req, res) {
    checkValidRequest(req);
    var clause = req.body;
    if (clause.length > 0) {
        clause.forEach(function (req) {
            saveESData(req, f.EMPLOYEE_INDEX, f.EMPLOYEE_TYPE, (response) => {
                res.json(response);
            });
        });
    }
}

function checkValidRequest(req) {
    if (!req.body) return res.sendStatus(400);
}

exports.listEmployee = function (req, res) {
    let query = {
        "query": {
            "match_all": {}
        },
        "size": f.MAX_RESULTS
    };

    executeSearch(f.EMPLOYEE_INDEX, f.EMPLOYEE_TYPE, f.MAX_RESULTS,
        JSON.stringify(query), (response) => {
            res.json(response);
        });
}


exports.searchEmployee = function (req, res) {
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

    executeSearch(f.EMPLOYEE_INDEX, f.EMPLOYEE_TYPE, f.MAX_RESULTS,
        JSON.stringify(query), (response) => {
            res.json(response);
        });
}


exports.deleteEmployee = function (req, res) {
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
        }
    };

    console.log('query:' + JSON.stringify(query));

    executeSearch(f.EMPLOYEE_INDEX, f.EMPLOYEE_TYPE, f.MAX_RESULTS,
        JSON.stringify(query), (response) => {
          console.log('response' + JSON.stringify(response));
            if(response && response.hits && response.hits.hits[0]){
            
            deleteESDataByQuery(f.EMPLOYEE_INDEX, f.EMPLOYEE_TYPE, response.hits.hits[0]._id, (resp) => {
                res.json(resp);
            });
        
        }

        });
}

exports.updateEmployee = function (req, res) {
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

    executeSearch(f.EMPLOYEE_INDEX, f.EMPLOYEE_TYPE, f.MAX_RESULTS,
        JSON.stringify(query), (response) => {
            var clause = req.body;
            if (clause.length > 0) {
                clause.forEach(function (req) {
                    if(response && response.hits && response.hits.hits[0]){
                    updateESData(req, f.EMPLOYEE_INDEX, f.EMPLOYEE_TYPE,response.hits.hits[0]._id, (response) => {
                        res.json(response);
                    });
                }
                });
            
            }
        
        });
      
        
}