<!--//--><![CDATA[//><!--
// nameroute.com scripts - April 2008



var Init = {
  website_url : function() {
    return $('link[rel=home]').attr("href");
  },
  
  domain_name : function() {
    return Init.website_url().split('/')[2]; // returns e.g. www.nameroute.co.uk, geri.ultraspeed.co.uk etc.
  },
  
  empty_links : function() {
    $('a[href=#]').mouseover(function() {
      $(this).css('cursor', "default");
    });
  },
  
  external_links : function() {
    $('a').not("a[href*='" + Init.domain_name() + "']").not("a[href*=order.hostroute.net]").click( function() {
      // empty links do nothing
      if ( $(this).attr("href") == "#" )
        return false;
      else
        window.open(this.href); return false;
    });
  },
  
  table_striping : function() {
    $('.zebra tbody tr:nth-child(odd)').addClass("odd");
  },
  
  table_hovering : function() {
    $('tbody tr').not('.no_hover').mouseover(function() { $(this).addClass("over"); }).mouseout(function() { $(this).removeClass("over"); });
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
  },
  
  tooltips : function() {
    $('a.tooltip').tooltip({
      track: true,
      delay: 0,
      showURL: false,
      // showBody: " - ",
      opacity: 0.95
    });
  }
}


var Domains = {
  
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
          url: Init.website_url() + "scripts/disabled/check_domain.php",
          data: "domain=" + domain + "&tld=" + tld,
          beforeSend: Domains.start_domain_check,
          complete: Domains.stop_domain_check,
          success: Domains.domain_check_success,
          error: Domains.domain_check_error
        });
        return false;
      }
    });
  },
  
   // prevent our domain_common_check form to submit and display results here
  check_common_domain : function() {
    $('#check_common_domains').submit(function(){
      var domain = $('#hidden_domain').attr('value');
      var tld = $('#hidden_tld').attr('value');

      if ( !domain || !tld ) {
        // if we have an error, don't submit form
        return false;
      }
      else {
        $.ajax({
          type: "POST",
          url: Init.website_url() + "scripts/disabled/check_domain.php",
          data: "domain=" + domain + "&tld=" + tld + "&extended=1",
          beforeSend: Domains.start_domain_check,
          complete: Domains.stop_domain_check,
          success: Domains.domain_check_success,
          error: Domains.domain_check_error
        });
        return false;
      }
    });
  },
  
   // prevent our domain_all_check form to submit and display results here
  check_all_domain : function() {
    $('#check_all_domains').submit(function(){
      var domain = $('#hidden_domain').attr('value');
      var tld = $('#hidden_tld').attr('value');

      if ( !domain || !tld ) {
        // if we have an error, don't submit form
        return false;
      }
      else {
        $.ajax({
          type: "POST",
          url: Init.website_url() + "scripts/disabled/check_domain.php",
          data: "domain=" + domain + "&tld=" + tld + "&all=1",
          beforeSend: Domains.start_domain_check,
          complete: Domains.stop_domain_check,
          success: Domains.domain_check_success,
          error: Domains.domain_check_error
        });
        return false;
      }
    });
  },
  
  // when a user clicks inside input to enter domain name after error, clear the error text & return the input text color to the initial one
  domain_after_error : function() {
    $('#domain').focus(function() {
      if ( $(this).attr('value') == "Please enter a domain name" ) {
        $(this).attr('value', "").css('color',"#000");
      }
    });
  },
  
  // stuff to do if our check_domain AJAX call was successful
  domain_check_success : function(result) {
    if ( $('#domainlist.ajax').length ) {
      $('#domainlist.ajax').replaceWith(result);
    }
    else if ( $('.zemError').length ) {
      $('.zemError').replaceWith(result);
      $('#domainlist.ajax').hide().slideDown("slow");
    }
    else {
      $('#check_domain').after(result);
      $('#domainlist.ajax').hide().slideDown("slow");
    }
    Init.table_striping();
    Init.table_hovering();
    // line-up the check for the next form
    Domains.check_common_domain();
    Domains.check_all_domain();
  },
  
  // stuff to do if our check_domain AJAX call was NOT successful
  domain_check_error : function() {
    // set our error message
    result = '<div class="zemError">Sorry, there was an error with our domain checker. Please try again later.</div>';
    
    if ( $('#domainlist.ajax').length ) {
      $('#domainlist.ajax').replaceWith(result);
    }
    else if ( $('.zemError').length ) {
      $('.zemError').replaceWith(result);
    }
    else {
      $('#check_domain').after(result);
      $('.zemError').hide().slideDown("slow");
    }
  },
  
  // controls our spinner and form action on submit
  create_spinner : function() {
    if ( $('#check_domain') ) {
      // attach our spinner for AJAX if check_domain form exists
      $('#check_domain .search-button').after('<img src="' + Init.website_url() + 'images/site/spinner_moz.gif" alt="Domain Check Mozilla-style spinner" id="check_domain_spinner" />');
      $('#check_domain_spinner').hide();
    }
  },
  
  // starts our domain checking
  start_domain_check : function() {
    // show spinner
    $('#check_domain_spinner').show();
    // style link & disable clicks
    $('#check_domain .search-button').attr('disabled', "disabled").text('Searching...').css({
        'background' : "#000",
        'cursor' : "default"
      });
  },
  
  // finishes domain checking
  stop_domain_check : function() {
    // hide spinner
    $('#check_domain_spinner').hide();
    // re-enable link
    $('#check_domain .search-button').attr('disabled', "").text('Search').css({
        'background' : "#3996E5",
        'cursor' : "pointer"
      });
  }
}



$(function() {
  
  Init.empty_links();
  Init.external_links();
  Init.table_striping();
  Init.table_hovering();
  Init.last_paragraph();
  Init.ie_focus_fix();
  Init.ie_submit_button_fix();
  Init.prevent_empty_search_submit();
  Init.round_corners();
  Init.tooltips();
  
  Domains.check_domain();
  Domains.domain_after_error();
  Domains.create_spinner();
  
});



//--><!]]>