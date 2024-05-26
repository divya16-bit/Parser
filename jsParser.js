function parseJsonToXml(jsonData) {
    let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n'; // Include XML declaration

    const parseValue = (value, indent, key) => {
        if (Array.isArray(value)) {
            const itemName = key.slice(0, -1); // Get the singular form of the array name
            value.forEach(item => {
                xmlString += `${indent}<${itemName}>\n`; // Start of array item
                parseValue(item, indent + '    ', key); // Recursively parse array items with increased indentation
                xmlString += `${indent}</${itemName}>\n`; // End of array item
            });
        } else if (typeof value === 'object' && value !== null) {
            for (const subKey in value) {
                if (value.hasOwnProperty(subKey)) {
                    xmlString += `${indent}<${subKey}>\n`; // Start of object property
                    parseValue(value[subKey], indent + '    ', subKey); // Recursively parse nested object with increased indentation
                    xmlString += `${indent}</${subKey}>\n`; // End of object property
                }
            }
        } else {
            xmlString += `${indent}${value}\n`; // Simple types
        }
    };

    parseValue(jsonData, '', ''); // Start parsing the JSON data
    return xmlString;
}


// Function to handle the uploaded JSON file and convert it to XML
function handleFileJson(rawData) {
    var jsonData;
    try {
        jsonData = JSON.parse(rawData); // Parse JSON
        } 
    catch (error) {
        alert('Error parsing JSON data.');
        return;
    }
    var xmlOutput = parseJsonToXml(jsonData); // Convert to XML
    //console.log("the XML for the given json is:", xmlOutput)
    
    return xmlOutput;
}


module.exports = { handleFileJson };





