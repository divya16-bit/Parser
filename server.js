const express = require('express');
const bodyParser = require('body-parser');
const { parseXml } = require('./xmlParser'); 

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to parse XML
app.post('/parse-xml', (req, res) => {
    const xmlString = req.body.xml;
    if (!xmlString) {
        return res.status(400).json({ error: 'XML string is required.' });
    }

    try {
        const jsonResult = parseXml(xmlString);
        res.json(jsonResult);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while parsing XML.', message: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
