$(function (){
  var $questionBox = $('#question')
  var $answerBox = $('.answers')
  var $box1 = $('#box1')
  var $score = $('.score')

  var game = {
    currentPlayer: null,
    player1: {},
    player2: {},
    questions: [{
      body: 'What is your favorite sport?',
      answers: [
      'football',
      'baseball',
      'soccer'
        ]
      },
    {
      body: 'Who is your favorite athlete?',
      answers: [
        'dave',
        'alex',
        'frank'
        ]
    },
    {
      body: 'Who is your favorite athlete?',
      answers: [
        'joe',
        'bob',
        'todd'
        ]
    }
  ]
}

  $answerBox.on('click', function() {
     $questionBox.text(game.questions[1].answers[1])
   })

  //    arrQ: ['Favorite Sport?',
  //    'Favorite athlete',
  //    'sports team in denver',
  //    'sports team in LA',
  //    'team that just moved to LA',
  //    'colors of dodgers',
  //    'color of the rockies',
  //    'broncos qb',
  //    'best football player ever',
  //    'best baseball player ever'],
  //
  //    arrC: ['football',
  //    'todd helton',
  //    'rockies',
  //    'dodgers',
  //    'rams',
  //    'blue',
  //    'purple',
  //    'peyton manning',
  //    'john elway',
  //    'babe ruth'],
  //
  //    arrW: [['baseball','soccer'],
  //    ['Tony Romo','Mickey Mantle'],
  //    ['nuggets','avalanche'],
  //    ['padres','giants'],
  //    ['raiders','chargers'],
  //    ['green','yellow'],
  //    ['orange','blue'],
  //    ['von miller', 'DT'],
  //    ['walter payton','joe montana'],
  //    ['derek jeter','joe dimaggio'],
  //
  //    start: function() {
  //      $box1.text(game.arrC[1])
  //    }
  //  }
  //  game.start()
  //
  // $answerBox.on('click', function() {
  //    $questionBox.text(game.arrQ[1])
  //  })

})
