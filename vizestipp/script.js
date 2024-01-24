var data_text_raw=[]
var data=[]
var images=[];
var finished=false;

var first_text=document.getElementById("first_t");
var second_text=document.getElementById("second_t");
var first_button=document.getElementById("first_b");
var second_button=document.getElementById("second_b");
var first_image=document.getElementById("first_i");
var second_image=document.getElementById("second_i");
var points_text=document.getElementById("points");

var points=0;

var frst_num=0, scnd_num=0;

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetch_that() {
await fetch("data.txt")
  .then((res) => res.text())
  .then((text) => {
    data_text_raw=text.split('\t').join(':').split('\n').join(':').split(':');
   })
  .catch((e) => console.error(e));
  return data_text_raw
}
async function thing(){

await fetch_that()
while (data_text_raw.length > 0){
  data.push(data_text_raw.splice(0,3))
}
for (d in data){
  await images.push((new Image()).src ="images/" +data[d][0]+".jpg");
}
finished=true;
}
function gen_new(){
  do{
  var frst = Math.floor(Math.random() * data.length);
  frst_num =parseInt(data[frst][2])
  first_text.innerHTML=data[frst][1]+"-nyi "+data[frst][0];
  first_image.src=images[frst];//.src="images/"+data[frst][0]+".jpg"
  var scnd = Math.floor(Math.random() * data.length);
  scnd_num =parseInt(data[scnd][2])
  second_text.innerHTML=data[scnd][1]+"-nyi "+data[scnd][0];
  second_image.src=images[scnd];//.src="images/"+data[scnd][0]+".jpg"
  }while(data[frst][2]/data[scnd][2]<2&&data[frst][2]/data[scnd][2]>0.5)
}

async function clicked(which){
  if(which==0){
    if(frst_num>scnd_num){
      first_button.innerHTML=frst_num + " liter";
      second_button.innerHTML=scnd_num + " liter";
      points++;
      await delay(1500);
      first_button.innerHTML="";
      second_button.innerHTML="";
      await gen_new();
      
    }else{
      first_button.innerHTML=frst_num+ " liter";
      second_button.innerHTML=scnd_num+ " liter";
      await delay(1500);
      document.getElementById("end").style.display="inline";
      document.getElementById("end_points").innerHTML="pontjaid száma: "+ points;
      points=0;
    }
  }else{
    if(frst_num<scnd_num){
      first_button.innerHTML=frst_num+ " liter";
      second_button.innerHTML=scnd_num+ " liter";
      points++;
      await delay(1500);
      first_button.innerHTML="";
      second_button.innerHTML="";
      await gen_new();
      
    }else{
      first_button.innerHTML=frst_num+ " liter";
      second_button.innerHTML=scnd_num+ " liter";
      await delay(1500);
      document.getElementById("end").style.display="inline";
      document.getElementById("end_points").innerHTML="pontjaid száma: "+ points;
      points=0;
    }
  }
  points_text.innerHTML="pontok: "+points;

}
function start(){
  document.getElementById("outside").style.display="none";
  document.getElementById("end").style.display="none";
  document.getElementById("inside").style.display="flex";
  gen_new();
}

function end(){
  document.getElementById("outside").style.display="inline";
  document.getElementById("end").style.display="none";
  document.getElementById("inside").style.display="none";
}
(async()=> await thing())();



