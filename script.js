// ------------------ Registration ------------------
function register(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const wallet = document.getElementById('wallet').value;

    if(!username || !password || !wallet){
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if(users.find(u=>u.username===username)){
        alert("Username already exists");
        return;
    }

    users.push({username,password,wallet,balance:0});
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', username);
    window.location.href="dashboard.html";
}

// ------------------ Login ------------------
function login(){
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u=>u.username===username && u.password===password);
    if(!user){
        alert("Invalid username or password");
        return;
    }

    localStorage.setItem('loggedInUser', username);
    window.location.href="dashboard.html";
}

// ------------------ Logout ------------------
function logout(){
    localStorage.removeItem('loggedInUser');
    window.location.href="login.html";
}

// ------------------ Dashboard ------------------
let balanceEl = document.getElementById('balance');
let walletEl = document.getElementById('wallet-address');
let accountUsernameEl = document.getElementById('account-username');
let accountWalletEl = document.getElementById('account-wallet');
let marketEl = document.getElementById('market-prices');

let coins = [
    {symbol:"BTC", price:60000},
    {symbol:"ETH", price:4000},
    {symbol:"USDT", price:1}
];

// Show/hide sections
function showSection(id){
    const sections = document.querySelectorAll('.section');
    sections.forEach(s=>s.style.display='none');
    document.getElementById(id).style.display='block';
}

// Load user data
function loadUser(){
    const username = localStorage.getItem('loggedInUser');
    if(!username) { window.location.href="login.html"; return; }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u=>u.username===username);

    balanceEl.textContent = user.balance;
    walletEl.textContent = user.wallet;
    accountUsernameEl.textContent = user.username;
    accountWalletEl.textContent = user.wallet;
}

// Simulate deposits
function simulateDeposit(){
    const users = JSON.parse(localStorage.getItem('users'));
    const username = localStorage.getItem('loggedInUser');
    const user = users.find(u=>u.username===username);
    user.balance +=100;
    localStorage.setItem('users', JSON.stringify(users));
    balanceEl.textContent = user.balance;
    alert("Deposited $100 to wallet "+user.wallet);
}

// Simulate withdrawals
function simulateWithdraw(){
    const users = JSON.parse(localStorage.getItem('users'));
    const username = localStorage.getItem('loggedInUser');
    const user = users.find(u=>u.username===username);
    if(user.balance<50){ alert("Insufficient balance"); return;}
    user.balance -=50;
    localStorage.setItem('users', JSON.stringify(users));
    balanceEl.textContent = user.balance;
    alert("Withdrew $50 from wallet "+user.wallet);
}

// Simulate internal transfer
function simulateTransfer(){
    const toUser = document.getElementById('transfer-user').value;
    const amount = Number(document.getElementById('transfer-amount').value);

    if(!toUser || !amount || amount<=0){ alert("Enter valid details"); return; }

    const users = JSON.parse(localStorage.getItem('users'));
    const username = localStorage.getItem('loggedInUser');
    const sender = users.find(u=>u.username===username);
    const receiver = users.find(u=>u.username===toUser);

    if(!receiver){ alert("Recipient not found"); return;}
    if(sender.balance<amount){ alert("Insufficient balance"); return;}

    sender.balance -= amount;
    receiver.balance += amount;

    localStorage.setItem('users', JSON.stringify(users));
    balanceEl.textContent = sender.balance;
    document.getElementById('transfer-message').textContent = "Transferred $"+amount+" to "+toUser;
}

// Simulate market price updates
setInterval(()=>{
    marketEl.innerHTML = '';
    coins.forEach(c=>{
        const change = (Math.random()-0.5)*100;
        c.price += change;
        const li = document.createElement('li');
        li.textContent = `${c.symbol}: $${c.price.toFixed(2)}`;
        marketEl.appendChild(li);
    });
},1000);

// Initialize dashboard
window.onload = loadUser;
function copyAddress() {
    const addr = document.getElementById("wallet-address").textContent;
    navigator.clipboard.writeText(addr);
    alert("Wallet address copied!");
}

function simulateDeposit() {
    let amt = Number(document.getElementById("deposit-amount").value);

    if (!amt || amt <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    balanceUSD += amt;
    renderWallet();

    document.getElementById("deposit-msg").textContent =
        `Deposit of $${amt.toFixed(2)} simulated successfully!`;
}