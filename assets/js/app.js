$(document).ready(function () {

    //the game start when pressing start btn
    $('.start-btn').click(function () {
  
        //hide start button and clear the div
        $('.start-btn').hide();
        $('.quiz-section').empty();
  
        // Generate quiz page with jquery
        // quiz items
        var quiz = {
            set1: {
                question: "What was The Notorious B.I.G. real name?",
                answer: ['Michael Carter', 'Christopher Wallace', 'Dwayne Carter Jr', 'Robert Williams', "ans1"],
                correct: "Christopher Wallace"
            },
            set2: {
                question: "What was his nickname?",
                answer: ['Biggie', 'Smalls', 'BIG', 'NOTORIOUS', "ans2"],
                correct: "Biggie"
            },
            set3: {
                question: "What year did he die",
                answer: ['1995', '1996', '1997', '1998', "ans3"],
                correct: "1997"
            },
            set4: {
                question: "What was the title of his first studio album?",
                answer: ['Life After Death','Ready to Die','Born Again','The Final Chapter', "ans4"],
                correct: "Ready to Die"
            },
            set5: {
                question: "What record label was he signed to?",
                answer: ['Death Row','Tommy Boy','Bad Boy','RCA', "ans5"],
                correct: "Bad Boy"
            },
            set6: {
                question: "What rapper did he has a known rival with?",
                answer: ['2Pac', 'Dr Dre', 'Suge Knight', 'Puff Daddy', "ans6"],
                correct: "2Pac"
            },
            set7: {
                question: "What hip hop group was The Notorious BIG associate with before becoming a solo artist?",
                answer: ['The Beastie Boys', 'MOBB DEEP', 'Junior MAFIA', 'The Outlawz', "ans7"],
                correct: "PSP"
            }
  
        };
  
        //timer text
        $('.quiz-section').append('<div class="timer"><h2>You have <span class="time-Text">60</span> second to answer!</h2></div>');
  
        
        //Timer
        var isTimerOn = false;
        var timeCountDown = 60; // 1mins
        if (isTimerOn == false) {
            var timer = setInterval(function () {
                timeCountDown--;
                $('.time-Text').text(timeCountDown);
                if (timeCountDown <= 0) {
                    getResult(); //time out, get result
                }
            }, 1000);
            isTimerOn = true;
        }
  
  
        //quiz layout
        // ansArray to take argument from sub-sets            
        var ansArray = [];
        for (var set in quiz) {
            //Correct Ans array for comparison
            ansArray.push(quiz[set].correct);
            //Display question
            $(".quiz-section").append('<br><p>' + quiz[set].question + '</p><br>');
            for (var i = 0; i < 4; i++) { // first 4 (0,1,2,3) arguments are answers
                var addInput = $("<input>");
                addInput.addClass("radioChoice");
                addInput.attr("type", 'radio');
                addInput.attr("name", quiz[set].answer[4]);
                addInput.attr("value", quiz[set].answer[i]);
                addInput.text(quiz[set].answer[i]);
                //Display choices
                $(".quiz-section").append(addInput);
                $(".quiz-section").append('<p style="display:inline">' + quiz[set].answer[i] + '</p><br>');
            }
        };
  
        //generate submit button
        var addSubmitBtn = $("<button>");
        addSubmitBtn.addClass("button btn-success btn-lg submit-btn");
        addSubmitBtn.text('Submit');
        $(".quiz-section").append('<br>');
        $(".quiz-section").append(addSubmitBtn);
  
        //generate an array to store user's choice
        var userArray = [];
  
        //submit button
        $('.submit-btn').click(function () {
            getResult();
        });
  
        //score calculation
        var correctCount;
        var skippedCount;
        var wrongCount;
        //time up and submit will trigger this function
        function getResult() {
            correctCount = 0;
            var getCheckedInput = $('Input:checked');
            $('Input:checked').each(function () {
                userArray.push($(this).val());
            });
            // Compare userArray and ansArray using indexOf
            for (var i = 0; i < userArray.length; i++) {
                if (ansArray.indexOf(userArray[i]) > -1) {
                    correctCount++;
                }
            }
            skippedCount = ansArray.length - userArray.length;
            wrongCount = ansArray.length - correctCount - skippedCount;
  
            // result page looks like
            $('.quiz-section').empty();
            $('.quiz-section').append("<p> Correct:" + correctCount + "</p>");
            $('.quiz-section').append("<p> Wrong:" + wrongCount + "</p>");
            $('.quiz-section').append("<p> Skipped:" + skippedCount + "</p>");
            $('.quiz-section').append("<p> Try Again!</p>");
            $('.start-btn').show();
            isTimerOn == false;
            clearInterval(timer);
        }
    });
  })