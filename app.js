// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/*
You can specify multiple static folders :

app.use("/public1", express.static(__dirname + "/public1"));
app.use("/public2", express.static(__dirname + "/public2"));

You can add folders in your static folder :

/public1/css
/public1/lib
and use it like that in your ejs file :

<link rel="stylesheet" href="/public1/css/index.css">
*/

let bookTitle = ""; // (1)
let startIndex = "";
let unsuccessful = "";
let number_of_books = "";
let badStatusCode;
let title = [];
let author = [];
let ISBN = [];
let thumbnail = [];
let publisher = [];
let pages = [];
let bookLinks = [];
let dateOfPublishing = [];
let bookSaleability = [];
let buyLink = [];
let filterBooks = "";
let typeOfBooks = "";
let bookSort = "";

// (1)
// passing bookTitle to books.ejs allows the book title value to....
//...retain itself in the search bar even after page refresh

  app.get("/", (req, res) =>{

    res.render("index");

  });

  app.get("/bookSearch", (req, res)=>{

    res.render("books", {number_of_books: number_of_books, thumbnail: thumbnail, title: title, author: author, ISBN: ISBN, pages: pages, bookTitle: bookTitle, bookLinks: bookLinks, buyLink: buyLink, bookSaleability: bookSaleability, publisher: publisher, dateOfPublishing: dateOfPublishing});

  });

  app.get("/unsuccessful", (req, res)=>{

    res.render("unsuccessful", {unsuccessful: unsuccessful, bookTitle: bookTitle,
     badStatusCode: badStatusCode});

  });

  app.post("/books", (req, res)=>{

    bookTitle = req.body.bookTitle;
    let bookOptions = req.body.bookOptions;

    ////////////////////////////////////      ANY BOOKS (Default)         //////////////////////////////////////

    if(req.body.searchButton_books_page || req.body.searchButton_home_page){
        startIndex = 0; // user searching for new book
    }else if(req.body.rightButton_books_page){
        startIndex = startIndex + 10; // user searching for more books of same title
    }else if(req.body.leftButton_books_page){
        if(startIndex <= 0){
          res.redirect("/bookSearch");
          return;
        }
        startIndex = startIndex - 10; // user going to the previous page
    }else{
        // do nothing
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////      Book Options         //////////////////////////////////////////

    // let filterBooks;

    if(bookOptions == 'free-ebooks'){
      startIndex = 0;
      filterBooks = bookOptions;
    }else if(bookOptions == 'paid-ebooks'){
      startIndex = 0;
      filterBooks = bookOptions;
    }else if(bookOptions == 'eBooks'){
      startIndex = 0;
      filterBooks = bookOptions;
    }else if(bookOptions == 'anyBook'){
      startIndex = 0;
      filterBooks = "";
    }else if(bookOptions == 'all'){
      startIndex = 0;
      typeOfBooks = bookOptions;
    }else if(bookOptions == 'magazines'){
      startIndex = 0;
      typeOfBooks = bookOptions;
    }else if(bookOptions == 'books'){
      startIndex = 0;
      typeOfBooks = bookOptions;
    }else if(bookOptions == 'relevance'){
      startIndex = 0;
      bookSort = bookOptions;
    }else if(bookOptions == 'newest'){
      startIndex = 0;
      bookSort = bookOptions;
    }else{
      // do nothing
    }

    // the above bookOptions values are predefined in Google Books API with the exception of 'anyBook' value
    //

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let options = {
      url: "https://www.googleapis.com/books/v1/volumes",
      qs: { // qs is predefined property of request module
        q: bookTitle, // q is predefined property of google books api
        maxResults: 40,
        startIndex: startIndex,
        filter: filterBooks,
        printType: typeOfBooks,
        orderBy: bookSort,
        // key: "AIzaSyCXwvFEvPHmAFQMLheAXED0TuTHCIUz79M"
      }
    };

    // all properties inside qs are prdefined in google books api
    // all properties inside qs object will be appended to the url:
    // https://www.googleapis.com/books/v1/volumes?q=bookTitle&key=AIzaSyCXwvFEvPHmAFQMLheAXED0TuTHCIUz79M

    if(options.qs.filter == "" || options.qs.filter == undefined)
    {
      delete options.qs.filter;
    }

    if(options.qs.printType == "" || options.qs.printType == undefined)
    {
      delete options.qs.printType;
    }

    if(options.qs.orderBy == "" || options.qs.orderBy == undefined)
    {
      delete options.qs.orderBy;
    }

    request(options, (error, response, body)=>{

      /*(1)*/
        thumbnail = [];
      /*(1)*/

      //(1)
      //every time a post request is made, the array above gets cleared of any previous.....
      //......book thumbnails to avoid any cluttering of data.
      // for some reason if the thumbnail array is not cleared before performing a new search....
      //....then some thumbnails of previous book search remains in memory and intefears with....
      //....new book searches!

        if(error){
          unsuccessful = "error";
          res.redirect("/unsuccessful");
        }else if(response.statusCode == 200){

            let obj = JSON.parse(response.body);
            let i = "";

            if(obj.totalItems == 0 || obj.items == 0){
                unsuccessful = "book not available";
                  res.redirect("/unsuccessful");
                  return;
            }

          //////////////////////////////////////////////////////////////////////////////////////
          // Book information

          number_of_books = obj.items;

          for(i=0; i<obj.items.length; i++){
            title[i] = obj.items[i].volumeInfo.title; //

            if(obj.items[i].volumeInfo.authors != null){
              obj.items[i].volumeInfo.authors.join(""); // removing space from between the authour names
              author[i] =  obj.items[i].volumeInfo.authors.join(", "); // adding coma between author names
            }else{
              author[i] = 'not available'; //
            }

            bookSaleability[i] = obj.items[i].saleInfo.saleability;

            if(bookSaleability[i] == 'FOR_SALE'){
              buyLink[i] = obj.items[i].saleInfo.buyLink;
            }else if(bookSaleability[i] == 'FOR_SALE_AND_RENTAL'){
              buyLink[i] = obj.items[i].saleInfo.buyLink;
            }else if(bookSaleability[i] == 'FREE'){
              buyLink[i] = obj.items[i].saleInfo.buyLink; // FREE
            }else{

            }

            if(obj.items[i].volumeInfo.industryIdentifiers != null){
              delete obj.items[i].volumeInfo.industryIdentifiers[0].type; // removing the type property
              if(obj.items[i].volumeInfo.industryIdentifiers[1] != null){
                delete obj.items[i].volumeInfo.industryIdentifiers[1].type;
              }
              ISBN[i] = obj.items[i].volumeInfo.industryIdentifiers; //
            }else{
              ISBN[i] = ["not available"]; //
            }

            if(obj.items[i].volumeInfo.imageLinks != undefined){
                thumbnail[i] = obj.items[i].volumeInfo.imageLinks.thumbnail; //
              }else{
                thumbnail[i] = 'images/generic_book_thumbnail.jpg'; //
              }

              if(obj.items[i].volumeInfo.publisher != undefined){
                publisher[i] = obj.items[i].volumeInfo.publisher;
              }else{
                publisher[i] = "not available";
              }

            pages[i] = obj.items[i].volumeInfo.pageCount;
            bookLinks[i] = obj.items[i].volumeInfo.previewLink;

            if(obj.items[i].volumeInfo.publishedDate != undefined){
              dateOfPublishing[i] = obj.items[i].volumeInfo.publishedDate;
            }else{
              dateOfPublishing[i] = "not available";
            }

          }
          ///////////////////////////////////////////////////////////////////////////////////////
          res.redirect("/bookSearch");
          return;

        }else if(response.statusCode == 400){ // empty feild
          unsuccessful = "statusCode 400";
          console.log(unsuccessful);
          res.redirect("/unsuccessful");
          return;
        }else{
          badStatusCode = response.statusCode;
          res.redirect("/unsuccessful");
          return;
        }
    });

  });

app.listen(process.env.PORT || 3000, ()=>{
  console.log("listning on port 3000");
});
