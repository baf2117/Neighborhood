
function after() {
    var height = window.innerHeight;
    var size = "height:" + height + "px";
    document.getElementById("imagediv").setAttribute("style", size);
    document.getElementById("resumediv").setAttribute("style", size);
    document.getElementById("mobilediv").setAttribute("style", size);
  };
