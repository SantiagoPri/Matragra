# Matragra
===
# DEMO Script

# Presentación del Proyecto y lectura del documento
- ***JP*** -> Primer parte, hasta marco referencial
- ***Santiago*** –> Hasta final
===
# Arquitectura y Desarrollo de la APP
- ***Santiago*** -> Como esta hecho el front.
- ***Santiago*** -> Repositorio git, Usuarios cloud, Template, IAM ROLE, Dynamo, Dynamo stream y SES.
- ***JP*** -> Buckets, API gate way, Lambda, CLOUD Watch
- ***JP*** -> Como esta hecho el back include DDD
===
# DEMO – LIVE DE LA APP
- ***JP*** -> MUESTRA 
1. Crear proyecto nuevo  
    Matragra  
    * Permitir la comunicación entre estudiante(s) y tutor.  
    * Administrar la agenda, actividades y desarrollo del proyecto de software.  
    * Gestionar los procesos orientadores de la metodología MaTraGra.  
    Aplicación web con arquitectura en la nube.  
2. Agregar personas, correo, usuario
3. Avanzar Etapa
4. Crear Tarea y subtarea de diseño  
    Diseño de base de datos  
    Como desarrolladores, necesitamos definir las entidades básicas de base de datos para el funcionamiento de la app  
    Diseñar llaves de cada tabla  
5. Crear evento, Mostrar correo
6. Avanzar etapa
7. Ir a foro, y crear entrada, img, doc, code snippet  
    url: https://es.wikipedia.org/wiki/Dise%C3%B1o_guiado_por_el_dominio  
    ``` javascript
    code: const glob = require("glob");
    const { Router } = require("express");

    const createRouter = () => {
    const routes = glob
        .sync("**/*.js", { cwd: `${__dirname}/` })
        .map((filename) => require(`./${filename}`).default)
        .filter((router) => router && Object.getPrototypeOf(router) == Router)
        .reduce(
        (rootRouter, router) => rootRouter.use(router),
        Router({ mergeParams: true })
        );
    return routes;
    };
    ```
    1. ***Santiago*** responde foro  
    Falta el export  
    ``` javascript
        exports.default = createRouter();
    ``` 
    Aprovado  
8. Volver etapa de diseño, crear sub tarea  
    Crear modelo de usuarios
9. volver al foro, ver respuesta
10. Crear tarea y subtarea (Mostrar fase de pruebas)
11. Avanzar etapa
12. Completar proyecto, mostrar barra al 100

13. mostrar proyecto matragra app

14. ***Santiago*** muestra script de despliegue front con cambios

===
# Log History

Fecha y hora | Temas
:-------------:|:--------------:
27/01/2021 7:30pm | Inicio de proyecto y anteproyecto
05/02/2021 2:00pm | Avances anteproyecto
17/02/2021 2:30pm | Revision final del anteproyecto
07/04/2021 9:00am | Avances proyecto de grado
===
Santiago Prieto & Juan P. Mosquera
