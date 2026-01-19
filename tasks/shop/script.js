        // DOM elements
        const inputEl = document.getElementById("inputEl");
        const btnEl = document.getElementById("btnEl");
        const clearAll = document.getElementById("clearAll");
        const ulEl = document.getElementById("ulEl");
        const main = document.getElementById("alertBox");
        const cartCountEl = document.getElementById("cartCount");
      

           let cartCount = 0;

           // Update Cart UI
function updateCartUI() {
  cartCountEl.textContent = cartCount;

  if (cartCount > 0) {
    cartCountEl.classList.remove("bg-red-500");
    cartCountEl.classList.add("bg-green-500");
  } else {
    cartCountEl.classList.remove("bg-green-500");
    cartCountEl.classList.add("bg-red-500");
  }
}

         
        const Fragment = document.createDocumentFragment();

        // alert classes
        const alertColors = {
            green: "bg-green-400 ",
            red: "bg-red-500 ",
            yellow: "bg-yellow-400 ",
            orange: "bg-orange-400"
        };

        // Reusable alert function
        function showAlert(message, color) {
            const alert = document.createElement("div");
            alert.className = `
    ${alertColors[color]}
      flex justify-between rounded-sm p-4
 my-2 text-white text-sm font-sans font-medium animate-[slideIn_0.5s_ease] transition-all duration-600 delay-200
  `;

            const text = document.createElement("p");
             text.innerHTML= message
            const closeBtn = document.createElement("button");
            closeBtn.textContent = "";
            closeBtn.className = "text-white p-1 text-sm ";

            closeBtn.addEventListener("click", () => alert.remove());

            alert.append(text, closeBtn);
            main.append(alert);

            // auto remove after 2s
            setTimeout(() => alert.remove(), 2000);
        }



        //ADDING FUNCTION 
        const createFunction = (event) => {

            const value = inputEl.value.trim();
            if (!value) return showAlert(`<i class="fa-solid fa-circle-info"></i> Enter the Food Item`, "yellow");

            //Creating  Elements
            const liEl = document.createElement("li");
            const textSpan = document.createElement("span");
            const btnWrapper = document.createElement("div");
            const editBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");
            
             // Update cart count
          cartCount++;
              updateCartUI();
    
            if(cartCount > 0){
           cartCountEl.classList.remove("bg-red-500");
        cartCountEl.classList.add("bg-green-500");
        cartCountEl.textContent = cartCount;
    }else{
        cartCountEl.classList.add("bg-red-500");
    }
          

          
            
            // LI styles
            liEl.className =
                "bg-white shadow text-sm rounded text-gray-900 list-disc  px-4 py-2 flex justify-between hover:bg-gray-200 shadow-md shadow-gray-300";
            liEl.innerText = "ㅤ";
            // Text
            textSpan.textContent = value;
            textSpan.className =
                "bg-gray-200 capitalize w-[60%] px-3 py-1 rounded text-pretty ";

            // Button wrapper
            btnWrapper.className = "flex space-x-2";

            // Edit button
            editBtn.textContent = "Edit";
            editBtn.className = "bg-green-400 text-white px-2 py-1 rounded hover:bg-green-500";

            editBtn.addEventListener("click", () => {
                if (editBtn.textContent === "Edit") {
                    const editInput = document.createElement("input");
                    editInput.type = "text";
                    editInput.value = textSpan.textContent;
                    editInput.className =
                        "bg-gray-300 rounded border px-2 py-1 text-sm outline-none";

                    liEl.replaceChild(editInput, textSpan);
                    editBtn.textContent = "Save";
                    editInput.focus();

                    editInput.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") editBtn.click();
                    });
                } else {
                    const editInput = liEl.querySelector("input");
                    const newValue = editInput.value.trim();
                    if (!newValue) return;

                    textSpan.textContent = newValue;
                    liEl.replaceChild(textSpan, editInput);
                    editBtn.textContent = "Edit";

                    showAlert(`<i class="fa-solid fa-circle-check"></i> Successfully updated: ${newValue}`, "yellow");
                }
            });

            // Delete button
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600";

            deleteBtn.addEventListener("click", () => {
                cartCount--;
                   updateCartUI();
                if (ulEl.children.length = 1) {

                         liEl.remove();
                    if(ulEl.children.length <1)
                    ulEl.classList.remove("bg-white")
                
         
                  
                }else{
                    liEl.remove();
                    cartCountEl.classList.remove("bg-green-500");
                cartCountEl.classList.add("bg-red-500");
                }
                showAlert(`<i class="fa-solid fa-circle-minus"></i> Deleted: ${textSpan.textContent}`, "red");
            });

            // Append
            btnWrapper.append(editBtn, deleteBtn);
            liEl.append(textSpan, btnWrapper);
            Fragment.append(liEl);
            ulEl.className = "bg-white rounded-md px-5 py-5 shadow space-y-2"
            ulEl.append(Fragment)
            showAlert(`<i class="fa-solid fa-circle-check"></i>  Added: ${value}`, "green");
            inputEl.value = "";
        };

        // Clear all
        clearAll.addEventListener("click", () => {
            if (ulEl.children.length > 0) {

                ulEl.classList.remove("bg-white")
                ulEl.replaceChildren("");
                showAlert(` <i class="fa-solid fa-broom"></i> All items cleared`, "red");
               cartCount = 0;
                   updateCartUI();

            }

        });

         


        // Add Listener
        btnEl.addEventListener("click", createFunction)
        inputEl.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                createFunction();
            }
        });

