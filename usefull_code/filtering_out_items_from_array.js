// jshint esversion: 6

// var arr = [{
//     title: "Harry Potter",
//     categories: [{
//         id: 39,
//         name: "Popular Books"
//       },
//       {
//         id: 3,
//         name: "Kids"
//       },
//       {
//         id: 79,
//         name: "All Books"
//       }
//     ]
//   },
//
//   {
//     title: "Pride and Prejudice",
//     categories: [{
//         id: 36,
//         name: "Classic Books"
//       },
//       {
//         id: 3,
//         name: "Woman"
//       },
//       {
//         id: 79,
//         name: "All Books"
//       }
//     ]
//   }
// ];

// console.log(arr.filter(i => i.categories.some(j => j.name === "Kids")).map(k => k.title));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('document').ready(()=>{
  $("button").click(()=>{
    let bookName = 'mission impossible';
    $.ajax({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q='+bookName+'&maxResults=10',
      contentType: 'json'
    })
    .done((responseData)=>{
      //json data has been parsed into javascript object. no need to use JSON.parse()

      

  })
    .fail((jqXHR, textStatus, err)=>{
      console.log("AJAX error response: " + textStatus);
    });
  });
});

// totalItems.filter(i => i.industryIdentifiers).map(k => k.industryIdentifiers);
