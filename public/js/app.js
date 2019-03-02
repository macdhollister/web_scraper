$(".burger").on("click", () => {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
});

$(document).on("click", ".saveArticle", function(e) {
    e.preventDefault();
    alert("Article Saved!");
    $.post("/save", {
        id: $(this).parent().attr("articleId")
    });
});