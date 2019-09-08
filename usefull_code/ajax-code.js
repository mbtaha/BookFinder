// let i=0;
//
// $(document).ready(()=>{
//   $('#btn').click((e)=>{
//     e.preventDefault();
//     $.ajax({
//       method: 'GET',
//       url: 'http://localhost:3000/bookInformation',
//       contentType: 'json',
//     })
//     .done((responseData)=>{
//       let obj = JSON.parse(responseData);
//       // console.log(obj);
//       // $(".bookInformation > div").addClass("bookDetails"); //adding class
//
//       $(".bookInformation").attr('id', 'bookInformation'); //adding ID
//
//       for(i=0; i<$(".details").length; i++){
//         let author = $(".details").eq(i).html("Author: " + obj.title[i]);
//         console.log("author: " + obj.title[i]);
//       }
//     })
//     .fail((jqXHR, textStatus, err)=>{
//       console.log("AJAX error response: " + textStatus);
//     });
//     i++;
//     if(i>9){
//       i=0;
//     }
//   });
// });

// ----------------------------------------------------------------------------------------------------------------

// select only one checkbox at a time
// $(document).on('click', 'input[type="checkbox"]', function() {
//     $('input[type="checkbox"]').not(this).prop('checked', false);
// });
//
// // setting predefined values for passing as request data to the app.js server using AJAX
// // all values are predefined in the Google Books API
// $('input[name="freeBooks"]').val("free-ebooks");
// $('input[name="paidBooks"]').val("paid-ebooks");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// $('input:checkbox').change((e)=> { // change event occurs when value of an element has been changed
//
//     if($('.free').is(":checked")){ //////////////
//       $.ajax({
//         method: 'POST',
//         url: 'http://localhost:3000/books',
//         data: {
//           bookTitle: $('.textField').val(),
//           freeBooks: $('.free').val()
//         }
//       })
//       .done((responseData)=>{
//         window.location.href = "http://localhost:3000/bookSearch";
//       })
//       .fail((jqXHR, textStatus, err)=>{
//         console.log("AJAX error response: " + textStatus);
//       });
//     }else if($('.paid').is(':checked')){ //////////////////
//       $.ajax({
//         method: 'POST',
//         url: 'http://localhost:3000/books',
//         data: {
//           bookTitle: $('.textField').val(),
//           paidBooks: $('.paid').val()
//         }
//       })
//       .done((responseData)=>{
//         window.location.href = "http://localhost:3000/bookSearch";
//       })
//       .fail((jqXHR, textStatus, err)=>{
//         console.log("AJAX error response: " + textStatus);
//       });
//     }
//
//     // $(".test").toggle(this.checked);
//     // $(".test").text("hello").toggle();
//     // window.location = $('#google').attr('href');
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//   $('#rightButton').addClass('rightButtonFreeBooks');
//
//   $('.rightButtonFreeBooks').click(()=>{
//     $.ajax({
//       method: 'POST',
//       url: 'http://localhost:3000/books',
//       data: {
//         bookTitle: $('.textField').val(),
//         freeBooks: $('.free').val(),
//         rightButtonAjax: $('.rightButtonFreeBooks').val()
//       }
//     })
//     .done((responseData)=>{
//       window.location.href = "http://localhost:3000/bookSearch";
//     })
//     .fail((jqXHR, textStatus, err)=>{
//       console.log("AJAX error response: " + textStatus);
//     });
//   });
//
//   $('#leftButton').addClass('leftButtonFreeBooks');
//
//   $('.leftButtonFreeBooks').click(()=>{
//     $.ajax({
//       method: 'POST',
//       url: 'http://localhost:3000/books',
//       data:{
//         bookTitle: $('.textField').val(),
//         freeBooks: $('.free').val(),
//         leftButtonAjax: $('.leftButtonFreeBooks').val()
//       }
//     })
//     .done(()=>{
//       window.location.href = "http://localhost:3000/bookSearch";
//     })
//     .fail((jqXHR, textStatus, err)=>{
//       console.log("AJAX error response: " + textStatus);
//     });
//   });
//
