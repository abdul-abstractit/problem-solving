const { reduce } = require("@laufire/utils/collection");

const operation = (n1,n2,o) => {
  let result
  if (o === '+') result = n1+n2
  if (o === '-') result = n1-n2
  if (o === '*') result = n1*n2
  if (o === '/') result = n1/n2
  return result
} 

const result = reduce(
  ["2","+","5","/","3","+","2","+","5"],
  (acc, num, i, arr)=>{
    const result = (num==='+'||num==='-'||num==='*'||num==='/')
    ? operation(parseInt(arr[i-1]),parseInt(arr[i+1]),num) 
    : acc;
   
    arr[i+1]= operation(parseInt(arr[i-1]),parseInt(arr[i+1]),num) || arr[i+1]
    return result
  },
  0)

console.log(result);
