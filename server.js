const express = require('express');
const bodyParser = require('body-parser');

const path = require("path");
const { handleFileXml } = require('./xmlParser'); 
const { handleFileJson } = require('./jsParser');

const app = express();
app.use(express.static('public')); 
app.use(express.json());
// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
   // res.sendFile(path.join(__dirname, "index.html"));
   res.redirect('/messsage');
});

// A catch-all route for all other routes
app.get('*', (req, res) => {
  //res.redirect('/message.html');
  res.sendFile(path.join(__dirname, 'public/message.html'));
});

// Endpoint to handle file upload and convert based on user choice (JSON to XML or XML to JSON)
app.post('/convert', 
   (req, res) => {
     console.log('the request json ,',req.body.rawData) 
     const rawData = req.body.rawData; // Get the uploaded file
     const conversionType = req.body.conversionType; // Conversion choice from the client
     console.log(conversionType);

    if (conversionType === 'json') {
      try {
         const xmlResult = handleFileJson(rawData); //extract & convert
         console.log("Xml at server is:" ,xmlResult);
         console.log('type of :', typeof xmlResult);
         res.set('Content-Type', 'application/json');
         res.send({
            data: xmlResult, 
            type: conversionType, 
          });

       } catch (error) {
         return res.status(400).json({ error: 'Invalid JSON data.' });
       }
     } 

     else if (conversionType === 'xml') {
       try {
         const jsonResult = handleFileXml(rawData); //extract & convert
         console.log("Json at server is:", jsonResult);
         const jsonData = JSON.stringify(jsonResult, null, 2)
         res.set('Content-Type', 'application/json');
         res.send({
            data: jsonData, 
            type: conversionType
         });
        
       } catch (error) {
         return res.status(400).json({ error: 'Invalid XML data.' });
       }
     } 

     else {
       return res.status(400).json({ error: 'Invalid conversion type.' });
     }
  });


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


/**
 * the conversionType should match the file extension.  
 * 'please select & upload' if no radio is selected and no file is chosen. 
 * Download button visible when parsing done.
 * Reset
 * if anything after / then Sorry message.
 * Application failed to connect to server / request time out.
 
 * 
 * FIX:
 * download button dikh rha hai .
 * xml conversion
 * xml file browser mei kyu nhi khul rhi?
 * CHECK JSON->XML
 * 
 * error pages/messages: if xmlto json is selected & file is json selected then reset the message.
 * DOWNLOAD BUTTON DIKHANA HAI JAB TAK DUSRA FILE SELECT FILE NA HO.
 * fix download button : xmltojson radio select kro & file na select kro aur submit krdo toh bhi download dikhta hai , which should not be visible.
 * Error page pr wapsi ka button daal do
 */




