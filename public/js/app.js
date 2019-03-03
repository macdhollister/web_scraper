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