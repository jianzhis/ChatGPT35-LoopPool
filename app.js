const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const port = 3000;
const MAX_RETRIES = 1; // 最大重试次数

app.use(bodyParser.json());

let servers;
fs.readFile('servers.json', 'utf8')
    .then(data => {
        servers = JSON.parse(data);
    })
    .catch(err => {
        console.error('Error reading servers file:', err.message);
        process.exit(1);
    });

function getNextServer() {
    let selectedServer = servers.reduce((prev, current) => (prev.count < current.count) ? prev : current);
    selectedServer.count += 1;
    fs.writeFile('servers.json', JSON.stringify(servers, null, 2), 'utf8');
    return selectedServer.url;
}

function setupEventStreamResponse(res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    });
    res.flushHeaders();
}

async function makeRequestWithRetry(serverUrl, reqBody, retries = 0) {
    console.log(`Attempting request to ${serverUrl} (retry ${retries})`);
    try {
        const response = await axios.post(serverUrl, reqBody, {
            headers: { 'Content-Type': 'application/json' },
            responseType: 'stream',
            timeout: 2000 // 设置2秒超时
        });

        return response;
    } catch (error) {
        console.error(`Request to ${serverUrl} failed: ${error.message}`);
        if (retries < MAX_RETRIES) {
            console.log(`Retrying request (${retries + 1}/${MAX_RETRIES})...`);
            const nextServerUrl = getNextServer();
            return await makeRequestWithRetry(nextServerUrl, reqBody, retries + 1);
        } else {
            throw error;
        }
    }
}

app.post('/v1/chat/completions', async (req, res) => {
    try {
        const serverUrl = getNextServer();
        console.log(`Received new request, using server: ${serverUrl}`);
        setupEventStreamResponse(res);
        
        const response = await makeRequestWithRetry(serverUrl, req.body);
        response.data.pipe(res); // Directly pipe the response stream

    } catch (error) {
        console.error(`Error handling request: ${error.message}`);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
