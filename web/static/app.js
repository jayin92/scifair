var dataJSON = {}

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
  };
  reader.onerror = function (error) {
  };
}

$(document).ready(function (e) {
  $('#image-form').on('submit', (function (e) {
    e.preventDefault();
    if(document.getElementById("three") != null){
      document.getElementById("three").remove();
    }
    $('canvas').remove();
    dataJSON["overlay"] = document.getElementById("overlay").value;
    dataJSON["file"] = document.getElementById("input").src;
    $.ajax({
      url: '/generate',
      type: 'POST',
      dataType: "json",
      data: JSON.stringify(dataJSON),
      contentType: "application/json",
      cache: false,
      processData: false,
      success: function (data) {
        var script = document.createElement("script");
        document.getElementById("alertHolder").innerHTML = '<div class="alert alert-success fade show" role="alert">Generate successfully. <a href="/static/gen/' + data['file_name'] + '.png"> Direct Link</a><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        document.getElementById("output").src = "/static/gen/" + data['file_name'] + ".png";
        script.src = "/static/bundle.js";
        script.setAttribute("id", "three");
        document.documentElement.appendChild(script);
      }
    });
  }));
});

function addBtn() {
  document.getElementById('btnHolder').innerHTML = '<input type="submit" value="Generate" class="btn btn-primary">'
}

$(document).on("click", ".browse", function () {
  var file = $(this).parents().find(".file");
  file.trigger("click");
});

$('input[type="file"]').change(function (e) {
  addBtn();
  
  var fileName = e.target.files[0].name;
  $("#file").val(fileName);

  var reader = new FileReader();
  reader.onload = function (e) {
    // get loaded data and render thumbnail.
    document.getElementById("input").src = e.target.result;
  };
  // read the image file as a data URL.
  reader.readAsDataURL(this.files[0]);
}); 