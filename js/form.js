function getFormAnswers() {
    var numOfQuestions = [].slice.call( theForm.querySelectorAll( 'ol.questions > li' ) ).length;
    var answers = [];
    for(var x=1; x<=numOfQuestions; x++) {
        answers.push($('#q' + x).val());
    }
    return answers;
}

function hideForm() {
    classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );
    $('section').css('animation','fadeOut 0.6s ease-out');
    $('section').css('display', 'none');
    $('body>.container').css('margin', '0 auto 36px auto');
    $('body>.container').css('padding', '0 0 28px 0');
}

var theForm = document.getElementById( 'theForm' );

new stepsForm( theForm, {
    onSubmit : function( form ) {
        var formAnswers = getFormAnswers();

        // Update state.
        History.Adapter.bind(window,'statechange',function(){
            var State = History.getState();
        });
        History.pushState(null, null, '?currentGPA=' + formAnswers[0] + '&credits=' + formAnswers[1] + '&goalGPA=' + formAnswers[2]);

        hideForm();

        passInput();
    }
});

function display(gradeObject) {

    if(gradeObject.isAchieveable()) {
        $('#result').html('GPA to achieve (to avg. ' + gradeObject.goalGPA + '): <strong id="target">' + gradeObject.getTargetGPA() + '</strong></br> Credits Remaining: <strong>' + gradeObject.getCreditsRemaining() + '</strong>');
    } else {
        $('#result').html('This goal is unachieveable.');
    }

    if(gradeObject.getTargetGPA() > 4 && gradeObject.getTargetGPA() <= 5) {
        $('#ap').css('display', 'block');
    } else if(gradeObject.getTargetGPA() > 5) {
        $('#unach').css('display', 'block');
    }

    graph.fill(gradeObject);

    $('.ct-chart').css('height', '70vh');
    $('#resultBox').css('height', 'auto');
    $('.hidden').css('display', 'block');
}