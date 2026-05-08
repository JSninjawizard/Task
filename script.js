function updateSessionId() {
    const newId = crypto.randomUUID();

    if (typeof cdApi !== 'undefined') {
        cdApi.setCustomerSessionId(newId);
        console.log("SDK: Session ID updated ->", newId);
    }

    document.getElementById('csidVal').innerText = newId;
}

function navigateTo(context, viewId) {
    if (typeof cdApi !== 'undefined') {
        cdApi.changeContext(context);
        console.log("SDK: Context changed to ->", context);
    }

    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');

    if (viewId === 'paymentView') {
        document.getElementById('paymentInputs').classList.remove('hidden');
        document.getElementById('postPaymentActions').classList.add('hidden');
    }
}

const handleLogin = () => {
    const username = document.getElementById('username').value || "Guest";
    document.getElementById('userGreeting').innerText = `Welcome back, ${username}`;
    navigateTo("account_overview", "accountView");
};

const handlePayment = () => {
    const recipient = document.getElementById('recipientName').value;
    const amount = document.getElementById('paymentAmount').value;

    if (!recipient || !amount) {
        alert("Fields cannot be empty.");
        return;
    }

    document.getElementById('paymentInputs').classList.add('hidden');
    document.getElementById('postPaymentActions').classList.remove('hidden');
    document.getElementById('paymentStatus').innerText = `Sent $${amount} to ${recipient}`;
};

const handleLogout = () => {
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