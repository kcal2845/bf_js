output = document.getElementById("output");
input = document.getElementById("input");
input_button = document.getElementById("input_button");
program_text = document.getElementById("program_text");
load_button = document.getElementById("load_button");

var tape;
var ptr;
var program;
var checkbracket;
var checkinput = false;
var pos;

load_button.onclick = function(){
  output.value = "";
  tape = [];
  ptr = 0;
  program = program_text.value;
  checkbracket;
  for(var i=0;i<30000;i++){
    tape[i] = 0;
  }
  pos=0;
  interpret();
}

function interpret(){
  while(pos<program.length){
    switch(program[pos]){
      case '+':
        if(tape[ptr]==255){tape[ptr] = 0;}else{tape[ptr] += 1;}
        pos += 1;break;
      case '-':
        if(tape[ptr]==0){tape[ptr] = 255;}else{tape[ptr] -= 1;}
        pos += 1;break;
      case '>':
        ptr += 1;
        pos += 1;break;
      case '<':
        ptr -= 1;
        pos += 1;break;
      case '[':
      if(tape[ptr] == 0){
          checkbracket = 1;
          while(checkbracket>0){
            pos+=1;
            if(program[pos] == ']'){
              checkbracket -= 1;
            }else if(program[pos] == '['){
              checkbracket += 1;
            }
          }
        }
        pos += 1;break;
      case ']':
        if(tape[ptr] != 0){
          checkbracket = 1;
          while(checkbracket>0){
            pos-=1;
            if(program[pos] == '['){
              checkbracket -= 1;
            }else if(program[pos] == ']'){
              checkbracket += 1;
            }
          }
        }
        pos += 1;break;
      case '.':
        output.value += String.fromCharCode(tape[ptr]);
        pos += 1;break;
      case ',':
        if(input.value != "" && checkinput){
          var str = input.value;
          var buf = str[0];
          input.value = str.substring(1);
          tape[ptr] = buf.charCodeAt(0);
          pos += 1;
        }else{
          checkinput = false;
          setTimeout(interpret,10);
          return;
        }
        break;
      default:
        pos += 1;
    }
  }
}

input_button.onclick = function(){
  checkinput = true;
}
