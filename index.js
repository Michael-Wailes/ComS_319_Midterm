// Fetch data from the 'products.json' file and initiate the loading process
fetch("./products.json")
    .then(response => response.json())
    .then(parts => loadParts(parts));

// Function to load data onto the page
function loadParts(parts) {
    // Get the main container where sports cards will be displayed
    var mainContainer = document.getElementById("parts");
    var row;

    // Iterate through each sport in the loaded data
    for (var i = 0; i < parts.parts.length; i++) {

        // Create a new row for every even index to structure the layout
        if (i % 2 === 0) {
            row = document.createElement("div");
            row.classList.add("row", "mb-3");
            mainContainer.appendChild(row);
        }

        // Generate unique identifiers and extract information
        let card = "card" + i.toString();
        let part = parts.parts[i].type;
        console.log(part);
        let url = parts.parts[i].url;
        console.log(url);
        let data = parts.parts[i].data;
        console.log(data);

        // Create a new card element and set its content
        let AddCard = document.createElement("div");
        AddCard.classList.add("col-md-6", "mb-3");

        AddCard.innerHTML = `
            <div id=${card} onclick="handleCardClick('${card}', '${part}', '${data}')" class="card shadow-sm">
                <img src="${url}" class="card-img-top" alt="photo">
                <div class="card-body">
                    <p style="text-align: center;" class="card-text"><strong>${part}</strong></p>
                </div>
            </div>
        `;

        // Append the card to the current row
        row.appendChild(AddCard);
    }
}

function handleCardClick(cardId, partName, data) {
    console.log("Card clicked:", cardId);

    const encodedData = encodeURIComponent(JSON.stringify(data));
    const encodedName = encodeURIComponent(partName);

    window.location.href = `productPage.html?part=${encodedName}&data=${encodedData}`;
}