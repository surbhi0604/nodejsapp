import elasticsearch from 'elasticsearch';
const ES_CONNECTION_URL = process.env.ES_CONNECTION_URL || 'irisadmin:irisadmin@iris-es-staging.inbcu.com' ;


console.log('ES is currently using: ' + ES_CONNECTION_URL);

var client = new elasticsearch.Client({
    hosts: [
        ES_CONNECTION_URL
    ]
});

module.exports = client;