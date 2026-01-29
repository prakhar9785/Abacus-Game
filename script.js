const rods = [0,0,0,0,0];
let target = 0;

const abacus = document.getElementById("abacus");
const target_value = document.getElementById("target");
const currrent_value = document.getElementById("current");
const current_status = document.getElementById("status");

function generateTarget(){
    target = Math.floor(Math.random()*90000)+1000;
    target_value.textContent = target;
}

function render(){
    abacus.innerHTML = "";

    rods.forEach((val,index)=>{
        const rod = document.createElement("div");
        rod.className="rod";

        rod.innerHTML = `
        <h4>${["Units","Tens","Hundreds","Thousands","Ten Thousands"][index]}</h4>
        <div class="beads">${val}</div>
        <button onclick="add(${index})">+</button>
        <button onclick="sub(${index})">-</button>`;
        abacus.appendChild(rod);
    });

    updateValue();
}

function add(i){
    rods[i]++;
    if(rods[i]>9){
        rods[i]=0;
        if(i<4) rods[i+1]++;
    }
    render();
}

function sub(i){
    if(rods[i]>0) rods[i]--;
    render();
}

function updateValue(){
    let total=0;
    rods.forEach((v,i)=>{
        total+=v*Math.pow(10,i);
    });
    currrent_value.textContent=total;
    current_status.textContent = total===target ? "You matched the number!" : "Keep adjusting the beads.";
}

document.getElementById("newBtn").addEventListener("click",()=>{
    rods.fill(0);
    generateTarget();
    render();
});

generateTarget();
render();
