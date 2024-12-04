// State Management
let currentState = {
    currentQuestion: 0,
    answers: {},
    timer: null,
    timeLeft: 30,
    playerName: '',
    playerNIM: ''
};

// Timer Management
function startTimer() {
    clearInterval(currentState.timer);
    currentState.timer = setInterval(() => {
        currentState.timeLeft--;
        document.getElementById('timer').textContent = currentState.timeLeft;

        if (currentState.timeLeft <= 0) {
            clearInterval(currentState.timer);
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(currentState.timer);
    currentState.timeLeft = 30;
    document.getElementById('timer').textContent = currentState.timeLeft;
}

// Question Display and Navigation
function displayQuestion() {
    const question = quizData[currentState.currentQuestion];
    const container = document.getElementById('questionContainer');
    
    let html = `<h3>Question ${currentState.currentQuestion + 1}</h3>
                <p>${question.question}</p>`;

    if (question.type === 'multiple') {
        html += '<div class="options">';
        question.options.forEach(option => {
            const checked = currentState.answers[currentState.currentQuestion] === option ? 'checked' : '';
            html += `
                <label>
                    <input type="radio" name="answer" value="${option}" ${checked}>
                    ${option}
                </label>`;
        });
        html += '</div>';
    } else {
        html += `<input type="text" id="textAnswer" value="${currentState.answers[currentState.currentQuestion] || ''}">`;
    }

    container.innerHTML = html;

    if (question.type === 'multiple') {
        document.querySelectorAll('input[name="answer"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                currentState.answers[currentState.currentQuestion] = e.target.value;
            });
        });
    } else {
        document.getElementById('textAnswer').addEventListener('input', (e) => {
            currentState.answers[currentState.currentQuestion] = e.target.value;
        });
    }

    resetTimer();
    startTimer();
}

// Submit Quiz
function submitQuiz() {
    clearInterval(currentState.timer);
    const { totalScore, breakdown } = calculateScore();

    // Send data to the server
    const formData = new FormData();
    formData.append('name', currentState.playerName);
    formData.append('nim', currentState.playerNIM);
    Object.keys(currentState.answers).forEach(key => {
        formData.append(`question${key}`, currentState.answers[key]);
    });

    fetch('submit.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          console.log(data); // Display the response data
      });
}
