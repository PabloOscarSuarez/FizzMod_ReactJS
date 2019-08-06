//creo un array con los link de cada html indexsado al index.html
let links = [...document.getElementsByClassName("components")];

//genero el evento por cada link que representa el componente
links.forEach(component => {
  component.addEventListener("click", e => {
    e.preventDefault();
    fetch(e.target.href)
      .then(response => {
        let data = response.text();

        return data;
      })
      .then(data => {
        let component = data;
        let main = document.getElementsByTagName("main")[0];
        main.firstElementChild.remove();
        main.insertAdjacentHTML("afterbegin", component);
      });
  });
});
