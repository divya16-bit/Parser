const { DOMParser } = require('xmldom');

function xmlToJson(xmlString) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'text/xml');
    const json = parseXmlNode(xml.documentElement);
    let root = {};
    root[xml.documentElement.nodeName] = json;
    return root;
}

function parseXmlNode(node) {
    let obj = {};

    if (node.nodeType === 1) { // Element node
        if (node.attributes.length > 0) {
            for (let j = 0; j < node.attributes.length; j++) {
                const attribute = node.attributes.item(j);
                obj[attribute.nodeName] = attribute.nodeValue;
            }
        }
    }

    if (node.hasChildNodes()) {
        const children = node.childNodes;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (child.nodeType === 3 && !child.nodeValue.trim()) {
                continue;
            }

            const nodeName = child.nodeName;

            if (child.nodeType === 3) { // Text node
                const textContent = child.nodeValue.trim();
                if (textContent) {
                    return textContent;
                }
            } else {
                const childObj = parseXmlNode(child);

                if (obj[nodeName] === undefined) {
                    obj[nodeName] = childObj;
                } else {
                    if (!Array.isArray(obj[nodeName])) {
                        obj[nodeName] = [obj[nodeName]];
                    }
                    obj[nodeName].push(childObj);
                }
            }
        }
    }

    if (Object.keys(obj).length === 1 && typeof obj['#text'] !== 'undefined') {
        return obj['#text'];
    }

    for (let key in obj) {
        if (Array.isArray(obj[key]) && obj[key].length === 1) {
            obj[key] = obj[key][0];
        }
    }

    // Convert intermediate arrays
    if (Object.keys(obj).length === 1 && Array.isArray(obj[Object.keys(obj)[0]])) {
        return obj[Object.keys(obj)[0]];
    }

    return obj;
}






// Function to handle file upload and parse XML
function handleFileXml(rawData) {
    var xmlString = rawData;
    var jsonData;
    jsonData = xmlToJson(xmlString);
    return JSON.stringify(jsonData, null, 2);
}


module.exports = { handleFileXml };




