var fs = require('fs');
var readline = require('readline');
var request = require('request');
var processPaths = [];

var rl = readline.createInterface({
    input: fs.createReadStream('processPaths.txt')
});

var username = "admin",
    password = "admin",
    url = 'http://162.209.73.146:4502/etc/workflow/instances',
    translationPath = '/etc/workflow/models/ntccms/request-translation/jcr:content/model',
    index = 0;


rl.on('line', (line) => {
    processPaths.push(line);
});

rl.on('close', function() {
    processPaths.map(function(currentPath) {
        var currentItemName = currentPath.substring(currentPath.lastIndexOf("/") + 1);

        setTimeout(function() {
            request
                .post({
                    url: url,
                    qs: {
                        model: translationPath,
                        payload: currentPath,
                        payloadType: 'JCR_PATH',
                        workflowTitle: currentItemName
                    }
                })
                .auth(username, password, false)
                .on('response', function(response) {
                    console.log('Requesting ' + currentItemName + ' with the status of ' + response.statusCode);
                })
        }.bind(this), 20000 * index);
        ++index;

    })
});
