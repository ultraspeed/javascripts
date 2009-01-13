// Ultraspeed Group Ordering System 2008

$(function() {

  // Table striping (we don't want to stripe tfoot)
  $("table tr:odd").not(":first").addClass("odd");

  // Hover over table rows (we don't want to hover over the thead)
  $("tr").not(":first").mouseover(function() { $(this).addClass("over"); }).mouseout(function() { $(this).removeClass("over"); });

  // hides all elements that are marked to be hidden
  $(".hidden").hide();

  // highlights the containers where the input is checked
  $("input:checked").each(function() {
    $(this).parent().addClass("selected");
    // if there are any checked elements, un-hide it's children
    toggle_hiddens(this, "show");
  });

  // highlight containers & unhide/hide elements marked hidden
  $(":radio, :checkbox").click(function() {
        if ( $(this).attr("checked") == true && $("form").attr("id") != "step5" ) {
          // removes the highlight class from all radio buttons
          var radios = $(this).parents("dl").find(":radio");
          if ( radios ) radios.parent().removeClass("selected");

          toggle_hiddens(this, "show");

          $(this).parent().addClass("selected");
        }
        else if ( $("form").attr("id") != "step5" ) {
          toggle_hiddens(this, "hide");

          $(this).parent().removeClass("selected");
        };
      });


  // toggles selected class on input text fields, select.input and textareas (other inputs are handled by the above)
  $("input.text, select.input, textarea.input").focus(function() {
    $(this).parent().addClass("selected");
  });
  $("input.text, select.input, textarea.input").blur(function() {
    $(this).parent().removeClass("selected");
  });


  // creates the back button inside forms (won't be generated if JS is not enabled)
  if ( $("form").attr("id") != "step1" && $("form").attr("id") != "step6" )
  {
    $("#go_previous").html('<button type="button">Previous</button>');
    $("#go_previous button").click(function() {
      var current_page_url = $("li.current a").attr("href").split('/');
      var next_page = current_page_url.pop();
      if ( next_page ) {
             var previous_page = next_page - 1;
             location.href = location.protocol + '//' + location.host + current_page_url.join('/') + '/' + previous_page;
           };
    });
  }


  // IE fix for :hover on buttons
  if ( $.browser.msie ) {
    $("button").hover(
      function() { $(this).css('cursor',"pointer") },
      function() { $(this).css('cursor',"auto") }
    );
  }


  // asks for confirmation before resetting the form
  $('#reset_form a').click(function() {
    window.location = $(this).attr('href');
  });
  $('#reset_form a').confirm({
    msg:    'Are you sure? ',
    timeout: 6000
  });

});



// if there is a nearby hidden element, display it since the parent was checked
function toggle_hiddens(element, action)
{
  hiddens = $(element).parent().find(".hidden");

  if ( hiddens ) {
        if (action == "show")
        {
          // if this element is a radio, find all elements in this group and hide their children
              if ( $(element).attr("type") == "radio" ) {
                $("input[name='"+$(element).attr("name")+"']").siblings().filter(".hidden").hide();
              };
              // now show the hiddens for the clicked element
              /*
                TODO There is a bug in IE6 that hides the radio buttons when we're dealing with tables...
              */
              hiddens.show();
                    }
        else if (action == "hide")
        {
          hiddens.hide();
        };
      }
}

//--><!]]>
