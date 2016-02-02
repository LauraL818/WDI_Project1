$(function (){
  var $questionBox = $('#question')
  var $answerBox = $('.answers')
  var $box1 = $('#box1')
  var $box2 = $('#box2')
  var $box3 = $('#box3')
  var $score = $('.score')
  var answerSet = [$box1,$box2,$box3]

  var game = {
    currentPlayer: null,
    player1: {},
    player2: {},
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
    }]
    
  }

//Start game and display first question
  if ($questionBox.text('Start Game')) {
    $questionBox.on('click', function () {
      //generates random question
      for(i = 0; i < game.questions.length; i += 1) {
      var numberGen = Math.floor(Math.random() * game.questions.length)
      var randomQ = game.questions[numberGen]
      $questionBox.text(randomQ.body)
      }
      game.questions.splice(randomQ,1)
      console.log(game.questions)
      console.log(randomQ)

      //generates answers to that random question
      randomQ.incorrectAnswers.push(randomQ.answer)
      var answerList = randomQ.incorrectAnswers
      for(i = 0; i < answerSet.length; i += 1) {
        answerSet[i].text(answerList[i])
      }
    })
  }




})
