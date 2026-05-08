const ZAPIER_URL = "https://hooks.zapier.com/hooks/catch/19247019/uwr0vff/";
const MY_NAME = "Your Name or Email"; // Change this to your identifier
let isInitialized = false;

function updateSessionId() {
    const newId = crypto.randomUUID();
    if (typeof cdApi !== 'undefined') {
        cdApi.setCustomerSessionId(newId);
    }
    document.getElementById('csidVal').innerText = newId;
    return newId;
}

async function callZapier(action, activityType) {
    const payload = {
        customerId: "dummy",
        action: action,
        customerSessionId: document.getElementById('csidVal').innerText,
        activityType: activityType,
        uuid: crypto.randomUUID(),
        brand: "SD",
        solution: "ATO",
        iam: MY_NAME
    };

    try {
        const response = await fetch(ZAPIER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log(`API Response (${action}):`, data);
        return data.status === "success";
    } catch (error) {
        console.error(`API Error (${action}):`, error);
        return false;
    }
}

function navigateTo(context, viewId) {
    if (typeof cdApi !== 'undefined') {
        cdApi.changeContext(context);
    }
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
}

const handleLogin = async () => {
    const username = document.getElementById('username').value || "Guest";

    const success = await callZapier("init", "LOGIN");
    if (success) {
        isInitialized = true;
        document.getElementById('userGreeting').innerText = "Welcome back, " + username;
        navigateTo("account_overview", "accountView");
    } else {
        alert("Initialization failed. Check console.");
    }
};

const handlePayment = async () => {
    const recipient = document.getElementById('recipientName').value;
    const amount = document.getElementById('paymentAmount').value;

    if (!recipient || !amount) {
        alert("Fields cannot be empty.");
        return;
    }

    if (!isInitialized) {
        alert("Error: getScore cannot be triggered before init.");
        return;
    }

    const success = await callZapier("getScore", "PAYMENT");
    if (success) {
        document.getElementById('paymentInputs').classList.add('hidden');
        document.getElementById('postPaymentActions').classList.remove('hidden');
        document.getElementById('paymentStatus').innerText = "Sent $" + amount + " to " + recipient;
    }
};

const handleLogout = () => {
    isInitialized = false;
    updateSessionId();
    document.querySelectorAll('input').forEach(input => input.value = '');
    navigateTo("home_screen", "homeView");
};

document.addEventListener('DOMContentLoaded', () => {
    updateSessionId();
    navigateTo("home_screen", "homeView");

    document.getElementById('toLoginBtn').addEventListener('click', () => navigateTo("login_screen", "loginView"));
    document.getElementById('submitLoginBtn').addEventListener('click', handleLogin);
    document.getElementById('toPaymentBtn').addEventListener('click', () => navigateTo("payment_screen", "paymentView"));
    document.getElementById('backToAccountBtn').addEventListener('click', () => navigateTo("account_overview", "accountView"));
    document.getElementById('sendPaymentBtn').addEventListener('click', handlePayment);

    document.querySelectorAll('.logout-btn').forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });
});