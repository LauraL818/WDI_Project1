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
var player2 = 'Visitor'
var $ball = $('#ball')
var $winner = $('#winner')
var $new = $('#new')

var game = {
  //question set
  questions: [{
    body: 'Which team has won the most World Series?',
    answer:'New York Yankees',
    incorrectAnswers: [
    'Boston Red Sox',
    'Chicago Cubs'
      ]
    },
  {
    body: 'Which pitcher has the most wins?',
    answer: 'Cy Young',
    incorrectAnswers: [
      'Nolan Ryan',
      'Randy Johnson'
      ]
  },
  {
    body: 'Who won Super Bowl XL?',
    answer: 'Pittsburgh Steelers',
    incorrectAnswers: [
      'New England Patriots',
      'New York Giants'
      ]
  },
  {
    body: 'Which coach has the most all-time NCAA Basketball wins?',
    answer: 'Mike Krzyzewski',
    incorrectAnswers: [
      'Jim Boeheim',
      'Bob Knight'
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
      'Carolina Panthers'
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
    body: 'Who won the NBA regular season MVP last year?',
    answer: 'Steph Curry',
    incorrectAnswers: [
      'Lebron James',
      'James Harden'
      ]
  },
  {
    body: 'Who won the first MLS Cup?',
    answer: 'DC United',
    incorrectAnswers: [
      'LA Galaxy',
      'Colorado Rapids'
      ]
  },
  {
    body: 'Who holds the record for most home runs in one season?',
    answer: 'Barry Bonds',
    incorrectAnswers: [
      'Babe Ruth',
      'Mark McGwire'
      ]
  },
  {
    body: 'Who won the Stanley Cup in 2001?',
    answer: 'Colorado Avalanche',
    incorrectAnswers: [
      'Chicago Blackhawks',
      'Detroit Red Wings'
      ]
  },
  {
    body: 'Which team has the most consecutive wins?',
    answer: 'LA Lakers',
    incorrectAnswers: [
      'Golden State Warriors',
      'Chicago Bulls'
      ]
  },
  {
    body: 'When was the first Super Bowl?',
    answer: '1967',
    incorrectAnswers: [
      '1954',
      '1961'
      ]
  },
  {
    body: 'Who is the number one female tennis player in the world?',
    answer: 'Serena Williams',
    incorrectAnswers: [
      'Maria Sharapova',
      'Venus Williams'
      ]
  },
  {
    body: 'Who is the commissioner of the NFL?',
    answer: 'Roger Goodell',
    incorrectAnswers: [
      'Jerry Jones',
      'John Elway'
      ]
  },
  {
    body: 'Who won the Heisman Trophy in 2015?',
    answer: 'Derrick Henry',
    incorrectAnswers: [
      'Christian McCaffery',
      'Jameis Winston'
      ]
  },
  {
    body: 'Where is Rodger Federer from?',
    answer: 'Switzerland',
    incorrectAnswers: [
      'Spain',
      'Portugal'
      ]
  },
  {
    body: 'Who is currently the fastest runner in the world?',
    answer: 'Usain Bolt',
    incorrectAnswers: [
      'Tyson Gay',
      'Michael Phelps'
      ]
  },
  {
    body: 'Who is the oldest starting QB in the NFL?',
    answer: 'Peyton Manning',
    incorrectAnswers: [
      'Tom Brady',
      'Russell Wilson'
      ]
  }],
  askQuestion: function () {
    //generates random question, removes it from the mix, and pushes answer set to newArray
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
  //sets and counts down timer by 1 second
  timer: $('#timer'),
  timeLeft: 15,
  decrementTimer: function () {
    if(game.timeLeft > 0 && $homeScore.text() !== '3' && $visitorsScore.text() !== '3' && turnCount < 20) {
      game.timeLeft -= 1
      game.timer.text(game.timeLeft)
    } else {
      game.timer.text('0');
    }
  },
  resetTimer: function() {
    game.timer.text(15)
    game.timeLeft = 15
  },
  //determines which player is up
  playerTurn: function () {
    if(turnCount % 2 === 0 && turnCount !== 0) {
      currentPlayer = player1
      $('#player').text('Visitor Shoots')
    } else if (turnCount % 2 !== 0 && turnCount !== 0) {
      currentPlayer = player2
      $('#player').text('Home Shoots')
    }
  },
  //starts game when question box is clicked
  startGame: function() {
    $winner.hide()
    $new.hide()
    $questionBox.on('click', function () {
      $('#begin').trigger('play').animate({volume:0}, 2500)
      if (turnCount === 0) {
        setInterval(game.decrementTimer, 1000)
        game.askQuestion()
        game.playerTurn()
      }
      turnCount += 1
    })
  },
  //randomly asks questions
  gameQuestions: function() {
    $('.answerOption').on('click', function() {
      //will randomly display questions as long as the a player has scored 3 times and won
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
  //delares winner, resets timer and scores, and allows players to play another game
  declareWinner: function() {
    if ($homeScore.text() === '3' || $visitorsScore.text() === '3') {
      $('#gol').trigger('pause')
      $('#champions').trigger('play').animate({volume:0}, 8000)
      $questionBox.text('Congratulations ' + currentPlayer + ' you won the match!')
      $winner.show(2500)
      $new.show(3500)
      game.clearAnswers()
      $('#player').text('')
    } else if (turnCount === 20) {
        $questionBox.text('It\'s a draw')
        $new.show(1500)
        game.clearAnswers()
        $('#player').text('')
    }
  },
  //animates ball into goal with correct answer
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
  //animates ball away from goal with incorrect answer
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
  },
  clearAnswers: function () {
    $box1.text('')
    $box2.text('')
    $box3.text('')
  }
}

//call function to run game
game.startGame()
game.gameQuestions()
//restarts game
$new.on('click', function() {window.location.reload()})
