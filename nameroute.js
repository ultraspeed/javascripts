<!--//--><![CDATA[//><!--
// nameroute.com scripts - February 2008



var Init = {
  preload_stickers : function() {
    $.preloadImages("/images/site/stickers/free_builder_over.png", "/images/site/stickers/free_web_space_over.png", "/images/site/stickers/pop3_webmail_over.png");
  },
  
  external_links : function() {
    $('a').not("a[href*='nameroute.co.uk']").not("a[href*='nameroute.com']").not("a[href*='ultraspeed.co.uk']").not("a[href*='ultraspeed.com']").click( function() {
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
        else if ( $(this).attr("id") == "domain" ) {
          $(this).css('border', "1px solid #000");
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
            'background': "url(/nameroute/site/images/site/input_bg.png)",
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
  
  round_corners : function() {
    $('.login').corner("10px");
  }
}


var Domains = {
  // hide not_so_common domains by default
  not_so_common : function() {
    $('.not_so_common').hide();
  },
  
  // adding our show/hide not_so_common 
  all_domains_toggle : function() {
    $('#pricelist tbody tr:last').after('<tr><th colspan="4" scope="row"><a href="#" id="show_hide_not_so_common">[+] Show all domain names</a></th></tr>');
    $("#show_hide_not_so_common").toggle(
      function () {
        $('.not_so_common').show();
        $(this).html('[-] Show only commmon domain names');
        return false;
      },
      function () {
        $('.not_so_common').hide();
        $(this).html('[+] Show all domain names');
        return false;
      }
    );
  },
  
   // prevent our domain_check form to submit and display results here
  check_domain : function() {
    $('#check_domain').submit(function(){
      var domain = $('#domain').attr('value');
      var tld = $('#tld').attr('value');

      if ( !$('#domain').attr('value') || ($('#domain').attr('value') == "Please enter a domain name") ) {
        $('#domain').attr('value', "Please enter a domain name").css('color', "#F00");
        // so that the form won't get submitted
        return false;
      }
      else {
        $.ajax({
          type: "POST",
          url: "/scripts/disabled/check_domain.php",
          data: "domain=" + domain + "&tld=" + tld,
          success: function(result) {
            if ( $('#domainlist.ajax') || $('.zemError') ) $('#domainlist.ajax, .zemError').remove();
            $("#check_domain").after(result);
            Init.table_striping();
            Init.table_hovering();
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
          }
        });
        return false;
      }
    });
  },
  
  domain_after_error : function() {
    // when a user clicks inside input to enter domain name after error, clear the error text & return the input text color to the initial one
    $('#domain').focus(function() {
      if ( $(this).attr('value') == "Please enter a domain name" ) {
        $(this).attr('value', "").css('color',"#000");
      }
    });
  },
  
  // controls our spinner and form action on submit
  spinner : function() {
    if ( $('#check_domain') ) {
      // attach our spinner for AJAX if check_domain form exists
      $('#check_domain .search-button').after('<img src="/images/site/spinner_moz.gif" alt="Domain Check Mozilla-style spinner" id="check_domain_spinner" />');
      $('#check_domain_spinner').hide();
      $('#check_domain_spinner').ajaxStart( function() {
        // show spinner
        $(this).show();
        // style link & disable clicks
        $('#check_domain .search-button').attr('disabled', "disabled").text('Searching...').css({
            'background' : "#000",
            'cursor' : "default"
          });
      });
      $('#check_domain_spinner').ajaxStop( function() {
        // hide spinner
        $(this).hide();
        // re-enable link
        $('#check_domain .search-button').attr('disabled', "").text('Search').css({
            'background' : "#3996E5",
            'cursor' : "pointer"
          });
      });
    }
  }
}



$(function() {
  
  Init.preload_stickers();
  Init.external_links();
  Init.table_striping();
  Init.table_hovering();
  Init.last_paragraph();
  Init.ie_focus_fix();
  Init.ie_submit_button_fix();
  Init.round_corners();
  
  Domains.not_so_common();
  Domains.all_domains_toggle();
  Domains.check_domain();
  Domains.domain_after_error();
  Domains.spinner();
  
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