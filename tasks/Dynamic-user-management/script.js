// Get Element

let nameInput = document.getElementById("nameInput");
let jobInput = document.getElementById("jobInput");
let imgFile = document.getElementById("imgFile");
let createBtn = document.getElementById("createBtn");
let profileCard = document.getElementById("profileCard");
let mainDiv = document.getElementById("mainDiv");
let divNotify = document.getElementById("divNotify");



// profiles data
const profileData = [];

// Alert Colors

const alertColors = {
  green: "bg-green-400 border-green-600",
  red: "bg-red-500 border-red-700",
  yellow: "bg-yellow-400 border-yellow-600",
  orange: "bg-orange-400 border-orange-600",
};



// Alert Function

function alertPopup(message, color) {
  let alertDiv = document.createElement("div");
  alertDiv.className = ` ${alertColors[color]} text-white p-2 w-80 rounded border-l-4   my-5 flex justify-between  hover:scale-80  `;

  let alertText = document.createTextNode(`${message}`);

  let closeBtn = document.createElement("p");
  closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>`;

  closeBtn.addEventListener("click", () => {
    alertDiv.remove();
  });
  alertDiv.append(alertText, closeBtn);
  mainDiv.prepend(alertDiv);

  setTimeout(() => alertDiv.remove(), 2000);
}

// Profile Creating  Process

createBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!profileCard == "") divNotify.remove();

  console.log(profileData);

  // form Validation
  if (
    nameInput.value === "" ||jobInput.value === "" ||imgFile.files.length === 0 ) {
    alertPopup(`Enter the Input Fields`, "yellow");
    return;
  }


  // profileData

  const imgURL = URL.createObjectURL(imgFile.files[0]);

  profileData.push({
    name: nameInput.value.trim(),
    job: jobInput.value.trim(),
    img: imgURL,
  });

  // Creating Element Using DOM

  let card = document.createElement("div");
  card.id = "cardDiv";
  card.className ="bg-white  px-4 rounded-lg shadow-md shadow-gray-950 flex flex-col items-center gap-3 m-2 hover:sca";

  let cardTitle = document.createElement("h1");
  cardTitle.textContent = "Profile Card";
  cardTitle.id = "cardTitle";
  cardTitle.className = "underline  text-blue-600 font-bold text-xl";

  const lastProfile = profileData[profileData.length - 1];

  let detailDiv = document.createElement("div");

  detailDiv.className = "flex flex-col item-center space-y-2 ";

  let nameText = document.createElement("p");
  nameText.textContent = `Name: ${lastProfile.name}`;
 
    
  let jobText = document.createElement("p");
  jobText.textContent = `Role: ${lastProfile.job}`;
  

  //  Check the Role as Developer 
   
   if (jobInput.value.toLowerCase().includes("developer")) {
    jobText.className ="bg-green-500 px-2";
  }
  

  // Profile Image 

  let profileImg = document.createElement("img");
  profileImg.src = `${lastProfile.img}`;
  profileImg.className =
    "rounded-full w-25  object-cover border-2 border-gray-300 shadow shadow-black";

  alertPopup(`Successfully Profile Card Created `, "green");

  //  Delete Button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.id = "deleteBtn";
  deleteBtn.className = "bg-red-500 text-white rounded p-1 m-1 ";

  //  Delete Function

  deleteBtn.addEventListener("click", () => {
    card.remove();
    alertPopup(`Successfully Profile Card Deleted `, "red");
if (!profileCard == "") profileCard.append(items);
    
  });

  // Append Section 

  detailDiv.append(nameText, jobText, deleteBtn);
  card.append(cardTitle, profileImg, detailDiv);

  profileCard.append(card);


  //  Clear all Input Value  After Data Updated
  nameInput.value = "";
  jobInput.value = "";
  imgFile.value = "";
});


