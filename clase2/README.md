El DOM o Document Object Model (Modelo de Objetos del Documento) es una aplicación (API) para definir los documentos HTML, XHTML o XML, como una estructura de arbol lógico, donde cada nodo es un objeto que representa una parte del documento y donde dichos objetos pueden ser manipulados para reflejar cambios en la forma visual del documento. El DOM usualmente tiene muchas similitudes y puede ser casi identico a la estructura html (o XHTML o XML) del documento que modela.

Pero no estamos aquí tanto para aburrir explicando que es el DOM sino para ver que es posible y de hecho muy sencillo usar [JavaScript] para manipular el DOM con el objetivo de cambiar los estilos cuando se cumplen ciertas condiciones. Sólo toma en cuenta que es también posible hacer todo esto usando [Jquery], aunque aquí nos enfocamos en JavaScript puro porque a veces se puede trabajar en proyectos que no permiten ciertas librerías.

## 1. getElementById ##
Veamos el siguiente Gist donde invocamos getElementById:

```
const UnaConstante = document.getElementById("mi_elemento");

//El elemento que accesamos también puede ser dinámico usando:

const UnaConstante = document.getElementById(MiElemento);
//Donde MiElemento será una constante definida en otro lugar. 
```

view rawGetDomElementById.js hosted with ❤ by GitHub
En el código anterior nos valemos del método [getElementById] para localizar un elemento del DOM que posee cierto Id colocado por nosotros en algun elemento HTML, por ejemplo un DIV.

Una vez localizado dicho elemento del DOM este se almacena dentro de una variable o una constante que en el ejemplo anterior es llamada “UnaConstante”, de manera que através de dicha constante podamos acceder el objeto directamente.

```
<div id="mi_elemento"> <p>Manipulando el DOM </p> </div>
```
De manera que si tuvieras un div como al anterior con cualquier elemento HTML dentro podrías aplicar el siguiente código para manipular dicho elemento div:

## Estilizando usando la propiedad style: ##
```
<script>
       const UnaConstante = document.getElementById("mi_elemento");
       UnaConstante.style.backgroundColor = "#2d2d2d";
       UnaConstante.style.color = "white";
       UnaConstante.style.padding = "50px 50px 50px 50px";
   </script>
```
En este caso utilizamos la propiedad style para estilizar el elemento, pero existen otras propiedades que habrímos podido usar como veremos más adelante.

getElementById es una de las maneras más rápidas y eficientes de acceder a cualquier elemento del DOM porque no puede haber dos elementos que compartan el atributo de “id”. En el ejemplo anterior hemos visto como al localizar este elemento del DOM pudimos estilizarlo usando las propiedad style pero es posible usar otras propiedades como className

## Estilizando usando la propiedad className: ##
Ahora ilustraremos que usando el mismo método [getElementById] podemos estilizar utilizando una propiedad distinta.
```
 <style>
     .cool {
         background-color: #333;
         color: greenyellow;
         padding: 100px;
     }
 </style>

<div id="otro_elemento">
  <p>Manipulando el DOM con className </p>
</div>
```
Notese como los estilos en el código anterior están asignados a una clase llamada .cool porque vamos a usar la propiedad className
```
  <script>
     const OtraConstante = document.getElementById("otro_elemento");
     OtraConstante.className = 'cool'
  </script>
  ```
Lo que hace este código es agregar la clase “cool” al elemento del DOM que posee el id “otro_elemento” en este caso un DIV.

## 2. querySelector() ##
[querySelector] regresa el primer elemento del nodo que concuerda con un selector o grupo de selectores de tipo CSS.

Tomemos el cuenta el siguiente HTML:
```
 <style>
     .red {background-color: red; padding: 10px;}
     .blue {background-color: dodgerblue; padding: 10px;}
     .gray {background-color: dimgray; padding: 10px;}
 </style>

  <body>
      <div>
          <h1>Usando querySelector</h1>
          <ul>
              <li class="red">Primer Elemento</li>
              <li class="red">Segundo Elemento</li>
              <li class="red">Tercero Elemento</li>
              <li class="gray">Cuarto Elemento</li>
          </ul>
      </div>
  </body>
Y apliquemos el siguiente JavaScript:


<script>
    // querySelector regresa solamente la primer concordancia.
    const MiConstante = document.querySelector('li.red');
    MiConstante.className = 'blue';
 </script>

  <script>
      // querySelectorAll regresa una lista de Nodos.
      // Aunque estrictamente hablando se especifica seleccionar
      // el segundo nodo, (con el num. 1) en este contexto en
      // realidad es el tercer elemento de la lista que se
      // termina seleccionado debido al query anterior.
      const MiConstante2 = document.querySelectorAll('li.red');
      MiConstante2[1].className = 'blue';
  </script>
```

Vemos que además de querySelector tenemos [querySelectorAll] que en lugar de retornar un solo elemento más bien regresa una [NodeList] que no es más que una colección de elementos DOM organizada de forma parecida a un arreglo. En otras palabras querySelectorAll regresa una lista de resultados.

Es posible acceder a los nodos individuales utilizando la sintaxis de brackets cuadrados para acceder a los nodos individuales de entre la colección entera. En el ejemplo anterior puede verse en la línea 15 que seleccionamos el segundo nodo de la colección utilizando el número 1 dentro de los brackets. Esto es porque en realidad la colección de nodos comienza desde el número 0.

## 3. getElementsByTagName ##
Con getElementById solo podemos acceder a un elemento del DOM, pero hay casos en que deseamos acceder a varios elementos y de entre ellos solo seleccionar algunos otros.

Consideremos la siguiente lista en HTML:
```
    <div>
       <h1>Usando getElementsByTagName</h1>
       <ul>
           <li class="gray">Uno <a href="#">CLIC</a></li>
           <li class="gray">Dos</li>
           <li class="gray">Tres
            <a class="link" href="#">CLIC</a></li>
           <li class="gray">Cuarto</li>
           <li class="gray">Cinco
            <a class="link" href="#">CLIC</a></li>
           <li class="gray">Seis <a href="#">CLIC</a></li>

       </ul>
   </div>
  ```
Como puede verse el tercer y quinto elemento <li> de la lista poseen un tag de tipo “a” con una clase llamada “link”.

El siguiente código es sencillo y casi se explica por si mismo.Lo único que hace es utilizar el método [getElementsByTagName] para encontrar un sólo elemento de una NodeList (en caso de que exista) y cambia el estilo a dicho elemento.

  ```
  <script>
      // Encontrar los elementos <li> y ponerlos en una variable
      var elements = document.getElementsByTagName('li');
      
      if (elements.length > 0) {  // Si más de uno es encontrado

          var el = elements[3];     // Selecciona el cuarto elemento de la colección
          el.className = 'cool';    // Cambia el valor del atributo clase
      }
  </script>
  ```

## Repitiendo acciones en una NodeList ##
Pero a veces queremos verificar no un elemento como en el caso anterior sino todos los elementos de una NodeList de forma iterativa (repitiva). ¡Pues buenas noticias! Cuando tenemos una NodeList es muy fácil realizar loops en cada nodo de la colección entera para aplicar ciertas acciones.

```
  <script>
     const UnaConstante = document.getElementsByTagName("a");
     for (var i = 0; i < UnaConstante.length; i++) {
       UnaConstante[i].style.backgroundColor = "#00FF00";
      }
  </script>
  ```
   
En el código de arriba creamos un LOOP usando un FOR para navegar por todos los elementos de la NodeList. Y todos los statements que se encuentran dentro de los curlybraces { } son aplicados a cada uno de los elementos de la NodeList uno por uno. Para indicar cual elemento de la NodeList es con el que se trabaja se usa la variable i que se incrementa en una unidad por cada iteración del LOOP.

Repitiendo acciones en elementos de una NodeList en caso de que cumplan cierta condición
Hasta ahora todo muy bien, Sin embargo eres un desarrollador activo no va a pasar mucho tiempo antes de que necesites repetir acciones en los elementos de una NodeList que además deben cumplir con una condición como tener una cierta clase asignada. En ese caso usaríamos un código como el que se muestra a continuación:
```
  <script>
        const UnaConstante = document.getElementsByTagName("a");  
        for (var i = 0; i < UnaConstante.length; i++) {
            if (UnaConstante[i].className == "link") {
                UnaConstante[i].onclick = function() {
                    this.style.backgroundColor = "#00FF00";
                }
            }
        }
  </script>
```
    
Notese como además hemos agregado el evento onclick de manera que para asignar el estilo se debe hacer clic.

Bueno con esto hemos mostrado por medio de varios ejemplos nociones esenciales sobre métodos bien establecidos del DOM como getElementById; querySelector; querySelectorAll y getElementsByTagName. Existen muchas opciones de como puedes sacar ventaja usando estos métodos con JavaScript.
Un saludo a todos Atentamente Pablo.
