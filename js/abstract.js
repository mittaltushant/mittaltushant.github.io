$(".abstract").on("click", function(){
    if($(this).text()=="Show full abstract")
    {
        $(this).text("Hide abstract");
    } else {
        $(this).text("Show full abstract");
    }
    $(".abstracttext").toggle();

    return false;
});
