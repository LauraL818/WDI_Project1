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

  function askQuestion () {

    //generates random question
    var numberGen = Math.floor(Math.random() * game.questions.length)
    var randomQ = game.questions[numberGen]
    $questionBox.text(randomQ.body)
    console.log("before splicing", game.questions.length)
    game.questions.splice(numberGen,1)
    console.log("after splice", game.questions.length)

    //generates answers to that random question
    randomQ.incorrectAnswers.push(randomQ.answer)
    var answerList = randomQ.incorrectAnswers
    for(i = 0; i < answerSet.length; i += 1) {
      answerSet[i].text(answerList[i])
    }
    turnCount += 1
  }

  var game = {
    currentPlayer: null,
    player1: {},
    player2: {},
    timer: $timer,
    timeLeft: 10,
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
            window.setInterval(game.decrementTimer, 1000)

            //calls function to generate random question and answers
            askQuestion()
        }
      })
    },
    gameQuestions: function() {
      $answerOptions.on('click', function() {
        if (turnCount > 0) {
          console.log('clicked')
          askQuestion()
          game.resetTimer()
        }
      })
    }
  }
  game.startGame()
  game.gameQuestions()

//Start game and display first question
  // if ($questionBox.text('Start Game')) {
  //   $questionBox.on('click', function () {
  //     //generates random question
  //     window.setInterval(game.decrementTimer, 1000)
  //     for(i = 0; i < game.questions.length; i += 1) {
  //     var numberGen = Math.floor(Math.random() * game.questions.length)
  //     var randomQ = game.questions[numberGen]
  //     $questionBox.text(randomQ.body)
  //     game.questions.splice(randomQ,1)
  //     // console.log(randomQ)
  //     // console.log(game.questions)
  //
  //     }
  //     //generates answers to that random question
  //     randomQ.incorrectAnswers.push(randomQ.answer)
  //     var answerList = randomQ.incorrectAnswers
  //     for(i = 0; i < answerSet.length; i += 1) {
  //       answerSet[i].text(answerList[i])
  //     }
  //   })
  // }

// })
