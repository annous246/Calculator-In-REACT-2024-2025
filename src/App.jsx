import { useRef, useState } from 'react'
import './App.css'
function App() {
const [display,setDisplay]=useState("");
const [okDecimal,setOkDecimal]=useState(false);
function clear(){
  setOkDecimal(false)
  setDisplay("")
}
function notOperation(v){
return v!="+"&&v!="/"&&v!="-"&&v!="*"
}
function setValue(v){
  if(!display.length){
    if(v=="-"||v=="+"){
      setDisplay(v)
        
    }
    else if(notOperation(v)){
      if(v)
      setDisplay((prevd)=>prevd+v)
    }
  }
  else{
    //not clean
  if(!notOperation(v)){
    //operation
    if(!notOperation(display[display.length-1])){
      //change last operation
      if(display.length!=1){
        if((display[display.length-1]=='/'||display[display.length-1]=='*')&&v=="-"){
          setDisplay((prevd)=>{
           return  prevd+v
          })


        }
        else if((display[display.length-1])=='-'&&!notOperation(display[display.length-2])){
          setDisplay((prevd)=>{
            const newd =prevd.substr(0,prevd.length-2)+v
            return newd
          })


        }
        else 
        setDisplay((prevd)=>{
          prevd=prevd.substr(0,prevd.length-1)+v
          return prevd
        })
      }
      else{
        if(v=='-'||v=='+')setDisplay(v);
      }

    }
    else{
      //was a number
      setDisplay((prevd)=>{
        return prevd+v;
      })
    }
    setOkDecimal(false)
  }
  else{
    //value
    
      setDisplay((prevd)=>{
        return prevd+v;
      })
  }
  }

}
function result(){
  let res=0,operation="",num="",num2="";
  let vdisplay=JSON.parse(JSON.stringify(display))
  
  if(display.length){
    if(!notOperation(display[display.length-1]))setDisplay(display.substr(0,display.length-1))
      if(display[0]=='-'){num="-";vdisplay=vdisplay.substr(1)}
    for(let v of vdisplay){
      if(notOperation(v)){
        if(operation=="")
        num+=v;
      else num2+=v;

      }
      else{
        //operation
        if(operation){
          if(num2.length==0){
            num2+="-"
          }
          else{
          switch(operation){
            case '+':res=parseFloat(num)+parseFloat(num2);break;
            case '-':res=parseFloat(num)-parseFloat(num2);break;
            case '*':res=parseFloat(num)*parseFloat(num2);break;
            case '/':res=parseFloat(num)/parseFloat(num2);break;
            
          }
          num=JSON.stringify(res)
          num2=""
        operation=v;

          }
        }
        else 
        operation=v;
      }
    }


    switch(operation){
      case '+':res=parseFloat(num)+parseFloat(num2);break;
      case '-':res=parseFloat(num)-parseFloat(num2);break;
      case '*':res=parseFloat(num)*parseFloat(num2);break;
      case '/':res=parseFloat(num)/parseFloat(num2);break;
      
    }
    if(operation!=""){
    if(!res)
      setDisplay("")
    else
    setDisplay(JSON.stringify(res))

    }
      
  }

}
function setDecimal(){
  if(!okDecimal){
  if(display.length){
    if(notOperation(display[display.length-1])&&display[display.length-1]!='.'){
      setOkDecimal(true)
      setDisplay((pred)=>{
        return pred+'.'
      })
    }


  }
  else{
    setDisplay('0.')
    setOkDecimal(true)
  }


  }
}
  return (
    <div id='container'>
      <div id='calculator'>
      <span id='display'>{display.length?display:0}</span>
      <button id='clear' onClick={clear}>AC</button>
      <button id='zero' onClick={()=>setValue(0)}>0</button>
      <button id='one' onClick={()=>setValue(1)}>1</button>
      <button id='two' onClick={()=>setValue(2)}>2</button>
      <button id='three' onClick={()=>setValue(3)}>3</button>
      <button id='four' onClick={()=>setValue(4)}>4</button>
      <button id='five' onClick={()=>setValue(5)}>5</button>
      <button id='six' onClick={()=>setValue(6)}>6</button>
      <button id='seven' onClick={()=>setValue(7)}>7</button>
      <button id='eight' onClick={()=>setValue(8)}>8</button>
      <button id='nine' onClick={()=>setValue(9)}>9</button>
      <button id='subtract' onClick={()=>setValue('-')}>-</button>
      <button id='add' onClick={()=>setValue('+')}>+</button>
      <button id='divide' onClick={()=>setValue('/')}>/</button>
      <button id='multiply' onClick={()=>setValue('*')}>*</button>
      <button id='equals' onClick={result}>=</button>
      <button id='decimal'  onClick={setDecimal}>.</button></div>
      <span>By Anas Rabhi</span>

    </div>
  )
}

export default App


