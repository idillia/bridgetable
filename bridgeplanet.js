var playingCards = angular.module('ngPlayingCards', ['ngSanitize']);
playingCards.directive('playingCard', function($compile, $sce) {

    var ranks = {
        A: {
            name: 'ace',
            symbol: 'A',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-ace {{suit.name}}">\n    <div class="corner top"><span class="number">A</span><span ng-bind-html="suit.symbol"></span></div><span class="suit middle_center" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">A</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        2: {
            name: 'two',
            symbol: '2',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-two {{suit.name}}">\n    <div class="corner top"><span class="number">2</span><span ng-bind-html="suit.symbol"></span></div>\n    <span class="suit top_center" ng-bind-html="suit.symbol"></span>\n    <span class="suit bottom_center" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">2</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        3: {
            name: 'three',
            symbol: '3',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-three {{suit.name}}">\n    <div class="corner top"><span class="number">3</span><span ng-bind-html="suit.symbol"></span></div>\n    <span class="suit top_center" ng-bind-html="suit.symbol"></span>\n    <span class="suit middle_center" ng-bind-html="suit.symbol"></span>\n    <span class="suit bottom_center" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">3</span><span ng-bind-html-unsafe="suit.symbol"></span></div>\n</div>'
        },
        4: {
            name: 'four',
            symbol: '4',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-four {{suit.name}}">\n    <div class="corner top"><span class="number">4</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">4</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        5: {
            name: 'five',
            symbol: '5',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-five {{suit.name}}">\n    <div class="corner top"><span class="number">5</span><span ng-bind-html="suit.symbol"></span></div>\n    <span class="suit top_left" ng-bind-html="suit.symbol"></span>\n    <span class="suit top_right" ng-bind-html="suit.symbol"></span>\n    <span class="suit middle_center" ng-bind-html="suit.symbol"></span>\n    <span class="suit bottom_left" ng-bind-html="suit.symbol"></span>\n    <span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">5</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        6: {
            name: 'six',
            symbol: '6',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-six {{suit.name}}">\n    <div class="corner top"><span class="number">6</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_left" ng-bind-html="suit.symbol"></span><span class="suit middle_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">6</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        7: {
            name: 'seven',
            symbol: '7',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-seven {{suit.name}}">\n    <div class="corner top"><span class="number">7</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_left" ng-bind-html="suit.symbol"></span><span class="suit middle_top" ng-bind-html="suit.symbol"></span><span class="suit middle_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">7</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        8: {
            name: 'eight',
            symbol: '8',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-eight {{suit.name}}">\n    <div class="corner top"><span class="number">8</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_left" ng-bind-html="suit.symbol"></span><span class="suit middle_top" ng-bind-html="suit.symbol"></span><span class="suit middle_right" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">8</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        9: {
            name: 'nine',
            symbol: '9',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-nine {{suit.name}}">\n    <div class="corner top"><span class="number">9</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_top_left" ng-bind-html="suit.symbol"></span><span class="suit middle_center" ng-bind-html="suit.symbol"></span><span class="suit middle_top_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_left" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">9</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        T: {
            name: 'ten',
            symbol: '10',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-ten {{suit.name}}">\n    <div class="corner top"><span class="number">10</span><span ng-bind-html="suit.symbol"></span></div><span class="suit top_left" ng-bind-html="suit.symbol"></span><span class="suit top_right" ng-bind-html="suit.symbol"></span><span class="suit middle_top_left" ng-bind-html="suit.symbol"></span><span class="suit middle_top_center" ng-bind-html="suit.symbol"></span><span class="suit middle_top_right" ng-bind-html="suit.symbol"></span><span class="suit bottom_left" ng-bind-html="suit.symbol"></span><span class="suit bottom_right" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_center" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_left" ng-bind-html="suit.symbol"></span><span class="suit middle_bottom_right" ng-bind-html="suit.symbol"></span>\n    <div class="corner bottom"><span class="number">10</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        J: {
            name: 'jack',
            symbol: 'J',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-jack {{suit.name}}">\n    <div class="corner top"><span class="number">J</span><span ng-bind-html="suit.symbol"></span></div><span class="face middle_center"></span>\n    <div class="corner bottom"><span class="number">J</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        Q: {
            name: 'queen',
            symbol: 'Q',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-queen {{suit.name}}">\n    <div class="corner top"><span class="number">Q</span><span ng-bind-html="suit.symbol"></span></div><span class="face middle_center"></span>\n    <div class="corner bottom"><span class="number">Q</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        K: {
            name: 'king',
            symbol: 'K',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-king {{suit.name}}">\n    <div class="corner top"><span class="number">K</span><span ng-bind-html="suit.symbol"></span></div><span class="face middle_center"></span>\n    <div class="corner bottom"><span class="number">K</span><span ng-bind-html="suit.symbol"></span></div>\n</div>'
        },
        back: {
            name: 'card back',
            template: '<div style="z-index: {{zindex}};" class="playing-card card-back"><span class="face"></span></div>'
        }
    };
    var suits = {
        C: {
            name: 'club',
            symbol: '&#9827;',
            color: 'black'
        },
        D: {
            name: 'diamond',
            symbol: '&diams;',
            color: 'red'
        },
        S: {
            name: 'spade',
            symbol: '&spades;',
            color: 'black'
        },
        H: {
            name: 'heart',
            symbol: '&hearts;',
            color: 'red'
        }
    };

    angular.forEach(suits, function(suit) {
        $sce.trustAsHtml(suit.symbol);
    });

    return {
        scope: {},
        restrict: 'E',
        link: function(scope, element, attrs) {
            // console.log(scope);
            
            scope.zindex = scope.$parent.$index;
            scope.rank = ranks[attrs.rank] || ranks.back;
            scope.suit = suits[attrs.suit] || suits.heart;
            element.replaceWith($compile(scope.rank.template)(scope));
        }
    };
});


angular.module('ngCardDemo', ['ngPlayingCards']);

angular.module('ngCardDemo').filter('suitFilter', function() {
    return function (cards, suit) {
        var result = [];
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].suit === suit) {
                return true;
            }
        }
        return result;
    }
});

angular.module('ngCardDemo').controller('DemoCtrl', function($scope, $http) {
    var suits = [ 'S', 'H', 'D', 'C'];
    var ranks = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
    $scope.players = {};
    var deck = [];

    var directions = ['W', 'N', 'E', 'S'];


    reset();
    initGame();

    // deal and sort cards for given player
    function deal(player) {
        for (var i = 0; i < 13; i++) {
            var card = deck.shift() // popping from an array is more efficient than shifting
            player.push(card);
        }
        // console.log("player", player);

        // Assign a value to each suit. Add that value to the rank. Then sort from
        // those final values. It might be a slightly hacky solution but works for now.
        player.sort(function(a,b) {
            var suitValues = {
                'S': 400,
                'H': 300,
                'D': 200,
                'C': 100
            }
            var rankOrder1 = ranks.indexOf(a.rank) + suitValues[a.suit];
            var rankOrder2 = ranks.indexOf(b.rank) + suitValues[b.suit];
            // console.log("ra1: ", rankOrder1, "ra2 :", rankOrder1)
            return rankOrder2 - rankOrder1;

        });
    };


    $scope.reset = function() {
        reset();
        initGame();
    }


    function reset() {
        angular.forEach(suits, function(suit) {
            angular.forEach(ranks, function(rank) {
                deck.push(
                    {
                        id:   suit + rank,
                        suit: suit,
                        rank: rank
                    });
            });
        });
        $scope.players.E = [];
        $scope.players.N = [];
        $scope.players.S = [];
        $scope.players.W = [];
    }

    function initGame() {
        console.log("deal is called");
        console.log("$scope.players.E: ", $scope.players.E);
        console.log(deal);
        console.log(shuffleDeck);
        console.log(deck);

        shuffleDeck(deck);
        deal($scope.players.E);
        deal($scope.players.N);
        deal($scope.players.S);
        deal($scope.players.W);

        /*$http.get('deck.json').then(function(result) {
            console.log("got result: " + result.data.players[0].hand);
            displayDeck(result);
        });*/

    }


    // displays deck from deck json object
    function displayDeck(deck) {
        angular.forEach(deck.data.players, function(player) {
            var hand = [];
            var direction = directions[parseInt(player.direction)];
            console.log("direction: " + direction);
            var id = 1;
            angular.forEach(player.hand, function(card) {
                var suit = card.substr(1,2);
                var rank = card.substr(0,1);
                console.log("element id: " + (direction + id));
                hand.push(
                    {
                        id: direction + id,
                        suit: suit,
                        rank: rank
                    }
                );
                ++id;
            });

            hand.sort(function(a,b) {
                var rankOrder1 = ranks.indexOf(a.rank);
                var rankOrder2 = ranks.indexOf(b.rank);
                return rankOrder2 - rankOrder1;

            });
            $scope.players[direction] = hand;
        });
    };


    function shuffleDeck(deck) {
        // shuffle deck
        var len = deck.length;
        for(var i = len-1; i > 0; i--) {
            var r = Math.floor(Math.random()*(i+1)), temp;     // Random number
            temp = deck[i], deck[i] = deck[r], deck[r] = temp; // Swap
        }
    }


    $scope.cardSelect = function(card) {
        // console.log("directions: ", directions);
        for (var d = 0; d < directions.length; d++) {
            var hand = $scope.players[directions[d]]
            var index = -1;
            for (var i = 0; i < hand.length; i++ ) {
                var handCard = hand[i];
                if (handCard.suit === card.suit && handCard.rank === card.rank) {
                    index = i;
                    break;
                }
            }
            if (index > -1)  {
                hand.splice(index,1);
                break;
            }
        }
    };

    $scope.getSuit = function(suit, hand) {
        var arr = [];
        angular.forEach(hand, function(card) {
            if (card.suit.name === suit)
                arr.push(card)
        });
        return arr
    };

});


