//global variables
var $questionBox = $('#question')
var $box1 = $('#box1')
var $box2 = $('#box2')
var $box3 = $('#box3')
var answerSet = [$box1,$box2,$box3]
var $homeScore = $('#homeScore')
var $visitorsScore = $('#visitorsScore')
var turnCount = 0
var newArray = []
var hS = 0
var aS = 0
var currentPlayer
var player1 = 'Home'
var player2 = 'Visitors'
var $ball = $('#ball')
var $winner = $('#winner')
var $new = $('#new')

var game = {
  questions: [{
    body: 'What is your favorite sport?',
    answer:'football',
    incorrectAnswers: [
    'baseball',
    'soccer'
      ]
    },
  {
    body: 'Who is your favorite athlete?',
    answer: 'alex',
    incorrectAnswers: [
      'dave',
      'frank'
      ]
  },
  {
    body: 'Who won the Super Bowl in 2008?',
    answer: 'patriots',
    incorrectAnswers: [
      'saints',
      'giants'
      ]
  },
  {
    body: 'Who won the World Series in 2005?',
    answer: 'red sox',
    incorrectAnswers: [
      'giants',
      'yankees'
      ]
  },
  {
    body: 'Who won the Stanley Cup in 2001?',
    answer: 'avalanche',
    incorrectAnswers: [
      'red wings',
      'bruins'
      ]
  },
  {
    body: 'Who won the world cup most recently?',
    answer: 'Germany',
    incorrectAnswers: [
      'USA',
      'Brazil'
      ]
  },
  {
    body: 'Who is the only NFL team to go undefeated?',
    answer: 'Miami Dolphins',
    incorrectAnswers: [
      'Denver Broncos',
      'San Diego Chargers'
      ]
  },
  {
    body: 'Who was the worst team in the MLB last year?',
    answer: 'Philadelphia Phillies',
    incorrectAnswers: [
      'Colorado Rockies',
      'San Diego Padres'
      ]
  },
  {
    body: 'Who is the best player in the NBA right now?',
    answer: 'Steph Curry',
    incorrectAnswers: [
      'Lebron James',
      'James Harden'
      ]
  },
  {
    body: 'Who is the oldest QB in the NFL?',
    answer: 'Peyton Manning',
    incorrectAnswers: [
      'Tom Brady',
      'Russell Wilson'
      ]
  }],
  askQuestion: function () {
    //generates random question, removes it from the mix, and pushes answer set to empty array
    var numberGen = Math.floor(Math.random() * game.questions.length)
    var randomQ = game.questions[numberGen]
    $questionBox.text(randomQ.body)
    game.questions.splice(numberGen,1)
    newArray.push(randomQ.answer)
    //generates and randomly displays answers
    var answerList = randomQ.incorrectAnswers
    var indexGen = Math.floor(Math.random() * answerSet.length)
    randomQ.incorrectAnswers.splice(indexGen,0,randomQ.answer)
    for(i = 0; i < answerSet.length; i += 1) {
      answerSet[i].text(answerList[i])
    }
    turnCount += 1
  },
  timer: $('#timer'),
  timeLeft: 10,
  //counts down timer by 1 second
  decrementTimer: function () {
    if(game.timeLeft > 0 && $homeScore.text() !== '3' && $visitorsScore.text() !== '3' && turnCount !== 10) {
      game.timeLeft -= 1
      game.timer.text(game.timeLeft)
    }  else {
      game.timer.text('0');
     }
  },
  resetTimer: function() {
    game.timer.text(10)
    game.timeLeft = 10
  },
  clearAnswers: function () {
    $box1.text('')
    $box2.text('')
    $box3.text('')
  },
  playerTurn: function () {
    if(turnCount % 2 === 0) {
      currentPlayer = player2
    } else {
      currentPlayer = player1
    }
  },
  //question set

  startGame: function() {
    $winner.hide()
    $new.hide()
    $questionBox.on('click', function () {
      $('#begin').trigger('play')
      if (turnCount === 0) {
        setInterval(game.decrementTimer, 1000)
        game.askQuestion()
      }
    })
  },
  //randomly asks questions
  gameQuestions: function() {
    $('.answerOption').on('click', function() {
      if($homeScore.text() !== '3' && $visitorsScore.text() !== '3') {
        game.playerTurn()
        //stores the user's click as an answer
        var userAnswer = $(this).text()
        if (turnCount > 0) {
          game.askQuestion()
          game.resetTimer()
          //runs if the user selects the right answer
          if (userAnswer === newArray[newArray.length-2]) {
            $('#gol').trigger('play')
            if(currentPlayer === player1) {
                game.ballHome()
                hS += 1
                $homeScore.text(hS)
            } else if (currentPlayer === player2){
              game.ballVisitors()
              aS += 1
              $visitorsScore.text(aS)
            }
          } else {
              // $('#boo').trigger('play')
              if (currentPlayer === player1){
                game.missHome()
            } else if (currentPlayer === player2) {
                game.missVisitors()
            }
          }
          game.declareWinner()
        }
      }
    })
  },
  declareWinner: function() {
    if ($homeScore.text() === '3' || $visitorsScore.text() === '3') {
      $('#champions').trigger('play')
      $questionBox.text('Congratulations ' + currentPlayer + ' you are the winner!!')
      $winner.show(2500)
      $new.show(3500)
      game.clearAnswers()
    } else if (turnCount === 10){
        $questionBox.text('It\'s a draw')
        $new.show(1500)
        game.clearAnswers()
    } else {
      return
    }
  },
  //animate ball into goal with correct answer
  ballHome: function() {
    $ball.animate({
      'margin': '-250px 0 0 600px',
      'opacity': '.5'
    }).fadeOut(500)
    $ball.animate({
      'margin': '0 0 300px 1100px',
      'opacity':1
    }).fadeIn(100)
    $('.hL').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn()
  },
  ballVisitors: function() {
    $ball.animate({
      'margin': '-250px 0 0 600px',
      'opacity': '.5'
    }).fadeOut(500)
    $ball.animate({
      'margin': '0 0 300px -100px',
      'opacity':1
    }).fadeIn(100)
      $('.vL').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn()
  },
  //animate ball away from goal with incorrect answer
  missHome: function() {
    $ball.animate({
      'margin': '-400px 0 0 1200px',
      'opacity': '.5'
    }).fadeOut(500)
    $ball.animate({
      'margin': '0 0 300px 1100px',
      'opacity':1
    }).fadeIn(100)
  },
  missVisitors: function () {
    $ball.animate({
      'margin': '-500px 0 0 -100px',
      'opacity': '.5'
    }).fadeOut(500)
    $ball.animate({
      'margin': '0 0 300px -100px',
      'opacity':1
    }).fadeIn(100)
  }
}

game.startGame()
game.gameQuestions()
//restart game
$new.on('click', function() {window.location.reload()})
