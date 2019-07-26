# BMI Calculator

BMI 計算器

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg) ![image](https://img.shields.io/badge/SCSS-exercise-CD6799.svg)

![images](https://github.com/jedchang/BMI-Calculator/blob/master/preview.jpg)

## 資料

- `JSON.parse()`：將字串轉成物件。
- `JSON.stringify()`：將陣列轉字串。
- `localStorage.getItem()`：將值取出 localStorage。
- `localStorage.setItem()`：將值存入 localStorage。

## BMI 計算

- BMI 計算 = 體重(公斤)除以身高(公尺)的平方
- `toFixed()`：可以把 number 四捨五入為指定小數點後的位數。
- if 判斷 BMI 範圍，將值存入，畫面印出值。

```javascript
let bmiVal = weightVal / ((tallVal / 100) * (tallVal / 100));
let bmiCount = bmiVal.toFixed(2);
```

## 事件偵聽

- 事件偵聽：結果按鈕、更新按鈕、結果清單。
- `e.target.dataset.num`：用 data-num 的數字順序，做為要刪除的依據。
- `e.target.matches('i')`：判斷是否點選到 i 才執行刪除。
- 動態產出 li 清單數量。

```javascript
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
```

## 初始化頁面

- `updateList(data)`：初始化更新頁面，有就帶 data getItem 的值，沒有就空陣列

```javascript
let data = JSON.parse(localStorage.getItem('bmiData')) || []; 
```
