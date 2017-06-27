const request = require('request');
const express = require('express');
const fs = require('fs');
var app = express();
var  router = express.Router()

const AMPER_APP_KEY = '7Q6LNlnHBbiSDg1RhHoR2DwkPOi0SHkv7Xs8PaAnxmle7C8Uia7dvZzuIX6G2am0'

function getUniqueId(stringPrefix) {
    var datestr = new Date().getTime().toString();
    var randomstr = Math.random().toString().replace('.', '');
    return stringPrefix + '_' + datestr + randomstr;
}

/* GET users listing. */
router.get('/projects/:project_id', function(req, res, next) {
    const projectId = req.params['project_id']
    var options = {
        url: `https://jimmy.ampermusic.com/v1/projects/${projectId}`,
        headers: {
            'Authorization': `Bearer ${AMPER_APP_KEY}`
        },
        method: 'GET'
    };
    request(options, function(error, response, body) {
        res.status(response.statusCode)
        for (let i = 0; i < response.headers.length; i++) {
            res.header(Object.keys(response.headers[i]), response.headers[i])
        }
        res.send(body)
    });
});

router.get('/render_files/:file_id', function(req, res, next) {
    const fileId = req.params['file_id']
    var options = {
        url: `https://jimmy.ampermusic.com/v1/render_files/${fileId}`,
        headers: {
            'Authorization': `Bearer ${AMPER_APP_KEY}`
        },
        method: 'GET'
    };
    request(options, function(error, response, body) {
        res.status(response.statusCode)
       /* fs.writeFile('/tmp/test.wav', body, function (err) {
            if (err) {
                res.send('error writing file: '+err);
            } else {
                res.send("wrote file")
            }
        });
*/
        for (let i = 0; i < Object.keys(response.headers).length; i++) {
            const headerName = Object.keys(response.headers)[i];
            res.header(headerName, response.headers[headerName])
        }
        res.send(body);
    });
});

/* GET users listing. */
router.post('/projects', function(req, res, next) {

    const uniqueId = getUniqueId('project_');
    var requestBody = {
        "title": uniqueId,
        "timeline": {
            "events": [
                {
                    "event": "region",
                    "time": 0,
                    "descriptor": "happy_modern_folk"
                },
                {
                    "event": "silence",
                    "time": 10
                }
            ]
        }
    }

    var options = {
        url: 'https://jimmy.ampermusic.com/v1/projects',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AMPER_APP_KEY}`
        },
        body: JSON.stringify(requestBody),
        method: 'POST'
    };
    request(options, function(error, response, body) {
        res.status(response.statusCode)
        for (let i = 0; i < response.headers.length; i++) {
            res.header(Object.keys(response.headers[i]), response.headers[i])
        }
        res.send(body)
    });
});

// support GET as well so it's easier to debug
router.get('/projects', function(req, res, next) {

    const uniqueId = getUniqueId('project_');
    var requestBody = {
        "title": uniqueId,
        "timeline": {
            "events": [
                {
                    "event": "region",
                    "time": 0,
                    "descriptor": "happy_modern_folk"
                },
                {
                    "event": "silence",
                    "time": 10
                }
            ]
        }
    }

    var options = {
        url: 'https://jimmy.ampermusic.com/v1/projects',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AMPER_APP_KEY}`
        },
        body: JSON.stringify(requestBody),
        method: 'POST'
    };
    request(options, function(error, response, body) {
        res.status(response.statusCode)
        for (let i = 0; i < response.headers.length; i++) {
            res.header(Object.keys(response.headers[i]), response.headers[i])
        }
        res.send(body)
    });
});


module.exports = router;
