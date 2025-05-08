const body = document.querySelector("body"),
    modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
    } else {
        localStorage.setItem("status", "open");
    }
})

/*==================== DETALLES MODAL ====================*/

const modalViews = document.querySelectorAll(".detail__modal"),
    modalBtns = document.querySelectorAll(".detail__button"),
    modalCloses = document.querySelectorAll(".detail__modal-close")

let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal")
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal")
        })
    })
})


/*=============== ACCORDION MODAL ===============*/
const accordionItems = document.querySelectorAll('.accordion__item')

// 1. Selecionar cada item
accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector('.accordion__header')

    // 2. Seleccionar cada click del header
    accordionHeader.addEventListener('click', () => {
        // 7. Crear la variable
        const openItem = document.querySelector('.accordion-open')

        // 5. Llamar a la funcion toggle item
        toggleItem(item)

        // 8. Validar si existe la clase
        if (openItem && openItem !== item) {
            toggleItem(openItem)
        }
    })
})

// 3. Crear una funcion tipo constante
const toggleItem = (item) => {
    // 3.1 Crear la variable
    const accordionContent = item.querySelector('.accordion__content')

    // 6. Si existe otro elemento que contenga la clase accorion-open que remueva su clase
    if (item.classList.contains('accordion-open')) {
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    } else {
        // 4. Agregar el height maximo del content
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }
}

/*=============== GENERATE TABLE ROWS ===============*/
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("table-body");

    const data = [
        { inicio: "01/05/2025", remision: "OT-00115-0227819", cliente: "BANCO BBVA PERÚ", direccion: "CL SAN MARTÍN 1499", provincia: "JAEN", departamento: "CAJAMARCA", estado: "ENTREGADO", estadoClass: "estadoentregado" },
        { inicio: "02/05/2025", remision: "OT-00115-0227827", cliente: "BANCO BBVA PERÚ", direccion: "CL SAN MARTÍN 1499", provincia: "SAN IGNACIO", departamento: "CAJAMARCA", estado: "ENTREGADO", estadoClass: "estadoentregado" },
        { inicio: "03/05/2025", remision: "OT-00115-0227821", cliente: "BANCO BBVA PERÚ", direccion: "CL SAN MARTÍN 1499", provincia: "CUTERVO", departamento: "CAJAMARCA", estado: "ENTREGADO", estadoClass: "estadoentregado" },
        { inicio: "03/05/2025", remision: "OT-00115-0227883", cliente: "BCP", direccion: "JR. AMAZONAS 105", provincia: "CELENDÍN", departamento: "CAJAMARCA", estado: "ENTREGADO", estadoClass: "estadoentregado" },
        { inicio: "07/05/2025", remision: "OT-00115-0227901", cliente: "INTERBANK", direccion: "AV. LOS INCAS 120", provincia: "CUSCO", departamento: "CUSCO", estado: "EN RUTA", estadoClass: "estadoenruta" },
        { inicio: "08/05/2025", remision: "OT-00115-0227902", cliente: "BBVA", direccion: "CAL. JUNÍN 890", provincia: "TARMA", departamento: "JUNÍN", estado: "EN RUTA", estadoClass: "estadoenruta" },
        { inicio: "08/05/2025", remision: "OT-00115-0227903", cliente: "SCOTIABANK", direccion: "JR. AREQUIPA 456", provincia: "ILO", departamento: "MOQUEGUA", estado: "EN RUTA", estadoClass: "estadoenruta" },
        { inicio: "08/05/2025", remision: "OT-00115-0227904", cliente: "BCP", direccion: "AV. BOLOGNESI 321", provincia: "TUMBES", departamento: "TUMBES", estado: "EN RUTA", estadoClass: "estadoenruta" },
        { inicio: "09/05/2025", remision: "OT-00115-0227905", cliente: "INTERBANK", direccion: "CL. ANCASH 789", provincia: "PUNO", departamento: "PUNO", estado: "ALMACÉN", estadoClass: "estadoalmacen" },
        { inicio: "09/05/2025", remision: "OT-00115-0227899", cliente: "SCOTIABANK", direccion: "JR. LIMA 456", provincia: "CHOTA", departamento: "CAJAMARCA", estado: "ALMACÉN", estadoClass: "estadoalmacen" },
        { inicio: "10/05/2025", remision: "OT-00115-0227885", cliente: "SCOTIABANK", direccion: "AV. LA TORRE 345", provincia: "JAEN", departamento: "CAJAMARCA", estado: "ALMACÉN", estadoClass: "estadoalmacen" },
    ];

    data.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
      <td data-label="Inicio">${item.inicio}</td>
      <td data-label="G. Remisión">${item.remision}</td>
      <td data-label="Cliente">${item.cliente}</td>
      <td data-label="Dirección">${item.direccion}</td>
      <td data-label="Departamento">${item.departamento}</td>
      <td data-label="Provincia">${item.provincia}</td>
      <td data-label="Estado" class="${item.estadoClass}">${item.estado}</td>
    `;
        tableBody.appendChild(row);
    });
});

function filterByDate() {
    const inputDate = document.getElementById("date-end").value;
    const formattedDate = inputDate.split("-").reverse().join("/"); // Convert YYYY-MM-DD to DD/MM/YYYY
    const tableBody = document.getElementById("table-body");
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const dateCell = row.querySelector("td[data-label='Inicio']");
        if (dateCell) {
            const rowDate = dateCell.textContent.trim();
            row.style.display = rowDate === formattedDate ? "" : "none";
        }
    });
}

function filterByField() {
    const selectField = document.querySelector("select[name='select1']").value;
    const searchValue = document.getElementById("search").value.toLowerCase();
    const tableBody = document.getElementById("table-body");
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const fieldMap = {
            "ejemplo1": "G. Remisión",
            "ejemplo2": "Cliente",
            "ejemplo3": "Dirección",
            "ejemplo4": "Departamento",
            "ejemplo5": "Provincia",
            "ejemplo6": "Estado"
        };

        const fieldLabel = fieldMap[selectField];
        if (fieldLabel) {
            const cell = row.querySelector(`td[data-label='${fieldLabel}']`);
            if (cell) {
                const cellValue = cell.textContent.trim().toLowerCase();
                row.style.display = cellValue.includes(searchValue) ? "" : "none";
            }
        } else {
            row.style.display = ""; // Show all rows if no valid field is selected
        }
    });
}
