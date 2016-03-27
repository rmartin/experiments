var request = require('request');
var Promise = require('promise');
var checkWorkouts = ['Leg-pocalypse', 'Walk The Plank'];
var availableSections = [];
var _ = require('lodash');

var getWorkoutPathByName = function(workoutName) {

    return new Promise(function(resolve, reject) {
        request('http://admin:admin@localhost:4502/bin/querybuilder.json?property=jcr:content/workout/summary/name&property.value=' + workoutName + '&path=/content/ntccms/en_US/workouts/&path.self=true', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var parsedBody = JSON.parse(body);

                if (parsedBody.results !== 1) {
                    reject('Found ' + parsedBody.results + ' for ' + workoutName + ' and expected one.');
                } else {
                    resolve(parsedBody.hits[0].path);
                }
            }
        })
    });

}

var getSectionsByWorkoutPath = function(workoutPath) {
    return new Promise(function(resolve, reject) {
        request('http://admin:admin@localhost:4502' + workoutPath + '/jcr:content/workout/sections/sections.json', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var parsedBody = JSON.parse(body);
                console.log(parsedBody)

                resolve(parsedBody.sections);
            }
        })
    });
}

var processWorkout = function(workoutName) {
    return new Promise(function(resolve, reject) {

        console.log('Loading path for: ' + workoutName);
        getWorkoutPathByName(workoutName).then(function(workoutPath) {
            getSectionsByWorkoutPath(workoutPath).then(function(workoutSections) {

                console.log('Adding the sections for ', workoutPath);
                resolve(workoutSections);


            }, function(err) {
                console.log(err);
            });

        }, function(err) {
            console.log(err);
        })

    });
}


checkWorkouts.map(function(workoutName) {

    processWorkout(workoutName).then(function(workoutSections){
        availableSections = _.union(availableSections, workoutSections);
        console.log(availableSections);
    })
});
