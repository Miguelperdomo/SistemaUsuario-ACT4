const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});
btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});
//PROCESO PARA INICIAR SESION
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }
        return response.json();
    })
    .then(data => {
        console.log('Inicio de sesión exitoso', data);
        // Redirigir a otra página
        window.location.href = 'dashboard.html'; 
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al iniciar sesión: ' + error.message);
    });
});
//PROCESO DE REGISTRASE EN LA BASE DE DATOS
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera predeterminada

    const nombre = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, email, password })
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar usuario');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuario registrado exitosamente', data);
        alert('Usuario registrado exitosamente');
        document.getElementById('registerForm').reset(); // Limpiar el formulario
    })
    .catch(error => {
        console.log('Error:', error);
        alert('Error al registrar usuario: ' + error.message);
    });
});