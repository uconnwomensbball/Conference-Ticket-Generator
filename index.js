//GENERAL
const main = document.getElementById("main")
const uploadImageDiv = document.getElementById("upload-image-div")
const form = document.getElementById("form")
const dropZone = document.getElementById("upload-avatar-div")
let uploadedImage = ""
let file = ""
//BUTTONS
const generateTicketBtn = document.getElementById("generate-ticket-btn")
const uploadImageBtnOne = document.getElementById("upload-image-btn-one")

//WARNINGS
const warningPhotoText = document.getElementById("warning-photo-text")
const warningNameDiv = document.getElementById("warning-name-div")
const warningEmailDiv = document.getElementById("warning-email-div")
const warningGitHubDiv = document.getElementById("warning-gitHub-div")

//INPUTS
const fullNameInput = document.getElementById("full-name-input")
const fileInput = document.getElementById("file-input")
const emailInput = document.getElementById("email-input")
const githubUsernameInput = document.getElementById("github-username-input")

//DATES
const now = new Date()
const year = now.getFullYear()
const month = now.toLocaleString('default', { month: 'short' })
const day = now.getDate();

//RANDOM TICKET NUMBERS 
let randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random()* 9))

//FORM SUBMIT
generateTicketBtn.addEventListener("click", () => displayFormData(uploadedImage));

function displayFormData(uploadedImage){
event.preventDefault()
  if (fullNameInput.value !== "" && emailInput.value !== "" && githubUsernameInput.value !== "" && uploadedImage !== ""){
    
    const formData = {
        name: form.elements["full-name"].value,
        email: form.elements["email"].value, 
        gitHub: form.elements["github-username-input"].value, 
        image: uploadedImage
        
    };

    main.innerHTML = `
    
    <h1>Congrats, <span class = "gradient-text">${formData.name}!</span> Your ticket is ready.</h1>
    <p>We've emailed your ticket to <span class="orange-text">${formData.email}</span> and will send updates in the run up to the event.</p>
    <div class = "ticket-content-container">
        <div class = "ticket-content-div">
            <div class = "ticket-content-div-row">
                <img class = "header-svg" src="./images/logo-mark.svg"/>
                <h2>Coding Conf</h2>
            </div>
            <div class = "ticket-content-div-row">
                <p>${month} ${day}, ${year} / Austin, TX</p>
            </div>
            <div class = "ticket-container-lower">
                    <img class = "avatar" src="${formData.image}"/>
                <div class = "ticket-content-div-column">
                    <h4>${formData.name}</h4>
                    <div class = "github-data ticket-content-div-row">
                        <img class = "github-icon" src = ".images/icon-github.svg"/>
                        <p>@${formData.gitHub}</p>
                    </div>
                </div>
            </div>
        </div>
    <p class="ticket-nums">#${randomNumbers.join("")}</p>
    <img class = "ticket-outline-svg" src="./images/pattern-ticket.svg"/>
    </div>`
}}

//CHECK FOR VALID INPUTS 
document.addEventListener("change", function(){
        if (file === ""){
            warningPhotoText.textContent = "Please upload a photo"
            warningPhotoText.style.color = "hsl(7, 88%, 67%)"
            dropZone.style.border = "2px dashed hsl(7, 88%, 67%)"
        }else{
            warningPhotoText.textContent = "Upload your photo (JPG or PNG, max size: 500KB)."
            warningPhotoText.style.color = ""
            dropZone.style.border = "2px dashed hsl(245, 19%, 35%)"
        }
      if (fullNameInput.value === ""){
        warningNameDiv.style.display = "flex"
        fullNameInput.style.border = "3px solid hsl(7, 88%, 67%)"
        }
      else{
        warningNameDiv.style.display = "none"
        fullNameInput.style.border = "none"
      }
        
      if (emailInput.value === ""){
        warningEmailDiv.style.display = "flex"
        emailInput.style.border = "3px solid hsl(7, 88%, 67%)"
      }
      else{
        warningEmailDiv.style.display = "none"
        emailInput.style.border = "none"
      }
      if (githubUsernameInput.value === ""){
        warningGitHubDiv.style.display = "flex"
        githubUsernameInput.style.border = "3px solid hsl(7, 88%, 67%)"
      }
      else{
        warningGitHubDiv.style.display = "none"
        githubUsernameInput.style.border = "none"
      }
})

//UPLOAD PHOTO
uploadImageBtnOne.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", function () {
  
  function checkValidPhoto(){
        warningPhotoText.textContent = "Please upload a photo"
        warningPhotoText.style.color = "hsl(7, 88%, 67%)"
        dropZone.style.border = "2px dashed hsl(7, 88%, 67%)"}
  
    file = fileInput.files[0]
  
  if (!file){
    checkValidPhoto()
  } else if (file && file.size < 512000) {
    warningPhotoText.textContent = "Upload your photo (JPG or PNG, max size: 500KB)."
    warningPhotoText.style.color = ""
    dropZone.style.border = "2px dashed hsl(245, 19%, 35%)"
    const reader = new FileReader()

    reader.onload = function (event) {
      // Store the image globally
      uploadedImage = event.target.result
      // Display image preview
      dropZone.innerHTML = `
      <img class = "uploaded-image" src = "${uploadedImage}"/> 
      <div class = "image-btns-div">
        <p id = "remove-image-p">Remove image</p>
        <p id = "change-image-p">Change image</p> 
      </div>
      `
      
        const removeImageBtn = document.getElementById("remove-image-p")
        const changeImageBtn = document.getElementById("change-image-p")
        changeImageBtn.addEventListener("click", () => fileInput.click())
        removeImageBtn.addEventListener("click", function(){
            fileInput.value = ""
            checkValidPhoto()
            
            uploadedImage =""
            dropZone.innerHTML = 
            `
            <img id = "upload-image-btn-two" class = "image-upload-svg" src="./images/icon-upload.svg"/>
            <input type="file" id="file-input" name="image" accept="image/*" style="display: none"/>
            <label for="fileInput">Drag and drop or click to upload</input>
            `
            
            const uploadImageBtnTwo = document.getElementById("upload-image-btn-two")
            uploadImageBtnTwo.addEventListener("click", function(){
              fileInput.click()})
                                                            })
                                      }
    reader.readAsDataURL(file); 
  } 
})

//DRAG AND DROP PHOTO
dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("drag-over"); // Add visual indicator
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over"); // Remove visual indicator
});

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("drag-over");

    const file = event.dataTransfer.files[0]; // Get the first dropped file
    if (file && file.size < 512000 && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (event) {
            uploadedImage = event.target.result;

            dropZone.innerHTML = `
                <img class="uploaded-image" src="${uploadedImage}"/> 
                <div class="image-btns-div">
                    <p id="remove-image-p">Remove image</p>
                    <p id="change-image-p">Change image</p> 
                </div>`;

            // Handle Remove & Change Buttons
            document.getElementById("remove-image-p").addEventListener("click", function () {
                uploadedImage = "";
                dropZone.innerHTML = `
                    <img id="upload-image-btn-two" class="image-upload-svg" src="./images/icon-upload.svg"/>
                    <input type="file" id="file-input" name="image" accept="image/*" style="display: none"/>
                    <label for="file-input">Drag and drop or click to upload</label>
                `;

                // Reattach event listeners
                document.getElementById("upload-image-btn-two").addEventListener("click", () => fileInput.click());
            });

            document.getElementById("change-image-p").addEventListener("click", () => fileInput.click());
        };

        reader.readAsDataURL(file); // Convert file to Base64
    }
});
