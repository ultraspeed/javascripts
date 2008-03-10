<!--//--><![CDATA[//><!--
// hostroute.com scripts - March 2008


var Init = {
  preload_images : function() {
    $.preloadImages("/images/site/x.png", "/images/site/y.png", "/images/site/z.png");
  },
  
  website_url : function() {
    return $('link[rel=home]').attr("href");
  },
  
  domain_name : function() {
    return Init.website_url().split('/')[2]; // returns e.g. www.nameroute.co.uk, geri.ultraspeed.co.uk etc.
  },
  
  external_links : function() {
    $('a').not("a[href*='" + Init.domain_name() + "']").not("a[href*=order.hostroute.net]").click( function() {
      window.open(this.href); return false;
    });
  },
  
  table_striping : function() {
    $('.zebra tbody tr:nth-child(odd)').addClass("odd");
  },
  
  table_hovering : function() {
    $('tbody tr').mouseover(function() { $(this).addClass("over"); }).mouseout(function() { $(this).removeClass("over"); });
  },
  
  last_paragraph : function() {
    // last paragraph in content needs less padding. Since CSS3 is not supported and does not validate as CSS2...
    $('#content p:last-child').css('margin-bottom', "0.5em");
  },
  
  ie_focus_fix : function() {
    if (jQuery.browser.msie) { 
      $("input, textarea").focus(function(){
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
            'background': "url(" + Init.website_url() + "images/site/input_bg.png)",
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
  },
  
  ie_submit_button_fix : function() {
    $("button, .button").hover(
      function() {
        $(this).css('background', "#000");
      },
      function() {
        $(this).css('background', "#3996E5");
      }
    );
  },
  
  prevent_empty_search_submit : function() {
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
  },
  
  round_corners : function() {
    $('.login').corner("10px");
  }
}



// jQuery external function that helps with preloading images
jQuery.preloadImages = function() {
  for(var i = 0; i<arguments.length; i++) {
    jQuery("<img>").attr("src", arguments[i]);
  }
}



$(function() {
  // Init.preload_images();
  Init.external_links();
  Init.table_striping();
  Init.table_hovering();
  Init.last_paragraph();
  Init.ie_focus_fix();
  Init.ie_submit_button_fix();
  Init.prevent_empty_search_submit();
  Init.round_corners();
});



//--><!]]>