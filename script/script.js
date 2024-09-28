const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});



// // Obtener los roles desde el servidor
// document.addEventListener('DOMContentLoaded', function() {
//     fetch('http://localhost:3000/roles')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error al obtener roles');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const roleSelect = document.getElementById('roleSelect');
//             data.forEach(role => {
//                 const option = document.createElement('option');
//                 option.value = role.id_role; // Asume que el campo es id_role
//                 option.textContent = role.nombre_rol; // Asume que el nombre del rol es role_name
//                 roleSelect.appendChild(option);
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Error al cargar los roles: ' + error.message);
//         });
// });





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
    // const id_rol = document.getElementById('roleSelect').value; // Obtener el rol seleccionado

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
        // Puedes redirigir a otra página o limpiar el formulario aquí
        document.getElementById('registerForm').reset(); // Limpiar el formulario
    })
    .catch(error => {
        console.log('Error:', error);
        alert('Error al registrar usuario: ' + error.message);
    });
});