// jshint esversion: 6

$(document).ready(()=>{
  $(window).scroll(()=>{
    console.log("scroll: "+ $(window).scrollTop());
    if($(window).scrollTop() > $('.header-wrapper').position().top + 75){ // $(window).scrollTop() starts from 0 position
      $('.top-wrapper-container').addClass('topWrapperContainer')
      $('.top-wrapper-container-Placeholder').addClass('topWrapperContainer-Placeholder');
    }else{
      $('.top-wrapper-container').removeClass('topWrapperContainer')
      $('.top-wrapper-container-Placeholder').removeClass('topWrapperContainer-Placeholder');
    }
  });

// ----------------------------------------------------------------------------------------------------------------------------------------
    // submitting options from the <select> drop down list
    // javascript is used because just by clicking on the options the value is not submitted
    $('.dropDown1').change(()=>{
      localStorage.setItem('options1', $(".dropDown1").val());
      $('.form1').submit();
    });
    if(localStorage.getItem('options1') != undefined){
      $('.dropDown1').val(localStorage.getItem('options1'));
    }

    $('.dropDown2').change(()=>{
      localStorage.setItem('options2', $(".dropDown2").val());
      $('.form2').submit();
    });
    if(localStorage.getItem('options2') != undefined){
      $('.dropDown2').val(localStorage.getItem('options2'));
    }

    $('.dropDown3').change(()=>{
      localStorage.setItem('options3', $(".dropDown3").val());
      $('.form3').submit();
    });
    if(localStorage.getItem('options3') != undefined){
      $('.dropDown3').val(localStorage.getItem('options3'));
    }


});
