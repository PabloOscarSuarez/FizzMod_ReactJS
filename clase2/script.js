//selecciono el boton por su id
let btn = document.getElementById("link");

// pongo a escuchar si existe un evento y evito que se ejecute con el preventdefault
btn.addEventListener("click", e => {
  e.preventDefault();

  let p = document.createElement("p");
  p.innerText = "Estas seguro que quieres redirrecionar?";
  let btn1 = document.createElement("button");
  btn1.innerText = "Buscar";
  btn1.id = "Buscar";
  let btn2 = document.createElement("button");
  btn2.innerText = "Cancelar";
  btn2.id = "Cancelar";

  let div = document.createElement("div");
  div.appendChild(p);
  div.appendChild(btn1);
  div.appendChild(btn2);
  document.body.appendChild(div);

  let body = document.body;

  body.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.id == "Buscar") {
      location = "https://google.com";
    }
    if (e.target.id == "Cancelar") {
      body.removeChild(div);
    }
  });
});

//ejercicio terminado de la clase pedida por el profer
