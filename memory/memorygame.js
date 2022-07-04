var app = angular.module('my-app', []);

function Card(num) {
  this.url = 'images/Avengers-' + num + '.jpeg';
  this.open = false;
  this.matched = false;
}

app.controller('MyController', function ($scope, $timeout) {
  $scope.isGameStarted = false;
  $scope.isFound = false;
  $scope.isGameWin = false

  $scope.state = "first";
  $scope.firstCard;
  $scope.secondCard;
  $scope.availableCards = [new Card('01'), new Card('02'), new Card('03'), new Card('04'), new Card('05'), new Card('06'), new Card('07'), new Card('08')]
  $scope.foundedCards = [
  ];

  $scope.count = 0;
  $scope.cards = [
    [
      new Card('01'),
      new Card('02'),
      new Card('03'),
      new Card('04')
    ],
    [
      new Card('01'),
      new Card('02'),
      new Card('03'),
      new Card('04')
    ],
    [
      new Card('05'),
      new Card('06'),
      new Card('07'),
      new Card('08')
    ]
    ,
    [
      new Card('05'),
      new Card('06'),
      new Card('07'),
      new Card('08')
    ]

  ];

//card click 
  $scope.cardClick = function (card) {
    if ($scope.state === "first") {
      card.open = true;
      $scope.firstCard = card;
      $scope.state = "second";
    }
    else if ($scope.state === "second") {
      card.open = true;
      $scope.secondCard = card;

      if ($scope.firstCard.url === $scope.secondCard.url) {
        $scope.foundedCards.push(card);
        $scope.isFound = true;
        $scope.state = "first";
        $scope.matched = true;
        $scope.firstCard.matched = true;
        if ($scope.foundedCards.length == 8) {
          $scope.isGameWin=true;
          alert("You won this round. Now you will be redirected to the Start Game page!");    
          $scope.startGame();

        }

      }
      if ($scope.firstCard.url !== $scope.secondCard.url) {
        $timeout(function () {
          $scope.firstCard.open = false;
          $scope.secondCard.open = false;
        }, 500);

        $scope.state = "first";

      }
    }
  };
  $scope.startGame = function () {
    $scope.isGameStarted = !$scope.isGameStarted;
    $scope.shuffleCards($scope.cards);
    $scope.isGameWin=false;

  }

  $scope.shuffleCards = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    array.forEach(element => {
      element.forEach(z => {
        z.open = false;
        $scope.foundedCards.splice(0,$scope.foundedCards.length);
        $scope.isFound = false;
      })
    });

  }

  $scope.exitGame = function () {
    $scope.isGameWin=false
    $scope.shuffleCards($scope.cards);
    $scope.isGameStarted = !$scope.isGameStarted;

  }
}

);
