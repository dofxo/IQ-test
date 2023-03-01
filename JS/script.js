// general variables
const body = document.body,
    head = document.head




// event listener baraye load shodane DOM
// pas az load shodane safhe element asli baraye safhe login load mishe
// function marboot be validate input ha run mishe
window.addEventListener('DOMContentLoaded', () => {
    favIconLink()
    testStartElement()
})

// functions :

// testStart Element
// tooye function ba sakhtan element haye HTML oonaro amade mikone baraye add shodan be Body 
let nameInput, ageInput, startBtn, mainSection, iqTestTitle

function testStartElement() {

    // section testStartElement ro misaze va zir majmooe hash ro behesh ezafe mikone 
    mainSection = document.createElement('section')
    mainSection.id = 'test-start'

    // h1
    iqTestTitle = document.createElement('h1')
    iqTestTitle.id = ' test-title'
    iqTestTitle.textContent = 'IQ TEST'

    // name input
    nameInput = document.createElement('input')
    nameInput.id = 'user-name'
    nameInput.placeholder = 'Enter your name : '

    // age input
    ageInput = document.createElement('input')
    ageInput.setAttribute('type', 'number')
    ageInput.id = 'user-age'
    ageInput.placeholder = 'Enter your age : '

    // start button
    startBtn = document.createElement('button')
    startBtn.id = 'start'
    startBtn.textContent = 'START'

    // be soorate default dokme qeyr fa'al hast
    startBtn.disabled = true



    // zir majmoome haye section testStartElement ro behesh ezafe mikone
    mainSection.appendChild(iqTestTitle)
    mainSection.appendChild(nameInput)
    mainSection.appendChild(ageInput)
    mainSection.appendChild(startBtn)

    // div aslio be body ezafe mikone
    body.appendChild(mainSection)


    // event listener baraye startBtn

    startBtn.addEventListener('click', () => {
        startTest()
        questionCounter()
        timer()
    })

    validation(nameInput, ageInput)

}

// start function
// bad az click shodan rooye dokme start, mohtavaye matni sen va esm karbar ra tooye moteqayer haye ageInputValue va nameInputValue zakhire mikone
// va badesh safhe soalat ro load mikone    
let nameInputValue

function startTest() {

    // value input haro be moteqayer nesbat mide
    nameInputValue = nameInput.value

    // display testStart element ro none mikone
    mainSection.style.display = 'none'

    // element maintest(soalat) ro jaygozin safhe login mikone
    mainTestElement()
    gameStatusEl()

}


// mainTestELement
// tooye function ba sakhtan element haye HTML oonaro amade mikone baraye add shodan be Body
let mainTestDiv, questionEl, answersEl, eachAnswer, questionCounterEl, timerEl

let currentTest = 1

function mainTestElement() {

    // main-test element
    mainTestDiv = document.createElement('section')
    mainTestDiv.id = 'main-test-box'


    // question element
    questionEl = document.createElement('img')
    questionEl.setAttribute('src', `Images/1/test1.png`)


    // answers element
    answersEl = document.createElement('div')
    answersEl.id = 'answers'

    // each answer
    newSlide()


    // zir majmoome haye div mainTest ro behesh ezafe mikone

    mainTestDiv.appendChild(questionEl)
    mainTestDiv.appendChild(answersEl)


    // div aslio be body ezafe mikone
    body.appendChild(mainTestDiv)


}

//  newSlide function
// bad az click shodan bar roye har javab, soale badi be hamrahe javab hash load mishe
function newSlide() {

    if (currentTest <= 30) {

        // taqir dadane soal
        questionEl.setAttribute('src', `Images/${currentTest}/test${currentTest}.png`)

        // taqir darane javab ha
        if (currentTest < 13) {
            for (let i = 1; i <= 6; i++) {
                let eachAnswer = document.createElement('img')
                eachAnswer.setAttribute('src', `Images/${currentTest}/${currentTest}-${i}.png`)
                eachAnswer.setAttribute('answerNumber', `${i}`)
                answersEl.appendChild(eachAnswer)

                //update
                updateQuestionAndAnswers(eachAnswer)
            }
        }
        else {
            for (let i = 1; i <= 8; i++) {
                let eachAnswer = document.createElement('img')
                eachAnswer.setAttribute('src', `Images/${currentTest}/${currentTest}-${i}.png`)
                eachAnswer.setAttribute('answerNumber', `${i}`)
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

        answerSelection(eachAnswer)
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
let timerInterval, currentMin, currentSec

function timer() {

    let min, sec

    // noqte shoroo
    min = 14
    sec = 59

    timerEl.textContent = `${min}:${sec}`
    timerInterval = setInterval(() => {

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

        currentMin = min
        currentSec = sec



    }, 1000)


}

// fuction game status
// pas as click shodan bar rooye dokme start
// status marboot be game roo tooye body va balaye div soal ha namayesh mide
let gameStatus

function gameStatusEl() {

    // gameStatus
    gameStatus = document.createElement('div')
    gameStatus.id = 'game-status'

    // question counter 
    questionCounterEl = document.createElement('span')
    questionCounterEl.id = 'question-counter'

    // timer 
    timerEl = document.createElement('span')
    timerEl.id = 'timer'


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
    timerEl.textContent = ''
    checkingCorrectAnswer()
    loader()
}



// loader El
// bad az tamam shodan test va qabl az namayeshe natayej ye safhe loading miad va bad az 3s natayej neshoon dade mishe
let loaderContianer, ringEl, loadingText

function loader() {

    // loaderContainer
    loaderContianer = document.createElement('div')
    loaderContianer.id = 'loader-container'

    // loadingText
    loadingText = document.createElement('span')
    loadingText.textContent = 'Loading ...'


    // zir majmooe haye container loader

    for (let i = 1; i <= 3; i++) {

        ringEl = document.createElement('div')
        ringEl.classList.add('ring')
        loaderContianer.appendChild(ringEl)

    }
    // ezafe kardan span marboote be zir majmooe loaderContainer
    loaderContianer.appendChild(loadingText)
    // ezafe kardan container loader
    body.appendChild(loaderContianer)

    // bad az 3 sanie element natayej namayesh dade beshe
    setTimeout(() => {
        loaderContianer.style.display = 'none'
        showResult()
        scoreStatus()
        wastedTime()
    }, 3500)




}

// correct answers
let score = 0

let correctAnswersArray = [3, 1, 5, 5, 2, 1, 2, 2, 2, 6, 4, 1, 4, 7, 2, 3, 1, 6, 5, 8, 4, 4, 7, 6, 4, 7, 7, 3, 2, 8]
let selectedAnswersArray = []

// shomare har javab pas as click shodan dar array e selectedAnswersArray zakhire mishe
function answerSelection(eachAnswer) {
    let answerNumber = eachAnswer.getAttribute('answerNumber')
    // changes the type of the answers number from string to number and pushesh them into the array

    selectedAnswersArray.push(Number(answerNumber))
}
// baraye har soal, besoorate ekhtesasi check mishe ke aya index haye javab va soal barabar hastan ya na
function checkingCorrectAnswer() {

    for (let i = 0; i < correctAnswersArray.length; i++) {
        if (correctAnswersArray[i] == selectedAnswersArray[i]) {
            score += 10
        }
    }

}

// status score ha
let payam = ''
function scoreStatus() {

    if (score <= 75) {
        payam = 'IQ shoma zire miangin ast'
    }
    if (75 < score && score < 225) {
        payam = 'IQ shoma motevaset ast'
    }

    if (score > 225) {
        payam = 'IQ shoma bala ast'
    }

    // iq haye afrad mashhoor
    if (160 <= score && score <= 170) {
        payam += ' va shabih be Albert Einstein va Bill Gates ast.'
    }
    else if (180 <= score && score <= 185) {
        payam += ' va shabih be Mr. Bean ast.'
    }
    else if (190 <= score && score <= 200) {
        payam += ' va shabih be Garry Kasparof ast.'
    }
    else if (score >= 220) {
        payam += ' va shabih be Leonard Davinci ast.'
    }





}

// showResult
// score va payam ekhtesasi ro tooye element haye jadid sakhte shode qarar mide
let resultEL, testScore, iqStatus, resetBtn, wastedTimeEl, userNameEl

function showResult() {
    // main EL
    resultEL = document.createElement('section')
    resultEL.id = 'result'

    // userName var
    let userNameVar = document.createElement('span')
    userNameVar.id = 'user-name-var'
    userNameVar.textContent = nameInputValue
    // userName
    userNameEl = document.createElement('p')
    userNameEl.textContent = ' e aziz,'
    userNameEl.prepend(userNameVar)

    // testScore El variable span
    let scoreSpan = document.createElement('span')
    scoreSpan.id = 'score-var'
    scoreSpan.textContent = score

    // testScore EL
    testScore = document.createElement('p')
    testScore.textContent = `Score shoma az 300, barabar ast ba : `
    testScore.appendChild(scoreSpan)

    // iq-status EL
    iqStatus = document.createElement('p')
    iqStatus.textContent = payam

    // restart button
    resetBtn = document.createElement('button')
    resetBtn.id = 'restart-button'
    resetBtn.textContent = 'RESTART'

    //wasted time
    wastedTimeEl = document.createElement('p')

    // ezafe kardan zir majmooe be div Main EL
    resultEL.appendChild(userNameEl)
    resultEL.appendChild(wastedTimeEl)
    resultEL.appendChild(testScore)
    resultEL.appendChild(iqStatus)
    resultEL.appendChild(resetBtn)
    // ezafe kardan zir majmoome be body (div asli)
    body.appendChild(resultEL)


    // event listener baraye dokme reset
    resetBtn.addEventListener('click', resetTest)
}
// wastedTime
// time separi shode ro hesab mikone va dar khorooji namayesh mide
function wastedTime() {

    let wastedMin = 14 - currentMin
    let wastedSec = 59 - currentSec

    if (wastedMin < 10) {
        wastedMin = `0${wastedMin}`
    }
    if (wastedSec < 10) {
        wastedSec = `0${wastedSec}`
    }
    // baraye avaz kardan range moteqayer
    let wastedTimeSpan = document.createElement('span')
    wastedTimeSpan.id = 'wasted-time-var'
    wastedTimeSpan.textContent = `${wastedMin} : ${wastedSec}`

    wastedTimeEl.textContent = `Time separi shode shoma barabar ast ba : `
    wastedTimeEl.appendChild(wastedTimeSpan)

}
// kole test ro reset mikone
function resetTest() {
    selectedAnswersArray = []
    score = 0
    currentTest = 1
    resultEL.style.display = 'none'
    clearInterval(timerInterval)
    testStartElement()
}

// function validate login page


function validation(nameInput, ageInput) {

    // event listener baraye input ha
    ageInput.addEventListener('blur', () => {
        inputValueValidation(ageInput)
        validCheck()
    })

    nameInput.addEventListener('blur', () => {
        inputValueValidation(nameInput)
        validCheck()
    })
    ageInput.addEventListener('keypress', () => {
        inputValueValidation(ageInput)
        validCheck()
    })
    nameInput.addEventListener('keypress', () => {
        inputValueValidation(nameInput)
        validCheck()
    })



}

// check mikone ke agar yek element khali nabashe behesh class valid ro mide va agar khali bood invalid
function inputValueValidation(el) {
    if (el.value !== '') {
        el.classList.remove('inValid')
        el.classList.add('valid')
    }
    else {
        el.classList.remove('valid')
        el.classList.add('inValid')
    }

}

// check mikone ke aya hameye input ha class valid ro daran va agar dashtan dokme start faal beshe
function validCheck() {
    if (nameInput.classList.contains('valid')
        && ageInput.classList.contains('valid')) {
        startBtn.disabled = false
        startBtn.style.backgroundColor = '#6756BE'
    }
    else {
        startBtn.disabled = true
        startBtn.style.backgroundColor = ''
    }
}

// ezafe kardan favicon be html
let faviconLink

function favIconLink() {
    faviconLink = document.createElement('link')
    faviconLink.setAttribute('rel', 'icon')
    faviconLink.setAttribute('href', 'Images/favicon.png')

    head.appendChild(faviconLink)
}
