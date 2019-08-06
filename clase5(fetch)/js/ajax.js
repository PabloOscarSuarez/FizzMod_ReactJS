var body = document.querySelector("body");
body.addEventListener("click", e => {
  e.preventDefault();

  if (e.target.id == "pet") {
    fetch(
      "https://my-json-server.typicode.com/pablooscarsuarez/CRUD-React-Redux-REST_API-Axios/productos/"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        data.forEach(producto => {
          //selecciono la tabla
          var tabla = document.querySelector("#productos");
          //creo la fila
          var datoProducto = document.createElement("tr");
          //creo cada columna con sus datos
          var tdID = document.createElement("td");
          tdID.innerText = producto.id;
          var tdName = document.createElement("td");
          tdName.innerText = producto.nombre;
          var tdPrecio = document.createElement("td");
          tdPrecio.innerText = producto.precio;
          //agrego a cada columna sus datos
          datoProducto.appendChild(tdID);
          datoProducto.appendChild(tdName);
          datoProducto.appendChild(tdPrecio);
          //ingreso los datos al tbody
          tabla.appendChild(datoProducto);
          tabla.appendChild(datoProducto);
        });
      })
      .catch(console.log);
  }
});
