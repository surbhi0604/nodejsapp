'use strict';
import client from '../connection';



export function deleteESDataByQuery(indexName, typeName, id, cb) {
    client.delete({
        index: indexName,
        type: typeName,
        id: id
    }, function (error, response) {
        cb(response);
    });
}

/*export function updateESDataByQuery(indexName, typeName, query, cb){
    client.update({
        index: indexName,
        type: typeName,
        body: query
    }, function (error, response) {
        cb(response);
    });
}
*/

export function saveESData(req, index, type, cb) {
    client.index({
        index: index,
        type: type,
        refresh: true,
        body: {
            "usersso": req.usersso,
            "username": req.username,
            "employeeid": req.employeeid,
            "location": req.location,
            "backgroundflag": req.backgroundflag,
            "joindate": req.joindate
        },
    }, function (error, response) {
        refreshIndex(index, (cbr) => {
            cb(response);
        });
    });
}

function refreshIndex(index, cb) {
    client.indices.refresh({
        "index": index
    }, function (error, response) {
        return cb(response);
    })
}

export function executeSearch(indexname, typename, size, query, cb) {
    client.search({
        size: size,
        index: indexname,
        type: typename,
        body: query
    }, function (error, response) {
        refreshIndex(indexname, (cbr) => {
            cb(response);
        });
    });
}

export function saveDSData(req, index, type, cb) {
    client.index({
        index: index,
        type: type,
        refresh: true,
        body: {
            "deptId": req.deptId,
            "deptName": req.deptName,
            "deptManager": req.deptManager
        },
    }, function (error, response) {
        refreshIndex(index, (cbr) => {
            cb(response);
        });
    });
}

export function deleteDSDataByQuery(indexName, typeName, id, cb) {
    client.delete({
        index: indexName,
        type: typeName,
        id: id
    }, function (error, response) {
        cb(response);
    });
}

export function updateESData(req, index, type, id, cb) {
    client.index({
        index: index,
        type: type,
        id: id,
        refresh: true,
        body: {
            "usersso": req.usersso,
            "username": req.username,
            "location": req.location,
            "employeeid": req.employeeid,
            "backgroundflag": req.backgroundflag,
            "joindate": req.joindate
        },
    }, function (error, response) {
        refreshIndex(index, (cbr) => {
            cb(response);
        });
    });
}

export function updateDSData(req, index, type, id, cb) {
    client.index({
        index: index,
        type: type,
        id: id,
        refresh: true,
        body: {
            "deptId": req.deptId,
            "deptName": req.deptName,
            "deptManager": req.deptManager,
            
        },
    }, function (error, response) {
        refreshIndex(index, (cbr) => {
            cb(response);
        });
    });
}