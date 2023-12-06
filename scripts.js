const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const response = await fetch('http://localhost:4000/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `mutation { addClient(email: "${email}", password: "${password}") { id } }` }),
  });
  const { data } = await response.json();
  console.log(data);
});