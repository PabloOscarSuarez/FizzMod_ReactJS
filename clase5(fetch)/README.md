## Introducción

Si hubo un momento clave en el que la tecnología web cambió radicalmente fue cuando Microsoft introdujo su objeto XMLHttpRequest abriendo las puertas a la programación AJAX. Adoptado rápidamente por las compañías más punteras como Google o Mozilla, esta funcionalidad permitía abrir un canal desde una página para obtener información de una URL sin necesidad de recargar nuestro sitio, actualizando con ello solo la información en pantalla que necesitábamos. Actualmente esta tecnología posibilita desde los clientes de correo web hasta servicios cartográficos interactivos pasando por la casi totalidad de webapps modernas.

Sin embargo, la programación AJAX fue muy compleja desde sus inicios. Se necesitaba de mucho código preparatorio, ciertamente oscuro, y unas herramientas para debug que en aquellos días distaban de la potencia de las actuales.

Es en este contexto donde encaja Fetch: una evolución natural y más potente del tradicional XMLHttpRequest en términos de diseño de API. Pasemos a analizarla en detalle.

## Fetch

La API Fetch proporciona un canal para obtener recursos a través de la red. Basándose en un sistema de Peticiones (Request) y Respuestas (Response) permite a un documento o aplicación mantener un diálogo con el servidor de forma segura y semántica.

## Flujo básico

La transacción se realiza siguiendo el proceso ya conocido para quienes trabajan con XMLHttpRequest:

El método fetch() realiza una petición del recurso que necesita sobre el servidor que lo aloja.
El propio objeto devuelve una promesa con el objeto Response de la petición, tanto si tiene éxito como si no.
Una vez obtenida la respuesta, ésta proporciona una serie de métodos que permiten comprobar su contenido y manejarlo.

## Sintaxis general

Visto el funcionamiento a grandes rasgos, pasemos a su sintaxis:

```
fetch( url )
    .then( r => r.json() )
    .then( data => console.info( data ) )
    .catch( e => console.error( 'Something went wrong' ) );
```

En este ejemplo básico, tenemos por un lado la petición (fetch) y el tratamiento de la respuesta mediante promesas (secuenciales). El ‘catch‘ del final permite manejar excepciones, como lo sería un error del servidor.

Si queremos ver algo que funcione, podemos por ejemplo hacer una petición al servicio público JSONTest para que nos devuelva la hora actual:

```
var url = 'http://date.jsontest.com';

fetch( url )
    .then( r => r.json() )
    .then( data => console.dir( data ) )
    .catch( e => console.error( 'Something went wrong' ) );

// time "03:14:10 PM"
// milliseconds_since_epoch 1476026050250
// date "10-09-2016"
```

Como el tratamiento de la respuesta es algo confuso, veamos qué ha pasado paso a paso:

Se ha realizado una petición a la URL indicada. Por defecto, es de tipo GET. Este proceso genera una promesa a la espera de que el servidor conteste con sus correspondientes cabeceras.
Una vez resuelta la primera promesa, se abre un canal que recibe la respuesta completa y la transforma en un JSON. Este proceso de streaming, se gestiona en una segunda promesa.
Una vez tenemos los datos listos, la segunda promesa queda resuelta y podemos trabajar con los datos. En este caso, pintándolos en la consola.
El ‘catch’ final pertenece a la excepción de la primera promesa y nos previene de posibles errores durante el proceso de conversión.
La clave aquí está en el doble procesado (las dos promesas): por un lado, la primera queda a la espera de que el servidor envíe las cabeceras según la petición, mientras que la segunda, mantiene un canal abierto hasta obtener la respuesta completa para su conversión. Finalmente, una vez resueltas ambas, podremos trabajar con los datos en el formato escogido.

Visto esto, pasemos a desgranar cada aspecto con mayor detalle…

## Peticiones

El constructor Request representa nuestra petición al servidor. Dependiendo de la naturaleza de ésta, podemos necesitar parámetros opcionales. Los más habituales son:

**method: el método HTTP de la petición. Por ejemplo: GET (por defecto), POST, DELETE.
**headers: cualquier cabecera HTTP que queramos incluir en la petición.
**body: el contenido que queramos añadir a nuestra petición. Las peticiones de tipo GET no pueden tener body.
**mode: el modo a utilizar por la petición. Por ejemplo: cors, no-cors, o same-origin.
**cache: el modo de caché que queremos utilizar para la petición. Por ejemplo: no-store, reload, no-cache.
**NOTA: La lista completa de parámetros puede verse en la documentación.

Con estos parámetros, una instancia completa de Request se formaría del siguiente modo (continuamos usando el endpoint del ejemplo anterior):

```
var url = 'http://date.jsontest.com',
    params = {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers( {
            'Content-Type': 'application/json'
        } )
    };

var request = new Request( url, params );

fetch( request ).then( r => r.json() )
    .then( data => console.dir( data ) )
    .catch( e => console.error( 'Something went wrong' ) );

// time "03:14:10 PM"
// milliseconds_since_epoch 1476026050250
// date "10-09-2016"
```

## NOTA ##:

Obsérvese que ‘headers’ es a su vez un constructor con su propia API. Más adelante trataremos este aspecto.

De forma alternativa, como ‘fetch‘ internamente funciona como ‘Request‘, no es estrictamente necesario instanciar toda la petición. El siguiente ejemplo es equivalente al anterior:

```
var url = 'http://date.jsontest.com',
    params = {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers( {
            'Content-Type': 'application/json'
        } )
    };


fetch( url, params ).then( /_ response goes here... _/ );
```

NOTA: Llegados a este punto es interesante recordar como esta sintaxis es heredera directa del método ajax() de jQuery. De nuevo, la biblioteca/framework de John Resig aparece como referente en el mismo desarrollo del lenguaje Javascript.

## Cabeceras

Un aspecto importante de las peticiones son las cabeceras que enviamos al servidor para que éste las recoja y responda en consecuencia. Para ello, contamos con el constructor Headers y sus distintos métodos. A continuación podemos ver algunos ejemplos tomados de la web de David Walsh:

```
// Creamos una nueva instancia vacía
var headers = new Headers();

// Añadimos algunas cabeceras
headers.append( 'Content-Type', 'text/plain' );
headers.append( 'X-My-Custom-Header', 'CustomValue' );

// Comprobamos, asignamos y tomamos valores
headers.has( 'Content-Type' ); // true
headers.get( 'Content-Type' ); // "text/plain"
headers.set( 'Content-Type', 'application/json' );

// Borramos una cabecera
headers.delete( 'X-My-Custom-Header' );

// Añadimos valores en el constructor
var headers = new Headers( {
'Content-Type': 'text/plain',
'X-My-Custom-Header': 'CustomValue'
} );
```

## Parámetros GET

Si nuestra petición es de tipo GET y necesita de parámetros, podemos incluirlos de un par de formas:

Directamente en la URL
Es la forma más sucia pero también más simple:

```
var url = 'http://md5.jsontest.com/?text=example_text';

fetch( url ).then( r => r.json() )
.then( data => console.dir( data ) )
.catch( e => console.error( 'Something went wrong' ) );

// md5 "fa4c6baa0812e5b5c80ed8885e55a8a6"
// original "example_text"
```

## Por compisición en la instancia URL

Podemos formar nuestra URL a partir de la API correspondiente e ir agregando los parámetros necesarios:

```
var urlBase = 'http://md5.jsontest.com/',
params = {
text: 'example_text'
};

var url = new URL( urlBase );

Object.keys( params ).forEach( key => url.searchParams.append( key, params[ key ] ) );

fetch( url ).then( /_ Response goes here... _/ );
```

Algo más complejo pero sin duda más estructurado también. La clave aquí está en utilizar el método URL.searchParams para ir concatenando ahí nuestros argumentos.

NOTA: Hay que recordar que el método GET no acepta un cuerpo de datos (body) como sí lo hace POST.

## Envío de datos POST

Si nuestra petición es POST, los datos necesarios los enviamos utilizando la propiedad ‘body‘:

```
var url = 'http://md5.jsontest.com/',
params = {
method: 'POST',
body: JSON.stringify( {
text: 'example_text_post'
} )
 };

fetch( url, params ).then( /_ Response goes here... _/ );
```

NOTA: El código anterior devolverá un mensaje de error por parte del servicio JSONTest porque no acepta el método POST. Sin embargo, se puede comprobar en la consola del navegador como la petición es correcta.

Es importante observar aquí cómo nuestros parámetros tienen que enviarse como una cadena de texto, de ahí que utilicemos JSON.stringify.

## Respuesta

La petición genera promesa que se transforma en una respuesta, en concreto, una instancia de Response.

Response proporciona varios métodos para trabajar con las respuestas. Los más interesantes son:

**clone(): permite crear una copia del objeto de la respuesta.
**error(): devuelve un nuevo objeto de tipo Response para gestionar errores en la petición.
**blob(): crea una promesa que espera la respuesta completa del servidor para devolver finalmente un objeto **Blob.
**json(): crea una promesa que espera la respuesta completa del servidor para devolver finalmente un objeto **JSON.
**text(): crea una promesa que espera la respuesta completa del servidor para devolver finalmente una cadena de texto.
**NOTA: La lista completa de parámetros puede verse en la documentación.

Ya hemos visto cómo podemos trabajar con respuestas de tipo JSON en los fragmentos anteriores. Ponemos a continuación algunos ejemplos con otros formatos:

## Texto

Nos traemos un script completo desde un CDN y lo tratamos como texto. Posteriormente, podríamos re covertirlo en código Javascript utilizando eval:

var url = 'https://code.jquery.com/jquery-3.1.1.slim.min.js';

```
fetch( url )
.then( response => response.text() )
.then( data => console.info( data ) );
```

## Blob

Blob es un formato de datos inmutable que resulta esencial cuando queremos trabajar ficheros directamente. Por ejemplo, si queremos manipular imágenes:

```
var img = 'https://upload.wikimedia.org/wikipedia/commons/9/91/Dennis_Ritchie_%28right%29_Receiving_Japan_Prize.jpeg';

fetch( img )
.then( response => response.blob() )
.then( data => console.dir( data ) );

// size 247616
// type "image/jpeg"
```

## Respuestas opacas o ‘no-cors’

Un tema siempre recurrente en los foros es el error que obtenemos cuando lanzamos una petición AJAX entre dos dominios diferentes.

La directiva de seguridad ‘same-origin‘ restringe cómo un documento descargado desde una fuente puede interactuar con otro recurso de una fuente diferente. Este mecanismo resulta crítico aislar documentos que pueden resultar potencialmente maliciosos.

Podemos comprobar este problema si lanzamos por ejemplo una petición normal sobre la web de OpenLibra:

```
var url = 'https://openlibra.com';

fetch( url )
.then( response => response.text() )
.then( data => console.info( data ) );
// ERROR: Solicitud desde otro origen bloqueada: la política de mismo origen impide leer el recurso remoto
```

Esto ocurre porque estamos realizando una petición de tipo CORS (Cross-Origin Resource Sharing) y la respuesta no tiene habilitadas cabeceras de dicho tipo.

Con fetch podemos realizar la petición indicando el modo (mode) apropiado:

```
var url = 'https://openlibra.com',
params = {
mode: 'no-cors'
};

fetch( url, params )
.then( response => console.info( response.type ) ); // opaque
```

El cambio ahora es que tanto la petición como la respuesta se resuelven correctamente. Sin embargo, dado que la respuesta puede contener datos sensibles, o código malicioso, no podemos verlo: de ahí que el sistema nos lo marque como ‘opaco’ (opaque). Aún así, esa respuesta puede ser consumida por otras APIs:

```

var url = 'https://openlibra.com',
params = {
mode: 'no-cors'
};

self.addEventListener( 'fetch', event => event.respondWith(
fetch( url, params )
) );
```

## Limitaciones

Otro aspecto a tener en cuenta es que estamos tratando una tecnología en desarrollo y, por tanto, se echan de menos algunas funcionalidades importantes presentes en la vieja tecnología XHR:

Cancelación de peticiones: a día de hoy, aunque es posible cancelar la transferencia de un fichero en curso, no lo es cancelar la petición misma antes de que se obtengan las cabeceras.
Peticiones síncronas: consideradas como una mala práctica, las peticiones síncronas no han sido incluídas en el borrador.
