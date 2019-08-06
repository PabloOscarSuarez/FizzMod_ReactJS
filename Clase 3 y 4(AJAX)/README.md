## AJAX

AJAX es el acrónimo de Asynchronous Javascript and XML, es decir: Javascript y XML Asincrono. Este acrónimo fue utilizado por primera vez por Jesse James Garret en 2005, en su publicación Ajax: a New Approach to Web Applications si bien los componentes en que se basan y los recursos técnicos de que hace uso ya existían desde muchos años antes.

Normalmente, AJAX se define como una técnica para el desarrollo de páginas (sitios) web que implementan aplicaciones interactivas. No obstante, analicemos un poco cada una de las palabras que la forman:

\*Javascript es un lenguaje de programación conocido por ser interpretado por los navegadores de páginas web.

\*XML es un lenguaje de descripción de datos pensado fundamentalmente para el intercambio de datos entre aplicaciones, más que entre personas.

\*Asíncrono: en el contexto de las comunicaciones (y la visualización de una página web no deja de ser una acto de comunicación entre un servidor y un cliente) significa que el emisor emite un mensaje y continúa son su trabajo, dado que no sabe (ni necesita saberlo) cuándo le llegará el mensaje al receptor.

Es decir, que podemos refinar un poco nuestra definición indicando que AJAX es una técnica que permite, mediante programas escritos en Javascript, que un servidor y un navegador intercambien información, posiblemente en XML, de forma asíncrona.

¿Cuál es la diferencia cuando usamos AJAX? La diferencia es que con AJAX no es necesario recargar toda la página web, como ocurre cuando pinchamos en un enlace o cuando pulsamos el botón submit de un formulario. Con AJAX es posible realizar una conexión a un servidor desde dentro de una página web usando un programa Javascript. Dicho servidor enviará una respuesta; esta respuesta se almacenará en una variable del programa Javascript y, una vez almacenada en la variable, podremos hacer con ella lo que deseemos.

---

## Ejemplo de peticion con Ajax

\*En este ejemplo, haremos uso de una API pública, que nos devolverá un listado de usuarios. La url de dicha API será https://reqres.in/api/users/2

```
//Declaramos una nueva instancia de XMLHttpRequest
var xhr = new XMLHttpRequest();

//Esta función se ejecutará tras la petición
xhr.onload = function () {
​
    //Si la petición es exitosa
    if (xhr.status >= 200 && xhr.status < 300) {
        //Mostramos un mensaje de exito y el contenido de la respuesta
        console.log('¡Éxito!', xhr.response);
    } else {
        //Si la conexión falla
        console.log('Error en la petición!');
    }
​
};
​
//Por el primer parametro enviamos el tipo de petición (GET, POST, PUT, DELETE)
//Por el segundo parametro la url de la API
xhr.open('GET', 'https://reqres.in/api/users/2');
//Se envía la petición
xhr.send();
```
