const readline = require('readline');
const parseString = require('xml2js').parseString;
const fs = require('fs');
const _ = require('lodash');
const json2csv = require('json2csv');

const validCSVFields = ['absTargetPath', 'relSrcPath', 'mimeType'];
const inValidCSVFields = ['key', 'locale', 'originalSource', 'absTargetPath', 'relSrcPath'];

const prefixPath = '/Users/roymartin/Dropbox/Documents/ModOp/Clients/AKQA/assets/FLATTENED_LOC_AUDIO/';
const pickListData = [{
    'name': 'Beeps',
    'key': 'beeps',
    'path': '/Users/roymartin/Code/aem/ntc-5-cms/ntccms/ui.content/src/main/content/jcr_root/content/ntccms/en_US/pick-lists/beeps/.content.xml'
}, {
    'name': 'Drill Descriptor',
    'key': 'drill-descriptor',
    'path': '/Users/roymartin/Code/aem/ntc-5-cms/ntccms/ui.content/src/main/content/jcr_root/content/ntccms/en_US/pick-lists/drill-descriptor/.content.xml'
}, {
    'name': 'Drill Distance',
    'key': 'drill-distance',
    'path': '/Users/roymartin/Code/aem/ntc-5-cms/ntccms/ui.content/src/main/content/jcr_root/content/ntccms/en_US/pick-lists/drill-distance/.content.xml'
}, {
    'name': 'Drill Duration',
    'key': 'drill-duration',
    'path': '/Users/roymartin/Code/aem/ntc-5-cms/ntccms/ui.content/src/main/content/jcr_root/content/ntccms/en_US/pick-lists/drill-duration/.content.xml'
}, {
    'name': 'Drill Reminder',
    'key': 'drill-reminder',
    'path': '/Users/roymartin/Code/aem/ntc-5-cms/ntccms/ui.content/src/main/content/jcr_root/content/ntccms/en_US/pick-lists/drill-reminder/.content.xml'
}, {
    'name': 'Drill Reps',
    'key': 'drill-reps',
    'path': '/Users/roymartin/Code/aem/ntc-5-cms/ntccms/ui.content/src/main/content/jcr_root/content/ntccms/en_US/pick-lists/drill-reps/.content.xml'
}, {
    'name': 'Drill Transition',
    'key': 'drill-transition',
    'path': '/Users/roymartin/Code/aem/ntc-5-cms/ntccms/ui.content/src/main/content/jcr_root/content/ntccms/en_US/pick-lists/drill-transition/.content.xml'
}, {
    'name': 'Workout Intro',
    'key': 'workout-intro',
    'path': '/Users/roymartin/Code/aem/ntc-5-cms/ntccms/ui.content/src/main/content/jcr_root/content/ntccms/en_US/pick-lists/workout-intro/.content.xml'
}, {
    'name': 'Workout Outro',
    'key': 'workout-outro',
    'path': '/Users/roymartin/Code/aem/ntc-5-cms/ntccms/ui.content/src/main/content/jcr_root/content/ntccms/en_US/pick-lists/workout-outro/.content.xml'
}];
const locales = ['en_GB', 'ar_BH', 'ar_OM', 'ar_SA', 'ar_AE', 'ar_LB', 'ar_QA', 'ar_KU', 'es_ES', 'es_MX', 'es_AR', 'th_TH', 'ja_JP', 'it_IT', 'fr_FR', 'ru_RU', 'ko_KR', 'tr_TR', 'de_DE', 'zh-Hant', 'zh-Hans', 'id_ID', 'pt_BR', 'sv_SE', 'nl_NL'];

var parseXML = function(rootNode, pickListLocaleData) {
    _.mapValues(rootNode, function(n) {
        if (typeof n[0] !== 'undefined' && n[0]['$']['key'] !== 'empty') {
            // iterate through all locales and ensure that the property is setup for each item
            locales.map(function(locale) {

                var localeFilenameTransformed =
                    locale
                    .toLowerCase()
                    .replace('es_mx', 'es_xl')
                    .replace(/ar_[a-z]{2}/, 'ar_sa')
                    .replace(/zh-[a-z]{4}/, 'en_gb')
                    .replace(/en_gb/, 'en_gb_M')
                    .replace(/ko_kr/, 'ko_ko')
                    .replace(/id_id/, 'in_in')
                    .replace(/sv_se/, 'sv_sv'),

                    currentKey = n[0]['$']['key'],
                    filePath = currentKey + '_' + localeFilenameTransformed + '.mp3',
                    targetFilePath = n[0]['$']['fileReference'];

                if (checkIfFileExists(filePath)) {
                    pickListLocaleData.valid.push({
                        'absTargetPath': targetFilePath.replace('en_US', locale),
                        'relSrcPath': filePath,
                        'mimeType': 'audio/mp3'
                    });
                } else {
                    pickListLocaleData.missing.push({
                        'key': currentKey,
                        'locale': locale,
                        'originalSource': targetFilePath,
                        'absTargetPath': targetFilePath.replace('en_US', locale),
                        'relSrcPath': filePath
                    });
                    ``
                }
            }.bind(this));
        }
    });

    return pickListLocaleData;
}

var writeCSVFile = function(csvJSON, csvFields, fileName) {
    json2csv({
        data: csvJSON,
        fields: csvFields
    }, function(err, csv) {
        if (err) console.log(err);
        fs.writeFile('./data/' + fileName + '.csv', csv, function(err) {
            if (err) throw err;
            console.log('Saving ' + fileName + '.csv');
        });
    });
}

var checkIfFileExists = function(filePath) {
    try {
        stats = fs.statSync(prefixPath + filePath);
        return true;
    } catch (e) {
        return false;
    }
}

var parsePickListData = function(pickListNode) {
    var pickListLocaleData = {
        'valid': [],
        'missing': []
    }
    var xmlFile = '';

    var rl = readline.createInterface({
        input: fs.createReadStream(pickListNode.path)
    });

    rl.on('line', (line) => {
        xmlFile += line;
    });

    rl.on('close', function() {
        parseString(xmlFile, {
            trim: true
        }, function(err, result) {
            console.log('Parsing ' + pickListNode.name);

            // parseXML into JSON
            pickListLocaleData = parseXML(result['jcr:root']['jcr:content'][0]['par'][0], pickListLocaleData);

            // Write valid JSON to CSV
            writeCSVFile(pickListLocaleData.valid, validCSVFields, pickListNode.key);

            // Write missing data JSON to CSV
            writeCSVFile(pickListLocaleData.missing, inValidCSVFields, pickListNode.key + '-missing');
        });
    });
}

_.mapValues(pickListData, function(pickListNode) {
    parsePickListData(pickListNode);
})
