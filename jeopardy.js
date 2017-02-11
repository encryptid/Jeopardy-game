/**
 * This project requires the use of AJAX
 * It consists of a Jeopardy-type game
 * 1. When the page loads, a question
 *    should be displayed on screen
 * 
 * 2. Each question should contain the following:
 *      -the Category
 *      -the Point Value
 *      -the Text of the Question
 *      -a Text Box for typing the answer to the question
 *      -a button for submitting your answer
 * 
 * 3. There should be a method for tracking the score. When
 *    the user clicks the button, it should check if the
 *    answer is right. If it is, increase the score by
 *    the value of the question. If not, no points are
 *    awarded or lost.
 * 
 * 4. After a user guesses, load a new question.
 * 
 * What are the logical steps to completing this project?
 * 1. Create an html document to give structure to where the information will reside
 * 2. Make an AJAX request asking an API for information
 * 3. Take the information recieved and glean from it the salient details
 * 4. Feed these details to the DOM somehow
 */

window.addEventListener('load', function() {
    let winnings = 0;
    let answer = "";
    let value = 0;

    let button = document.querySelector('.getQ');
    let box = document.querySelector('input');
    jeopardy();

    function jeopardy() {
        let request = new XMLHttpRequest();
        request.open('GET', 'http://jservice.io/api/random');
        request.addEventListener('load', function () {
            console.log('question retrieved');
            let response = JSON.parse(request.responseText); // turning the JSON into a JS object
            for (let i = 0; i < response.length; i++) {     // look at the object
            let question = response[i];                 // "question" = response array
                console.log(question);
                displayContent(question);       //run displayContent
                answer = question.answer;
                value = question.value;
            }
            // above is simply retrieving information and sorting thru it. Below, we will
            // write functions to grab the information that we need!
            
        });
        request.send();
        console.log('content sent');
    };

    button.addEventListener('click', function() {
        // console.log(box.value);
        // check(question);
        if (answer === box.value) {
            console.log('CORRECT!');
            winnings = winnings + value;
            console.log('Current Winnings: $' + winnings);
        } else {
            console.log("Nope.");
        }
        box.value = "";
        jeopardy();
    });

    function displayContent(newQuestion) {
        let cat = document.querySelector('.category');
        cat.textContent = newQuestion.category.title;
        let money = document.querySelector('.value');
        money.textContent = "$" + newQuestion.value;
        let info = document.querySelector('.question');
        info.textContent = newQuestion.question;
        let val = document.querySelector('.current');
        val.textContent = 'Current earnings: ' + winnings;
    // Add to DOM
        let parent = document.querySelector('.content');
        parent.appendChild(val);
        parent.appendChild(cat);
        parent.appendChild(money);
        parent.appendChild(info);
    };
});