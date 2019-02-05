document.addEventListener("DOMContentLoaded", function() {
  const list = document.getElementById("list")
  const showPanel = document.getElementById("show-panel")
  displayBooks();

  function displayBooks() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => {
      data.forEach(putBookOnSidebar)
    })
  }

  function putBookOnSidebar(book) {
    string = `
    <li data-id="${book.id}" class="book-on-sidebar">${book.title}</li>`
    list.innerHTML += string
  }

  list.addEventListener("click", event => {
    if (event.target.classList.contains("book-on-sidebar")) {
      fetch(`http://localhost:3000/books/${event.target.dataset.id}`)
      .then(res => res.json())
      .then(book => {
        string = `<h1 class="book-title"> ${book.title} </h1>
        <img src = "${book.img_url}" class="book-img-url">
        <p class="book-description"> ${book.description} </p>
        <button type = "button" class="like-button"> LIKE </button>`
        showPanel.innerHTML = string;
        showPanel.dataset.id = event.target.dataset.id;
      })
    }
  })

  showPanel.addEventListener("click", event => {
    if (event.target.classList.contains("like-button")) {
      // console.log("like-button")
    fetch(`http://localhost:3000/books/${event.target.parentNode.dataset.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: event.target.parentNode.dataset.id,
        title: document.querySelector(".book-title").innerText,
        img_url: document.querySelector(".book-img-url").src,
        description: document.querySelector(".book-description").innerText
        // title: event.target.parentNode.querySelector()
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }
})

})
