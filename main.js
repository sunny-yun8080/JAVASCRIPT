// HTML에서 이미지를 가져온다.
let Images = document.getElementById("images");

// HTML에서 '내 숫자를 맞춰봐' 영역을 가져온다.
let resultArea = document.getElementById("result-area");

// chances(남은 기회)를 5번으로 선언 및 초기화한다.
// HTML에서 '남은 기회 : 5번' 영역을 가져온다.
let chances = 5;
let chanceArea = document.getElementById("chance-area");

// HTML에서 input 창을 가져온다.
// input 창에 focus 이벤트를 설정한다.
// input 창을 focus할 시, 빈 문자열로 반환한다. (즉, input 창에 있는 모든 내용이 깨끗하게 지워진다.)
let inputArea = document.getElementById("input-area");
inputArea.addEventListener("focus", function () {inputArea.value = ""});

// HTML에서 'Go' 버튼을 가져온다.
// 'Go' 버튼에 click 이벤트를 설정한다.
let goButton = document.getElementById("go-button");
goButton.addEventListener("click", go);

// HTML에서 'Reset' 버튼을 가져온다.
// 'Reset' 버튼에 click 이벤트를 설정한다.
let resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", reset);

// user가 입력한 값들을 넣기 위해 배열을 선언 및 초기화한다.
// 빈 배열을 초기값으로 설정한다. 이 배열은 현재 요소를 하나도 포함하지 않는 상태이다.
let userHistory = [];

// 컴퓨터의 랜덤 숫자를 선언 및 초기화한다.
let computerNum = 0;

// 컴퓨터의 랜덤 숫자를 1~100 사이의 숫자로 설정한다.
// Math.random()는 0 <= x < 1의 부동소수점 난수를 생성한다.
// Math.random() * 100을 통해 0 이상 100 미만의 숫자를 만든다.
// Math.floor()는 소수점 이하를 버리고 정수로 변환한다. (0부터 99 사이)
// Math.floor(Math.random() * 100) + 1에서 '+ 1'을 더해 1부터 100 사이의 값으로 변환한다.
// randomNum() 함수 내에서 computerNum에 값을 할당해도 그 값은 전역 변수 computerNum에 저장된다.
// 만약 randomNum() 내부에서 let computerNum = ... 형태로 사용해 새로 선언했다면, 그것은 지역 변수가 되어 randomNum() 함수 밖에서는 접근할 수 없게 된다.
function randomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log(`정답 : ${computerNum}`);
}
randomNum();

// 'Go' 버튼을 클릭할 시, 발생할 요소들
// go() 함수는 버튼을 클릭할 때마다 실행되도록 설정되어 있기 때문에 별도의 go() 함수를 호출하지 않아도 된다.
// goButton.addEventListener("click", go)로 클릭 이벤트를 설정했기 때문에 사용자가 버튼을 클릭하면 브라우저가 자동으로 go() 함수를 호출한다.
function go() {
    // input 창 안의 value(값)을 inputValue로 선언 및 초기화한다.
    let inputValue = inputArea.value;

    // user가 입력한 값이 1~100 사이의 범위를 벗어나면 경고 메시지를 보여준다.
    if(inputValue < 1 || inputValue > 100) {
        resultArea.textContent = "1부터 100 사이의 숫자를 입력해 주세요.";
        Images.src = "images/pumpkin-costume.gif";
        return;
    }

    // user가 입력한 값을 또 입력하게 된다면 경고 메시지를 보여준다.
    // 즉, userHistory에 inputValue가 포함되어 있으면(true) 경고 메시지를 보여준다.
    if(userHistory.includes(inputValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다.";
        Images.src = "images/vampire.gif";
        return;
    }

    // 'Go' 버튼을 클릭할 시, chances(남은 기회)가 1씩 감소한다.
    chances--;
    chanceArea.textContent = `남은 기회 : ${chances}`;

    // computerNum > inputValue일 경우, 'Up!'
    // computerNum < inputValue일 경우, 'Down!'
    // computerNum == inputValue일 경우, '정답이야!'
    if(computerNum > inputValue) {
        resultArea.textContent = "Up!";
        Images.src = "images/up.gif";
    } else if(computerNum < inputValue) {
        resultArea.textContent = "Down!";
        Images.src = "images/down.gif";
    } else {
        resultArea.textContent = "정답이야!";
        goButton.disabled = true;
        Images.src = "images/correct.gif";
        return;
    }

    // chances(남은 기회)가 0번일 경우, 실패 메시지를 보여주고, 'Go' 버튼을 비활성화한다.
    if(chances == 0) {
        resultArea.textContent = "정답을 맞추지 못했군!";
        inputArea.value = "";
        goButton.disabled = true;
        Images.src = "images/angry-pumpkin.gif";
    }

    // user가 입력한 값들을 userHistory 배열 안에 넣어준다.
    userHistory.push(inputValue);
    console.log(userHistory);
}

// 'Reset' 버튼을 클릭할 시, 발생할 요소들
function reset() {
    // reset() 함수를 호출하면, randomNum()을 다시 실행한다.
    // 전역 변수 computerNum이 다시 할당돼서 새로운 랜덤 숫자로 덮어쓰게 된다.
    randomNum();

    resultArea.textContent = "내 숫자를 맞춰봐!";
    
    // chances(남은 기회)를 5번으로 선언 및 초기화한다.
    chances = 5;
    chanceArea.textContent = `남은 기회 : ${chances}`;

    // input 창에 있는 모든 내용을 깨끗하게 지운다.
    inputArea.value = "";

    // 배열 안에 user가 입력한 값들을 다시 선언 및 초기화한다.
    userHistory = [];

    goButton.disabled = false;
    resetButton.disabled = false;

    Images.src = "images/pumpkin.gif";
}