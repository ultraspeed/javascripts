<!--//--><![CDATA[//><!--
// hostroute.com scripts - February 2007

$(function() {
  
  // Preloading our over stickers to prevent that annoying flickering
  $.preloadImages("/images/site/stickers/money_back_over.png", "/images/site/stickers/support_247_over.png", "/images/site/stickers/uptime_over.png");
  
  // External links 
  $("a").not("[@href*=hostroute.co.uk]").not("[@href*=hostroute.com]").not("[@href*=ultraspeed.co.uk]").not("[@href*=ultraspeed.com]").click( function() {
    window.open(this.href); return false;
  });
  
  // Table striping
  $(".zebra tbody tr:nth-child(odd)").addClass("odd");
  // Hover over table rows
  $("tbody tr").mouseover(function() { $(this).addClass("over"); }).mouseout(function() { $(this).removeClass("over"); });
  
  // :focus fix for IE
  if (jQuery.browser.msie) { 
    $("input, textarea").not("input[type=checkbox]").focus(function(){
      if ( $(this).attr("id") == "search-text" ) {
        $(this).css({
          'background': "#FFF",
          'color': "#000"
        });
      }
      else {
        $(this).css({
          'border': "1px solid #000",
          'border-left-width': "5px"
        });
      }
    }).blur(function(){
      // if it's the search-text, it will have a different background
      if ( $(this).attr("id") == "search-text" ) {
        $(this).css({
          'background': "url(/images/site/input_bg.png)",
          'color': "#777"
        });
      }
      else {
        $(this).css({
          'border': "1px solid #CCC",
          'color': "#333"
        });
      }
    });
  };
  
  // submit button fix for IE
  $("button, .button").hover(
    function() {
      $(this).css('background', "#000");
    },
    function() {
      $(this).css('background', "#3996E5");
    }
  );
  
  // catch empty submits on search forms
  // prevent our domain_check form to submit and display results here
  $('#search').submit(function() {
    if ( !$('#search-text').attr('value') || $('#search-text').attr('value') == "Please enter a search term" ) {
      $('#search-text').attr('value', "Please enter a search term").css('color', "#000");
      // so that the form won't get submitted
      return false;
    }
  });
  // when a user clicks inside input to enter a search term after tge error, clear the error text & return the input text color to the initial one
  $('#search-text').focus(function() {
    if ( $(this).attr('value') == "Please enter a search term" ) {
      $(this).attr('value', "").css('color',"#000");
    }
  });
  
  // login forms form rounded corners
  $(".login").corner("10px");
  
});

// jQuery external function that helps with preloading images
jQuery.preloadImages = function()
{
  for(var i = 0; i<arguments.length; i++)
  {
    jQuery("<img>").attr("src", arguments[i]);
  }
}

//--><!]]>