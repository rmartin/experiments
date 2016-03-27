'use strict';
var request = require('request');

const username = 'admin',
    password = 'admin',
    serverRequests = {
        'submitPickListNodeForLocaleContent': {
            'url': 'http://162.209.73.146:4502/bin/querybuilder.json',
            'workflowPath': '/etc/workflow/models/ntccms/pick-list-locale-content/jcr:content/model'
        },
        'submitPickListNodeForTranslation': {
            'url': 'http://162.209.73.146:4502/etc/workflow/instances',
            'workflowPath': '/etc/workflow/models/ntccms/pick-list-request-translation/jcr:content/model'
        }
    },
    pickListPaths = ['/content/ntccms/en_US/pick-lists/beeps',
        '/content/ntccms/en_US/pick-lists/benefits',
        '/content/ntccms/en_US/pick-lists/equipment',
        '/content/ntccms/en_US/pick-lists/subtext',
        '/content/ntccms/en_US/pick-lists/trainers',
        '/content/ntccms/en_US/pick-lists/my-plan',
        '/content/ntccms/en_US/pick-lists/workout-intro',
        '/content/ntccms/en_US/pick-lists/workout-outro',
        '/content/ntccms/en_US/pick-lists/drill-reps',
        '/content/ntccms/en_US/pick-lists/drill-transition',
        '/content/ntccms/en_US/pick-lists/drill-descriptor',
        '/content/ntccms/en_US/pick-lists/drill-reminder',
        '/content/ntccms/en_US/pick-lists/drill-distance',
        '/content/ntccms/en_US/pick-lists/drill-duration'
    ],
    pickListPathsIterator = pickListPaths[Symbol.iterator]();

let processPaths = [],
    index = 0;


let submitPickListNodeForLocaleContent = (pickListNode) => {
    let currentPickListNode = pickListNode + '/jcr:content';
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Sending ' + currentPickListNode + ' for translation');
            request
                .post({
                    url: serverRequests.submitPickListNodeForLocaleContent.url,
                    qs: {
                        model: serverRequests.submitPickListNodeForLocaleContent.workflowPath,
                        payload: currentPickListNode,
                        payloadType: 'JCR_PATH',
                        workflowTitle: pickListNode
                    }
                }, function(error, response, body) {
                    console.log('Translation request for ' + currentPickListNode + ' responded with ' + response.statusCode);
                    resolve(true);
                })
                .auth(username, password, false)
        }.bind(this), 5000);
    })
}

let submitPickListNodeForTranslation = (pickListNode) => {


    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Sending ' + pickListNode + ' for translation');
            console.log(serverRequests.submitPickListNodeForTranslation.workflowPath)
            request
                .post({
                    url: serverRequests.submitPickListNodeForTranslation.url,
                    qs: {
                        model: serverRequests.submitPickListNodeForTranslation.workflowPath,
                        payload: pickListNode,
                        payloadType: 'JCR_PATH',
                        workflowTitle: pickListNode
                    }
                }, function(error, response, body) {
                    console.log('Translation request for ' + pickListNode + ' responded with ' + response.statusCode);
                    resolve(true);
                })
                .auth(username, password, false)
        }.bind(this), 5000);
    })
}


let processPickListPaths = (pickListPathsIterator) => {
    let currPickList = pickListPathsIterator.next();
    if (!currPickList.done) {
        submitPickListNodeForLocaleContent(currPickList.value).then(function(res) {
            submitPickListNodeForTranslation(currPickList.value).then(function(response) {
                processPickListPaths(pickListPathsIterator);
            }, function(err) {
                console.log(err);
            })
        })
    }
}

processPickListPaths(pickListPathsIterator);
