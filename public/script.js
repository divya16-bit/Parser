function resetFields() {
  // Reset radio buttons
  document.getElementById("xmlToJson").disabled = false;
  document.getElementById("jsonToXml").disabled = false;
  var radioButtons = document.getElementsByName('conversionType');
  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].checked = false;
  }
  // Reset file input
  document.querySelector('input[type="file"]').value = null;
  fileInfo.innerText= '';
  isXml_json = null;
  console.log(isXml_json);
  document.querySelector('a.conditional-link').style.display = 'none';
}

const dropZone = document.getElementById('dropZone');
const fileInfo = document.getElementById('fileInfo');
const fileInput = document.getElementById('fileInput');

const anchorTag = document.querySelector('a.conditional-link');
var isXml_json = null;

dropZone.addEventListener('click', () => {
 // anchorTag.style.display = 'none';
 if(isXml_json === null){
  fileInfo.innerText = 'Please select either of the above mentioned options' + '\n' +
  'first.';
  console.log(isXml_json);
 }
 else{
  fileInput.click();
 }
});

var rawData;
var prevFile = null;
var file;

fileInput.addEventListener('change', () => {
  prevFile = file;
  file = fileInput.files[0];
    if (file) {
        var reader = new FileReader(); // Create a FileReader to read the file

        reader.onload = function (e) {
             rawData = e.target.result; // Get the raw data
            //console.log(rawData);
            document.getElementById('rawData').textContent = rawData;
        };
        anchorTag.style.display = 'none';
        reader.readAsText(file); // Read the file as text
    } 
     
    else {
        file = prevFile;
        //anchorTag.style.display = 'inline-block'; 
        console.log('Please select a file.'); // If no file is selected
    }
    
  displayFileInfo(file);
})



let prevClick = null;
let currClick = null;


jsonToXml.addEventListener('click', () => {
  prevClick = currClick;
  currClick = event.target.id;

  console.log('Previous Click:', prevClick);
  console.log('Current Click:', currClick);
  //counter1++;
  if (event.target.name === 'conversionType' && event.target.checked) {
     isXml_json = event.target.value ;
     console.log(`Clicked on: ${event.target.value}`);
     if(prevClick !== currClick){
     anchorTag.style.display = 'none';
     document.querySelector('input[type="file"]').value = null;
     fileInfo.innerText= '';
     rawData = null;
     }
   }
});

xmlToJson.addEventListener('click', () => {
  prevClick = currClick;
  currClick = event.target.id;

  console.log('Previous Click:', prevClick);
  console.log('Current Click:', currClick);
  //counter2++;
  if (event.target.name === 'conversionType' && event.target.checked) {
     isXml_json = event.target.value ;
     console.log(`Clicked on: ${event.target.value}`);
     if(prevClick !== currClick){
     anchorTag.style.display = 'none';
     document.querySelector('input[type="file"]').value = null;
     fileInfo.innerText= '';
     rawData = null;
     }
   }
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
  anchorTag.style.display = 'none';
});

dropZone.addEventListener('dragleave', () => {
dropZone.classList.remove('drag-over');
anchorTag.style.display = 'none';
});

dropZone.addEventListener('drop', (e) => {
e.preventDefault();
dropZone.classList.remove('drag-over');
anchorTag.style.display = 'none';
const file = e.dataTransfer.files[0];
if (file) {
        var reader = new FileReader(); // Create a FileReader to read the file

        reader.onload = function (e) {
             rawData = e.target.result; // Get the raw data
            //console.log(rawData);
            document.getElementById('rawData').textContent = rawData;
        };

        reader.readAsText(file); // Read the file as text
    } else {
        console.log('Please select a file.'); // If no file is selected
    }
      displayFileInfo(file);
});



 var fileName ;
 var extension ; 
function displayFileInfo(file){
  fileName = file.name;
  extension = fileName.split('.').pop();
   if(file){
     
     //fileInfo.innerText = `file data : ${rawData}`;
     console.log("currentChoice: ", isXml_json);
     console.log("ext: ",extension);
     if(extension != isXml_json){
      console.log( 'Invalid conversion type.' );
      fileInfo.innerText = 'Please select either of the above mentioned options' + '\n' +
       '& choose the file accordingly.';
     }
     else{
      fileInfo.innerText = `File Name: ${file.name} `;
     }
   }
   else{
     fileInfo.innerText = 'No file selected';
    }
}

const form = document.getElementById('uploadForm')

const sendInput = async () => {
  if(rawData != null){
  const data = rawData;
  console.log(data);

  const formData = {
   conversionType: isXml_json,
   rawData: data.toString(),
  };
  console.log('the object ',formData)
  
  const response = await fetch('http://localhost:8000/convert', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(formData)
  })

  const json = await response.json()

  const displayData = json?.data ;
  var dataUri;
  var downloadLink = document.getElementById('downloadLink');
  const dotIndex = fileName.lastIndexOf('.');
  const nameWithoutExt = fileName.substring(0, dotIndex);
  if(json?.type === 'xml') {
    const parsedData = JSON.parse(displayData);
    document.getElementById('convertedData').textContent = parsedData;
    dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(parsedData);
    downloadLink.href = dataUri;
    downloadLink.download = `${nameWithoutExt}.json`; 
  }
  else{
    document.getElementById('convertedData').textContent = displayData;
    dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(displayData);
    downloadLink.href = dataUri;
    downloadLink.download = `${nameWithoutExt}.xml`; 
  }
  downloadLink.style.display = 'inline-block'; 
   //console.log(json)
}
else{
  console.log('Please select a file.');
  fileInfo.innerText = 'Please select either of the above mentioned options' + '\n' +
  '& choose the file accordingly.';
}
}

form.addEventListener('submit',(e) => {
  e.preventDefault()
  if(extension === isXml_json){
    sendInput()
  }
  else{
    fileInfo.innerText= 'Please select either of the above mentioned options' + '\n' +
       '& choose the file accordingly.';
    console.log( 'Invalid conversion type.' );
  }
})