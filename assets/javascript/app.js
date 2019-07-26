//initials array of gifs

$(document).ready(function() {
  var basketballersArray = [
    "Lebron James",
    "Kevin Durant",
    "Dwyane Wade",
    "Kobe Bryant",
    "Tim Duncan"
  ];

  function renderBtn() {
    $("#basketballersBtn").empty();

    for (var i = 0; i < basketballersArray.length; i++) {
      var btn = $("<button class='btn btn-dark btn-space'>").addClass(
        "althlete"
      );
      btn.attr("data-name", basketballersArray[i]);
      btn.text(basketballersArray[i]);

      $("#basketballersBtn").append(btn);
    }
  }

  $("#add-bsker").on("click", function(event) {
    event.preventDefault();

    var basketballers = $("#basketballersInput")
      .val()
      .trim();

    basketballersArray.push(basketballers);
    renderBtn();
  });

  function displayGifs() {
    $("#basketballersGifs").empty();
    var althlete = $(this).attr("data-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      althlete +
      "&api_key=J1tOZQW0HawYKB3pyijoSCniMuc8Ac5b&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var results = response.data;
      for (var j = 0; j < results.length; j++) {
        //if j is 0, 3, 6, 9 create row element
        //newRow has to have unique class or id
        //   var newRow = $("<div class='row' id="j">");

        // var basketballersDiv = $("<div class='masonry col-md-4'>");

        var basketballersDiv = $("<div class='grid-item'>");

        var R = $("<p>");
        R = "Rating:" + response.data[j].rating;

        var basketballersImg = $("<img class='gif'>").attr(
          "src",
          response.data[j].images.fixed_height_still.url
        );
        basketballersImg.attr(
          "data-still",
          response.data[j].images.fixed_height_still.url
        );
        basketballersImg.attr(
          "data-animate",
          response.data[j].images.fixed_height.url
        );

        basketballersImg.attr("data-state", "still");

        basketballersDiv.append(R);
        basketballersDiv.append(basketballersImg);
        //if newRow prepend to newRow
        //basketballersGifs.prepend(newRow)
        $("#basketballersGifs").prepend(basketballersDiv);

        console.log(basketballersDiv);

        // $("#basketballersGifs").masonry({
        //   itemSelector: ".gif"
        // });
      }

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        var stillImg = $(this).attr("data-still");
        var animateImg = $(this).attr("data-animate");
        console.log(state);

        if (state === "still") {
          $(this).attr("src", animateImg);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", stillImg);
          $(this).attr("data-state", "still");
        }
      });
    });
  }

  $(document).on("click", ".althlete", displayGifs);

  renderBtn();
});
