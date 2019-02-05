document.addEventListener("DOMContentLoaded", function() {
  const myUser = {"id":1, "username":"pouros"}

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
      .then(book => showBookOnPanel(book))
    }
  })

  const showBookOnPanel = (book) => {
    string = `<h1 class="book-title"> ${book.title} </h1>
    <img src = "${book.img_url}" class="book-img-url">
    <p class="book-description"> ${book.description} </p>
    <button type = "button" class="like-button"> LIKE </button>`

    showPanel.innerHTML = string;
    showPanel.append(makeUsersList(book));
    showPanel.dataset.id = book.id;
  }

  const makeUsersList = book => {
    let usersList = document.createElement("ul")
    usersList.className = "users-list"
    book.users.forEach(user => {
      let liString = `<li data-id="${user.id}">${user.username}</li>`;
      usersList.innerHTML += liString;
    })
    return usersList;
  }

  showPanel.addEventListener("click", event => {
    if (event.target.classList.contains("like-button")) {
      fetch(`http://localhost:3000/books/${event.target.parentNode.dataset.id}`)
      .then(res => res.json())
      .then(data => { updateBook(data)})


      // console.log("like-button")
      //
      // const usersList = document.querySelector(".users-list")
      // let newUsersArray = []
      // usersList.childNodes.forEach(li => {
      //   const userObject = {id: li.dataset.id, username: li.innerText}
      //   newUsersArray.push(userObject)
      // })

      const updateBook = book => {
        book.users.push(myUser)
        fetch(`http://localhost:3000/books/${book.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            id: book.id,
            title: book.title,
            img_url: book.img_url,
            description: book.description,
            users: book.users
            // title: event.target.parentNode.querySelector()
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(book => showBookOnPanel(book))
      }


  }
})

})
