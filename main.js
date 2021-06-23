let input= document.querySelector("#number")
let SelFrom=document.querySelector("#from")
let SelTo=document.querySelector("#to")
let btn=document.querySelector(".myButton")
let output=document.querySelector("#output")

btn.addEventListener("click",()=>{
    if(SelFrom.value==SelTo.value){
        output.textContent=input.value
    }else if(SelFrom.value=="Bin" && SelTo.value=="Dec"){
        output.textContent= binToDec(input.value)
    }else if (SelFrom.value=="Bin" && SelTo.value=="Hex"){
        output.textContent= binToHex(input.value)
    }else if(SelFrom.value=="Dec" && SelTo.value=="Bin"){
        output.textContent= decToBin(input.value)
    }else if(SelFrom.value=="Dec" && SelTo.value=="Hex"){
        output.textContent= decToHex(input.value)
    }else if(SelFrom.value=="Hex" && SelTo.value=="Bin"){
        output.textContent= hexToBin(input.value)
    }else if(SelFrom.value=="Hex" && SelTo.value=="Dec"){
        output.textContent= hexToDec(input.value)
    }
})
input.addEventListener("keyup",allowChars)

function allowChars(){
    if(SelFrom.value=="Bin"){
        this.value=this.value.replace(/[^01.]/,'')
    }else if(SelFrom.value=="Dec"){
        this.value=this.value.replace(/[^0123456789.]/,'')
    }else {
        this.value=this.value.replace(/[^0123456789ABCDEF.]/,'')

    }
}

function decToBin(number){
    let arr=number.toString().split(".")
    let result=[];
    let x=parseInt(arr[0])
    do{
        result.push(x%2)
        x=parseInt(x/2)
    }while(x!=0)
    result.reverse();
    if(arr[1] != null){
        result.push(".")
        x=(parseInt(arr[1]) *(10**(-arr[1].length))).toFixed(5)
        do{
            x*=2
    
            if(x>=1){
                x--
    
                result.push(1)
            }else{
                result.push(0)
            }
        }while(x!=0)
    }
    return result.join("");
    
}
function decToHex(number){
    let arr=number.toString().split(".")
    let result=[];
    let x=parseInt(arr[0])
    do{
        result.push(x%16)
        x=parseInt(x/16)
    }while(x!=0)
    result.reverse();
    if(arr[1] != null){
        result.push(".")
        x=(parseInt(arr[1]) *(10**(-arr[1].length))).toFixed(5)
        do{
            x*=16
            if(x>=1){
                let int=x
                int=parseInt(int)
                x-=int
                result.push(int)
            }else{
                result.push(0)
            }
        }while(x!=0)
    }
    result=hexArr(result)
    return result.join("")
}
function binToDec(number){
    let result=0,j=0;
    let arr=number.toString().split(".")
    for(let i=arr[0].length-1;i>=0;i--){
        result+=parseInt(arr[0].charAt(i))*(2**j)
        j++
    }
    if(arr[1] !=null){

        for(let i=1;i<=arr[1].length;i++){
            result += parseInt(arr[1].charAt(i-1))*(2**(-i))
        }
    }
    return result
}
function binToHex(number){
    let arr=number.toString().split(".")
    let result=[];
    let more=arr[0].length%4
    for(let i=0;i<4-more;i++){
       arr[0]= "0".concat(arr[0])
    }
    let x=parseInt(arr[0])
    for(let i=arr[0].length-1;i>=0;i-=4){
        result.push(parseInt(arr[0].charAt(i)) +parseInt(arr[0].charAt(i-1)) *2 +parseInt(arr[0].charAt(i-2))*4 +parseInt(arr[0].charAt(i-3))*8) 
        
    }
    result.reverse()
    if(arr[1] !=null){
        result.push(".")
        more=arr[1].length%4
        for(let i=0;i<4-more;i++){
            arr[1]= arr[1].concat("0")
        }
        x=parseInt(arr[1])
        for(let i=0;i<arr[1].length ;i+=4){
            result.push(parseInt(arr[1].charAt(i))*8 +parseInt(arr[1].charAt(i+1)) *4 +parseInt(arr[1].charAt(i+2))*2 +parseInt(arr[1].charAt(i+3))*1) 
        }
    }
    result=hexArr(result)
    return result.join("")
}
function hexToDec(number){
    let result=0,j=0;
    let arr=number.toString().split(".")
    let x;

    console.log(arr)
    for(let i=arr[0].length-1;i>=0;i--){
        if(arr[0].charAt(i)=="A" || arr[0].charAt(i)=="B" || arr[0].charAt(i)=="C"|| arr[0].charAt(i)=="D" || arr[0].charAt(i).toUpperCase=="E" ||arr[0].charAt(i).toUpperCase=="F"){
            x=hexDigit(arr[0].charAt(i))
        }else{
            x=arr[0].charAt(i)
        }
        console.log(x)
        result+=parseInt(x)*(16**j)
        j++
    }
    if(arr[1] !=null){
        for(let i=1;i<=arr[1].length;i++){
            if(arr[1].charAt(i-1)=="A" || arr[i].charAt(i-1)=="B" || arr[i].charAt(i-1)=="C"|| arr[i].charAt(i-1)=="D" || arr[i].charAt(i-1)=="E" ||arr[i].charAt(i-1)=="F"){
                x=hexDigit(arr[i].charAt(i-1))
            }else{
                x=arr[1].charAt(i-1)
            }
            result += parseInt(x)*(16**(-i))
        }
    }
    return result
}
function hexToBin(number){
    let arr=number.toString().split(".")
    console.log(arr);
    let result=[]
    for(let i=0;i<arr[0].length;i++){
        result.push(hexDigitToBin(arr[0].charAt(i)))
    }
    if(arr[1] != null){
        result.push(".")
        for(let i=0;i<arr[1].length;i++){
            result.push(hexDigitToBin(arr[1].charAt(i)))
        }
    }
    return result.join("")
}
function hexDigit(digit){
    if(digit.toString()=="A"){
        return 10
    }else if(digit=="B"){
        return 11
    }else if(digit=="C"){
        return 12
    }else if(digit=="D"){
        return 13
    }else if(digit=="E"){
        return 14
    }else if(digit=="F"){
        return 15
    }
    return digit
}
function hexArr(arr){
    for(let i=0;i<arr.length;i++){
        if(arr[i]==10){
            arr[i]="A"
        }else if(arr[i]==11){
            arr[i]="B"
        }else if(arr[i]==12){
            arr[i]="C"
        }else if(arr[i]==13){
            arr[i]="D"
        }else if(arr[i]==14){
            arr[i]="E"
        }else if(arr[i]==15){
            arr[i]="F"
        }
    }
    return arr
}
function hexDigitToBin(digit){
    if(digit==0){
        return "0000"
    }else if(digit==1){
        return "0001"
    }else if(digit==2){
        return "0010"
    }else if(digit==3){
        return "0011"
    }else if(digit==4){
        return "0100"
    }else if(digit==5){
        return "0101"
    }else if(digit==6){
        return "0110"
    }else if(digit==7){
        return "0111"
    }else if(digit==8){
        return "1000"
    }else if(digit==9){
        return "1001"
    }else if(digit=="A"){
        return "1010"
    }else if(digit=="B"){
        return "1011"
    }else if(digit=="C"){
        return "1100"
    }else if(digit=="D"){
        return "1101"
    }else if(digit=="E"){
        return "1110"
    }else if(digit=="F"){
        return "1111"
    }
}

