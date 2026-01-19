let balance = 0;
const userId = "demoUserId"; // Backend login sonrası dəyişəcək

// Heyvanlar və şəkillər
const animals = [
    { name: "Qoyun", prices: [1,3,5], incomePerSecond: [0.00001,0.00003,0.00005], image:"images/sheep.png" },
    { name: "İnək", prices: [10,15,20], incomePerSecond: [0.00012,0.00018,0.00024], image:"images/cow.png" },
    { name: "Keçi", prices: [25,30,35,40], incomePerSecond: [0.0003,0.00036,0.00042,0.00048], image:"images/goat.png" },
    { name: "Bala At", prices: [70,100], incomePerSecond: [0.0008,0.0012], image:"images/horse.png" },
    { name: "Böyük At", prices: [200,300,500,1000], incomePerSecond: [0.003,0.0045,0.0075,0.015], image:"images/horse.png" }
];

const animalsDiv = document.getElementById("animals");

// Heyvanları bazara əlavə et
animals.forEach(animal => {
    const div = document.createElement("div");
    div.innerHTML = <h3>${animal.name}</h3><img src="${animal.image}" /><br>;
    animal.prices.forEach((price,i) => {
        const btn = document.createElement("button");
        btn.innerText = $${price} al;
        btn.onclick = () => buyAnimal(animal,i);
        div.appendChild(btn);
    });
    animalsDiv.appendChild(div);
});

function buyAnimal(animal,index){
    if(balance >= animal.prices[index]){
        balance -= animal.prices[index];
        document.getElementById("balance").innerText = balance.toFixed(2);
        alert(`${animal.name} alındı!`);
        // TODO: Backend ilə save etmək (ferma və gəlir)
    } else alert("Balans kifayət etmir!");
}

// Kod tətbiqi
document.getElementById("apply-code").onclick = async () => {
    const code = document.getElementById("code-input").value;
    try{
        const res = await fetch(`http://localhost:5000/api/user/${userId}/apply-code`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({ code })
        });
        const data = await res.json();
        if(res.ok){
            balance = data.balance;
            document.getElementById("balance").innerText = balance.toFixed(2);
            alert("Kod uğurla tətbiq edildi!");
        } else alert(data.message);
    } catch(err){ console.log(err); }
};
