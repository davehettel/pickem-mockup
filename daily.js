;!(function ($) {
    $.fn.classes = function (callback) {
        var classes = [];
        $.each(this, function (i, v) {
            var splitClassName = v.className.split(/\s+/);
            for (var j in splitClassName) {
                var className = splitClassName[j];
                if (-1 === classes.indexOf(className)) {
                    classes.push(className);
                }
            }
        });
        if ('function' === typeof callback) {
            for (var i in classes) {
                callback(classes[i]);
            }
        }
        return classes;
    };
})(jQuery);

var filterOpen = false;
$("#filter li:first-child").click(function(event) {
  if(!filterOpen) {
    $("#filter li").css("display", "block");
    $("#filter li").css("border-radius", "0px");
    $("#filter li:first-child").css("border-radius", "0 5px 5px 0");
    $("#filter li:last-child").css("border-radius", "5px 0 0 5px");
    filterOpen = true;
  } else {
    $("#filter li:not(:eq(0))").css("display", "none");
    $("#filter li:first-child").css("border-radius", "5px");
    filterOpen = false;
  }
});
$("#filter li:not(:eq(0))").click(function(event) {
  var element = $(this);
  var type = element.html();
  $("#filter li:first-child").html(type);
  $("#filter li:not(:eq(0))").css("display", "none");
  $("#filter li:first-child").css("border-radius", "5px");
  
  $(".player").css("display", "none");
  
  if(type == "All Players")
    $(".player").css("display", "block");
  else if(type == "Pitchers")
    $(".player-P").css("display", "block");
  else if(type == "Hitters")
    $(".player-hitter").css("display", "block");
  else
    $(".player-" + type).css("display", "block");
  
  $(".player hr").css("display", "block");
  $(".player:visible:last hr").css("display", "none");
  
  filterOpen = false;
});
$(".add-player").click(function(event) {
  var element = $(this);
  var player = element.html();
  player = player.substr(4);
  
  var pitch_one = $(".slot-P1 td:nth-child(even)");
  var pitch_two = $(".slot-P2 td:nth-child(even)");
  var left = $(".slot-OF1 td:nth-child(even)");
  var center = $(".slot-OF2 td:nth-child(even)");
  var right = $(".slot-OF3 td:nth-child(even)");
  
  if(element.hasClass("add-OF")) {
    if(left.hasClass("unchosen")) {
      if(center.html() != player && right.html() != player) {
        left.html(player);
        left.removeClass("unchosen");
      }
    } else if (center.hasClass("unchosen")) {
      if(left.html() != player && right.html() != player) {
        center.html(player);
        center.removeClass("unchosen");
      }
    } else if (right.hasClass("unchosen")) {
      if(left.html() != player && center.html() != player) {
        right.html(player);
        right.removeClass("unchosen");
      }
    } else {
      if(left.html() != player && center.html() != player && right.html() != player)
        $("#overlay").css("display", "block");
    }
  } else if(element.hasClass("add-P")) {
    if(pitch_one.hasClass("unchosen")) {
      if(pitch_two.html() != player) {
        pitch_one.html(player);
        pitch_one.removeClass("unchosen");
      }
    } else if (pitch_two.hasClass("unchosen")) {
      if(pitch_one.html() != player) {
        pitch_two.html(player);
        pitch_two.removeClass("unchosen");
      }
    } else {
      if(pitch_one.html() != player && pitch_two.html() != player)
        $("#overlay").css("display", "block");
    }
  } else {
    var className = element.classes()[1].substr(4);
    $(".slot-" + className + " td:nth-child(even)").html(player);
    $(".slot-" + className + " td:nth-child(even)").removeClass("unchosen");
  }
});
$(".remove-player").click(function(event) {
  var element = $(this);
  
  element.parent().children("td:nth-child(even)").html("Select a Player");
  element.parent().children("td:nth-child(even)").addClass("unchosen");
});
$("#overlay-dismiss").click(function(event) {
  $("#overlay").css("display", "none");
});