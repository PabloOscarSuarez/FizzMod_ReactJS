//creo un array con los link de cada html indexsado al index.html
let links = [...document.getElementsByClassName("components")];

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", e.target.href);
    xhr.send();

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let component = xhr.response;
        let main = document.getElementsByTagName("main")[0];
        console.log(main);

        main.firstElementChild.remove();
        main.insertAdjacentHTML("afterbegin", component);
      }
    });
  });
});
