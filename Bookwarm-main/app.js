function bookSearch() {
    var search = document.getElementById('search-box').value
    document.getElementById('results').innerHTML = ""
    const fictionCards = document.getElementById('fiction-cards');
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    document.getElementById('type').classList = "hide-cards";
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",

        success: function (data) {
            for (i = 0; i < data.items.length; i++) {
                const extractThumbnail = ({ imageLinks }) => {
                    const DEFAULT_THUMBNAIL = "https://i.imgur.com/8UdKNS4.jpeg";
                    if (!imageLinks || !imageLinks.thumbnail) {
                        return DEFAULT_THUMBNAIL;
                    }
                    return imageLinks.thumbnail.replace("http://", "https://");
                };
                const card = document.createElement('div');
                card.classList = "card-div";
                document.getElementById('top-today').classList = 'hide-cards';
                //card content
                const content = `
                <div class="card d-flex" style="margin:50px; width: 18rem;">
                <img class="card-img-top align-items-center mx-auto thumbnail imgs" src="${extractThumbnail(data.items[i].volumeInfo)}" style="width:170px; height:230px;" alt="">
                <div class="card-body">
                    <h5 class="card-title" style="font-weight:bold;">${data.items[i].volumeInfo.title}</h5>
                </div>
                <button type="button" class="display-review btn btn-dark mb-2" id="display-review" style="height:2.5rem; width: 150px; margin-left: 50px;" value='${data.items[i].volumeInfo.title}' data-toggle="modal" data-target="#mymodal">Display review</button>
                            <div class="modal" id="mymodal" tabindex="-1" role="dialog">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Users review</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="my-modal-body"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="d-flex">
                            <div class="d-flex">
                            <div class="dropdown " style="margin-right:8px;">
                                <button class="btn btn-dark dropdown-toggle" 'type="button" style="height:2.5rem;" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Add
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button class="dropdown-item iWantToRead" id = "iWantToRead" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}" type="button">I want to read</button>
                                <button class="dropdown-item read" type="button" id="read" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">Read</button>
                                <button class="dropdown-item buy" type="button"  value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">I want to buy</button>
                                </div>
                            </div>       
                            <button type="button" class="btn-review btn btn-dark" style="height:2.5rem; margin-right: 7px" data-toggle="modal" id="modal" value='${data.items[i].volumeInfo.title}' data-target="#exampleModal" data-whatever="@mdo">Review</button>
                            <a href="${data.items[i].accessInfo.webReaderLink}" class="btn mx-auto btn-dark" style="height:2.5rem;">Read</a>
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add review</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <form action= "" method="GET">
                                      <div class="form-group">
                                      <div class="modal-body">
                                            <h4 class="text-center mt-2 mb-4">
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_1" data-index="1"></i>
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_2" data-index="2"></i>
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_3" data-index="3"></i>
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_4" data-index="4"></i>
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_5" data-index="5"></i>
                                            </h4>
                                        <label for="reviewer-name" class="col-form-label">Your name:</label>
                                        <input type="text" class="form-control" id="reviewer-name">
                                      </div>
                                      <div class="form-group">
                                        <label for="message-text" class="col-form-label">Review:</label>
                                        <textarea class="form-control" id="review"></textarea>
                                      </div>
                                    </form>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                                    <button type="button" id="add-review" name="add-review" value='${data.items[i].volumeInfo.title}' class="btn btn-primary"><a style="text-decoration: none; color: white;">Add review</a></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                        </div>
                                `;
                results.innerHTML += content;
            }
        },

        type: 'GET'
    });
}

//display top books cards
function firstTopBook() {
    //first card
    firstTitle = document.getElementById('first-title');
    firstImg = document.getElementById('first-img');
    readBtn = document.getElementById('read');

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=RomeoandJuliet",
        dataType: "json",

        success: function (data) {
            for (i = 0; i < data.items.length; i++) {
                firstTitle.innerHTML = data.items[3].volumeInfo.title;
                firstImg.src = data.items[3].volumeInfo.imageLinks.thumbnail;
                readBtn.href = data.items[3].accessInfo.webReaderLink;

            }
        }

    })

}
firstTopBook();

function secondTopBook() {
    //scd card
    secondTitle = document.getElementById('second-title');
    secondImg = document.getElementById('second-img');
    readBtn = document.getElementById('read-two');


    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=Crossroads",
        dataType: "json",
        success: function (data) {
            for (i = 0; i < data.items.length; i++) {
                secondTitle.innerHTML = data.items[3].volumeInfo.title;
                secondImg.src = data.items[3].volumeInfo.imageLinks.thumbnail;
                readBtn.href = data.items[3].accessInfo.webReaderLink;

            }
        }

    })
}
secondTopBook();

function thirdTopBook() {
    //third card 
    thirdTitle = document.getElementById('third-title');
    thirdImg = document.getElementById('third-img');
    readBtn = document.getElementById('read-third');

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=harrypotter",
        dataType: "json",
        success: function (data) {
            for (i = 0; i < data.items.length; i++) {
                thirdTitle.innerHTML = data.items[2].volumeInfo.title;
                thirdImg.src = data.items[2].volumeInfo.imageLinks.thumbnail;
                readBtn.href = data.items[2].accessInfo.webReaderLink;
            }
        }

    })
}
thirdTopBook();


//search btn & enter button
document.getElementById('search').addEventListener('click', bookSearch, false);
document.getElementById('search-box').addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        bookSearch();
        event.preventDefault();
    }
});



//fiction books
function fictionBooks() {
    document.getElementById('type').innerHTML = "Fiction";
    document.getElementById('results').classList.add('hide');
    const results = document.getElementById('results');
    while (results.children && results.children.length) {
        results.removeChild(results.children[0]);
    }
    const fictionCards = document.getElementById('fiction-cards');
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=subject:fiction",
        dataType: "json",

        success: function (data) {
            for (i = 0; i < 20; i++) {
                const extractThumbnail = ({ imageLinks }) => {
                    const DEFAULT_THUMBNAIL = "https://i.imgur.com/8UdKNS4.jpeg";
                    if (!imageLinks || !imageLinks.thumbnail) {
                        return DEFAULT_THUMBNAIL;
                    }
                    return imageLinks.thumbnail.replace("http://", "https://");
                };
                const card = document.createElement('div');
                const fictionCards = document.getElementById('fiction-cards');
                fictionCards.appendChild(card);
                document.getElementById('type').classList.remove('hide-cards');
                //card content
                const content = `
                        <div class="card my-3" style="width: 18rem;">
                        <img class="thumbnail mx-auto card-img-top book-cover imgs" src="${extractThumbnail(data.items[i].volumeInfo)}" style="width:170px; height:230px;" alt="">
                        <div class="card-body" id="results">
                            <h5 class="card-title" style="font-weight:bold">${data.items[i].volumeInfo.title}</h5>
    
                            <button type="button" class="display-review btn btn-dark mb-2" id="display-review" style="height:2.5rem;" value='${data.items[i].volumeInfo.title}' data-toggle="modal" data-target="#mymodal">Display review</button>
                            <div class="modal" id="mymodal" tabindex="-1" role="dialog">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Users review</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="my-modal-body"></div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="d-flex">
                            <div class="d-flex">
                            <div class="dropdown " style="margin-right:8px;">
                                <button class="btn btn-dark dropdown-toggle" 'type="button" style="height:2.5rem;" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Add
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button class="dropdown-item iWantToRead" id = "iWantToRead" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}" type="button">I want to read</button>
                                <button class="dropdown-item read" type="button" id="read" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">Read</button>
                                <button class="dropdown-item buy" type="button"  value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">I want to buy</button>
                                </div>
                            </div>       
                            <button type="button" class="btn-review btn btn-dark" style="height:2.5rem; margin-right: 7px" data-toggle="modal" id="modal" value='${data.items[i].volumeInfo.title}' data-target="#exampleModal" data-whatever="@mdo">Review</button>
                            <a href="${data.items[i].accessInfo.webReaderLink}" class="btn mx-auto btn-dark" style="height:2.5rem;">Read</a>
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add review</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <form action= "" method="GET">
                                      <div class="form-group">
                                      <div class="modal-body">
                                            <h4 class="text-center mt-2 mb-4">
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_1" data-index="1"></i>
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_2" data-index="2"></i>
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_3" data-index="3"></i>
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_4" data-index="4"></i>
                                                <i class="fas fa-star star-light submit_star mr-1" id="submit_star_5" data-index="5"></i>
                                            </h4>
                                        <label for="reviewer-name" class="col-form-label">Your name:</label>
                                        <input type="text" class="form-control" id="reviewer-name">
                                      </div>
                                      <div class="form-group">
                                        <label for="message-text" class="col-form-label">Review:</label>
                                        <textarea class="form-control" id="review"></textarea>
                                      </div>
                                    </form>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                                    <button type="button" id="add-review" name="add-review" value='${data.items[i].volumeInfo.title}' class="btn btn-primary"><a style="text-decoration: none; color: white;">Add review</a></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                        </div> `;


                $(".display-review").unbind().click(function (e) {
                    var tittle = e.target.value;
                    console.log(tittle);
                    $.ajax({
                        method: "GET",
                        url: "rating-data-json.php",
                        success: function (data) {
                            let string = `<table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">Rate</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Review</th>
                                    </tr>
                                    </thead>
                                    <tbody>`;
                            for (x = 0; x < data.length; x++) {
                                if (data[x].tittle == tittle) {
                                    // var feed = [];
                                    var allRates = data[x].user_rating;
                                    console.log(allRates)
                                    // feed.push(data[x].user_rating)
                                    // console.log(feed)
                                    console.log(data[x].user_rating);
                                    string += `
                                            <tr>
                                                <th scope="row">${data[x].user_rating}.0</th>
                                                <td>${data[x].user_name}</td>
                                                <td>${data[x].user_review}</td>
                                            </tr>
                                            `;
                                }
                            }
                            string += `</tbody>
                                    </table>`;

                            $(".my-modal-body").html(string);

                        }
                    })



                })

                // star rating
                $(".submit_star").mouseenter(function () {
                    var rating = $(this).data('index');


                    reset_background();

                    for (var count = 1; count <= rating; count++) {

                        $('#submit_star_' + count).addClass('text-warning');

                    }

                });
                $('#exampleModal').mouseleave(function () {
                    reset_background();
                })
                $(document).on('click', '.submit_star', function () {
                    rating_index = $(this).data('index');

                    for (var count = 1; count <= rating_index; count++) {

                        $('#submit_star_' + count).addClass('text-warning');
                    }
                });
                card.innerHTML += content;

                $(document).on('click', '.submit_star', function () {

                    rating_data = $(this).data('rating');

                });

                $('.btn-review').click(function (e) {
                    tittle = e.target.value;
                })
                // ajax save review

                $('#add-review').unbind().click(function (e) {
                    console.log(tittle);
                    var user_name = $('#reviewer-name').val();
                    var user_review = $('#review').val();
                    console.log(user_name);
                    console.log(rating_index);
                    console.log(user_review);
                    if (user_name == '' || user_review == '') {
                        alert("Please Fill Both Field");
                        return false;
                    }
                    else {
                        $.ajax({
                            url: "rating-data.php",
                            method: "POST",
                            data: {
                                action: 'rating',
                                rating_index: rating_index,
                                user_name: user_name,
                                user_review: user_review,
                                tittle: tittle
                            },
                            success: function (data) {
                                alert("Your review was added succesfully!");
                                console.log(data);
                            }
                        })
                    }
                });

                $('.iWantToRead').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'toRead',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.read').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'read',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.buy').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'buy',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
            }
        }

    })

}

document.getElementById('fiction').addEventListener('click', fictionBooks);


// peotry 
function poetryBooks() {
    document.getElementById('results').classList.add('hide');
    const results = document.getElementById('results');
    while (results.children && results.children.length) {
        results.removeChild(results.children[0]);
    }
    const fictionCards = document.getElementById('fiction-cards');
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    document.getElementById('results').classList.add('hide');
    document.getElementById('top-today').classList = ('hide-cards');
    document.getElementById('type').innerHTML = "Peotry";
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=subject:poetry",
        dataType: "json",

        success: function (data) {
            for (i = 0; i < 20; i++) {
                const extractThumbnail = ({ imageLinks }) => {
                    const DEFAULT_THUMBNAIL = "https://i.imgur.com/8UdKNS4.jpeg";
                    if (!imageLinks || !imageLinks.thumbnail) {
                        return DEFAULT_THUMBNAIL;
                    }
                    return imageLinks.thumbnail.replace("http://", "https://");
                };
                const card = document.createElement('div');
                const fictionCards = document.getElementById('fiction-cards');
                fictionCards.appendChild(card);
                document.getElementById('type').classList.remove('hide-cards');
                //card content
                const content = `
                    <div class="card my-3" style="width: 18rem;">
                    <img class="thumbnail mx-auto card-img-top book-cover imgs" src="${extractThumbnail(data.items[i].volumeInfo)}" style="width:170px; height:230px;" alt="">
                    <div class="card-body" id="results">
                        <h5 class="card-title" style="font-weight:bold">${data.items[i].volumeInfo.title}</h5>

                        <button type="button" class="display-review btn btn-dark mb-2" id="display-review" style="height:2.5rem;" value='${data.items[i].volumeInfo.title}' data-toggle="modal" data-target="#mymodal">Display review</button>
                        <div class="modal" id="mymodal" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Users review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="my-modal-body"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="d-flex">
                        <div class="d-flex">
                        <div class="dropdown " style="margin-right:8px;">
                            <button class="btn btn-dark dropdown-toggle" 'type="button" style="height:2.5rem;" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item iWantToRead" id = "iWantToRead" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}" type="button">I want to read</button>
                            <button class="dropdown-item read" type="button" id="read" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">Read</button>
                            <button class="dropdown-item buy" type="button"  value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">I want to buy</button>
                            </div>
                        </div>       
                        <button type="button" class="btn-review btn btn-dark" style="height:2.5rem; margin-right: 7px" data-toggle="modal" id="modal" value='${data.items[i].volumeInfo.title}' data-target="#exampleModal" data-whatever="@mdo">Review</button>
                        <a href="${data.items[i].accessInfo.webReaderLink}" class="btn mx-auto btn-dark" style="height:2.5rem;">Read</a>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <form action= "" method="GET">
                                  <div class="form-group">
                                  <div class="modal-body">
                                        <h4 class="text-center mt-2 mb-4">
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_1" data-index="1"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_2" data-index="2"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_3" data-index="3"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_4" data-index="4"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_5" data-index="5"></i>
                                        </h4>
                                    <label for="reviewer-name" class="col-form-label">Your name:</label>
                                    <input type="text" class="form-control" id="reviewer-name">
                                  </div>
                                  <div class="form-group">
                                    <label for="message-text" class="col-form-label">Review:</label>
                                    <textarea class="form-control" id="review"></textarea>
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                                <button type="button" id="add-review" name="add-review" value='${data.items[i].volumeInfo.title}' class="btn btn-primary"><a style="text-decoration: none; color: white;">Add review</a></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                    </div> `;


                $(".display-review").unbind().click(function (e) {
                    var tittle = e.target.value;
                    console.log(tittle);
                    $.ajax({
                        method: "GET",
                        url: "rating-data-json.php",
                        success: function (data) {
                            let string = `<table class="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Rate</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Review</th>
                                </tr>
                                </thead>
                                <tbody>`;
                            for (x = 0; x < data.length; x++) {
                                if (data[x].tittle == tittle) {
                                    // var feed = [];
                                    var allRates = data[x].user_rating;
                                    console.log(allRates)
                                    // feed.push(data[x].user_rating)
                                    // console.log(feed)
                                    console.log(data[x].user_rating);
                                    string += `
                                        <tr>
                                            <th scope="row">${data[x].user_rating}.0</th>
                                            <td>${data[x].user_name}</td>
                                            <td>${data[x].user_review}</td>
                                        </tr>
                                        `;
                                }
                            }
                            string += `</tbody>
                                </table>`;

                            $(".my-modal-body").html(string);

                        }
                    })



                })

                // star rating
                $(".submit_star").mouseenter(function () {
                    var rating = $(this).data('index');


                    reset_background();

                    for (var count = 1; count <= rating; count++) {

                        $('#submit_star_' + count).addClass('text-warning');

                    }

                });
                $('#exampleModal').mouseleave(function () {
                    reset_background();
                })
                $(document).on('click', '.submit_star', function () {
                    rating_index = $(this).data('index');

                    for (var count = 1; count <= rating_index; count++) {

                        $('#submit_star_' + count).addClass('text-warning');
                    }
                });
                card.innerHTML += content;

                $(document).on('click', '.submit_star', function () {

                    rating_data = $(this).data('rating');

                });

                $('.btn-review').click(function (e) {
                    tittle = e.target.value;
                })
                // ajax save review

                $('#add-review').unbind().click(function (e) {
                    console.log(tittle);
                    var user_name = $('#reviewer-name').val();
                    var user_review = $('#review').val();
                    console.log(user_name);
                    console.log(rating_index);
                    console.log(user_review);
                    if (user_name == '' || user_review == '') {
                        alert("Please Fill Both Field");
                        return false;
                    }
                    else {
                        $.ajax({
                            url: "rating-data.php",
                            method: "POST",
                            data: {
                                action: 'rating',
                                rating_index: rating_index,
                                user_name: user_name,
                                user_review: user_review,
                                tittle: tittle
                            },
                            success: function (data) {
                                alert("Your review was added succesfully!");
                                console.log(data);
                            }
                        })
                    }
                });

                $('.iWantToRead').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'toRead',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.read').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'read',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.buy').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'buy',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
            }
        }

    })

}
document.getElementById('poetry').addEventListener('click', poetryBooks, false);

//fantasy 

function fantasyBooks() {
    while (results.children && results.children.length) {
        results.removeChild(results.children[0]);
    }
    const fictionCards = document.getElementById('fiction-cards');
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    document.getElementById('results').classList.add('hide');
    document.getElementById('top-today').classList = ('hide-cards');
    document.getElementById('type').innerHTML = "Fantasy";
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=subject:fantasy",
        dataType: "json",

        success: function (data) {
            for (i = 0; i < 20; i++) {
                const extractThumbnail = ({ imageLinks }) => {
                    const DEFAULT_THUMBNAIL = "https://i.imgur.com/8UdKNS4.jpeg";
                    if (!imageLinks || !imageLinks.thumbnail) {
                        return DEFAULT_THUMBNAIL;
                    }
                    return imageLinks.thumbnail.replace("http://", "https://");
                };
                const card = document.createElement('div');
                const fictionCards = document.getElementById('fiction-cards');
                fictionCards.appendChild(card);
                document.getElementById('type').classList.remove('hide-cards');
                //card content
                const content = `
                    <div class="card my-3" style="width: 18rem;">
                    <img class="thumbnail mx-auto card-img-top book-cover imgs" src="${extractThumbnail(data.items[i].volumeInfo)}" style="width:170px; height:230px;" alt="">
                    <div class="card-body" id="results">
                        <h5 class="card-title" style="font-weight:bold">${data.items[i].volumeInfo.title}</h5>

                        <button type="button" class="display-review btn btn-dark mb-2" id="display-review" style="height:2.5rem;" value='${data.items[i].volumeInfo.title}' data-toggle="modal" data-target="#mymodal">Display review</button>
                        <div class="modal" id="mymodal" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Users review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="my-modal-body"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="d-flex">
                        <div class="d-flex">
                        <div class="dropdown " style="margin-right:8px;">
                            <button class="btn btn-dark dropdown-toggle" 'type="button" style="height:2.5rem;" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item iWantToRead" id = "iWantToRead" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}" type="button">I want to read</button>
                            <button class="dropdown-item read" type="button" id="read" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">Read</button>
                            <button class="dropdown-item buy" type="button"  value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">I want to buy</button>
                            </div>
                        </div>       
                        <button type="button" class="btn-review btn btn-dark" style="height:2.5rem; margin-right: 7px" data-toggle="modal" id="modal" value='${data.items[i].volumeInfo.title}' data-target="#exampleModal" data-whatever="@mdo">Review</button>
                        <a href="${data.items[i].accessInfo.webReaderLink}" class="btn mx-auto btn-dark" style="height:2.5rem;">Read</a>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <form action= "" method="GET">
                                  <div class="form-group">
                                  <div class="modal-body">
                                        <h4 class="text-center mt-2 mb-4">
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_1" data-index="1"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_2" data-index="2"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_3" data-index="3"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_4" data-index="4"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_5" data-index="5"></i>
                                        </h4>
                                    <label for="reviewer-name" class="col-form-label">Your name:</label>
                                    <input type="text" class="form-control" id="reviewer-name">
                                  </div>
                                  <div class="form-group">
                                    <label for="message-text" class="col-form-label">Review:</label>
                                    <textarea class="form-control" id="review"></textarea>
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                                <button type="button" id="add-review" name="add-review" value='${data.items[i].volumeInfo.title}' class="btn btn-primary"><a style="text-decoration: none; color: white;">Add review</a></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                    </div> `;


                $(".display-review").unbind().click(function (e) {
                    var tittle = e.target.value;
                    console.log(tittle);
                    $.ajax({
                        method: "GET",
                        url: "rating-data-json.php",
                        success: function (data) {
                            let string = `<table class="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Rate</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Review</th>
                                </tr>
                                </thead>
                                <tbody>`;
                            for (x = 0; x < data.length; x++) {
                                if (data[x].tittle == tittle) {
                                    // var feed = [];
                                    var allRates = data[x].user_rating;
                                    console.log(allRates)
                                    // feed.push(data[x].user_rating)
                                    // console.log(feed)
                                    console.log(data[x].user_rating);
                                    string += `
                                        <tr>
                                            <th scope="row">${data[x].user_rating}.0</th>
                                            <td>${data[x].user_name}</td>
                                            <td>${data[x].user_review}</td>
                                        </tr>
                                        `;
                                }
                            }
                            string += `</tbody>
                                </table>`;

                            $(".my-modal-body").html(string);

                        }
                    })



                })

                // star rating
                $(".submit_star").mouseenter(function () {
                    var rating = $(this).data('index');


                    reset_background();

                    for (var count = 1; count <= rating; count++) {

                        $('#submit_star_' + count).addClass('text-warning');

                    }

                });
                $('#exampleModal').mouseleave(function () {
                    reset_background();
                })
                $(document).on('click', '.submit_star', function () {
                    rating_index = $(this).data('index');

                    for (var count = 1; count <= rating_index; count++) {

                        $('#submit_star_' + count).addClass('text-warning');
                    }
                });
                card.innerHTML += content;

                $(document).on('click', '.submit_star', function () {

                    rating_data = $(this).data('rating');

                });

                $('.btn-review').click(function (e) {
                    tittle = e.target.value;
                })
                // ajax save review

                $('#add-review').unbind().click(function (e) {
                    console.log(tittle);
                    var user_name = $('#reviewer-name').val();
                    var user_review = $('#review').val();
                    console.log(user_name);
                    console.log(rating_index);
                    console.log(user_review);
                    if (user_name == '' || user_review == '') {
                        alert("Please Fill Both Field");
                        return false;
                    }
                    else {
                        $.ajax({
                            url: "rating-data.php",
                            method: "POST",
                            data: {
                                action: 'rating',
                                rating_index: rating_index,
                                user_name: user_name,
                                user_review: user_review,
                                tittle: tittle
                            },
                            success: function (data) {
                                alert("Your review was added succesfully!");
                                console.log(data);
                            }
                        })
                    }
                });

                $('.iWantToRead').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'toRead',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.read').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'read',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.buy').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'buy',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
            }
        }

    })

}
document.getElementById('fantasy').addEventListener('click', fantasyBooks, false);

//romance
function romanceBooks() {
    while (results.children && results.children.length) {
        results.removeChild(results.children[0]);
    }
    const fictionCards = document.getElementById('fiction-cards');
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    document.getElementById('results').classList.add('hide');
    document.getElementById('top-today').classList = ('hide-cards');
    document.getElementById('type').innerHTML = "Romance";
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=subject:romance",
        dataType: "json",

        success: function (data) {
            for (i = 0; i < 20; i++) {
                const extractThumbnail = ({ imageLinks }) => {
                    const DEFAULT_THUMBNAIL = "https://i.imgur.com/8UdKNS4.jpeg";
                    if (!imageLinks || !imageLinks.thumbnail) {
                        return DEFAULT_THUMBNAIL;
                    }
                    return imageLinks.thumbnail.replace("http://", "https://");
                };
                const card = document.createElement('div');
                const fictionCards = document.getElementById('fiction-cards');
                fictionCards.appendChild(card);
                document.getElementById('type').classList.remove('hide-cards');
                //card content
                const content = `
                    <div class="card my-3" style="width: 18rem;">
                    <img class="thumbnail mx-auto card-img-top book-cover imgs" src="${extractThumbnail(data.items[i].volumeInfo)}" style="width:170px; height:230px;" alt="">
                    <div class="card-body" id="results">
                        <h5 class="card-title" style="font-weight:bold">${data.items[i].volumeInfo.title}</h5>
                        <button type="button" class="display-review btn btn-dark mb-2" id="display-review" style="height:2.5rem;" value='${data.items[i].volumeInfo.title}' data-toggle="modal" data-target="#mymodal">Display review</button>
                        <div class="modal" id="mymodal" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Users review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="my-modal-body"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="d-flex">
                        <div class="d-flex">
                        <div class="dropdown " style="margin-right:8px;">
                            <button class="btn btn-dark dropdown-toggle" 'type="button" style="height:2.5rem;" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item iWantToRead" id = "iWantToRead" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}" type="button">I want to read</button>
                            <button class="dropdown-item read" type="button" id="read" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">Read</button>
                            <button class="dropdown-item buy" type="button"  value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">I want to buy</button>
                            </div>
                        </div>       
                        <button type="button" class="btn-review btn btn-dark" style="height:2.5rem; margin-right: 7px" data-toggle="modal" id="modal" value='${data.items[i].volumeInfo.title}' data-target="#exampleModal" data-whatever="@mdo">Review</button>
                        <a href="${data.items[i].accessInfo.webReaderLink}" class="btn mx-auto btn-dark" style="height:2.5rem;">Read</a>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <form action= "" method="GET">
                                  <div class="form-group">
                                  <div class="modal-body">
                                        <h4 class="text-center mt-2 mb-4">
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_1" data-index="1"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_2" data-index="2"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_3" data-index="3"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_4" data-index="4"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_5" data-index="5"></i>
                                        </h4>
                                    <label for="reviewer-name" class="col-form-label">Your name:</label>
                                    <input type="text" class="form-control" id="reviewer-name">
                                  </div>
                                  <div class="form-group">
                                    <label for="message-text" class="col-form-label">Review:</label>
                                    <textarea class="form-control" id="review"></textarea>
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                                <button type="button" id="add-review" name="add-review" value='${data.items[i].volumeInfo.title}' class="btn btn-primary"><a style="text-decoration: none; color: white;">Add review</a></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                    </div> `;


                $(".display-review").unbind().click(function (e) {
                    var tittle = e.target.value;
                    console.log(tittle);
                    $.ajax({
                        method: "GET",
                        url: "rating-data-json.php",
                        success: function (data) {
                            let string = `<table class="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Rate</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Review</th>
                                </tr>
                                </thead>
                                <tbody>`;
                            for (x = 0; x < data.length; x++) {
                                if (data[x].tittle == tittle) {
                                    // var feed = [];
                                    var allRates = data[x].user_rating;
                                    console.log(allRates)
                                    // feed.push(data[x].user_rating)
                                    // console.log(feed)
                                    console.log(data[x].user_rating);
                                    string += `
                                        <tr>
                                            <th scope="row">${data[x].user_rating}.0</th>
                                            <td>${data[x].user_name}</td>
                                            <td>${data[x].user_review}</td>
                                        </tr>
                                        `;
                                }
                            }
                            string += `</tbody>
                                </table>`;

                            $(".my-modal-body").html(string);

                        }
                    })



                })

                // star rating
                $(".submit_star").mouseenter(function () {
                    var rating = $(this).data('index');


                    reset_background();

                    for (var count = 1; count <= rating; count++) {

                        $('#submit_star_' + count).addClass('text-warning');

                    }

                });
                $('#exampleModal').mouseleave(function () {
                    reset_background();
                })
                $(document).on('click', '.submit_star', function () {
                    rating_index = $(this).data('index');

                    for (var count = 1; count <= rating_index; count++) {

                        $('#submit_star_' + count).addClass('text-warning');
                    }
                });
                card.innerHTML += content;

                $(document).on('click', '.submit_star', function () {

                    rating_data = $(this).data('rating');

                });

                $('.btn-review').click(function (e) {
                    tittle = e.target.value;
                })
                // ajax save review

                $('#add-review').unbind().click(function (e) {
                    console.log(tittle);
                    var user_name = $('#reviewer-name').val();
                    var user_review = $('#review').val();
                    console.log(user_name);
                    console.log(rating_index);
                    console.log(user_review);
                    if (user_name == '' || user_review == '') {
                        alert("Please Fill Both Field");
                        return false;
                    }
                    else {
                        $.ajax({
                            url: "rating-data.php",
                            method: "POST",
                            data: {
                                action: 'rating',
                                rating_index: rating_index,
                                user_name: user_name,
                                user_review: user_review,
                                tittle: tittle
                            },
                            success: function (data) {
                                alert("Your review was added succesfully!");
                                console.log(data);
                            }
                        })
                    }
                });

                $('.iWantToRead').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'toRead',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.read').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'read',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.buy').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'buy',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
            }
        }

    })

}
document.getElementById('romance').addEventListener('click', romanceBooks, false);

//Food

function foodBooks() {
    document.getElementById('results').classList.add('hide');
    document.getElementById('top-today').classList = ('hide-cards');
    document.getElementById('type').innerHTML = "Food";
    while (results.children && results.children.length) {
        results.removeChild(results.children[0]);
    }
    const fictionCards = document.getElementById('fiction-cards');
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=subject:food",
        dataType: "json",

        success: function (data) {
            for (i = 0; i < 20; i++) {
                const extractThumbnail = ({ imageLinks }) => {
                    const DEFAULT_THUMBNAIL = "https://i.imgur.com/8UdKNS4.jpeg";
                    if (!imageLinks || !imageLinks.thumbnail) {
                        return DEFAULT_THUMBNAIL;
                    }
                    return imageLinks.thumbnail.replace("http://", "https://");
                };
                const card = document.createElement('div');
                const fictionCards = document.getElementById('fiction-cards');
                fictionCards.appendChild(card);
                document.getElementById('type').classList.remove('hide-cards');
                //card content
                const content = `
                    <div class="card my-3" style="width: 18rem;">
                    <img class="thumbnail mx-auto card-img-top book-cover imgs" src="${extractThumbnail(data.items[i].volumeInfo)}" style="width:170px; height:230px;" alt="">
                    <div class="card-body" id="results">
                        <h5 class="card-title" style="font-weight:bold">${data.items[i].volumeInfo.title}</h5>
                        <button type="button" class="display-review btn btn-dark mb-2" id="display-review" style="height:2.5rem;" value='${data.items[i].volumeInfo.title}' data-toggle="modal" data-target="#mymodal">Display review</button>
                        <div class="modal" id="mymodal" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Users review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="my-modal-body"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="d-flex">
                        <div class="d-flex">
                        <div class="dropdown " style="margin-right:8px;">
                            <button class="btn btn-dark dropdown-toggle" 'type="button" style="height:2.5rem;" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item iWantToRead" id = "iWantToRead" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}" type="button">I want to read</button>
                            <button class="dropdown-item read" type="button" id="read" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">Read</button>
                            <button class="dropdown-item buy" type="button"  value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">I want to buy</button>
                            </div>
                        </div>       
                        <button type="button" class="btn-review btn btn-dark" style="height:2.5rem; margin-right: 7px" data-toggle="modal" id="modal" value='${data.items[i].volumeInfo.title}' data-target="#exampleModal" data-whatever="@mdo">Review</button>
                        <a href="${data.items[i].accessInfo.webReaderLink}" class="btn mx-auto btn-dark" style="height:2.5rem;">Read</a>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <form action= "" method="GET">
                                  <div class="form-group">
                                  <div class="modal-body">
                                        <h4 class="text-center mt-2 mb-4">
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_1" data-index="1"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_2" data-index="2"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_3" data-index="3"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_4" data-index="4"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_5" data-index="5"></i>
                                        </h4>
                                    <label for="reviewer-name" class="col-form-label">Your name:</label>
                                    <input type="text" class="form-control" id="reviewer-name">
                                  </div>
                                  <div class="form-group">
                                    <label for="message-text" class="col-form-label">Review:</label>
                                    <textarea class="form-control" id="review"></textarea>
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                                <button type="button" id="add-review" name="add-review" value='${data.items[i].volumeInfo.title}' class="btn btn-primary"><a style="text-decoration: none; color: white;">Add review</a></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                    </div> `;


                $(".display-review").unbind().click(function (e) {
                    var tittle = e.target.value;
                    console.log(tittle);
                    $.ajax({
                        method: "GET",
                        url: "rating-data-json.php",
                        success: function (data) {
                            let string = `<table class="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Rate</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Review</th>
                                </tr>
                                </thead>
                                <tbody>`;
                            for (x = 0; x < data.length; x++) {
                                if (data[x].tittle == tittle) {
                                    // var feed = [];
                                    var allRates = data[x].user_rating;
                                    console.log(allRates)
                                    // feed.push(data[x].user_rating)
                                    // console.log(feed)
                                    console.log(data[x].user_rating);
                                    string += `
                                        <tr>
                                            <th scope="row">${data[x].user_rating}.0</th>
                                            <td>${data[x].user_name}</td>
                                            <td>${data[x].user_review}</td>
                                        </tr>
                                        `;
                                }
                            }
                            string += `</tbody>
                                </table>`;

                            $(".my-modal-body").html(string);

                        }
                    })



                })

                // star rating
                $(".submit_star").mouseenter(function () {
                    var rating = $(this).data('index');


                    reset_background();

                    for (var count = 1; count <= rating; count++) {

                        $('#submit_star_' + count).addClass('text-warning');

                    }

                });
                $('#exampleModal').mouseleave(function () {
                    reset_background();
                })
                $(document).on('click', '.submit_star', function () {
                    rating_index = $(this).data('index');

                    for (var count = 1; count <= rating_index; count++) {

                        $('#submit_star_' + count).addClass('text-warning');
                    }
                });
                card.innerHTML += content;

                $(document).on('click', '.submit_star', function () {

                    rating_data = $(this).data('rating');

                });

                $('.btn-review').click(function (e) {
                    tittle = e.target.value;
                })
                // ajax save review

                $('#add-review').unbind().click(function (e) {
                    console.log(tittle);
                    var user_name = $('#reviewer-name').val();
                    var user_review = $('#review').val();
                    console.log(user_name);
                    console.log(rating_index);
                    console.log(user_review);
                    if (user_name == '' || user_review == '') {
                        alert("Please Fill Both Field");
                        return false;
                    }
                    else {
                        $.ajax({
                            url: "rating-data.php",
                            method: "POST",
                            data: {
                                action: 'rating',
                                rating_index: rating_index,
                                user_name: user_name,
                                user_review: user_review,
                                tittle: tittle
                            },
                            success: function (data) {
                                alert("Your review was added succesfully!");
                                console.log(data);
                            }
                        })
                    }
                });

                $('.iWantToRead').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'toRead',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.read').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'read',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.buy').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'buy',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
            }
        }

    })

}
document.getElementById('food').addEventListener('click', foodBooks, false);

//history

function historyBooks() {
    while (results.children && results.children.length) {
        results.removeChild(results.children[0]);
    }
    const fictionCards = document.getElementById('fiction-cards');
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    document.getElementById('results').classList.add('hide');
    document.getElementById('top-today').classList = ('hide-cards');
    document.getElementById('type').innerHTML = "History";
    while (fictionCards.children && fictionCards.children.length) {
        fictionCards.removeChild(fictionCards.children[0]);
    }
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=subject:history",
        dataType: "json",

        success: function (data) {
            for (i = 0; i < 20; i++) {
                const extractThumbnail = ({ imageLinks }) => {
                    const DEFAULT_THUMBNAIL = "https://i.imgur.com/8UdKNS4.jpeg";
                    if (!imageLinks || !imageLinks.thumbnail) {
                        return DEFAULT_THUMBNAIL;
                    }
                    return imageLinks.thumbnail.replace("http://", "https://");
                };
                const card = document.createElement('div');
                const fictionCards = document.getElementById('fiction-cards');
                fictionCards.appendChild(card);
                document.getElementById('type').classList.remove('hide-cards');
                //card content
                const content = `
                    <div class="card my-3" style="width: 18rem;">
                    <img class="thumbnail mx-auto card-img-top book-cover imgs" src="${extractThumbnail(data.items[i].volumeInfo)}" style="width:170px; height:230px;" alt="">
                    <div class="card-body" id="results">
                        <h5 class="card-title" style="font-weight:bold">${data.items[i].volumeInfo.title}</h5>

                        <button type="button" class="display-review btn btn-dark mb-2" id="display-review" style="height:2.5rem;" value='${data.items[i].volumeInfo.title}' data-toggle="modal" data-target="#mymodal">Display review</button>
                        <div class="modal" id="mymodal" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Users review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="my-modal-body"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="d-flex">
                        <div class="d-flex">
                        <div class="dropdown " style="margin-right:8px;">
                            <button class="btn btn-dark dropdown-toggle" 'type="button" style="height:2.5rem;" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item iWantToRead" id = "iWantToRead" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}" type="button">I want to read</button>
                            <button class="dropdown-item read" type="button" id="read" value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">Read</button>
                            <button class="dropdown-item buy" type="button"  value='${data.items[i].volumeInfo.title}' data-value="${data.items[i].volumeInfo.imageLinks.thumbnail}">I want to buy</button>
                            </div>
                        </div>       
                        <button type="button" class="btn-review btn btn-dark" style="height:2.5rem; margin-right: 7px" data-toggle="modal" id="modal" value='${data.items[i].volumeInfo.title}' data-target="#exampleModal" data-whatever="@mdo">Review</button>
                        <a href="${data.items[i].accessInfo.webReaderLink}" class="btn mx-auto btn-dark" style="height:2.5rem;">Read</a>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add review</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <form action= "" method="GET">
                                  <div class="form-group">
                                  <div class="modal-body">
                                        <h4 class="text-center mt-2 mb-4">
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_1" data-index="1"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_2" data-index="2"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_3" data-index="3"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_4" data-index="4"></i>
                                            <i class="fas fa-star star-light submit_star mr-1" id="submit_star_5" data-index="5"></i>
                                        </h4>
                                    <label for="reviewer-name" class="col-form-label">Your name:</label>
                                    <input type="text" class="form-control" id="reviewer-name">
                                  </div>
                                  <div class="form-group">
                                    <label for="message-text" class="col-form-label">Review:</label>
                                    <textarea class="form-control" id="review"></textarea>
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                                <button type="button" id="add-review" name="add-review" value='${data.items[i].volumeInfo.title}' class="btn btn-primary"><a style="text-decoration: none; color: white;">Add review</a></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                    </div> `;


                $(".display-review").unbind().click(function (e) {
                    var tittle = e.target.value;
                    console.log(tittle);
                    $.ajax({
                        method: "GET",
                        url: "rating-data-json.php",
                        success: function (data) {
                            let string = `<table class="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Rate</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Review</th>
                                </tr>
                                </thead>
                                <tbody>`;
                            for (x = 0; x < data.length; x++) {
                                if (data[x].tittle == tittle) {
                                    // var feed = [];
                                    var allRates = data[x].user_rating;
                                    console.log(allRates)
                                    // feed.push(data[x].user_rating)
                                    // console.log(feed)
                                    console.log(data[x].user_rating);
                                    string += `
                                        <tr>
                                            <th scope="row">${data[x].user_rating}.0</th>
                                            <td>${data[x].user_name}</td>
                                            <td>${data[x].user_review}</td>
                                        </tr>
                                        `;
                                }
                            }
                            string += `</tbody>
                                </table>`;

                            $(".my-modal-body").html(string);

                        }
                    })



                })

                // star rating
                $(".submit_star").mouseenter(function () {
                    var rating = $(this).data('index');


                    reset_background();

                    for (var count = 1; count <= rating; count++) {

                        $('#submit_star_' + count).addClass('text-warning');

                    }

                });
                $('#exampleModal').mouseleave(function () {
                    reset_background();
                })
                $(document).on('click', '.submit_star', function () {
                    rating_index = $(this).data('index');

                    for (var count = 1; count <= rating_index; count++) {

                        $('#submit_star_' + count).addClass('text-warning');
                    }
                });
                card.innerHTML += content;

                $(document).on('click', '.submit_star', function () {

                    rating_data = $(this).data('rating');

                });

                $('.btn-review').click(function (e) {
                    tittle = e.target.value;
                })
                // ajax save review

                $('#add-review').unbind().click(function (e) {
                    console.log(tittle);
                    var user_name = $('#reviewer-name').val();
                    var user_review = $('#review').val();
                    console.log(user_name);
                    console.log(rating_index);
                    console.log(user_review);
                    if (user_name == '' || user_review == '') {
                        alert("Please Fill Both Field");
                        return false;
                    }
                    else {
                        $.ajax({
                            url: "rating-data.php",
                            method: "POST",
                            data: {
                                action: 'rating',
                                rating_index: rating_index,
                                user_name: user_name,
                                user_review: user_review,
                                tittle: tittle
                            },
                            success: function (data) {
                                alert("Your review was added succesfully!");
                                console.log(data);
                            }
                        })
                    }
                });

                $('.iWantToRead').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'toRead',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.read').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'read',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
                $('.buy').unbind().click(function (e) {
                    // console.log(e);
                    var tittle = e.target.value;
                    var thumbnail = e.target.getAttribute("data-value");
                    console.log(tittle);
                    console.log(thumbnail);
                    $.ajax({
                        type: "POST",
                        url: "bookshelf.php",
                        data:
                        {
                            action: 'buy',
                            tittle: tittle,
                            thumbnail: thumbnail
                        },
                        success: function (html) {
                            console.log(html);

                        }
                    })
                });
            }
        }

    })

}

var rating_index = 0;



document.getElementById('history').addEventListener('click', historyBooks, false);


//reset_background function, rate system
function reset_background() {
    for (var count = 1; count <= 5; count++) {

        $('#submit_star_' + count).addClass('star-light');

        $('#submit_star_' + count).removeClass('text-warning');

    }
}



// ajax, jquery to receive json data from database and display users in admin panel

$(function () {
    $("#users").on('click', function () {
        document.getElementById('top-today').classList = ('hide-cards');
        document.getElementById('type').innerHTML = "History";
        const fictionCards = document.getElementById('fiction-cards');
        while (fictionCards.children && fictionCards.children.length) {
            fictionCards.removeChild(fictionCards.children[0]);
        }
        $.ajax({
            method: "GET",

            url: "json-result.php",
            success: function (data) {
                let string = ` <div class="d-flex flex-column users-table"> <div class="d-flex justify-content-between"> <h1 class="align-items-center"> Users </h1> <button class="btn btn-dark" style="width: 220px; height: 40px;"><a style="text-decoration: none; color: white;" href="add-user.php">Add User</button></div>
            <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">E-mail</th>
            </tr>
            </thead>
            <tbody>
            </div>
            `;
                for (i = 0; i < data.length; i++) {
                    string += `<tr>
                  <th scope="row">${data[i].userID}</th>
                  <td>${data[i].firstName}</td>
                  <td>${data[i].lastName}</td>
                  <td>${data[i].email}</td>
                  <td><button class="btn mx-1 btn-warning"><a style="text-decoration: none; color: white;" href="delete.php?deleteid= ${data[i].userID}">Delete</a></button></td>
                  <td><button class="btn btn-dark"><a style="text-decoration: none; color: white;" href="update.php?updateid= ${data[i].userID}">Update</a></button></td>
              </tr>
              `;
                }
                string += `</tbody>
                </table>`;
                $("#fiction-cards").html(string);
            }
        })
    });
});

// Bookshelf

$(function () {
    $("#bookshelf").on('click', function () {
        document.getElementById('top-today').classList = ('hide-cards');
        document.getElementById('type').innerHTML = "Your library";
        document.getElementById('type').classList.remove('hide-cards');
        let div = document.createElement('div');
        let btn = document.createElement('button');
        let btnscd = document.createElement('button');
        let btnthird = document.createElement('button');
        div.appendChild(btn);
        div.appendChild(btnscd);
        div.appendChild(btnthird);
        div.style.paddingTop = "70px";
        div.classList.add('d-flex', 'justify-content-around');
        btn.innerHTML = "I want to read";
        btnscd.innerHTML = "Read";
        btnthird.innerHTML = "I want to buy";
        btnscd.classList.add('btn', 'scdbtn', 'd-flex', 'flex-column', 'btn-dark');
        btnthird.classList.add('btn', 'thirdbtn', 'd-flex', 'flex-column', 'btn-dark');
        btn.classList.add('btn', 'firstbtn', 'd-flex', 'flex-column', 'btn-dark');
        document.getElementById('type').appendChild(div);
        const fictionCards = document.getElementById('fiction-cards');
        while (fictionCards.children && fictionCards.children.length) {
            fictionCards.removeChild(fictionCards.children[0]);
        }


        $(".firstbtn").on('click', function () {
            console.log(userID);
            $.ajax({
                method: "GET",
                url: "bookshelf-json.php",
                success: function (data) {
                    let string = `
                    `;
                    for (i = 0; i < data.length; i++) {
                        if (data[i].category == 'I want to read' && data[i].userID == userID) {
                            console.log(data[i].tittle);
                            string += ` <div class="card d-flex fiction-cards" id = "cards" style="width: 18rem;">
                            <img src="${data[i].thumbnail}" style="width:170px; height:230px;" class="card-img-top" alt="...">
                            <div class="card-body">
                            <p class="card-text">${data[i].tittle}</p>
                            </div>
                            </div>
                            `;
                        }

                    }

                    $("#fiction-cards").html(string);
                    $("#fiction-cards").toggle();
                }
            })
        })
        $(".scdbtn").on('click', function () {
            console.log("dzialam?")
            console.log(userID);
            id = userID;
            $.ajax({
                method: "GET",
                url: "bookshelf-json.php",
                success: function (data) {
                    let string = `
                    `;
                    for (y = 0; y < data.length; y++) {
                        if (data[y].category == 'Read' && data[y].userID == userID) {
                            console.log(data[y].tittle);
                            string += ` <div class="card d-flex fiction-cards" id = "cards" style="width: 18rem;">
                            <img src="${data[y].thumbnail}" style="width:170px; height:230px;" class="card-img-top" alt="...">
                            <div class="card-body">
                            <p class="card-text">${data[y].tittle}</p>
                            </div>
                            </div>
                            `;
                        }

                    }

                    $("#fiction-cards").html(string);
                    $("#fiction-cards").toggle();
                }
            })
        })
        $(".thirdbtn").on('click', function () {
            console.log(userID);
            $.ajax({
                method: "GET",
                url: "bookshelf-json.php",
                success: function (data) {
                    let string = `
                    `;
                    for (z = 0; z < data.length; z++) {
                        if (data[z].category == 'I want to buy' && data[z].userID == userID) {
                            console.log(data[z].tittle);
                            string += ` <div class="card d-flex fiction-cards" id = "cards" style="width: 18rem;">
                            <img src="${data[z].thumbnail}" style="width:170px; height:230px;" class="card-img-top" alt="...">
                            <div class="card-body">
                            <p class="card-text">${data[z].tittle}</p>
                            </div>
                            </div>
                            `;
                        }

                    }

                    $("#fiction-cards").html(string);
                    $("#fiction-cards").toggle();
                }
            })
        })
    })
});