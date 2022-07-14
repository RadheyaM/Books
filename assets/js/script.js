  const userInput = document.getElementById("search");
  const button = document.getElementById("search-button");
  const bookCardTemplate = document.querySelector("#book-card-template");
  const bookCardContainer = document.querySelector("#book-cards-container");  
  //let responseData = {};

  //query the google books api and return results based on user input
  async function getBooks (searchInput) {

    if (searchInput === '') {
      alert('Please enter a book title') 
      return;
    }

    const endpoint = new URL(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
    console.log(`You generated the following URL: ${endpoint}`);

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log("Your fetch request returned:")
    console.log(data);

    //generate populated cards to display below search bar.
    for (let i = 0; i < data.items.length; i++) {
      const dataVolumeInfo = data.items[i].volumeInfo;
      const card = bookCardTemplate.content.cloneNode(true).children[0];
      const bookCover = card.querySelector("[book-cover]");
      const bookCoverImg = dataVolumeInfo.imageLinks.thumbnail;
      const bookTitle = card.querySelector("[book-title]");
      const bookSubtitle = card.querySelector("[book-desc]");
      
      bookCover.style.backgroundImage = `url(${bookCoverImg})`;
      bookTitle.textContent = dataVolumeInfo.title;
      bookSubtitle.textContent = dataVolumeInfo.subtitle;
      bookCardContainer.append(card);
    }


  }

button.addEventListener("click", () => {
  const responseData = getBooks(userInput.value);
  //renderDataToCards(responseData);
})
