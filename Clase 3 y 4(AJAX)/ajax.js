var btn = document.querySelector("button");
btn.addEventListener("click", () => {
  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("tengo toda la info");

      JSON.parse(xhr.responseText).forEach(producto => {
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
    } else {
      // What do when the request fails
      console.log("The request failed!");
    }

    // Code that should run regardless of the request status
    console.log("This always runs...");
  };

  xhr.open("GET", "http://localhost:4000/productos");
  xhr.send();
});
