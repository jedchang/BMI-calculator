let resultBtn = document.querySelector('.result-btn');
let resetBtn = document.querySelector('.reset-btn');
let resetIcon = document.querySelector('.reset');
let resultList = document.querySelector('.record-list');
let tallTxt = document.querySelector('.input-tall');
let weightTxt = document.querySelector('.input-weight');
let bmiTxt = document.querySelector('.bmi');
let pTxt = document.querySelector('.status');
let spanTxt = document.querySelector('.r-txt span');
let data = JSON.parse(localStorage.getItem('bmiData')) || [];

/*----------  監聽與更新  ----------*/
resultBtn.addEventListener('click', resultData);
resetIcon.addEventListener('click', resetData);
resultList.addEventListener('click', removeData);
updateList(data);

/*----------  加入結果資料  ----------*/
function resultData(e) {
  let tallVal = tallTxt.value;
  let weightVal = weightTxt.value;
  let statusTxt = document.querySelector('.r-status');
  let iconBg = document.querySelector('.icon');
  let statusColor = '';

  let bmiVal = weightVal / ((tallVal / 100) * (tallVal / 100));
  let bmiCount = bmiVal.toFixed(2);

  function allType(status) {
    bmiTxt.textContent = bmiCount;
    pTxt.classList.add(status);
    bmiTxt.classList.add(status);
    spanTxt.classList.add(status);
    resetBtn.classList.add(status);
    iconBg.classList.add(status);
    statusColor = status;
  }

  if (18.5 <= bmiCount && bmiCount <= 25) {
    statusTxt = '理想';
    pTxt.textContent = '理想';
    allType('healthy');
  } else if (18.5 >= bmiCount) {
    statusTxt = '過輕';
    pTxt.textContent = '過輕';
    allType('underweight');
  } else if (25 <= bmiCount && bmiCount <= 30) {
    statusTxt = '過重';
    pTxt.textContent = '過重';
    allType('overweight');
  } else if (30 <= bmiCount && bmiCount <= 35) {
    statusTxt = '輕度肥胖';
    pTxt.textContent = '輕度肥胖';
    allType('obese-1');
  } else if (35 <= bmiCount && bmiCount <= 40) {
    statusTxt = '中度肥胖';
    pTxt.textContent = '中度肥胖';
    allType('obese-2');
  } else if (40 <= bmiCount) {
    statusTxt = '重度肥胖';
    pTxt.textContent = '重度肥胖';
    allType('obese-3');
  }

  let totalResult = {
    tall: tallVal,
    weight: weightVal,
    bmi: bmiCount,
    status: statusTxt,
    color: statusColor
  };

  let tallError = document.querySelector('.tall-error');
  let weightError = document.querySelector('.weight-error');

  if (tallVal === null || tallVal === '' || weightVal === null || weightVal === '') {
    tallError.textContent = '* 請填寫身高';
    tallTxt.classList.add('error');
    weightError.textContent = '* 請填寫體重';
    weightTxt.classList.add('error');
    return;
  } else if (isNaN(tallVal) || isNaN(weightVal)) {
    tallError.textContent = '* 請填寫數字';
    tallTxt.classList.add('error');
    weightError.textContent = '* 請填寫數字';
    weightTxt.classList.add('error');
    return;
  } else {
    tallTxt.classList.remove('error');
    weightTxt.classList.remove('error');
    tallError.textContent = '';
    weightError.textContent = '';
  }

  data.push(totalResult);
  updateList(data);
  changeBtn();
  localStorage.setItem('bmiData', JSON.stringify(data));
}

/*----------  更新內容  ----------*/
function updateList(items) {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  let dd = date.getDate() <= 10 ? '0' + date.getDate() : date.getMonth();
  let today = mm + '-' + dd + '-' + yyyy;

  let strLi = '';
  for (let i = 0; i < items.length; i++) {
    strLi += `
      <li class="item ${items[i].color}">
        <div class="r-circle ${items[i].color}"><span class="r-icon ${items[i].color}"></span></div>
        <div class="r-status ${items[i].color}">${items[i].status}</div>
        <div class="r-BMI"><span>BMI</span>${items[i].bmi}</div>
        <div class="r-weight"><span>weight</span>${items[i].weight}kg</div>
        <div class="r-height"><span>height</span>${items[i].tall}cm</div>
        <div class="r-date">${today}</div>
        <i class="fas fa-trash-alt" data-num="${i}"></i>
      </li>
    `;
  }
  resultList.innerHTML = strLi;
}

/*----------  更新按鈕  ----------*/
function changeBtn() {
  resultBtn.style.display = 'none';
  resetBtn.style.display = 'block';
}

/*----------  清空，重設輸入內容  ----------*/
function resetData() {
  resultBtn.style.display = 'block';
  resetBtn.style.display = 'none';
  tallTxt.value = '';
  weightTxt.value = '';
  pTxt.removeAttribute('class');
  pTxt.classList.add('status');
  bmiTxt.removeAttribute('class');
  bmiTxt.classList.add('bmi');
  spanTxt.removeAttribute('class');
  resetBtn.removeAttribute('class');
  resetBtn.classList.add('reset-btn');
}

/*----------  刪除內容  ----------*/
function removeData(e) {
  e.preventDefault();
  let num = e.target.dataset.num;
  if (e.target.matches('i')) {
    data.splice(num, 1);
  }

  localStorage.setItem('bmiData', JSON.stringify(data));
  updateList(data);
}
