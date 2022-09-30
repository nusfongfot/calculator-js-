let inputBtn = document.getElementsByClassName('tool__button')
let input = document.getElementById('input')

let firstVal = 0
//เก็บตัวดำเนินการ
let operatorVal = ''
//เก็บสถานะตัวเลขและตัวดำเนินการ
let waitForNext = false

let calculate = {
  '÷':(firtNum,secondNum) => secondNum > 0 ? firtNum/secondNum : 'error',
  '+':(firtNum,secondNum) => firtNum+secondNum,
  '-':(firtNum,secondNum) => firtNum-secondNum,
  '*':(firtNum,secondNum) => firtNum*secondNum,
  '=':(firtNum,secondNum) => secondNum,
}

function setNumberVal(number){
  if(waitForNext){
      input.textContent = number
      waitForNext = false
  }else{
    let displayVal = input.textContent
    input.textContent = displayVal === '0' ? number : displayVal + number
  }

 }

function callOperator(oper){
  let currenVal = Number(input.textContent) 
      //press point just only one
  if(oper === '.'){  
     if(!input.textContent.includes('.')){
        input.textContent = `${input.textContent}.`
    }
  }else if(oper === 'Del'){
      input.textContent = input.textContent.slice(0, input.textContent.length -1)
  }else{        
      if(!firstVal){
        //เช็คว่ามีค่าเริ้มต้นหรือยัง
          firstVal = currenVal
          input.textContent = currenVal         
                     
      }
      operatorVal = oper
      waitForNext = true
        
  } 

}

function largbtn(larbtn){ 
  let currenVal = Number(input.textContent) 

  if (larbtn === 'C') {
    firstVal = 0
    operatorVal = ''
    waitForNext = false
    input.textContent = ''
  }else{
    //calculate and give result press '='
      let result = calculate[operatorVal](firstVal,currenVal)
      // let n = result.toFixed(4)
      input.textContent = result
      firstVal = result

      if(firstVal === 'error'){
        firstVal = 0
        operatorVal = ''
        waitForNext = false
        input.textContent = '0'
      }
  }
} 

for(let i=0;i<inputBtn.length;i++){
    if(inputBtn[i].classList.contains('number')){
        inputBtn[i].addEventListener('click',() => setNumberVal(inputBtn[i].textContent))
    }else if(inputBtn[i].classList.contains('large__button')){
      inputBtn[i].addEventListener('click',() => largbtn(inputBtn[i].textContent))
    }else{
      // console.log(inputBtn[i])
      inputBtn[i].addEventListener('click',() => callOperator(inputBtn[i].textContent))
    }
  
}







