# Preguntas y Respuestas Para Defender Bibliomarket

## 1. Idea General

1. **¿Cuál es el objetivo principal de Bibliomarket?**  
   Bibliomarket es una app para comprar, vender, reservar y guardar libros de segunda mano entre particulares.

2. **¿Qué problema intenta resolver la aplicación?**  
   Resuelve que muchas personas tienen libros en casa sin usar y no tienen una forma sencilla de darles salida.

3. **¿Qué tipo de usuarios pueden usar la aplicación?**  
   La pueden usar visitantes, usuarios registrados y, a nivel técnico, también existe rol administrador.

4. **¿Qué puede hacer un usuario sin iniciar sesión?**  
   Sin iniciar sesión se pueden ver y buscar libros.

5. **¿Qué puede hacer un usuario registrado?**  
   Un usuario registrado puede publicar libros, reservar, guardar favoritos y gestionar su biblioteca.

6. **¿Qué diferencia hay entre explorar libros y gestionar “Mi biblioteca”?**  
   Explorar es para ver libros de otros usuarios; Mi biblioteca es para gestionar mis libros, reservas y favoritos.

7. **¿Por qué decidiste separar frontend y backend?**  
   Separé frontend y backend para tener responsabilidades claras: interfaz por un lado y lógica/API por otro.

## 2. Tecnologías

8. **¿Qué tecnologías principales usaste en el frontend?**  
   En frontend usé React, Vite, React Router, CSS Modules y Fetch.

9. **¿Qué tecnologías principales usaste en el backend?**  
   En backend usé Node.js, Express, Prisma, PostgreSQL, JWT, bcrypt y Zod.

10. **¿Qué papel tiene PostgreSQL en la aplicación?**  
    PostgreSQL guarda los usuarios, libros, géneros, reservas y favoritos.

11. **¿Qué papel tiene Prisma dentro del proyecto?**  
    Prisma conecta el backend con la base de datos y me permite trabajar con modelos en JavaScript.

12. **¿Qué es una API REST en el contexto de tu backend?**  
    Mi API REST es el conjunto de rutas que permiten crear, leer, actualizar y eliminar datos.

13. **¿Por qué usaste React para el frontend?**  
    Usé React porque permite crear interfaces por componentes y manejar estados de forma ordenada.

14. **¿Por qué usaste Vite?**  
    Usé Vite porque facilita el desarrollo rápido del frontend.

15. **¿Para qué usaste React Router?**  
    React Router gestiona la navegación entre páginas.

16. **¿Qué rutas principales tiene tu frontend?**  
    Las rutas principales son home, login, registro, libros, detalle, crear/editar libro, mi biblioteca y dashboard.

## 3. Autenticación y Usuarios

17. **¿Qué muestra la página Home?**  
    Home presenta la idea principal de la aplicación.

18. **¿Qué ocurre cuando un usuario se registra?**  
    Al registrarse, el usuario se crea en la base de datos y recibe un token.

19. **¿Qué datos necesita el registro?**  
    El registro necesita nombre, email y contraseña.

20. **¿Qué ocurre cuando un usuario inicia sesión?**  
    Al iniciar sesión, se comprueban las credenciales y se devuelve el usuario con un token.

21. **¿Dónde se guarda el token del usuario en el frontend?**  
    El token se guarda en `localStorage`.

22. **¿Qué guarda el `AuthContext`?**  
    `AuthContext` guarda el usuario, el estado de carga y las funciones de login/logout.

23. **¿Para qué sirve `ProtectedRoute`?**  
    `ProtectedRoute` protege páginas que requieren estar autenticado.

24. **¿Qué páginas están protegidas?**  
    Protege mi biblioteca, crear libro, editar libro y dashboard.

25. **¿Por qué `/my-books` necesita autenticación?**  
    `/my-books` necesita autenticación porque muestra datos privados del usuario.

26. **¿Por qué `/books/new` necesita autenticación?**  
    `/books/new` necesita autenticación porque solo un usuario registrado puede publicar.

27. **¿Por qué `/dashboard` está limitado al rol `ADMIN`?**  
    `/dashboard` está limitado al admin porque sería una zona de gestión.

28. **¿Qué diferencia hay entre un usuario `USER` y un usuario `ADMIN`?**  
    `USER` es usuario normal y `ADMIN` tiene permisos extra.

29. **¿Qué es JWT?**  
    JWT es un token firmado que identifica al usuario.

30. **¿Qué información guardas dentro del token JWT?**  
    Guardo id, email y rol del usuario.

31. **¿Por qué no devuelves la contraseña al hacer login?**  
    No devuelvo la contraseña por seguridad.

32. **¿Por qué se hashea la contraseña con `bcrypt`?**  
    Uso bcrypt para no guardar contraseñas en texto plano.

33. **¿Qué significa `bcrypt.hash(password, 10)`?**  
    Significa que la contraseña se cifra con un coste de seguridad 10.

34. **¿Cómo comprueba el backend si una contraseña es correcta?**  
    El backend compara la contraseña enviada con la contraseña hasheada.

35. **¿Qué ocurre si el email no existe en el login?**  
    Devuelve error de credenciales incorrectas.

36. **¿Qué ocurre si la contraseña es incorrecta?**  
    También devuelve error de credenciales incorrectas.

37. **¿Qué middleware valida si hay token?**  
    El middleware `verifyToken`.

38. **¿Qué diferencia hay entre `verifyToken` y `optionalAuth`?**  
    `verifyToken` exige token; `optionalAuth` lo usa solo si existe.

39. **¿Por qué `getBooks` usa `optionalAuth`?**  
    Porque la lista de libros puede verse sin login, pero cambia si el usuario está logueado.

40. **¿Qué ventaja tiene saber quién es el usuario aunque la ruta sea pública?**  
    Permite ocultar mis propios libros, favoritos o reservas.

41. **¿Por qué ocultas al usuario sus propios libros en la lista general?**  
    Porque no tiene sentido comprar o reservar mis propios libros.

42. **¿Por qué ocultas libros ya reservados o favoritos por ese usuario?**  
    Para que la exploración muestre libros realmente disponibles para ese usuario.

## 4. Base de Datos y Modelo Prisma

43. **¿Qué modelos principales tienes en Prisma?**  
    `User`, `Book`, `Genre`, `Reservation` y `Favorite`.

44. **¿Qué representa el modelo `User`?**  
    `User` representa a una persona registrada.

45. **¿Qué representa el modelo `Book`?**  
    `Book` representa un libro publicado.

46. **¿Qué representa el modelo `Genre`?**  
    `Genre` representa el género del libro.

47. **¿Qué representa el modelo `Reservation`?**  
    `Reservation` representa una reserva hecha por un usuario.

48. **¿Qué representa el modelo `Favorite`?**  
    `Favorite` representa un libro guardado como favorito.

49. **¿Qué relación hay entre `User` y `Book`?**  
    Un usuario puede tener muchos libros.

50. **¿Qué relación hay entre `Book` y `Genre`?**  
    Un libro pertenece a un género.

51. **¿Qué relación hay entre `User` y `Reservation`?**  
    Un usuario puede hacer muchas reservas.

52. **¿Qué relación hay entre `User` y `Favorite`?**  
    Un usuario puede tener muchos favoritos.

53. **¿Por qué `Favorite` tiene una restricción `@@unique([bookId, userId])`?**  
    Para que un usuario no pueda guardar el mismo libro dos veces.

54. **¿Qué problema evita esa restricción única en favoritos?**  
    Evita favoritos duplicados.

55. **¿Qué estados puede tener un libro?**  
    Disponible, reservado, vendido o retirado.

56. **¿Qué significa `AVAILABLE`?**  
    `AVAILABLE` significa disponible.

57. **¿Qué significa `RESERVED`?**  
    `RESERVED` significa reservado.

58. **¿Qué significa `SOLD`?**  
    `SOLD` significa vendido.

59. **¿Qué significa `CANCELLED`?**  
    `CANCELLED` significa retirado.

60. **¿Qué estados puede tener una reserva?**  
    Pendiente, confirmada, cancelada o expirada.

61. **¿Por qué una reserva tiene `expiresAt`?**  
    Para controlar hasta cuándo dura una reserva.

62. **¿Qué condiciones puede tener un libro?**  
    Como nuevo, buen estado, aceptable o con defectos.

63. **¿Por qué usaste enums para condición y estado?**  
    Para tener valores controlados y evitar datos inconsistentes.

64. **¿Qué campos obligatorios tiene un libro?**  
    Título, autor, condición, precio, usuario y género.

65. **¿Qué campos opcionales tiene un libro?**  
    ISBN, portada, año, idioma, sinopsis y descripción.

66. **¿Para qué sirve `coverUrl`?**  
    Sirve para mostrar la portada del libro.

67. **¿Para qué sirve `synopsis`?**  
    Sirve para describir el contenido del libro.

68. **¿Para qué sirve `description`?**  
    Sirve para explicar el estado físico del ejemplar.

69. **¿Qué diferencia hay entre sinopsis y descripción del ejemplar?**  
    La sinopsis habla del libro; la descripción habla del ejemplar concreto.

## 5. Rutas del Backend

70. **¿Qué hace la ruta `GET /api/books`?**  
    Devuelve la lista de libros.

71. **¿Qué filtros acepta la ruta de libros?**  
    Género, precio, condición, texto y estado.

72. **¿Cómo se filtra por género?**  
    Comparando el `genreId`.

73. **¿Cómo se filtra por estado?**  
    Filtrando por `AVAILABLE` o `RESERVED`.

74. **¿Cómo se filtra por texto de búsqueda?**  
    Buscando coincidencias con el texto introducido.

75. **¿Qué campos busca el parámetro `q`?**  
    Título, autor e ISBN.

76. **¿Qué hace la ruta `GET /api/books/mine`?**  
    Devuelve los libros creados por el usuario logueado.

77. **¿Qué hace la ruta `GET /api/books/:id`?**  
    Devuelve un libro concreto por id.

78. **¿Qué hace la ruta `POST /api/books`?**  
    Crea un nuevo libro.

79. **¿Qué hace la ruta `PUT /api/books/:id`?**  
    Actualiza un libro existente.

80. **¿Qué hace la ruta `DELETE /api/books/:id`?**  
    Retira un libro cambiando su estado.

81. **¿Por qué retirar un libro cambia su estado a `CANCELLED` en vez de borrarlo directamente?**  
    Porque así no se pierde el historial y se puede reactivar.

82. **¿Qué hace la ruta de borrado permanente?**  
    Borra el libro definitivamente de la base de datos.

83. **¿Por qué el borrado permanente usa una transacción?**  
    Para borrar reservas relacionadas y libro de forma segura.

84. **¿Qué comprueba el backend antes de permitir editar un libro?**  
    Comprueba que sea el dueño o admin.

85. **¿Qué comprueba el backend antes de permitir retirar un libro?**  
    Comprueba que sea el dueño o admin.

86. **¿Qué comprueba el backend antes de permitir reactivar un libro?**  
    Comprueba que sea el dueño o admin.

87. **¿Qué hace la ruta `PATCH /api/books/:id/reactivate`?**  
    Cambia un libro retirado a disponible.

## 6. Reservas y Favoritos

88. **¿Qué hace el controlador `createReservation`?**  
    Crea una reserva para un libro.

89. **¿Qué validaciones se hacen antes de crear una reserva?**  
    Comprueba que el libro exista, esté disponible y no sea propio.

90. **¿Por qué no se puede reservar un libro propio?**  
    Porque no tendría sentido reservar algo que yo misma publiqué.

91. **¿Por qué no se puede reservar un libro que no está disponible?**  
    Porque ya está reservado o no disponible.

92. **¿Qué ocurre con el estado del libro cuando se crea una reserva?**  
    Pasa a estado reservado.

93. **¿Qué ocurre con el estado del libro cuando se elimina una reserva?**  
    El libro vuelve a estar disponible.

94. **¿Por qué `deleteReservation` usa una transacción?**  
    Para borrar la reserva y actualizar el libro juntos.

95. **¿Qué hace `GET /api/reservations/mine`?**  
    Devuelve mis reservas.

96. **¿Qué hace `DELETE /api/reservations/:id`?**  
    Elimina una reserva.

97. **¿Quién puede quitar una reserva?**  
    El comprador o un admin.

98. **¿Qué hace `GET /api/favorites/mine`?**  
    Devuelve mis favoritos.

99. **¿Qué hace `POST /api/favorites/:bookId`?**  
    Añade un libro a favoritos.

100. **¿Por qué usas `upsert` al añadir un favorito?**  
     Para crear el favorito solo si no existía ya.

101. **¿Qué hace `DELETE /api/favorites/:bookId`?**  
     Quita un libro de favoritos.

102. **¿Qué ocurre si intentas añadir a favoritos un libro que no existe?**  
     Devuelve error de libro no encontrado.

## 7. Validación y Errores

103. **¿Para qué sirve el middleware `validate`?**  
     Valida los datos antes de llegar al controlador.

104. **¿Qué librería usas para validar datos?**  
     Uso Zod.

105. **¿Qué diferencia hay entre validar en frontend y validar en backend?**  
     Frontend ayuda al usuario; backend protege la aplicación.

106. **¿Por qué es importante validar también en backend?**  
     Porque el frontend se puede saltar, pero el backend no.

107. **¿Qué ocurre cuando una validación falla?**  
     Devuelve un error 400 con el mensaje de validación.

108. **¿Qué hace el `errorHandler`?**  
     Centraliza el manejo de errores.

109. **¿Por qué centralizar errores en un middleware?**  
     Para no repetir lógica de errores en cada ruta.

110. **¿Qué hace `prisma.findUniqueOrThrow`?**  
     Busca un registro y lanza error si no existe.

111. **¿Qué ventaja tiene usar Prisma frente a escribir SQL manualmente?**  
     Prisma evita escribir SQL manual y trabaja con modelos.

112. **¿Qué es una migración de Prisma?**  
     Es un cambio versionado en la estructura de la base de datos.

113. **¿Para qué sirve el archivo `schema.prisma`?**  
     Define modelos, relaciones y enums.

114. **¿Para qué sirve `seed.js`?**  
     Sirve para cargar datos iniciales.

115. **¿Qué datos iniciales necesita la aplicación para funcionar bien?**  
     Géneros y, si se desea, usuarios o libros de prueba.

## 8. Open Library

116. **¿Qué hace la integración con Open Library?**  
     Permite buscar libros externos y autocompletar datos.

117. **¿Por qué decidiste consumir Open Library desde el backend?**  
     Para controlar la petición desde mi API y no depender directamente del frontend.

118. **¿Qué endpoint usas para buscar en Open Library?**  
     Uso el endpoint de búsqueda de Open Library.

119. **¿Qué campos pides a Open Library?**  
     Título, autor, año, ISBN, portada, idioma y materias.

120. **¿Cómo obtienes la portada de un libro desde Open Library?**  
     Con el `cover_i` construyo la URL de portada.

121. **¿Cómo obtienes la sinopsis de un libro desde Open Library?**  
     Consulto la obra asociada y extraigo la descripción.

122. **¿Qué ocurre si Open Library no devuelve descripción?**  
     Se deja la sinopsis vacía.

123. **¿Qué ocurre si Open Library responde con error?**  
     El backend devuelve un error controlado.

124. **¿Por qué limitas la búsqueda de Open Library a 5 resultados?**  
     Para no cargar demasiados resultados y mantenerlo usable.

## 9. Formulario de Libros

125. **¿Qué hace la página `BookForm`?**  
     Sirve para crear o editar libros.

126. **¿Cómo diferencia `BookForm` entre crear y editar?**  
     Si hay id en la URL, edita; si no, crea.

127. **¿Qué papel tiene `useParams` en `BookForm`?**  
     `useParams` obtiene el id del libro.

128. **¿Qué papel tiene `useNavigate` en `BookForm`?**  
     `useNavigate` redirige después de guardar.

129. **¿Qué campos rellena automáticamente Open Library?**  
     Título, autor, año, ISBN, idioma, sinopsis y portada.

130. **¿Qué campos debe completar manualmente el usuario?**  
     Precio, condición, género y descripción física.

131. **¿Qué ocurre al seleccionar un resultado de Open Library?**  
     Se rellenan campos del formulario automáticamente.

132. **¿Por qué conviertes `price` a número antes de enviarlo?**  
     Porque el backend espera un número.

133. **¿Por qué conviertes `genreId` a número antes de enviarlo?**  
     Porque el id del género es numérico.

134. **¿Por qué conviertes `year` a número si existe?**  
     Porque el año también debe ser numérico.

135. **¿Qué ocurre después de crear un libro correctamente?**  
     Redirige al detalle del libro creado.

136. **¿Qué ocurre después de editar un libro correctamente?**  
     Redirige al detalle del libro actualizado.

137. **¿Qué hace el botón “Limpiar”?**  
     Vacía el formulario.

138. **¿Qué hace el botón “Ver imagen”?**  
     Abre una vista previa de la portada.

## 10. Exploración de Libros

139. **¿Qué muestra la página `BookList`?**  
     Muestra los libros disponibles para explorar.

140. **¿Qué estados visuales maneja `BookList`?**  
     Carga, error, sin resultados y listado.

141. **¿Qué ocurre mientras se cargan los libros?**  
     Muestra “Cargando libros...”.

142. **¿Qué ocurre si hay un error cargando libros?**  
     Muestra un mensaje de error.

143. **¿Qué ocurre si no hay libros con esos filtros?**  
     Muestra un mensaje indicando que no hay libros.

144. **¿Cómo funciona la búsqueda con `useDebounce`?**  
     Espera un poco antes de lanzar la búsqueda.

145. **¿Por qué usaste debounce en la búsqueda?**  
     Para no hacer una petición por cada tecla.

146. **¿Qué problema evita el debounce?**  
     Evita demasiadas llamadas al backend.

147. **¿Qué filtros tiene la lista de libros?**  
     Texto, género y estado.

148. **¿Cómo se añade un libro a favoritos desde la lista?**  
     Pulsando el botón Favorito.

149. **¿Qué ocurre si un usuario no autenticado intenta guardar favoritos?**  
     Se muestra un error pidiendo iniciar sesión.

150. **¿Por qué deshabilitas el botón si el libro ya está en favoritos?**  
     Para evitar repetir la misma acción.

151. **¿Qué muestra la página `BookDetail`?**  
     Muestra la información completa de un libro.

152. **¿Qué acciones puede hacer el usuario desde el detalle de un libro?**  
     Puede ver datos y reservar si corresponde.

153. **¿Dónde se realiza la reserva de un libro desde el frontend?**  
     Desde el detalle del libro.

154. **¿Qué mensaje debería recibir el usuario si la reserva falla?**  
     Un mensaje explicando que no se pudo reservar.

## 11. Mi Biblioteca

155. **¿Qué muestra la página `MyBooks`?**  
     Mis libros publicados, mis reservas y mis favoritos.

156. **¿Por qué `MyBooks` carga libros, reservas, favoritos y géneros a la vez?**  
     Porque esa página necesita mostrar todo mi contenido.

157. **¿Para qué usas `Promise.all` en `MyBooks`?**  
     Para cargar varias peticiones a la vez.

158. **¿Qué secciones tiene “Mi biblioteca”?**  
     Libros puestos a la venta, libros reservados y favoritos.

159. **¿Qué son “Libros puestos a la venta”?**  
     Son los libros que yo publiqué.

160. **¿Qué son “Libros reservados”?**  
     Son los libros que he reservado.

161. **¿Qué son “Mis favoritos”?**  
     Son los libros que he guardado.

162. **¿Qué filtros existen dentro de “Mi biblioteca”?**  
     Búsqueda, género y estado.

163. **¿Cómo se filtran los libros propios?**  
     Con una función que compara texto, género y estado.

164. **¿Cómo se filtran las reservas?**  
     Filtrando el libro asociado a cada reserva.

165. **¿Cómo se filtran los favoritos?**  
     Filtrando el libro asociado a cada favorito.

166. **¿Para qué usas `useMemo` en `MyBooks`?**  
     Para no recalcular filtros innecesariamente.

167. **¿Qué acción realiza “Retirar”?**  
     Cambia el libro a retirado.

168. **¿Qué acción realiza “Reactivar”?**  
     Vuelve a poner el libro disponible.

169. **¿Qué acción realiza “Eliminar”?**  
     Borra el libro de forma permanente.

170. **¿Cuál es la diferencia entre retirar y eliminar permanentemente?**  
     Retirar conserva el libro; eliminar lo borra.

171. **¿Por qué pides confirmación antes de retirar un libro?**  
     Para evitar una acción accidental.

172. **¿Por qué pides confirmación antes de eliminar un libro?**  
     Porque es una acción más destructiva.

173. **¿Qué acción realiza “Quitar reserva”?**  
     Cancela mi reserva y libera el libro.

174. **¿Qué acción realiza “Quitar de favoritos”?**  
     Elimina ese libro de mi lista de favoritos.

175. **¿Qué muestra el componente `BookTable`?**  
     Muestra libros en formato tabla con acciones.

176. **¿Por qué reutilizas `BookTable` para varias secciones?**  
     Para reutilizar el mismo diseño en varias secciones.

## 12. Frontend, Estilos y Comunicación

177. **¿Qué hace el archivo `config/api.js`?**  
     Centraliza la URL del backend.

178. **¿Cómo cambia la URL de la API entre desarrollo y producción?**  
     Usa una URL según el entorno configurado.

179. **¿Qué papel tiene `Navbar`?**  
     Permite navegar por la aplicación.

180. **¿Cómo cambia la navegación según si el usuario está logueado?**  
     Muestra opciones diferentes según si hay usuario.

181. **¿Qué ocurre al cerrar sesión?**  
     Se borra la sesión local.

182. **¿Por qué eliminas `token` y `user` del `localStorage` al cerrar sesión?**  
     Para cerrar la sesión completamente.

183. **¿Qué ventajas tiene CSS Modules en tus páginas?**  
     Evitan conflictos de estilos entre páginas.

184. **¿Por qué cada página tiene su propio archivo `.module.css`?**  
     Para mantener estilos separados y organizados.

185. **¿Qué parte del diseño ayuda a que la aplicación sea fácil de usar?**  
     Los filtros, estados claros y secciones separadas.

186. **¿Qué decisiones tomaste para mostrar estados de libros como disponible o reservado?**  
     Usé etiquetas visuales para que el estado sea fácil de leer.

187. **¿Cómo se comunica el frontend con el backend?**  
     Con peticiones `fetch` a la API.

188. **¿Qué método HTTP usas para crear datos?**  
     `POST`.

189. **¿Qué método HTTP usas para actualizar datos?**  
     `PUT` o `PATCH`.

190. **¿Qué método HTTP usas para eliminar o retirar datos?**  
     `DELETE`.

191. **¿Qué método HTTP usas para consultar datos?**  
     `GET`.

192. **¿Qué cabecera envía el frontend cuando necesita autenticación?**  
     La cabecera `Authorization`.

193. **¿Qué significa `Authorization: Bearer token`?**  
     Significa que envío el token como prueba de sesión.

194. **¿Qué pasa en el backend si no llega esa cabecera?**  
     Devuelve error de token requerido.

195. **¿Qué pasa en el backend si el token es inválido?**  
     Devuelve error de token inválido.

## 13. Despliegue

196. **¿Qué variables de entorno necesita el backend?**  
     `DATABASE_URL` y `JWT_SECRET`.

197. **¿Para qué sirve `DATABASE_URL`?**  
     Conecta Prisma con PostgreSQL.

198. **¿Para qué sirve `JWT_SECRET`?**  
     Firma y verifica los tokens JWT.

199. **¿Qué riesgos habría si `JWT_SECRET` fuese público?**  
     Cualquiera podría falsificar tokens.

200. **¿Dónde desplegaste el backend?**  
     En Render.

201. **¿Dónde desplegaste el frontend?**  
     En Vercel.

202. **¿Dónde está alojada la base de datos?**  
     En PostgreSQL, en el entorno de despliegue.

203. **¿Por qué el frontend está en Vercel?**  
     Porque Vercel encaja muy bien con frontend React.

204. **¿Por qué el backend está en Render?**  
     Porque Render permite desplegar servicios backend.

205. **¿Qué problemas pueden aparecer al conectar frontend desplegado con backend desplegado?**  
     CORS, variables de entorno y URLs correctas.

206. **¿Para qué sirve CORS?**  
     Permite que frontend y backend en dominios distintos se comuniquen.

207. **¿Dónde activas CORS en tu backend?**  
     En `app.js`, usando `app.use(cors())`.

208. **¿Qué endpoint raíz tiene la API para comprobar que funciona?**  
     `GET /`.

209. **¿Qué devuelve `GET /` en el backend?**  
     Devuelve que la API está funcionando.

210. **¿El backend en Render tiene que estar activo para usar el frontend en Vercel?**  
     Sí. El frontend en Vercel necesita que el backend en Render esté activo, porque las acciones de la aplicación dependen de la API.

211. **¿Por qué el frontend no funciona completo si Render está caído?**  
     Porque el frontend no consulta directamente la base de datos. Hace peticiones al backend para login, registro, libros, reservas y favoritos.

212. **¿Qué puede pasar con Render si uso un plan gratuito?**  
     Puede quedarse dormido tras un tiempo sin uso. La primera petición puede tardar más porque el servicio tiene que despertarse.

213. **¿Qué conviene hacer antes de enseñar la demo?**  
     Abrir primero la URL del backend en Render y esperar a que responda. Si devuelve que la API está funcionando, ya puedo abrir el frontend en Vercel con más seguridad.

214. **¿Qué partes del frontend dependen del backend?**  
     El listado de libros, login, registro, crear libros, editar, reservar, favoritos y Mi biblioteca.

## 14. Pruebas

215. **¿Qué pruebas automatizadas tiene el backend?**  
     Tests de autenticación, libros y reservas.

216. **¿Qué cubren los tests de autenticación?**  
     Registro, login y errores de autenticación.

217. **¿Qué cubren los tests de libros?**  
     Crear, consultar, editar o validar libros.

218. **¿Qué cubren los tests de reservas?**  
     Crear y cancelar reservas.

219. **¿Qué herramienta usas para ejecutar tests?**  
     Vitest.

220. **¿Para qué usaste Postman?**  
     Para probar endpoints manualmente.

221. **¿Qué endpoints probarías manualmente en Postman?**  
     Auth, books, reservations, favorites y open-library.

222. **¿Qué caso probarías para comprobar que no se puede reservar un libro propio?**  
     Intentaría reservar un libro creado por el mismo usuario.

223. **¿Qué caso probarías para comprobar que favoritos no se duplican?**  
     Añadiría el mismo favorito dos veces.

224. **¿Qué caso probarías para comprobar que un usuario no puede editar libros de otro?**  
     Intentaría editar un libro con otro usuario.

225. **¿Qué caso probarías para comprobar que una reserva cambia el estado del libro?**  
     Reservaría un libro y comprobaría que pasa a `RESERVED`.

## 15. Retos, Aprendizajes y Backlog

226. **¿Cuál fue la parte más compleja del backend?**  
     La parte más compleja fue coordinar modelos, permisos y estados.

227. **¿Cuál fue la parte más compleja del frontend?**  
     La más compleja fue gestionar formularios, filtros y estados de usuario.

228. **¿Cuál fue la parte más compleja de la integración frontend-backend?**  
     La integración de token, rutas protegidas y peticiones.

229. **¿Qué reto supuso la autenticación?**  
     Controlar login, localStorage, token y permisos.

230. **¿Qué reto supuso el modelo de datos?**  
     Diseñar bien relaciones entre usuarios, libros, reservas y favoritos.

231. **¿Qué reto supuso Open Library?**  
     Normalizar datos externos y completar el formulario.

232. **¿Qué reto supuso el despliegue?**  
     Conectar frontend, backend y base de datos en producción.

233. **¿Qué aprendiste al trabajar con Prisma?**  
     Aprendí a modelar relaciones y consultar datos de forma ordenada.

234. **¿Qué aprendiste al trabajar con React?**  
     Aprendí a dividir la interfaz en páginas, estados y componentes.

235. **¿Qué aprendiste al trabajar con rutas protegidas?**  
     Aprendí a proteger vistas según sesión y rol.

236. **¿Qué aprendiste al trabajar con estados de carga y error?**  
     Aprendí a mostrar carga, error y vacío para mejorar la experiencia.

237. **¿Qué mejorarías del responsive móvil?**  
     Mejoraría adaptación a pantallas pequeñas.

238. **¿Qué tests añadirías si tuvieras más tiempo?**  
     Añadiría más tests de favoritos, permisos y errores.

239. **¿Cómo implementarías mensajería entre usuarios?**  
     Crearía una tabla de mensajes entre comprador y vendedor.

240. **¿Cómo implementarías notificaciones?**  
     Guardaría eventos y los mostraría al usuario.

241. **¿Cómo implementarías emails de reserva?**  
     Enviaría emails al crear o cancelar reservas.

242. **¿Qué incluirías en un panel admin más completo?**  
     Gestión de usuarios, libros, reservas y reportes.

243. **¿Qué parte del backlog priorizarías primero?**  
     Priorizaría responsive móvil o más tests.

244. **¿Qué decisión técnica cambiarías si empezaras de nuevo?**  
     Revisaría antes algunos nombres y estructuras para evitar cambios posteriores.

## 16. Flujos Completos

245. **¿Qué parte de la aplicación demuestra mejor que es un proyecto full stack?**  
     El flujo completo de crear, reservar y gestionar libros.

246. **¿Cómo explicarías el flujo completo desde registro hasta reservar un libro?**  
     Registro, login, token, explorar, reservar y ver en Mi biblioteca.

247. **¿Cómo explicarías el flujo completo desde crear un libro hasta verlo publicado?**  
     Crear libro, guardar en base de datos, verlo en listado y detalle.

248. **¿Cómo explicarías el flujo completo desde buscar en Open Library hasta guardar un libro?**  
     Buscar en Open Library, seleccionar resultado, rellenar formulario y guardar.

249. **¿Cómo explicarías el flujo completo desde añadir un favorito hasta verlo en “Mi biblioteca”?**  
     Añadir favorito, guardar relación y verlo en Mi biblioteca.

250. **¿Cómo explicarías el flujo completo desde retirar un libro hasta reactivarlo?**  
     Retirar cambia a cancelado; reactivar vuelve a disponible.

251. **¿Qué ocurre en la base de datos cuando un usuario crea un libro?**  
     Se crea un registro en `Book` relacionado con mi usuario.

252. **¿Qué ocurre en la base de datos cuando un usuario reserva un libro?**  
     Se crea una reserva y el libro pasa a reservado.

253. **¿Qué ocurre en la base de datos cuando un usuario añade un favorito?**  
     Se crea una relación entre usuario y libro en `Favorite`.

254. **¿Qué ocurre en la base de datos cuando un usuario elimina una reserva?**  
     Se borra la reserva y el libro vuelve a disponible.

255. **¿Qué ocurre en la base de datos cuando un usuario elimina permanentemente un libro?**  
     Se eliminan primero sus reservas relacionadas y luego el libro.

## 17. Flujo Para Crear Una Aplicación Full Stack Como Esta

1. **Definir la idea y el problema**  
   Primero pienso qué problema quiero resolver. En este caso: crear una app para que las personas puedan vender, reservar y guardar libros de segunda mano.

2. **Definir los usuarios y sus acciones**  
   Después identifico qué tipos de usuario habrá y qué puede hacer cada uno: invitado, comprador, vendedor y administrador.

3. **Diseñar el flujo principal**  
   Antes de programar, defino el recorrido básico: registrarse, iniciar sesión, explorar libros, crear un libro, reservarlo, guardarlo en favoritos y gestionarlo desde Mi biblioteca.

4. **Separar frontend y backend**  
   Divido el proyecto en dos partes. El frontend se encarga de lo que ve el usuario y el backend se encarga de la lógica, la seguridad y la base de datos.

5. **Diseñar la base de datos**  
   Creo los modelos principales: usuarios, libros, géneros, reservas y favoritos. También defino cómo se relacionan entre ellos.

6. **Crear el backend**  
   Empiezo montando Express, las rutas principales y la conexión con Prisma y PostgreSQL.

7. **Crear las rutas de autenticación**  
   Añado registro y login. En el registro guardo la contraseña cifrada y en el login devuelvo un token JWT.

8. **Proteger rutas privadas**  
   Creo middleware para comprobar el token. Así solo los usuarios autenticados pueden crear libros, reservar, guardar favoritos o entrar en Mi biblioteca.

9. **Crear las rutas de libros**  
   Añado rutas para listar libros, ver detalle, crear, editar, retirar, reactivar y eliminar permanentemente.

10. **Crear reservas y favoritos**  
    Después añado la lógica para reservar libros y guardar favoritos, comprobando que el usuario no reserve sus propios libros ni duplique favoritos.

11. **Validar los datos**  
    Uso validaciones para asegurarme de que los datos llegan bien al backend antes de guardarlos.

12. **Controlar errores**  
    Centralizo los errores para que la API responda de forma clara cuando algo falla.

13. **Crear el frontend**  
    En React creo las páginas principales: inicio, login, registro, listado de libros, detalle, formulario, Mi biblioteca y dashboard.

14. **Conectar frontend con backend**  
    Desde el frontend hago peticiones `fetch` a la API. Cuando una acción requiere sesión, envío el token en la cabecera `Authorization`.

15. **Crear el contexto de autenticación**  
    Uso un contexto para guardar el usuario, el token y las funciones de iniciar y cerrar sesión.

16. **Crear rutas protegidas en el frontend**  
    Protejo las páginas privadas para que solo entren usuarios autenticados, y en el caso del dashboard, solo el admin.

17. **Construir las pantallas principales**  
    Hago que el usuario pueda buscar libros, filtrar, ver detalles, publicar libros, editar sus publicaciones y gestionar favoritos o reservas.

18. **Añadir la API externa**  
    Integro Open Library para buscar libros y autocompletar datos como título, autor, ISBN, portada o sinopsis.

19. **Probar los flujos completos**  
    Compruebo que el flujo funciona de extremo a extremo: registro, login, crear libro, reservar, favoritos, Mi biblioteca y despliegue.

20. **Probar errores y permisos**  
    También pruebo casos negativos: no reservar libros propios, no editar libros de otros usuarios, no duplicar favoritos y no entrar sin token.

21. **Preparar variables de entorno**  
    Configuro valores sensibles fuera del código, como `DATABASE_URL`, `JWT_SECRET` y la URL de la API.

22. **Desplegar el backend**  
    Subo el backend a Render y conecto la base de datos PostgreSQL.

23. **Desplegar el frontend**  
    Subo el frontend a Vercel y configuro la URL del backend para que ambos se comuniquen.

24. **Comprobar la aplicación en producción**  
    Pruebo la app ya desplegada para asegurarme de que el frontend, backend y base de datos funcionan juntos.

25. **Preparar mejoras futuras**  
    Finalmente dejo un backlog con mejoras como responsive móvil, más tests, mensajería, notificaciones, emails y panel admin más completo.

**Resumen corto para explicarlo oralmente**  
Para crear una aplicación como esta, primero defino el problema y los usuarios. Luego diseño la base de datos, construyo el backend con sus rutas y permisos, creo el frontend con las pantallas principales, conecto ambas partes mediante la API, pruebo los flujos completos y finalmente despliego frontend, backend y base de datos.
