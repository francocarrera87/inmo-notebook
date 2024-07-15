// Archivo: public/list.js

document.addEventListener('DOMContentLoaded', fetchProperties);

async function fetchProperties() {
    try {
        const response = await fetch('http://localhost:3000/inmobiliaria');
        const properties = await response.json();
        displayProperties(properties);
    } catch (error) {
        console.error('Error al cargar las propiedades:', error);
    }
}

function displayProperties(properties) {
    const list = document.getElementById('propertiesList');
    list.innerHTML = '';
    properties.forEach(property => {
        const propertyElement = document.createElement('div');
        propertyElement.innerHTML = `
            <div>${property.nombre} - ${property.modo} - $${property.precio}</div>
            <button onclick="editProperty('${property._id}')">Editar</button>
            <button onclick="deleteProperty('${property._id}')">Eliminar</button>
        `;
        list.appendChild(propertyElement);
    });
}

function filterProperties() {
    const search = document.getElementById('searchBox').value.toLowerCase();
    fetchProperties().then(properties => {
        const filteredProperties = properties.filter(property => property.nombre.toLowerCase().includes(search));
        displayProperties(filteredProperties);
    });
}

async function editProperty(id) {
    // Aquí implementarías la lógica para cargar los datos en el formulario o en un modal de edición
    console.log('Editar propiedad', id);
}

async function deleteProperty(id) {
    if (confirm('¿Estás seguro de querer eliminar esta propiedad?')) {
        try {
            const response = await fetch(`http://localhost:3000/inmobiliaria/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Propiedad eliminada.');
                fetchProperties();  // Recargar la lista
            } else {
                throw new Error('Error al eliminar la propiedad');
            }
        } catch (error) {
            alert('Error al eliminar la propiedad:', error.message);
        }
    }
}
