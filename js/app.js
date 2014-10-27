$(document).ready(function () {
  var allQuestions = [
    {greek: false,
     root: "ben-",
     examples: "beneficence, benefit, benevolent, benign, benignant, benignity",
     explanation: "An adverb from the Old Latin (Before 75 BCE) duened, which came from duenos, which the word bonus comes from. It means well"
    },
    {greek: false,
     root: "gran-",
     examples: "granary, granite, granola, granule",
     explanation: "This Latin root, meaning grain, comes from a Proto-Indo-European which the word corn also derives from"
    },
     {greek: false,
     root: "greg-",
     examples: "aggregate, congregation, egregious, gregarian, gregarious, segregation",
     explanation: "This Latin root, from the Latin grex/gregis which could mean a flock or heard of animals or a company or troop of people"
    },
     {greek: false,
     root: "contra-",
     examples: "contraband, contraception, contradict, contraindicate, contrast, contravene",
     explanation: "This Latin root means across from, opposite, or against"
    },
     {greek: false,
     root: "infra-",
     examples: "infrastructure, infrared",
     explanation: "This Latin root, meaning below, comes from the same Proto-Indo-European word which under comes from"
    },
     {greek: false,
     root: "mit-, miss-",
     examples: "commit, emit, intermittent, missile, mission, missionary, omit, permit, remit, submit, transmit",
     explanation: 'These roots are derived from the Latin mittō/mittere/missum, which could mean, among other things "I send, cause to go, let go, release, discharge"'
    },
     {greek: true,
     root: "aesthet-",
     examples: "aesthetics, anaesthetic",
     explanation: 'This root comes from the Greek αἰσθητικός (aisthētikos) meaning "of sense perception" from the Greek αἰσθάνεσθαι (aisthanesthai) "to perceive"'
    },
     {greek: true,
     root: "typ-",
     examples: "archetype, phenotype, prototype, type, typewriter, typical, typify, typography, typology",
     explanation: ""
    },
     {greek: true,
     root: "con-",
     examples: "conic, conical, conoid",
     explanation: "This root comes from the Greek κῶνος (kōnos), not to be confused with the Latin root con- which forms words such as connect, contain, and connote"
    },
     {greek: true,
     root: "chron-",
     examples: "chronism, chronic, chronicle, chronology, chronometer, synchronize",
     explanation: "This root comes from the Greek χρόνος (khrónos), meaning time, or in regards to grammar, tense"
    },
     {greek: true,
     root: "erg-",
     examples: " allergy, energy, erg, ergometer, ergonomics, ergophobia, liturgy, metallurgy, organ, surgeon, synergy",
     explanation: "This root, meaning work as used in English, comes from the Greek έργον (ergon)"
    },
     {greek: true,
     root: "hyper-",
     examples: "hyperbole, hypervisor",
     explanation: "This root comes from the Greek ὑπέρ (huper) meaning above. The above example of hypervisor mixes this root and the Latin root visor"
    }
  ];
  var score = 0;
  var page = -1;
  var questionList = [];
  var $quiz = $('.quiz');
  var answered = false;
  
  var updateScore = function () {
    $('.score').find('h3').text(score + "/6");
  };
  
  
  var updateQuestion = function () {
    if (page < questionList.length+1) {
      $('.questionNo').text("Q#" + (page + 1));
    }
    else {
      $('.questionNo').text("Q #");
    }
  };
  

  
  var RandomSix = function (o) {
     var p = [];
    //not my function, but wanted the random functionality
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);     
    //I added this bit, because I only want six questions per quiz 
    for(i = 0; i < 6; i++) {
      p[i] = o[i];
    } 
    return p;
  };
  
  var showScore = function () {
    if (page < questionList.length) {
      $('.questionNo').text("Q#"+(page));
    }
    else {
      $('.questionNo').text('Q #');
    }
    $('.score').find('h3').text(score+'/'+questionList.length);
  };
  
  var showQuiz = function () {
    var currentPage = questionList[page-1];
    //hide all children of quizbox
    $('.startpage').hide();
    $('.endpage').hide();
    //show quiz
    $quiz.show();
    //add values from current questionList[page] to different page elements
    $('.root').text(currentPage.root);
    $('.example').text("e.g. " + currentPage.examples);
    $('.answer').text("Is this root Greek or Latin?");
  };
  
  var showEnd = function () {
    //hide all children of quizbox
    $('.startpage').hide();
    $('.endpage').show();
    //show quiz
    $quiz.hide();
  };
  
  var nextPage = function () {
    //moving through the questions
    if (page < questionList.length) {
      page++;
      //show question 
      showQuiz();
      
      //maybe switch these two? so that page++ comes second? check logic of showQuiz and showEnd to make sure 
      //that both of these functions are working in the same page
    }
    //last question, need to draw endpage instead of quiz
    else if (page === questionList.length ) {
      page++;
      //show end page
      showEnd();
    }
    //at endpage, neet to reset to first question
    else {
      page = 0;
      newQuiz();
      //show first question
      showQuiz();
    }
    answered = false;
    showScore();
  };
  
  var newQuiz = function () {
    //randomize a new list and add elements to questionList
    questionList = RandomSix(allQuestions);
    //reset score to 0
    score = 0;
    updateScore();
    //go to first question
    nextPage();
  };
  
  var trueFalse = function(truthValue) {
    if (!answered) {
      var currentQuestion = questionList[page];
      if (truthValue) {
        $(this).addClass('.correct');
        score++;
        updateScore();
      }
      else {
        $(this).addClass('.incorrect');
      }
      $('.answer').text(currentQuestion.explanation);
      answered = true;
    }
  };
  
  /********* start the quiz ***********/
  questionList = RandomSix(allQuestions);
 
  $(".nextArrow").click(function () {
    //if (answered || page === -1 || page ===6) {
      nextPage();
    //}
  }); 
  
  $("#Greek").click(function () {
    alert("click");
    trueFalse(currentQuestion.greek);
  });
  
  $("#Latin").click(function () {
    alert("click");
    trueFalse(!currentQuestion.greek);
  });
});