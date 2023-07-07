
$(document).ready(function () {

    var totalClicked = document.getElementById('tot_click');
    var cardOne, cardTwo, clickedCard;
    var disableDeck = false;
    var matchedValue = 0;
    var clicked = 0;
    
    $(".card").on('click', function () {
        clicked++;
        totalClicked.innerHTML = clicked;

        clickedCard = $('img', this).attr('src');
        if (clickedCard !== cardOne && !disableDeck) {
            $('img', this).addClass('show_img');
            $(this).addClass("flip");
        }

        if (clickedCard === cardOne) {
            $(this).addClass("flip");
            $('img', this).addClass('show_img');

        }

        if ($(".card").hasClass('flip')) {
          
            $('.show_img').removeClass("no_img");
            if (!cardOne) {
                return cardOne = clickedCard;
            }
            cardTwo = clickedCard;
            disableDeck = true;

            let cardOneImg = cardOne;
            let cardTwoImg = cardTwo;
            matchedCards(cardOneImg, cardTwoImg);
        }
    });

    function matchedCards(img1, img2) {
        console.log(img1, img2);
        $(".card").removeClass('shake');

        if (img1 === img2) {
            console.log("card matched");

            // stop the time once all the cards are matched
            matchedValue++;
            console.log(matchedValue);
            if (matchedValue == 6) {
                setTimeout(() => {
                    clearInterval(interval);
                });

                //to reset cards after 1sec
                setTimeout(() => {
                    resetCard();
                }, 2000);
            }

            $('.card.flip img').addClass('open');
            cardOne = cardTwo = "";
            return disableDeck = false;
        }

        //if two cards doesn't match then add shake class after 600ms
        else if (img1 !== img2) {
            console.log("card not matched");

            if ($(".card").hasClass('flip')) {
                if (img1 === img2) {
                    $("img").removeClass('no_img');
                    $("img").addClass('show_img');
                    $(".card.flip").removeClass('flip');
                }

                setTimeout(() => {
                    $(".card.flip").addClass('shake');
                    $(".card.flip").removeClass('flip');
                    $("img").removeClass('show_img');
                    $("img").addClass('no_img');
                }, 600);
                setTimeout(() => {
                    cardOne = cardTwo = "";
                    disableDeck = false;
                }, 100);
            }
        }

    };

    function resetCard() {
        matchedValue = 0;
        cardOne = cardTwo = "";
        $(".card.flip").removeClass('flip');
        $("img").removeClass('show_img');
        $("img").removeClass('open');
        $("img").addClass('no_img');

        //to reset time
        secs = "00";
        tens = "00";
        mins = "00";
        secsEle.innerHTML = secs;
        minsEle.innerHTML = mins;

        //to reset clicks
        totalClicked.innerHTML = "0";

    };

});


var mins = 0;
var secs = 0;
var tens = 0;
var interval;

var minsEle = document.getElementById('mins')
var secsEle = document.getElementById('secs');
var startEle = document.getElementById('begin_game');

function startTimer() {
    tens++;
    if (tens > 99) {
        secs++;
        secsEle.innerHTML = "0" + secs;
        tens = 0;
    }
    if (secs > 9) {
        secsEle.innerHTML = secs;
    }
    if (secs > 59) {
        mins++;
        secs = 0;
        secsEle.innerHTML = "0" + secs;
        minsEle.innerHTML = "0" + mins;
    }
};

startEle.onclick = function () {
    clearInterval(interval);
    interval = setInterval(startTimer);
};