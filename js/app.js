// $(function (){
  var $questionBox = $('#question')
  var $answerBox = $('.answers')
  var $box1 = $('#box1')
  var $box2 = $('#box2')
  var $box3 = $('#box3')
  var $score = $('.score')
  var $homeScore = $('#homeScore')
  var $visitorsScore = $('#visitorsScore')
  var $timer = $('#timer')
  var answerSet = [$box1,$box2,$box3]
  var $answerOptions = $(".answerOption")
  var turnCount = 0
  var newArray = []
  var hS = 0
  var aS = 0
  var currentPlayer
  var player1 = 'Home'
  var player2 = 'Visitors'
  var $ball = $('#ball')
  var $netSpots = $('.net')

  function playerTurn() {
    if(turnCount % 2 === 0) {
      currentPlayer = player2
    } else {
      currentPlayer = player1
    }
  }

  var game = {
    askQuestion: function () {
      //generates random question
      var numberGen = Math.floor(Math.random() * game.questions.length)
      var randomQ = game.questions[numberGen]
      $questionBox.text(randomQ.body)

      //removes the question so no questions repeat
      game.questions.splice(numberGen,1)

      //pushes random answer to new array to determine if the player's answer was correct
      newArray.push(randomQ.answer)

      //generates answers to that random question
      randomQ.incorrectAnswers.push(randomQ.answer)
      var answerList = randomQ.incorrectAnswers
      var indexGen = Math.floor(Math.random() * answerSet.length)
      for(i = 0; i < answerSet.length; i += 1) {
        answerSet[i].text(answerList[i])
      }
      turnCount += 1
    },
    timer: $timer,
    timeLeft: 10,
    //counts down timer by 1 second
    decrementTimer: function () {
      if(game.timeLeft > 0) {
        game.timeLeft -= 1
        game.timer.text(game.timeLeft)
       } else {
        return;
       }
    },
    resetTimer: function() {
      game.timer.text(10)
      game.timeLeft = 10
    },
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
    startGame: function() {
        $questionBox.on('click', function () {
          //if it is the start of the game this function will run once
          if (turnCount === 0) {

            //starts timer at beginning of the game
            var interval = window.setInterval(game.decrementTimer, 1000)

            //calls function to generate random question and answers
            game.askQuestion()
        }
      })
    },
    //randomly asks questions
    gameQuestions: function() {
      $answerOptions.on('click', function() {
        //determines which player is up
        playerTurn()
        //stores the user's click as an answer
        var userAnswer = $(this).text()
        //runs if it isn't the start of the game
        if (turnCount > 0) {
          //displays random question
          game.askQuestion()
          //resets timer
          game.resetTimer()
          //runs if the user selects the right answer
          if (userAnswer === newArray[newArray.length-2]) {
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
                console.log('incorrect')
            } else if (currentPlayer === player2) {
                game.missVisitors()
                console.log('incorrect')
            }
          }
          game.declareWinner()
        }
      })
    },
    declareWinner: function() {
      if ($homeScore.text() === '3' || $visitorsScore.text() === '3') {
        console.log('winner')
        window.alert('Congrats ' + currentPlayer + ' you are the winner')
      } else {
        return
      }
    },
    ballHome: function() {
      $ball.animate({
        'margin': '-250px 0 0 650px',
        'opacity': '.5'
      }).fadeOut(500)
      $ball.animate({
        'margin': '0 0 300px 1100px',
        'opacity':1
      }).fadeIn(100)
    },
    ballVisitors: function() {
      $ball.animate({
        'margin': '-250px 0 0 650px',
        'opacity': '.5'
      }).fadeOut(500)
      $ball.animate({
        'margin': '0 0 300px 200px',
        'opacity':1
      }).fadeIn(100)
    },
    missHome: function() {
      $ball.animate({
        'margin': '-400px 0 0 1100px',
        'opacity': '.5'
      }).fadeOut(500)
      $ball.animate({
        'margin': '0 0 300px 1100px',
        'opacity':1
      }).fadeIn(100)
    },
    missVisitors: function () {
      $ball.animate({
        'margin': '-300px 0 0 200px',
        'opacity': '.5'
      }).fadeOut(500)
      $ball.animate({
        'margin': '0 0 300px 200px',
        'opacity':1
      }).fadeIn(100)
    }

    // newGame: function() {
    //   $new.on('click', function() {
    //     $homeScore.text('0')
    //     $visitorsScore.text('0')
    //     turnCount = 0
    //     for(i = 0; i < oldArray.length; i += 1) {
    //       game.questions.push(oldArray[i])
    //     }
    //     console.log(oldArray)
    //     console.log(turnCount)
    //     console.log(game.questions)
    //   })
    // }
  }
  game.startGame()
  game.gameQuestions()


// })
