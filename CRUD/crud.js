function Movie(title, link, rating, description, actorList) {
    this.title = title;
    this.link = link;
    this.rating = rating;
    this.description = description;
    this.actorList = actorList;
}

var actorRow;
var movieCard;

var movies = [
    new Movie("Deadpool",
        "https://cdn.artstation.com/p/assets/images/images/000/379/117/large/antoine-collignon-deadpool-text-tpsend.jpg?1419983387",
        "11/10",
        "A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated healing powers and adopts the alter ego Deadpool.",
        ["Ryan Reynolds", "Morena Baccarin"]
    )
];

$(document).ready(function () {

    $('nav input').on('click', function () {

        $('.page').hide();
        $('#card-panel').empty();

        if ($(this).attr('id') === 'read') {
            showCards();
        }
        else {
            $('#' + $(this).attr('id') + 'Page').show();
        }
    });

  
    actorRow = $('#createPage #actor-row').detach();
    actorRow.find('.glyphicon-remove').on('click', function () {
        $(this).parents('#actor-row').remove();
    });
    deleteButton = $('<button/>').attr('id', 'delete-button').addClass('btn btn-danger col-md-3');
    deleteButton.appendTo('#movie-description');
    movieCard = $('<div/>').attr('id', 'movie-card').addClass('col-md-3');
    movieCard.append(
        $('<div/>').addClass('col-md-12').append(
            $('<img/>').addClass('img-responsive')
        )
    );
    movieCard.append(
        $('<div/>').addClass('col-md-12','h2').html('<h2></h2>')
    );

    movieCard.on('click', function () {
        updateReadPage($(this).data('movie'));
        $('#readPage').show();

        $('#card-panel').empty();
        $('#movie-card').remove();
    });

    $('#createPage #actor-form .glyphicon-plus').on('click', function () {

        var row = actorRow.clone(true);
        row.find('.col-md-11').text($('#createPage #actor-name').val());


        $('#createPage #actor-form').append(row);
    });

    $('#createPage #submit').on('click', function () {

        var movie = new Movie(
            $('#createPage #title').val(),
            $('#createPage #poster').val(),
            $('#createPage #rating').val(),
            $('#createPage #description').val(),
            [] // empty actor list to be populated later
        );

        $('#createPage #actor-row .col-md-11').each(function (idx, element) {
            movie.actorList.push($(element).text());
        });

        movies.push(movie);
 
    });
    $('#delete').on('click', function () {
        showCards();
        deleteButton = ('<div/>').attr('id', 'remove').addClass('col-md-1').appendTo('#deletePage #movie-card .h2');
        deleteButton.append('<span/>').addClass('col-md-12').addClass('glyphicon').addClass('glyphicon-remove');

    });
});

function updateReadPage(movie) {

    $('#readPage #movie-poster img').attr('src', movie.link);
    $('#readPage #movie-title').text(movie.title);
    $('#readPage #movie-description').text(movie.description);
    $('#readPage #rating').text(movie.rating);

    $('#readPage #actor-list').empty();
    /*
        jQuery.clear();

        Removes all the children and text
    */

    $(movie.actorList).each(function (idx, element) {
        $('#readPage #actor-list').append(
            $('<li/>').text(element)
        );
    });
}

function showCards() {
    var cardPanel = $('#card-panel');

    $(movies).each(function (idx, element) {

        var card = movieCard.clone(true);
        card.find('img').attr('src', element.link);
        card.find('h2').text(element.title);
        card.data('movie', element);

        cardPanel.append(card);
    });
}

function deleteMovie() {
    $(movies).each(function (idx, element) {
        element.movies.splice(idx, 1);
    });
}