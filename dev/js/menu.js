$("body").on("click", ".menu", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if ($(".menu-links").attr("data-show") === "show")
        $(".menu-links").attr("data-show", "hide");
    else
        $(".menu-links").attr("data-show", "show");
});

$("body").on("click", function (e) {
    if (!e.target.closest(".menu-links") && !e.target.closest(".menu")) {
        if ($(".menu-links").attr("data-show") === "show")
            e.preventDefault();
        $(".menu-links").attr("data-show", "hide");
    }
});