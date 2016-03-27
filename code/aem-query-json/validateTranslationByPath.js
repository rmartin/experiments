'use strict';
var request = require('request');

const username = 'admin',
    password = 'admin',
    serverRequests = {
        'getPickListNodes': {
            'url': 'http://162.209.73.146:4502/bin/querybuilder.json',
        },
        'submitPickListTranformationRequest': {
            'url': 'http://162.209.73.146:4502/etc/workflow/instances',
            'workflowPath': '/etc/workflow/models/ntccms/pick-list-request-translation/jcr:content/model'
        }
    },
    pickListPaths = ['/content/ntccms/en_US/pick-lists/beeps/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/benefits/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/equipment/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/subtext/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/trainers/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/my-plan/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/workout-intro/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/workout-outro/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/drill-reps/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/drill-transition/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/drill-descriptor/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/drill-reminder/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/drill-distance/jcr:content/par',
        '/content/ntccms/en_US/pick-lists/drill-duration/jcr:content/par'
    ],
    pickListPathsIterator = pickListPaths[Symbol.iterator]();

let processPaths = [],
    index = 0;


let submitPickListNodeForTranslation = (pickListNode) => {
    return new Promise(function(resolve, reject) {


        setTimeout(function() {
            console.log('Sending ' + pickListNode.path + ' for translation');
            request
                .post({
                    url: serverRequests.submitPickListTranformationRequest.url,
                    qs: {
                        model: serverRequests.submitPickListTranformationRequest.workflowPath,
                        payload: pickListNode.path,
                        payloadType: 'JCR_PATH',
                        workflowTitle: pickListNode.name
                    }
                }, function(error, response, body) {
                    console.log('Translation request for ' + pickListNode.name + ' responded with ' + response.statusCode);
                    resolve(true);
                })
                .auth(username, password, false)
        }.bind(this), 10000);
    })
}

let processPickListNodes = (pickListPathsIterator) => {
    return new Promise(function(resolve, reject) {

        let processCurrentPickListNode = (pickListPathsIterator) => {
                let currPickListPath = pickListPathsIterator.next();
                if (!currPickListPath.done) {

                    submitPickListNodeForTranslation(currPickListPath.value).then(function(response) {
                        processCurrentPickListNode(pickListPathsIterator);
                    }, function(err) {
                        console.log(err);
                    });

                } else {
                    resolve('done');
                }
            }
            // trigger the pick list paths
        processCurrentPickListNode(pickListPathsIterator);
    });
}

let getPickListNodes = (pickListPath) => {
    return new Promise(function(resolve, reject) {
        console.log('Finding Nodes for: ' + pickListPath);
        request
            .get({
                url: serverRequests.getPickListNodes.url,
                qs: {
                    'p.nodedepth': '1',
                    'p.limit': '-1',
                    'path': pickListPath
                }
            }, function(error, response, body) {
                let parsedResponseBody = JSON.parse(body),
                    pickListNodes = parsedResponseBody.hits,
                    pickListPathsIterator = pickListNodes[Symbol.iterator]();

                    console.log('Started Translation for : ' + pickListPath);
                processPickListNodes(pickListPathsIterator).then(function(res) {
                    resolve('Completed Translation for : ' + pickListPath);
                }, function(err) {
                    console.log(err);
                });

            })
            .auth(username, password, false);
    })
}

let processPickListPaths = (pickListPathsIterator) => {
    let currPickList = pickListPathsIterator.next();
    if (!currPickList.done) {
        getPickListNodes(currPickList.value).then(function(response) {
            processPickListPaths(pickListPathsIterator);
        }, function(err) {
            console.log(err);
        })
    }
}

processPickListPaths(pickListPathsIterator);
