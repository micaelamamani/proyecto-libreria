
let btnGenero = document.getElementById("GeneroLibros");
let btnLibro = document.getElementById("LibrosLibros");

let formAutor = document.getElementById("formularioAutor");
let formGenero = document.getElementById("formGenero");
let formLibro = document.getElementById("formLibro");
document.getElementById("AutorLibros").addEventListener("click", () => {
  formAutor.style.display = "block";
  formGenero.style.display = "none";
  formLibro.style.display = "none";

});
btnGenero.addEventListener("click", function () {

  formAutor.style.display = "none";
  formGenero.style.display = "block";
  formLibro.style.display = "none";

});
btnLibro.addEventListener("click", function () {

  formAutor.style.display = "none";
  formGenero.style.display = "none";
  formLibro.style.display = "block";

});

//JSON LOCAL STORANGE
// ===================================
// CARGA INICIAL
// ===================================

let biblioteca;

if (localStorage.getItem("biblioteca")) {

  biblioteca = JSON.parse(
    localStorage.getItem("biblioteca")
  );

  console.log("Datos cargados desde localStorage");

}
else {

  fetch("libros.json")
    .then(respuesta => respuesta.json())
    .then(datos => {

      biblioteca = datos;

      guardarBiblioteca();

      console.log("Datos cargados desde JSON");

    });

}

function guardarBiblioteca() {

  localStorage.setItem(
    "biblioteca",
    JSON.stringify(biblioteca)
  );

}

function generarJSON() {

  console.clear();

  console.log(
    JSON.stringify(
      biblioteca,
      null,
      4
    )
  );
  guardarBiblioteca();
}
// ===================================
// AGREGAR AUTOR
// ===================================
document.getElementById("AGREGARautor")
  .addEventListener("click", () => {

    let id=document.getElementById("IDautor").value;

    let nombre =
      document.getElementById("NOMBREautor").value;

    let apellido =
      document.getElementById("APELLIDOautor").value;

    let existeID = false;
    let existeAutor = false;

    biblioteca.autores.forEach(autor => {

      if (autor.idAutor === id) {

        existeID = true;

      }

      if (autor.nombre.toLowerCase()
        ===
        nombre.toLowerCase()
        &&
        autor.apellido.toLowerCase()
        ===
        apellido.toLowerCase()
      ) {
        existeAutor= true;
      }
    });
    if (existeID) {
      alert("Este ID ya existe, debe cambiarlo");
      return;
    }
    if(existeAutor){
      alert("Este autor ya existe en la base de datos");
      return;
    }
    biblioteca.autores.push({
      idAutor: id,
      nombre: nombre,
      apellido: apellido
    });
    generarJSON();
  });
// Buscamos el autor
document.getElementById("BUSCARautor").addEventListener("click", () => {
    let id=document.getElementById("IDautor").value;
    let nombre=document.getElementById("NOMBREautor").value;
    let apellido=document.getElementById("APELLIDOautor").value;
    let encontrado = false;
    biblioteca.autores.forEach(autor=> {
      if (autor.idAutor===id&&autor.nombre == nombre&&autor.apellido === apellido) {
        encontrado=true;
        let div=document.getElementById("miDiv");
        div.innerHTML = "";
        let tabla=document.createElement( "table");
        let thead=document.createElement("thead");
        let tbody=document.createElement("tbody");
        let filaTitulo=document.createElement("tr");
        [
          "ID",
          "Nombre",
          "Apellido",
          "Libro",
          "Genero"
        ].forEach(texto => {
            let th=document.createElement("th");
            th.textContent=texto;
            filaTitulo.appendChild(th);
          });
        thead.appendChild(filaTitulo);
        biblioteca.libros.forEach(libro => {
            if (libro.codAutor==autor.idAutor){
              let generoNombre="";
              biblioteca.generos.forEach(genero => {
                  if (genero.idGenero==libro.codGenero){
                    generoNombre=genero.nombre;
                  }
                });
              let fila=document.createElement("tr");
              let tdID=document.createElement("td");
              let tdNom=document.createElement("td");
              let tdApe=document.createElement("td");
              let tdLibro=document.createElement("td");
              let tdGenero=document.createElement( "td");

              tdID.textContent=autor.idAutor;
              tdNom.textContent=autor.nombre;
              tdApe.textContent=autor.apellido;
              tdLibro.textContent=libro.titulo;
              tdGenero.textContent=generoNombre;
              fila.appendChild(tdID);
              fila.appendChild(tdNom);
              fila.appendChild(tdApe);
              fila.appendChild(tdLibro);
              fila.appendChild(tdGenero);
              tbody.appendChild(fila);
            }
          });
        tabla.appendChild(thead);
        tabla.appendChild(tbody);
        div.appendChild(tabla);
        biblioteca.libros.forEach(libro => {
          if (libro.codAutor==autor.idAutor){
            console.log(libro);
            biblioteca.generos.forEach(genero => {
                if (genero.idGenero==libro.codGenero) {
                  console.log("Genero");
                  console.log(genero);
                }
              });
          }
        });
      }
    });

    if (!encontrado) {

      alert(
        "Los datos no coinciden"
      );

    }

  });
// modificar el autor
document.getElementById("MODIFICARautor").addEventListener("click", () => {
    let id=document.getElementById("IDautor").value;
    let nombre=document.getElementById("NOMBREautor").value;
    let apellido=document.getElementById("APELLIDOautor").value;
    let encontrado=false;
    biblioteca.autores.forEach(autor => {
      if (autor.idAutor==id) {
        autor.nombre= nombre;
        autor.apellido= apellido;
        encontrado= true;
      }
    });
    if(!encontrado) {
      alert("El codigo no existe");
      return;
    }
    generarJSON();
  });

// agregar genero
document.getElementById("AGREGARgenero").addEventListener("click", () => {
    let id=document.getElementById("IDgenero").value;
    let nombre=document.getElementById("NOMBREgenero").value;
    let existeID=false;
    let existeGenero=false;

    biblioteca.generos.forEach(genero=> {
      if (genero.idGenero === id) {
        existeID=true;
      }
      if (genero.nombre.toLowerCase()==nombre.toLowerCase()) {
        existeGenero=true;
      }
    });
    if (existeID){
      alert("Este ID ya existe, debe cambiarlo");
      return;
    }
    if(existeGenero){
      alert("Este genero ya existe en la base de datos");
      return;
    }
    biblioteca.generos.push({
      idGenero: id,
      nombre: nombre
    });
    generarJSON();
  });
//busco el genero
document.getElementById("BUSCARgenero").addEventListener("click", () => {
   let id=document.getElementById("IDgenero").value;
    let nombre=document.getElementById("NOMBREgenero").value;
    let encontrado= false;
    biblioteca.generos.forEach(genero => {

      if (
        genero.idGenero === id
        &&
        genero.nombre === nombre
      ) {

        encontrado = true;

        let div =
          document.getElementById(
            "miDiv"
          );

        div.innerHTML = "";

        let tabla =
          document.createElement(
            "table"
          );

        let thead =
          document.createElement(
            "thead"
          );

        let tbody =
          document.createElement(
            "tbody"
          );

        let filaTitulo =
          document.createElement(
            "tr"
          );

        [
          "ID",
          "Genero",
          "Libro",
          "Autor"
        ]

          .forEach(texto => {

            let th =
              document.createElement(
                "th"
              );

            th.textContent =
              texto;

            filaTitulo
              .appendChild(
                th
              );

          });

        thead
          .appendChild(
            filaTitulo);

        biblioteca.libros
          .forEach(libro => {

            if (
              libro.codGenero
              ===
              genero.idGenero
            ) {

              let nombreAutor =
                "";

              biblioteca.autores
                .forEach(autor => {

                  if (
                    autor.idAutor
                    ===
                    libro.codAutor
                  ) {

                    nombreAutor =
                      autor.nombre +
                      " " +
                      autor.apellido;

                  }

                });

              let fila =
                document.createElement(
                  "tr"
                );

              fila.innerHTML =
                `

<td>${genero.idGenero}</td>

<td>${genero.nombre}</td>

<td>${libro.titulo}</td>

<td>${nombreAutor}</td>

`;

              tbody
                .appendChild(
                  fila
                );

            }

          });

        tabla
          .appendChild(
            thead);

        tabla
          .appendChild(
            tbody);

        div
          .appendChild(
            tabla);

        console.log(
          "LIBROS DEL GENERO"
        );

        biblioteca.libros.forEach(libro => {

          if (
            libro.codGenero
            ===
            genero.idGenero
          ) {

            console.log(libro);

            biblioteca.autores
              .forEach(autor => {

                if (
                  autor.idAutor
                  ===
                  libro.codAutor
                ) {

                  console.log(
                    "AUTOR"
                  );

                  console.log(
                    autor
                  );

                }

              });

          }

        });

      }

    });

    if (!encontrado) {

      alert(
        "Los datos no coinciden"
      );

    }

  });


// ===================================
// MODIFICAR GENERO
// ===================================

document.getElementById("MODIFICARgenero")
  .addEventListener("click", () => {

    let id =
      document.getElementById("IDgenero").value;

    let nombre =
      document.getElementById("NOMBREgenero").value;

    let encontrado = false;

    biblioteca.generos.forEach(genero => {

      if (genero.idGenero === id) {

        genero.nombre = nombre;

        encontrado = true;

      }

    });

    if (!encontrado) {

      alert(
        "Los datos no coinciden"
      );

      return;

    }

    generarJSON();

  });

// ===================================
// AGREGAR LIBRO
// ===================================

document.getElementById("AGREGARlibro")
  .addEventListener("click", () => {

    let id =
      document.getElementById("IDlibro").value;

    let titulo =
      document.getElementById("TITULOlibro").value;

    let fecha =
      document.getElementById("FECHAlibro").value;

    let paginas =
      document.getElementById("NUMlibro").value;

    let codAutor = document.getElementById("IDautor").value;

    let codGenero = document.getElementById("IDgenero").value;

    let existeID = false;
    let existeLibro = false;

    let autorExiste = false;
    let generoExiste = false;

    biblioteca.libros.forEach(libro => {

      if (libro.IDLibro === id) {

        existeID = true;

      }

      if (
        libro.titulo.toLowerCase()
        ===
        titulo.toLowerCase()
      ) {

        existeLibro = true;

      }

    });

    if (existeID) {

      alert(
        "Este ID ya existe, debe cambiarlo"
      );

      return;

    }

    if (existeLibro) {

      alert(
        "Este libro ya existe en la base de datos"
      );

      return;

    }

    biblioteca.autores.forEach(autor => {

      if (autor.idAutor === codAutor) {

        autorExiste = true;

      }

    });

    biblioteca.generos.forEach(genero => {

      if (genero.idGenero === codGenero) {

        generoExiste = true;

      }

    });

    if (!autorExiste) {

      alert(
        "El código de autor no existe"
      );

      return;

    }

    if (!generoExiste) {

      alert(
        "El código de género no existe"
      );

      return;

    }

    biblioteca.libros.push({

      IDLibro: id,
      titulo: titulo,
      fechaPublicacion: fecha,
      numPagina: paginas,
      codAutor: codAutor,
      codGenero: codGenero

    });

    generarJSON();

  });


// ===================================
// BUSCAR LIBRO
// ===================================

document.getElementById("BUSCARlibro")
  .addEventListener("click", () => {

    let id =
      document.getElementById("IDlibro").value;

    let titulo =
      document.getElementById("TITULOlibro").value;

    let encontrado = false;

    biblioteca.libros.forEach(libro => {

      if (
        libro.IDLibro === id
        &&
        libro.titulo.toLowerCase()
        ===
        titulo.toLowerCase()
      ) {

        encontrado = true;

        let div =
          document.getElementById(
            "miDiv"
          );

        div.innerHTML = "";

        let tabla =
          document.createElement(
            "table"
          );

        let thead =
          document.createElement(
            "thead"
          );

        let tbody =
          document.createElement(
            "tbody"
          );

        // TITULOS

        let filaTitulo =
          document.createElement(
            "tr"
          );

        [
          "ID",
          "Titulo",
          "Fecha",
          "Paginas",
          "Autor",
          "Genero"
        ]

          .forEach(texto => {

            let th =
              document.createElement(
                "th"
              );

            th.textContent =
              texto;

            filaTitulo
              .appendChild(
                th);

          });

        thead
          .appendChild(
            filaTitulo);


        // BUSCAR AUTOR

        let nombreAutor =
          "";

        biblioteca.autores
          .forEach(autor => {

            if (
              autor.idAutor
              ===
              libro.codAutor
            ) {

              nombreAutor =
                autor.nombre
                +
                " "
                +
                autor.apellido;

            }

          });


        // BUSCAR GENERO

        let nombreGenero =
          "";

        biblioteca.generos
          .forEach(genero => {

            if (
              genero.idGenero
              ===
              libro.codGenero
            ) {

              nombreGenero =
                genero.nombre;

            }

          });


        // FILA

        let fila =
          document.createElement(
            "tr"
          );

        fila.innerHTML =
          `

<td>${libro.IDLibro}</td>

<td>${libro.titulo}</td>

<td>${libro.fechaPublicacion}</td>

<td>${libro.numPagina}</td>

<td>${nombreAutor}</td>

<td>${nombreGenero}</td>

`;

        tbody
          .appendChild(
            fila);

        tabla
          .appendChild(
            thead);

        tabla
          .appendChild(
            tbody);

        div
          .appendChild(
            tabla);

        biblioteca.autores.forEach(autor => {

          if (
            autor.idAutor
            ===
            libro.codAutor
          ) {

            console.log(
              "AUTOR"
            );

            console.log(
              autor
            );

          }

        });

        biblioteca.generos.forEach(genero => {

          if (
            genero.idGenero
            ===
            libro.codGenero
          ) {

            console.log(
              "GENERO"
            );

            console.log(
              genero
            );

          }

        });

      }

    });

    if (!encontrado) {

      alert(
        "Los datos no coinciden"
      );

    }

  });


// ===================================
// MODIFICAR LIBRO
// ===================================

document.getElementById("MODIFICARlibro")
  .addEventListener("click", () => {

    let id =
      document.getElementById("IDlibro").value;

    let titulo =
      document.getElementById("TITULOlibro").value;

    let fecha =
      document.getElementById("FECHAlibro").value;

    let paginas =
      document.getElementById("NUMlibro").value;

    let codAutor =
      document.getElementById("IDautor").value;

    let codGenero =
      document.getElementById("IDgenero").value;

    let encontrado = false;

    let autorExiste = false;
    let generoExiste = false;

    biblioteca.autores.forEach(autor => {

      if (autor.idAutor === codAutor) {

        autorExiste = true;

      }

    });

    biblioteca.generos.forEach(genero => {

      if (genero.idGenero === codGenero) {

        generoExiste = true;

      }

    });

    if (!autorExiste) {

      alert(
        "El código de autor no existe"
      );

      return;

    }

    if (!generoExiste) {

      alert(
        "El código de género no existe"
      );

      return;

    }

    biblioteca.libros.forEach(libro => {

      if (libro.IDLibro === id) {

        libro.titulo = titulo;
        libro.fechaPublicacion = fecha;
        libro.numPagina = paginas;
        libro.codAutor = codAutor;
        libro.codGenero = codGenero;

        encontrado = true;

      }

    });

    if (!encontrado) {

      alert(
        "Los datos no coinciden"
      );
      return;
    }
    generarJSON();
  });

//ver más en inicio

document.getElementById("mostrarMas").addEventListener("click", () => {
  let div = document.getElementById("mostrarMas");

  div.innerHTML = "";

  let tabla =
    document.createElement(
      "table"
    );

  tabla.border = "1";

  tabla.innerHTML =
    `

<tr>

<th>ID</th>

<th>Titulo</th>

<th>Autor</th>

<th>Genero</th>

</tr>

`;

  biblioteca.libros
    .forEach(libro => {

      let autor =
        biblioteca.autores
          .find(
            a =>
              a.idAutor
              ===
              libro.codAutor
          );

      let genero =
        biblioteca.generos
          .find(
            g =>
              g.idGenero
              ===
              libro.codGenero
          );

      let fila =
        document.createElement(
          "tr"
        );

      fila.innerHTML =
        `

<td>${libro.IDLibro}</td>

<td>${libro.titulo}</td>

<td>${autor.nombre}</td>

<td>${genero.nombre}</td>

`;

      tabla
        .appendChild(
          fila
        );

    });

  div
    .appendChild(
      tabla);

});