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


document.getElementById('datosEnvio').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('idNombre').value;
  const lastName = document.getElementById('idApellido').value;
  const address = document.getElementById('idDireccion').value;
  const phone = document.getElementById('idTelefono').value;
  const email = document.getElementById('idCorreo').value;

  const query = `mutation { addClient(name: "${name}", lastName: "${lastName}", address: "${address}", phone: "${phone}", email: "${email}") { id } }`;
  fetch('http://localhost:4000/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }).then (res => res.json())
  .then (data => console.log(data))
  .catch (err => console.log(err));
// Add missing closing bracket
});