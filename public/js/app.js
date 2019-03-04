$(".burger").on("click", () => {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
});

$(document).on("click", ".saveArticle", function(e) {
    e.preventDefault();
    $.post("/save", {
        id: $(this).parent().attr("articleId")
    })
    .done(data => {
        if (data.saved) alert("Article saved!");
        else alert("This article was already saved!");
    })
});

$(document).on("click", ".unsaveArticle", function(e) {
    e.preventDefault();
    $.post("/unsave", {
        id: $(this).parent().attr("articleId")
    })
    .done(data => {
        if (data) alert("Post unsaved!");
        $(this).parent().parent().remove();
    })
})

$(".modal-button").click(function() {
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
});

$(".delete").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().parent().parent().removeClass("is-active");
});