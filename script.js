var index = 0;
var array = [];

function add_element_to_array() {
  var magnitude = document.getElementById("value").value;
  array[index] = {
    direction: this.id,
    magnitude: magnitude
  };
  index++;
  document.getElementById("value").value = "";
  display_draw_array();
}

function display_draw_array() {
  var element = "<hr/>";
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  context.beginPath();
  
  // Initialize starting point to center of the canvas
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  
  for (var i = 0; i < array.length; i++) {
    var direction = array[i].direction;
    var magnitude = parseFloat(array[i].magnitude);
    element += "Direction: " + direction + ", magnitude: " + magnitude + "<br/>";
    
    // Calculate the change in x and y based on the direction and magnitude
    var dx = 0;
    var dy = 0;
    switch (direction) {
      case "forwards":
        dy = -magnitude;
        break;
      case "right":
        dx = magnitude;
        break;
      case "left":
        dx = -magnitude;
        break;
    }
    
    // Update the x and y coordinates
    x += dx;
    y += dy;
    
    // Draw a line to the new x and y coordinates
    context.lineTo(x, y);
    context.stroke();
  }

  document.getElementById("Result").innerHTML = element;
}

function delete_array() {
  index = 0;
  array = [];
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("Result").innerHTML = "";
}

function save_array() {
  var path_name = document.getElementById("pathname").value;
  array.push({
    direction: "path_name",
    magnitude: path_name
  });
  $.ajax({
    url: "saveDB.php",
    method: "post",
    data: { path: JSON.stringify(array) },
    success: function(res){
      console.log(res);
    }
  });
}

class Line {
  constructor(direction, magnitude) {
    this.direction = direction;
    this.magnitude = magnitude;
  }
}

var f_button = document.getElementById("forwards");
var r_button = document.getElementById("right");
var l_button = document.getElementById("left");
var d_button = document.getElementById("delete");
var s_button = document.getElementById("save");

f_button.addEventListener("click", add_element_to_array);
r_button.addEventListener("click", add_element_to_array);
l_button.addEventListener("click", add_element_to_array);
d_button.addEventListener("click", delete_array);
s_button.addEventListener("click", save_array);