const dropdown = document.querySelectorAll(".options select");
const btn=document.querySelector("button");
const baseurl="https://open.exchangerate-api.com/v6/latest";
const fromcurr=document.querySelector(".from_select select");
const tocurr=document.querySelector(".to_select select");
const result=document.querySelector("#msg");

for (let select of dropdown) {
    for (code in country_list) {
        let newopt = document.createElement("option");
        newopt.innerHTML = code;
        newopt.value = code;
        if (select.name === "fs" && code === "USD") {
            newopt.selected = "selected";
        } else if (select.name === "ts" && code === "INR") {
            newopt.selected = "selected";
        }
        select.append(newopt);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let code = element.value;
    let countryCode = country_list[code];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("input");
    let amtval=amount.value;
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
    const url=`${baseurl}/${fromcurr.value}`;
    let response=await fetch(url);
    let data=await response.json();
    const rate=data.rates[tocurr.value];
    const finalamt=amtval*rate;
    result.innerText=`${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
});

