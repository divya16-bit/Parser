const dropZone = document.getElementById('dropZone');
const fileInfo = document.getElementById('fileInfo');
const fileInput = document.getElementById('fileInput');

dropZone.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  displayFileInfo(file);
})

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  displayFileInfo(file);
});

function displayFileInfo(file){
  if(file){
    fileInfo.innerText = `File Name: ${file.name}`;
  }
  else{
    fileInfo.innerText = 'No file selected';
  }
}
