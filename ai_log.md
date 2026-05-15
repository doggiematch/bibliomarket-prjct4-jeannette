# Bibliomarket

Este proyecto es un marketplace de libros de segunda mano entre particulares, donde cada usuario gestiona su propia biblioteca, publica sus libros, reserva, marca favoritos y contacta con otros usuarios/vendedores.

> Proyecto 4 del bootcamp — Semana 2 de backend | Alumna: Jeannette

A continuación, solo una pincelada de mi uso con la IA (otra parte búsquedas en internet).

## 2026-05-11 — [Planificación y setup]

- **Herramienta:** Claude (Perplexity).
- **Contexto:** Siguiendo el cronograma sugerido, el primer día debía elegir un proyecto y su alcance; diseñar las tablas y sus relaciones; crear el repositorio y configurar el entorno; crear el schema de Prisma y una primera migración; implementar la autenticación; y crear la estructura básica del frontend.
- **Prompt usado:** Le pedí ajustar los códigos de una aplicación de ejemplo, al schema creado. Por qué renombrar services a lib. Uso de Zod.
- **Qué obtuve:** Los códigos dados por mí pero adaptados a nombres de tablas de mi proyecto. Pasos para la migración. Nombres de APIS para mi proyecto (escogí Open Library por ser gratuito). Paso a paso de instalaciones tanto de dependencias como de las de desarrollo. Creación de ramas y merge en Github. Reestructurar mi proyecto (empecé solo con backend, sin subcarpeta). Además de lo más importante: qué hace esto, cómo lo hace, qué se espera de él, por qué no así, cuál es la estructura de código y sugerencias en forma de preguntas. Creación del archivo README con el resultado del primer día y resto de información (que fuí adaptando).
- **Qué modificó o descartó:** Modificaciones y mejoras en el schema. Uso de Prisma v6 (en vez de v7) para una migración efectiva. La IA me proponía, p.e., usar CommonJS y yo recordaba haber visto otro sistema de módulos en clase. Modificó mi archivo `bibliomarket.postman_collection` para implementar las peticiones que he hecho en Postman.
- **Tiempo con IA:** 300 min | **Tiempo sin IA (estimado):** 1.440 min
- **Aprendizaje:** Entender se entiende prácticamente todo, es ponerlo en práctica lo que me cuesta, crear, principalmente, código Javascript. Uso bastante Access desde hace muchos años, he aprendido sola y soy consciente que probablemente, tal como he aprendido, no es la mejor forma de usar este programa, pero me he creado muchas bases de datos y cada vez más complejas, con ayuda de foros y blogs (no existía la IA). La 1ª parte (crear las tablas y relaciones) no es tan difícil, pero la IA me ayuda a asentar mejor las bases. Entender que no todos los mensajes que aparecen bien en la terminal o consola son errores, sino avisos.

## 2026-05-12 — [Backend - Core features]

- **Herramienta:** Claude (Perplexity).
- **Contexto:** Siguiendo el cronograma sugerido, el segundo día debía implementar los endpoints principales del CRUD; middleware de autenticación y roles; manejo de errores y validaciones; archivo seed; y tests principales.
- **Prompt usado:** Le pedí que me explicara el paso por paso de todo lo que iba a tener que implementar ese día en la app. Explicación de la arquitectura que debía usar y el por qué.
- **Qué obtuve:** Me explicó el paso a paso para el registro de usuarios. El hasheo de la contraseña con bcrypt. Además de lo más importante: qué hace esto, cómo lo hace, qué se espera de él, por qué no así, cuál es la estructura de código y sugerencias en forma de preguntas. En el archivo de prisma (lib), se creó una instancia de PrismaClient para toda la aplicación, la IA me explicó que si creo una instancia nueva en cada archivo, agotaría las conexiones a la base de datos. Actualización del archivo README con el resultado del segundo día y resto de información (que fuí adaptando). Actualizó mi archivo `bibliomarket.postman_collection` para implementar las peticiones que he hecho en Postman.
- **Qué modificó o descartó:** En un principio no implementé JWT al registrarse un usuario, el role en el registro quedaba bloqueado y faltaba el login. Así que respecto al JWT ya devuelve el token, el role se acepta en el registro y se añadió login. Además, empecé con un export { prisma } que "arrojaba" mensajes de advertencia, se cambió a prisma (default). Me aconsejó que quitará role del body, explicándome que era un agujero de seguridad, ya que cualquiera puede registrarse como admin enviando un campo.
- **Tiempo con IA:** 300 min | **Tiempo sin IA (estimado):** 1.440 min
- **Aprendizaje:** Entender se entiende prácticamente todo, es ponerlo en práctica lo que me cuesta, crear, principalmente, código Javascript. Los códigos de autenticación, en gran parte, son siempre lo mismo, así que reciclo todos estos códigos. Seguí el consejo del docente cuando explicó que es mejor usar el mensaje "Credenciales incorrectas" en el login, ya que si no existe el mail o la contraseña, no se le indica cuál de los 2 falló.

## 2026-05-13 — [Frontend - UI y conexión con API]

- **Herramienta:** Claude (Perplexity) y ChatGPT
- **Contexto:** Siguiendo el cronograma sugerido, el tercer día debía comenzar con el frontend, añadiendo páginas principales como el home, login y registro; un formulario para crear/editar; integración con la API (hasta el momento, había utilizado los ejemplos que añadí en el seed); y context para el usuario autenticado.
- **Prompt usado:** Pedí un prompt para obtener una sugerencia de frontend en Lovable. Me daba sugerencias de naming.
- **Qué obtuve:** Una sugerencia de css poco minimalista, que era finalmente mi objetivo con el frontend. Actualización del archivo README con el resultado del tercer día y resto de información (que fuí adaptando). Actualizó mi archivo `bibliomarket.postman_collection` para implementar las peticiones que he hecho en Postman.
- **Qué modificó o descartó:** No todos los naming sugeridos los utilicé. Finalmente descarté el diseño de Lovable. Modifiqué gran parte del css sugerido. No obstante, no terminé el front.
- **Tiempo con IA:** 300 min | **Tiempo sin IA (estimado):** 2.000 min
- **Aprendizaje:** Recordar construir un formulario y css.

## 2026-05-14 — [Integración y pulido]

- **Herramienta:** ChatGPT
- **Contexto:** Siguiendo el cronograma sugerido, el cuarto día debía realizar la integración externa (opcional); mejorar el responsive; verificar las rutas protegidas en el frontend, manejar sus errores y añadir tests a los creados el primer día.
- **Prompt usado:** Mi prompt se centró principalmente en las rutas y errores.
- **Qué obtuve:** Mejoras en los tests. Actualización del archivo README con el resultado del cuarto día y resto de información (que fuí adaptando).
- **Qué modificó o descartó:** Ningún test me pasaba, así que usé la IA para que revisara los errores.
- **Tiempo con IA:** 420 min | **Tiempo sin IA (estimado):** 1.800 min
- **Aprendizaje:** Los tests me resultan complejos de entender, así como su validación. Además, me di cuenta que no había estado haciendo merge (al main), solo push (de todas las ramas creadas hasta este día), de mi proyecto.

## 2026-05-15 — [Integración y pulido]

- **Herramienta:** ChatGPT
- **Contexto:** Siguiendo el cronograma sugerido, el quinto y último día debía desplegar tanto el back como el frontend; configurar la base de datos en la nube; configurar variables de entorno en producción; y verificar que todo funciona en producción.
- **Prompt usado:** Le pedí a la IA el paso a paso para desplegar el backend (hasta ahora había hecho el deploy directamente del frontend y sin problemas en Vercel y Github). Refactorizar indicándole que primero me indique qué se puede mejorar (porque si lo hace la IA, arregla un trozo de código y fastidia otro, así que prefiero controlarlo preguntando). Generar este documento. Solicité también el paso a paso para hacer el deploy tanto en Vercel como en Render para el front y backend respectivamente.
- **Qué obtuve:** Justo lo que pedí en el prompt, no sin antes pelearme un poco más. Este documento que la IA inventó completamente mi "calvario" con ella y el código. Actualización del archivo README con el resultado del quinto día y resto de información (que terminé adaptando). El deploy en Render se llevó a cabo sin incidencias, no así en Vercel. Después de ambos deploy, con Vercel surgieron problemas (autenticación y géneros principalmente).
- **Qué modificó o descartó:** Problemas con el despliegue del backend. Creé este documento desde cero, manualmente. Cuando intentaba registrarme o loguearme, me aparecía un error de token. Le pedí a la IA ayuda al respecto, pero seguía insistiendo en que tenía mal la API URL, cuando ya lo había comprobado en varias ocasiones. Finalmente yo me di cuenta de que efectivamente la api url estaba mal, pero no por lo comentado por la IA, y es que tenía doble slash. Para obtener los
- **Tiempo con IA:** 300 min | **Tiempo sin IA (estimado):** 1.440 min
- **Aprendizaje:** Como conclusión de todos estos días, sigo ayudándome mucho de la IA, tomo muchos apuntes, pero con mis conocimientos y el tiempo del que disponemos, no me veo capacitada para crear una aplicación completa desde cero yo sola. Antes de este proyecto, creía que tanto el front como el backend se subían a Vercel o Netlify (recuerdo que hace 2 años me enseñaron a hacerlo en otra página que no recuerdo el nombre, pero por entonces no entendía qué estaba haciendo). Tener los datos en psql es en local, y en la nube en Render, por ejemplo. Entendí que era lo mismo, hasta que comprendí que los datos creados en local (incluso los ejemplos del seed) no aparecen en la nube si en Render no se da la instrucción en Build Command.

> NOTA: Durante todo el proyecto he ido pidiendo a la IA que registrara en su memoria distintas pautas, mejoras e ideas que surgían durante las pruebas o a partir de sus propias sugerencias. Al final, le pedí que generara un resumen con todo lo recopilado.
