var data_text_raw=[]
var data=[]

var first_text=document.getElementById("first_t");
var second_text=document.getElementById("second_t");
var points_text=document.getElementById("points");

var points=0;

var frst_num=0, scnd_num=0;

async function fetch_that() {
await fetch("data.txt")
  .then((res) => res.text())
  .then((text) => {
    data_text_raw=text.split('\t').join(':').split('\r\n').join(':').split(':');
   })
  .catch((e) => console.error(e));
  return data_text_raw
}
async function thing(){
await fetch_that()
while (data_text_raw.length > 0){
  data.push(data_text_raw.splice(0,3))
}
console.log(data)
gen_new()
}
function gen_new(){
  do{
  var frst = Math.floor(Math.random() * data.length);
  frst_num =parseInt(data[frst][2])
  first_text.innerHTML=data[frst][1]+"-nyi "+data[frst][0]+"<br>"+data[frst][2]
  var scnd = Math.floor(Math.random() * data.length);
  scnd_num =parseInt(data[scnd][2])
  second_text.innerHTML=data[scnd][1]+"-nyi "+data[scnd][0]+"<br>"+data[scnd][2]
  }while(data[frst][2]/data[scnd][2]<2&&data[frst][2]/data[scnd][2]>0.5)
}

function clicked(which){
  if(which==0){
    if(frst_num>scnd_num){
      gen_new();
      points++;
    }else{
      gen_new();
      points=0;
    }
  }else{
    if(frst_num<scnd_num){
      gen_new();
      points++;
    }else{
      gen_new();
      points=0;
    }
  }
  points_text.innerHTML="pontok: "+points;

}

thing()


