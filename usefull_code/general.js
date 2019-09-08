// jshint esversion: 6

$(".sel").change(()=>{
  if (typeof localStorage != "undefined"){
    localStorage.setItem("select", $('.sel').val());
  }
});

window.onload = function () {
  if (typeof localStorage != "undefined"){
    $('.sel').val(localStorage.getItem('select'));
  }
};

















//
