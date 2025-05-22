Proyecto: Sistema de Gestión de Hoteles

1. Introducción
•	Objetivo: Desarrollar un sistema para administrar hoteles y sus configuraciones de habitaciones.
•	Alcance: Ingreso de hoteles con datos básicos y tributarios; asignación de tipos y acomodaciones de habitaciones.
•	Limitaciones: Sin autenticación/roles; ambiente local.

3. Requisitos Funcionales

•	Registrar hoteles con:
o	Nombre
o	NIT (formato: 8 dígitos, un guion y 1 dígito; regex ^\d{8}-\d$)
o	Dirección
o	Ciudad (catálogo pre-cargado)
o	Número máximo de habitaciones
•	Asociar a cada hotel uno o varios tipos de habitación y cantidad según reglas:
o	Estándar → Sencilla, Doble
o	Junior → Triple, Cuádruple
o	Suite → Sencilla, Doble, Triple
•	Validaciones:
o	La suma de cantidades no supera max_rooms.
o	No duplicar hoteles (única combinación nombre+ciudad+NIT).
o	No repetir combinación tipo/acomodación en un mismo hotel.

4. Requisitos Técnicos

•	Backend: PHP 8+ con Laravel (RESTful API).
•	Frontend: React con Next.js (framework profesional para producción).
•	Base de datos: PostgreSQL.
•	Servidor: Local con Laragon u otro similar (no cloud).
•	IDE: Visual Studio Code.
•	Navegadores soportados: Firefox y Chrome.

5. Arquitectura y Diseño

•	Patrón: MVC en Laravel; Componentes y páginas en Next.js.
•	Principios: SOLID, Clean Architecture (capas: Controllers, Services, Repositories).
•	Diagramas: UML de clases, casos de uso y secuencias.

6. Esquema de Base de Datos

•	hotels: id, name, nit, address, city_id, max_rooms, timestamps
•	cities: (migración inicial y seeder) id, name.
•	room_types (catálogo): id, code, name (Estándar, Junior, Suite).
•	accommodations (catálogo): id, code, name (Sencilla, Doble, Triple, Cuádruple).
•	hotel_rooms: id, hotel_id, room_type_id, accommodation_id, quantity, timestamps.

7. Endpoints REST API

•	POST /api/hotels → Crear hotel
•	GET /api/hotels → Listar todos
•	GET /api/hotels/{id} → Detalle con habitaciones
•	PUT /api/hotels/{id} → Actualizar hotel
•	DELETE /api/hotels/{id} → Eliminar hotel
•	POST /api/hotels/{id}/rooms → Asignar habitaciones
•	DELETE /api/hotels/{id}/rooms/{rid} → Eliminar habitación

8. Frontend (Next.js)

•	Estructura:
o	pages/ → rutas y SSR/SSG si aplica
o	components/ → FormularioHotel, ListaHoteles, FormAsignacion
o	lib/ → llamadas a API con Axios
o	styles/ → Tailwind CSS
•	Estado: React Context o SWR para datos
•	Validación: Yup + React Hook Form

9. Pruebas
•	Backend: PHPUnit (unitarias e integración, uso de RefreshDatabase).
•	Frontend: Jest + React Testing Library (componentes, servicios).
•	Cobertura: ≥ 80%.

10. Documentación
•	UML: Clases, casos de uso, secuencia.
•	README:
o	Descripción
o	Pre-requisitos (PHP, Node, Laragon, PostgreSQL)
o	Guía paso a paso de instalación y ejecución
o	Comandos Git y ramas (git-flow)
o	Enlace al repositorio público
•	Dump: Archivo SQL listo para importar.

11. Despliegue Local

•	Instrucciones para la "abuelita":
1.	Instalar Laragon y clonar repo.
2.	Copiar .env.example a .env y configurar DB.
3.	Ejecutar composer install y npm install.
4.	Ejecutar php artisan migrate --seed.
5.	Ejecutar npm run dev y php artisan serve.
6.	Abrir http://localhost:3000 en el navegador.

