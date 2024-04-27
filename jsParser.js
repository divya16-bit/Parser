function parseJsonToXml(jsonData) {
    let xmlString = '';

    const parseObject = (data, indent) => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                if (typeof value === 'object') {
                    xmlString += `${indent}<${key}>\n`;
                    parseObject(value, indent + '  '); // Recursively parse nested objects
                    xmlString += `${indent}</${key}>\n`;
                } else if (Array.isArray(value)) {
                    value.forEach(item => {
                        xmlString += `${indent}<${key}>\n`;
                        parseObject(item, indent + '  '); // Recursively parse items in arrays
                        xmlString += `${indent}</${key}>\n`;
                    });
                } else {
                    xmlString += `${indent}<${key}>${value}</${key}>\n`; // Simple types
                }
            }
        }
    };

    if (typeof jsonData !== 'object' || jsonData === null || Array.isArray(jsonData)) {
        console.error('Error during JSON to XML conversion: Invalid JSON input. Object expected.');
        return null;
    }

    parseObject(jsonData, '');
    return xmlString;
}

// Example JSON data with three levels of nesting
const jsonData = {
    person: {
        name: "John",
        age: 30,
        address: {
            city: "New York",
            country: "USA",
            postalCode: "10001"
        },
        hobbies: ["Reading", "Gaming"]
    }
};

// Parse JSON to XML
const xmlOutput = parseJsonToXml(jsonData);
console.log(xmlOutput);

/*
please give a detailed explanation of the above code
ChatGPT
Certainly! Let's go through the code step by step and explain each part:

Function Declaration (parseJsonToXml): The code defines a function named parseJsonToXml that takes one parameter (jsonData), representing the JSON data to be parsed and converted to XML.
Initialization of Variables: The function initializes two variables:
xmlString: This variable will store the XML representation of the JSON data as the parsing progresses.
Nested Function (parseObject): Within the parseJsonToXml function, there is a nested function named parseObject. This function is responsible for recursively traversing the JSON data and generating the corresponding XML.
Parsing JSON Data (parseObject): The parseObject function takes two parameters:
data: Represents the current portion of JSON data being processed.
indent: Represents the indentation level for formatting the XML output.
Within the parseObject function:
It iterates over each key-value pair in the data object.
For each key-value pair:
If the value is an object, it recursively calls parseObject to process the nested object.
If the value is an array, it iterates over each item in the array and recursively processes it.
If the value is a simple type (string, number, boolean), it appends an XML element with the key as the tag name and the value as the element content.
Error Handling: After defining the parseObject function, the code checks if the provided jsonData is of the expected format (an object). If it's not, an error message is logged to the console, indicating that the input JSON is invalid. In this case, the function returns null.
Parsing JSON Data (Continued): If the input JSON data is valid (an object), the parseJsonToXml function proceeds to call parseObject with the root object (jsonData). The resulting XML string is constructed and stored in the xmlString variable.
Return Value: The function returns the XML string representing the parsed JSON data.
Example Usage: Finally, the code includes an example usage where it parses a sample JSON object (jsonData) and logs the resulting XML string to the console.
This code demonstrates a parser that recursively processes JSON data and generates XML output. It also includes error handling to ensure that the input JSON data meets the expected format.

is the above code a parser?
ChatGPT
The code provided is indeed a parser. It takes JSON data as input and converts it into XML format. Here's why it qualifies as a parser:

Parsing JSON Input: The code parses the JSON input by recursively traversing the object structure, converting each key-value pair into corresponding XML elements.
Handling Nested Structures: It handles nested structures within the JSON data, ensuring that the resulting XML reflects the hierarchy of the original JSON.
Error Handling: The code includes error handling to deal with scenarios where the provided JSON data is not in the expected format (an object). It detects and reports such errors, indicating that the input JSON is invalid.
Converting to XML: The primary purpose of a parser is to transform input data from one format to another while preserving its structure. In this case, the code transforms JSON data into XML format, which qualifies it as a parser.
Therefore, the provided code can be classified as a parser for converting JSON to XML.

explain how the nested function is working here?
ChatGPT
The nested function parseObject within the parseJsonToXml function is responsible for recursively traversing the JSON data and generating the corresponding XML output. Let's break down how it works:

Definition within parseJsonToXml: The parseObject function is defined inside the parseJsonToXml function. This makes it a nested function, meaning it's declared within the scope of parseJsonToXml and can only be accessed from within that function.
Parameters: The parseObject function takes two parameters:
data: Represents the current portion of JSON data being processed.
indent: Represents the indentation level for formatting the XML output. It's initially an empty string and is used to control the indentation of the XML elements.
Recursive Parsing: Within the parseObject function:
It iterates over each key-value pair in the data object using a for...in loop.
For each key-value pair:
If the value is an object, indicating nested structure, the function recursively calls itself (parseObject) with the nested object. This allows it to handle arbitrarily deep nesting in the JSON data.
If the value is an array, it iterates over each item in the array and recursively calls parseObject for each item. This ensures that arrays of objects are properly handled.
If the value is a simple type (string, number, boolean), it appends an XML element with the key as the tag name and the value as the element content. This is done by concatenating strings with appropriate formatting to the xmlString variable.
Indentation: The indent parameter is used to control the indentation of XML elements. Each time the function recurses deeper into nested structures, it appends additional spaces to the indent string to create the correct indentation level for the current element.
Closure: Since parseObject is defined within the scope of parseJsonToXml, it has access to all variables defined in its enclosing function (parseJsonToXml). This includes the xmlString variable, which is used to accumulate the XML output as the function traverses the JSON data.
In summary, the nested function parseObject works by recursively traversing the JSON data, converting each key-value pair into corresponding XML elements while properly handling nested structures and controlling indentation. This recursive approach allows it to handle JSON data of arbitrary depth.

is the solution using recurssion?
ChatGPT
Yes, the solution provided indeed utilizes recursion. The recursion occurs within the parseObject function, which is responsible for traversing through the JSON object and generating the corresponding XML representation.

Here's how recursion is used in the solution:

Recursion in parseObject Function:
javascript
Copy code
const parseObject = (data, indent) => {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            if (typeof value === 'object') {
                xmlString += `${indent}<${key}>\n`; // Opening tag with current indentation
                parseObject(value, indent + '  '); // Recursively parse nested objects with increased indentation
                xmlString += `${indent}</${key}>\n`; // Closing tag with current indentation
            } else if (Array.isArray(value)) {
                value.forEach(item => {
                    xmlString += `${indent}<${key}>\n`; // Opening tag with current indentation
                    parseObject(item, indent + '  '); // Recursively parse items in arrays with increased indentation
                    xmlString += `${indent}</${key}>\n`; // Closing tag with current indentation
                });
            } else {
                xmlString += `${indent}<${key}>${value}</${key}>\n`; // Simple types with current indentation
            }
        }
    }
};
The parseObject function recursively calls itself for nested objects and arrays, each time with an updated indent parameter to reflect the increased indentation level.
For each key-value pair in the JSON object, the function checks if the value is an object or an array. If it's an object, the function calls itself recursively to parse the nested object. If it's an array, the function iterates over each item in the array and recursively parses them.
Recursion continues until all nested objects and arrays are processed.
By utilizing recursion in this manner, the solution efficiently handles the parsing of nested JSON structures, allowing for the generation of corresponding XML output with proper indentation and hierarchy.



Overall, the solution combines recursion with other fundamental programming concepts such as iteration, conditional statements, string manipulation, and error handling to parse JSON data into XML format effectively.
*/

