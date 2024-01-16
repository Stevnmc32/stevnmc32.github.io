var search_input=document.getElementById("search")
var search_output=document.getElementById("result")

var full_words_array;
var filtered_words_array;
var str;

async function f(){
    var req=await fetch("https://raw.githubusercontent.com/LibreOffice/dictionaries/master/hu_HU/hu_HU.dic"); 
    str=await req.text();
}
function format_for_hu(){
    full_words_array=str.split('\n').map((s)=>s=s.split('/')[0].split("  ")[0].split("\t")[0]);
    full_words_array.shift();
}
function search(regex){
    filtered_words_array=full_words_array.filter((s)=>s.match(regex));
}

function update_search(){
    search(document.getElementById("search").value);
    document.getElementById("result").innerHTML=filtered_words_array.join(", ");
}

async function get_full_words_array(){
    await f();
    format_for_hu();
}

get_full_words_array();





	