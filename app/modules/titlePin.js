(function () {

    var $selector = $('.sectionTitle, .articleTitle'),
        $titles = [],
        offsetTops = [],
        $window = $(window),
        onScroll = _.throttle(function () {
            var scrollTop = $window.scrollTop();
            
            for (var i = 0; i < $titles.length; i++) {
                if (offsetTops[i] < scrollTop) {
                    $titles[i].addClass("pinnedTitle");
                    $titles[i].css("top", (scrollTop - offsetTops[i]) + "px");
                } else {
                    $titles[i].removeClass("pinnedTitle");
                }
            }
        }, 100);

    $selector.each(function (index, title) {
        $titles.push($(title));
        offsetTops.push($titles[$titles.length - 1].offset().top);
    });

    $window.on('scroll', onScroll);
    onScroll();
}());