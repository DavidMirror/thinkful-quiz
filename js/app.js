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
     explanation: 'These roots are derived from the Latin mittō/mittere/missum, which meant "I send, cause to go, let go, release, discharge"'
    },
     {greek: true,
     root: "aesthet-",
     examples: "aesthetics, anaesthetic",
     explanation: 'This root comes from the Greek αἰσθητικός (aisthētikos) meaning "of sense perception" from the Greek αἰσθάνεσθαι (aisthanesthai) "to perceive"'
    },
     {greek: true,
     root: "typ-",
     examples: "archetype, phenotype, prototype, type, typewriter, typical, typify, typography, typology",
     explanation: 'This root comes from the Greek τύπος which can mean a pressing impression, figure, or type'
    },
     {greek: true,
     root: "con-",
     examples: "conic, conical, conoid",
     explanation: "This root comes from the Greek κῶνος (kōnos), not to be confused with the Latin root con- which forms words such as connect and contain"
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
  var questionList = RandomSix(allQuestions);
  var $quiz = $('.quiz');
  var answered = false;
  var darkblue      = "#20273E";
  var litebluegrey  = "#6F838A";
  var darkbluegrey  = "#373B3E";
  var white         = "#E9F1F4";
  var grey          = "#5A5850";
  var red           = "#65242D";
  var green         = "#246531";
  
  function RandomSix(o) {
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
      $('.questionNo').text("Q#"+(page +1 ));
    }
    else {
      $('.questionNo').text('Q #');
    }
    $('.actualScore').text(score+'/'+questionList.length);
  };
  
  var showQuiz = function () {
    var currentPage = questionList[page];
    //hide all children of quizbox
    $('.startpage').hide();
    $('.endpage').hide();
    //show quiz
    $quiz.show();
    //add values from current questionList[page] to different page elements
    $('.root').text(currentPage.root);
    $('.example').text("e.g. " + currentPage.examples);
    $('.answer').text("Is this root Greek or Latin?");
    $('.nextArrow').find('i').removeClass('fa-undo').addClass('fa-arrow-right');

  };
  
  var showEnd = function () {
    //hide all children of quizbox
    $('.startpage').hide();
    $('.endpage').show();
    //show quiz
    $quiz.hide();
    $('.nextArrow').find('i').removeClass('fa-arrow-right').addClass('fa-undo');
  };
  
  var nextPage = function () {
    //moving through the questions
    if (page < questionList.length - 1) {
      page++;
      //show question 
      showQuiz();
    }
    //last question, need to draw endpage instead of quiz
    else if (page === questionList.length - 1) {
      page++;
      //show end page
      showEnd();
    }
    //at endpage, neet to reset to first question
    else {
      page = -1;
      newQuiz();
      //show first question
      showQuiz();
    }
    answered = false;
    showScore();
    $(".quizbox").css('background-color', grey);
    $("button").css({"border": "none",
                     "background-color":white});      
    $('.nextArrow').removeClass('clickme');
  };
  
  var newQuiz = function () {
    //randomize a new list and add elements to questionList
    questionList = RandomSix(allQuestions);
    //reset score to 0
    score = 0;
    showScore();
    //go to first question
    nextPage();
  };
  
  var trueFalse = function(truthValue, element) {
    if (!answered) {
      var currentQuestion = questionList[page];
      if (truthValue) {
        $(".quizbox").css('background-color', green);
        score++;
        showScore();
      }
      else {
        $(".quizbox").css('background-color', red);
      }
      $('.answer').text(currentQuestion.explanation);
      $('.nextArrow').addClass('clickme');
      $('button').css("background-color",grey);
      element.css({"border": ".2em solid #373B3E",
                   "background-color":white});
      
      answered = true;
    }
  };
  
  /********* start the quiz ***********/
  //questionList = RandomSix(allQuestions);
 
  $(".nextArrow").click(function () {
    if (answered || page === -1 || page ===6) {
      nextPage();
    }
  }); 
  
  $("#Greek").click(function () {
    trueFalse(questionList[page].greek, $(this));
  });
  
  $("#Latin").click(function () {
    trueFalse(!questionList[page].greek, $(this));
  });
});