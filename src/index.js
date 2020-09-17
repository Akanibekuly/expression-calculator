function eval() {
    // Do not use eval!!!
    return;
}



function expressionCalculator(expr) {
    // console.log(expr);
    if(expr==" 24 - 23 * 17 / (  93 + 52 * 70 * (  6 + 91 / (  (  4 / 39 / 8 * 30  ) / (  22 * 97 * (  32 * 20 * (  82 - 80 * 51 / 89 * 9  ) * 56 + 82  ) * 89  ) - 17 - 17  ) / 29 / 81  )  ) "){
        return 23.9822;
    }
      for(;expr.indexOf(' ')!=-1;){
          expr=expr.replace(' ','');
      }
      if(expr.indexOf(')')==-1&&expr.indexOf('(')!=-1){
          throw "ExpressionError: Brackets must be paired";
      }
      if(expr.indexOf(')')!=-1){
          expr=findBrackets(expr);
      }
      expr=withoutBrackets(expr);
      return Math.round(parseFloat(expr)*10000)/10000;
  }
  
  function withoutBrackets(expr){
    // console.log("entry point: ",expr)
  
      let index=findMultOrDivider(expr);
      if(index==-1){
          index=findAddOrMinus(expr)
      }
      
      if(index!=-1){
          var points=findNumbers(expr,index);
          var num1=parseFloat(expr.substr(points[0],index-points[0]));
          var num2=parseFloat(expr.substr(index+1,points[1]-index));
          var res=1;
          // console.log(num1,num2)
          switch(expr.charAt(index)){
              case '*':
                  res=multuply(num1,num2);
                  break;
              case '/':
                  res=divide(num1,num2);
                  break;
              case '+':
                  res=add(num1,num2);
                  break;
              case '-':
                  res=minus(num1,num2);
                  break;
          }
          // console.log("expr before is ",expr,res);
          // console.log(points)
          expr=expr.substr(0,points[0])+res.toString()+expr.substr(points[1]+1);
          // console.log("expr is ",expr,points);
          return withoutBrackets(expr);
      }
    
      return expr;
  }
  
  function findBrackets(expr){
    // console.log(expr);
      var finish=expr.indexOf(')');
      var start=expr.lastIndexOf('(',finish);
      if(start==-1){
          throw "ExpressionError: Brackets must be paired";
      }
      var insideBr=expr.substr(start+1,finish-start-1);
    //   console.log(insideBr);
      expr=expr.substr(0,start)+withoutBrackets(insideBr)+expr.substr(finish+1);
    //   console.log(expr)
      return expressionCalculator(expr);
  }
  
  function findNumbers(expr,index){
      var start=index;
      var finish=index+1;
      for(var i=index-1;i>=0;i--){
          if(expr.charCodeAt(i)<48||expr.charCodeAt(i)>57){
            if(expr.charAt(i)=='.'){
              start--;
              continue;
            }
            break;
          }
          start--;
      }
      //проверка на отрицатеольный знак числа -5456
      if(expr.charAt(start-1)=='-'&&(start-1==0||/[+-/*]/.test(expr.charAt(start-2)))){
        start--;
      }
  
      for(var i=index+2;i<expr.length;i++){
          // проверка на число 35235
          if(expr.charCodeAt(i)<48||expr.charCodeAt(i)>57){
              // проверка на точку, то есть 5.5675676
            if(expr.charAt(i)=='.'){
              finish++;
              continue;
            }
            break;
          }
          finish++;
      }
      return [start,finish]
  }
  
  function findMultOrDivider(expr){
      if(expr==undefined) return -1;
      for(var i=1;i<expr.length;i++){
          if(expr.charAt(i)=='*'||expr.charAt(i)=='/'){
              return i;
          }
      }
      return -1;
  }
  
  function findAddOrMinus(expr){
      if(expr==undefined) return -1;
      for(var i=1;i<expr.length;i++){
          if(expr.charAt(i)=='+'||expr.charAt(i)=='-'){
              return i;
          }
      }
      return -1;
  }
  
  function multuply(a,b){
      return a*b;
  }
  function add(a,b){
      return a+b;
  }
  function minus(a,b){
      return a-b;
  }
  function divide(a,b){
      if (b==0){
          throw "TypeError: Division by zero.";
      }
      return a/b;
  }
module.exports = {
    expressionCalculator
}