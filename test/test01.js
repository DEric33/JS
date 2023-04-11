// Write function below
const factorial = number => {
    //let j=1;
    for(let i = 1; i < number+1; i++){
        let j;
 //     if(!isNaN(j)){
       j *= i;
      console.log(j);
    //}else{
    //    j *= i;
        //console.log(i);  
   //   }
    }
   // return j;
  } 
  
  console.log(factorial(6));