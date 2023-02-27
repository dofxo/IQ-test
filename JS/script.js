// variables
const body = document.body

let startBtn
let userName
let userAge

// event listener baraye load shodane DOM
window.addEventListener('DOMContentLoaded', testStartElement)




// functions :

// testStart Element
// tooye function ba sakhtan element haye HTML oonaro amade mikone baraye add shodan be Body 
function testStartElement() {

    // section testStartElement ro misaze va zir majmooe hash ro behesh ezafe mikone 
    const mainSection = document.createElement('section')
    mainSection.setAttribute('id', 'test-start')

    // h1
    const iqTestTitle = document.createElement('h1')
    iqTestTitle.setAttribute('id', 'test-title')
    iqTestTitle.textContent = 'IQ TEST'

    // name input
    const nameInput = document.createElement('input')
    nameInput.setAttribute('id', 'user-name')
    nameInput.placeholder = 'Enter your name : '

    // age input
    const ageInput = document.createElement('input')
    ageInput.setAttribute('type', 'number')
    ageInput.setAttribute('id', 'user-age')
    ageInput.placeholder = 'Enter your age : '

    // start button
    startBtn = document.createElement('button')
    startBtn.setAttribute('id', 'start')
    startBtn.textContent = 'START'


    // zir majmoome haye section testStartElement ro behesh ezafe mikone
    mainSection.appendChild(iqTestTitle)
    mainSection.appendChild(nameInput)
    mainSection.appendChild(ageInput)
    mainSection.appendChild(startBtn)

    // div aslio be body ezafe mikone
    body.appendChild(mainSection)


    // event listener baraye startBtn

    startBtn.addEventListener('click', () => {
        startTest(ageInput, nameInput, mainSection)
        questionCounter()
        timer()
    })


}

// start function
// bad az click shodan rooye dokme start, mohtavaye matni sen va esm karbar ra tooye moteqayer haye ageInputValue va nameInputValue zakhire mikone
// va badesh safhe soalat ro load mikone    

let ageInputValue
let nameInputValue

function startTest(ageInput, nameInput, mainSection) {

    // value input haro be moteqayer nesbat mide
    ageInputValue = ageInput.value
    nameInputValue = nameInput.value

    // display testStart element ro none mikone
    mainSection.style.display = 'none'

    // element maintest(soalat) ro jaygozin safhe login mikone
    mainTestElement()
    gameStatus()

}


// mainTestELement
// tooye function ba sakhtan element haye HTML oonaro amade mikone baraye add shodan be Body

let mainTestDiv, questionEl, answersEl, eachAnswer, questionCounterEl, timerEl

let currentTest = 1

function mainTestElement() {

    // main-test element
    mainTestDiv = document.createElement('section')
    mainTestDiv.setAttribute('id', 'main-test-box')


    // question element
    questionEl = document.createElement('img')
    questionEl.setAttribute('src', `../Images/1/test1.png`)


    // answers element
    answersEl = document.createElement('div')
    answersEl.setAttribute('id', 'answers')

    // each answer
    newSlide(questionEl, answersEl)


    // zir majmoome haye div mainTest ro behesh ezafe mikone

    mainTestDiv.appendChild(questionEl)
    mainTestDiv.appendChild(answersEl)


    // div aslio be body ezafe mikone
    body.appendChild(mainTestDiv)

}

//  newSlide function
// bad az click shodan bar roye har javab, soale badi be hamrahe javab hash load mishe
function newSlide(questionEl, answersEl) {

    if (currentTest <= 30) {

        // taqir dadane soal
        questionEl.setAttribute('src', `../Images/${currentTest}/test${currentTest}.png`)

        // taqir darane javab ha
        if (currentTest < 13) {
            for (let i = 1; i <= 6; i++) {
                let eachAnswer = document.createElement('img')
                eachAnswer.setAttribute('src', `/Images/${currentTest}/${currentTest}-${i}.png`)
                answersEl.appendChild(eachAnswer)

                //update
                updateQuestionAndAnswers(eachAnswer)
            }
        }
        else {
            for (let i = 1; i <= 8; i++) {
                let eachAnswer = document.createElement('img')
                eachAnswer.setAttribute('src', `/Images/${currentTest}/${currentTest}-${i}.png`)
                answersEl.appendChild(eachAnswer)

                //update
                updateQuestionAndAnswers(eachAnswer)

            }

        }

    }
    else {
        endGame()
    }


}

// updateAnswers
// bad az click shodan bar rooye har javab, soal va javab haye badi load mishan 
function updateQuestionAndAnswers(eachAnswer) {
    eachAnswer.addEventListener('click', () => {
        currentTest += 1
        mainTestDiv.remove()
        mainTestElement()
        questionCounter()
    })
}
// question Counter 
// be nesbate shomare pooshe soal ha meqdare shomare soal bar rooye safhe baraye karbar update mishe
function questionCounter() {
    if (currentTest <= 30) {
        questionCounterEl.innerHTML = `${currentTest} / 30`
    }

}

// timer function
// bad az click shodan bar rooye dokme start timer 15 daqiqe ei fa'al mishe
function timer() {

    let min, sec

    // noqte shoroo
    min = 14
    sec = 59

    timerEl.textContent = `${min}:${sec}`

    setInterval(() => {

        sec -= 1

        if (sec == 0 && min == 0) {
            endGame()
        }
        else {
            if (sec < 0) {
                sec = 59
                min -= 1
                if (min < 10) {
                    min = `0${min}`
                }
            }
            if (sec < 10) {
                sec = `0${sec}`
            }

        }

        timerEl.textContent = `${min}:${sec}`



    }, 1000)

}

// fuction game status
// pas as click shodan bar rooye dokme start
// status marboot be game roo tooye body va balaye div soal ha namayesh mide

function gameStatus() {

    // gameStatus
    gameStatus = document.createElement('div')
    gameStatus.setAttribute('id', 'game-status')

    // question counter 
    questionCounterEl = document.createElement('span')
    questionCounterEl.setAttribute('id', 'question-counter')

    // timer 
    timerEl = document.createElement('span')
    timerEl.setAttribute('id', 'timer')


    // zir majmooe haye game status ro behesh ezafe mikone
    gameStatus.appendChild(questionCounterEl)
    gameStatus.appendChild(timerEl)

    // div marboote ro be body ezafe mikone
    body.appendChild(gameStatus)
}

// endGame
// agar currentTest >= 30 ya zaman tamam shod, display div marboote be soal va jabab ha none mishe (be hamrah game status)
function endGame() {
    mainTestDiv.style.display = 'none'
    gameStatus.style.display = 'none'
}