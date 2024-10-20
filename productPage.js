window.onload = function() {
    // Fetch data from data.json when the page loads
    fetch('./products.json')
        .then(response => response.json())
        .then(data => {
            // Retrieve the sport name from URL query parameter
            const urlParams = new URLSearchParams(window.location.search);
            const partName = urlParams.get('part');

            if (partName) {
                // Call the function to load equipment cards
                loadPart(data, partName);
            }
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const queryParams = new URLSearchParams(window.location.search);
    const encodedPartName = queryParams.get('part');
    console.log(encodedPartName);
    const encodedData = queryParams.get('data');

    const partName = decodeURIComponent(encodedPartName);
    const nameElement = document.getElementById('partNameContainer');
    nameElement.textContent = partName;
    const decodedData = JSON.parse(decodeURIComponent(encodedData));

    console.log("Decoded Part Name:", partName);
    console.log("Decoded Data:", decodedData);

    loadPart(decodedData, partName);
});

function loadPart(data, partName) {
    const partContainer = document.getElementById('partContainer');
    const part = data[partName + 'parts'];

    if (part) {
        console.log(part);
        // Clear existing content in the equipmentContainer
        partContainer.innerHTML = '';

        // Iterate over each equipment item
        part.forEach(part => {
            // Create a card for each equipment item
            const card = createCard(part.name, part.url, part.price, part.datePosted, part.poster, part.description);
            partContainer.appendChild(card);
        });
    }
}

function createCard(title, imageUrl, price, datePosted, poster, description) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    card.innerHTML = `
        <div class="card shadow-sm">
            <img src="${imageUrl}" onclick="handleCardClick('${title}','${imageUrl}','${price}','${datePosted}','${poster}','${description}')"class="card-img-top custom-image" alt="photo">
            <div class="card-body">
                <h5 class="card-title">${title} - ${price}</h5>
            </div>
        </div>
    `;
    return card;
}


function handleCardClick(title, imageUrl, price, datePosted, poster, description) 
{
    console.log("Card Clicked");
    // Create an object with the item details
    const itemDetails = {
        title: title,
        imageUrl: imageUrl,
        price: price,
        datePosted: datePosted,
        poster: poster,
        description: description
    };

    // Encode the item details for the URL
    const encodedData = encodeURIComponent(JSON.stringify(itemDetails));

    window.location.href = `partPage.html?part=${encodedData}`;
}