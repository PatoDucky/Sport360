

const mongoose = require("mongoose");

// conexion (ya fnciona no la toquen)
mongoose.connect("mongodb://localhost:27017/sport360")
.then(() => console.log(" MongoDB conectado"))
.catch(err => { console.log(" Error:", err); process.exit(1); });


// ========== MODELOS ==========

const usuarioSchema = new mongoose.Schema({
    email:    { type: String, required: true, unique: true },
    usuario:  { type: String, required: true },
    password: { type: String, required: true }
});

const articuloSchema = new mongoose.Schema({
    nombre:   { type: String, required: true },
    precio:   { type: Number, required: true },
    imagen:   { type: String },
    categoria:{ type: String },
    marca:    { type: String }
});

const productoCarritoSchema = new mongoose.Schema({
    nombre:   { type: String, required: true },
    precio:   { type: Number, required: true },
    imagen:   { type: String },
    cantidad: { type: Number, default: 1 }
});

const carritoSchema = new mongoose.Schema({
    usuarioId: { type: String, required: true, unique: true },
    productos: [productoCarritoSchema]
});

const Usuario  = mongoose.model("Usuario",  usuarioSchema);
const Articulo = mongoose.model("Articulo", articuloSchema);
const Carrito  = mongoose.model("Carrito",  carritoSchema);


// ========== DATOS ==========

const usuarios = [
    { email: "admin@sport360.com",   usuario: "Admin",   password: "admin123"  },
    { email: "usuario1@sport360.com",usuario: "Carlos",  password: "carlos123" },
    { email: "usuario2@sport360.com",usuario: "Maria",   password: "maria123"  }
];

const articulos = [

    // ── FUTBOL ──────────────────────────────────────────
    { nombre: "Tenis adidas Futbol Hyperfast Club TF",                          precio: 1699,   imagen: "Imagenes/Futbol/rosa f 1.jpg",                    categoria: "Futbol",    marca: "Adidas" },
    { nombre: "Tenis Nike Futbol Phantom 6 Low Academy Erling Haaland TF",      precio: 1899,   imagen: "Imagenes/Futbol/verde f 1.jpg",                   categoria: "Futbol",    marca: "Nike"   },
    { nombre: "Tachones Nike Futbol United Tiempo Maestro Academy MG",          precio: 2299,   imagen: "Imagenes/Futbol/cafes f 1.jpg",                   categoria: "Futbol",    marca: "Nike"   },
    { nombre: "Tenis adidas Futbol Predator League TF",                         precio: 2699,   imagen: "Imagenes/Futbol/rojo f 1.jpg",                    categoria: "Futbol",    marca: "Adidas" },
    { nombre: "Tachones Pirma Futbol Brasil 501 Hombre Negro",                  precio: 899,    imagen: "Imagenes/Futbol/negro f 1.jpg",                   categoria: "Futbol",    marca: "Pirma"  },
    { nombre: "Tenis Puma Futbol KING 20 MATCH TF",                             precio: 2099,   imagen: "Imagenes/Futbol/blanco f 1.jpg",                  categoria: "Futbol",    marca: "Puma"   },
    { nombre: "Tachones Puma Futbol ULTRA 6 CARBON FG Hombre",                  precio: 6998,   imagen: "Imagenes/Futbol/azul f 1.jpg",                    categoria: "Futbol",    marca: "Puma"   },
    { nombre: "Tenis Puma Futbol FUTURE 9 PLAY IC",                             precio: 899,    imagen: "Imagenes/Futbol/naranja f 1.jpg",                 categoria: "Futbol",    marca: "Puma"   },
    { nombre: "Tachones Puma Futbol ULTRA 6 PLAY FG",                           precio: 1299,   imagen: "Imagenes/Futbol/lima f 1.jpg",                    categoria: "Futbol",    marca: "Puma"   },
    { nombre: "Tenis adidas Futbol Copa Pure 3 Club",                           precio: 2499,   imagen: "Imagenes/Futbol/rojo negro f 1.jpg",              categoria: "Futbol",    marca: "Adidas" },
    { nombre: "Tachones Nike Futbol Phantom 6 Academy MG",                      precio: 1799,   imagen: "Imagenes/Futbol/amarillo f 1.jpg",                categoria: "Futbol",    marca: "Nike"   },
    { nombre: "Tachones adidas Futbol F50 Sparkfusion League FG",               precio: 1999,   imagen: "Imagenes/Futbol/morado f 1.jpg",                  categoria: "Futbol",    marca: "Adidas" },
    { nombre: "Tachones Nike Futbol Phantom 6 Academy Erling Haaland MG",       precio: 1399,   imagen: "Imagenes/Futbol/negro naranja f 1.jpg",           categoria: "Futbol",    marca: "Nike"   },
    { nombre: "Tenis adidas Futbol F50 League Messi TF",                        precio: 2499,   imagen: "Imagenes/Futbol/metal f 1.jpg",                   categoria: "Futbol",    marca: "Adidas" },
    { nombre: "Tachones PEAK Futbol Hombre E39061F",                            precio: 1399,   imagen: "Imagenes/Futbol/negro blanco f 1.jpg",            categoria: "Futbol",    marca: "PEAK"   },
    { nombre: "Tachones adidas Futbol F50 Club Messi FG",                       precio: 599,    imagen: "Imagenes/Futbol/dorado f 1.jpg",                  categoria: "Futbol",    marca: "Adidas" },
    { nombre: "Tenis Kelme Futbol Futsal Precisión Unisex",                     precio: 1599,   imagen: "Imagenes/Futbol/crema f 1.jpg",                   categoria: "Futbol",    marca: "Kelme"  },
    { nombre: "Tachones adidas Futbol Predator Club FG",                        precio: 1999,   imagen: "Imagenes/Futbol/blanco rosa f 1.jpg",             categoria: "Futbol",    marca: "Adidas" },
    { nombre: "Tachones adidas Futbol F50 Club FG",                             precio: 1399,   imagen: "Imagenes/Futbol/azul invertido f 1.jpg",          categoria: "Futbol",    marca: "Adidas" },
    { nombre: "Tachones Puma Futbol ATTACANTO FG Niño",                         precio: 1099,   imagen: "Imagenes/Futbol/naranja manchas negras f 1.jpg",  categoria: "Futbol",    marca: "Puma"   },

    // ── BASQUETBOL ──────────────────────────────────────
    { nombre: "Tenis Onboard Klaxon Hombre",                                    precio: 899,    imagen: "Imagenes/basquet/rojo blanco b 1.jpg",            categoria: "Basquetbol",marca: "Onboard"       },
    { nombre: "Tenis Nike KD18 Kevin Durant Hombre",                            precio: 3029,   imagen: "Imagenes/basquet/blanco azul b 1.jpg",            categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis adidas Anthony Edwards 2 AE2 Hombre",                     precio: 2319,   imagen: "Imagenes/basquet/rosa negro b 1.jpg",             categoria: "Basquetbol",marca: "Adidas"        },
    { nombre: "Tenis Nike LeBron XXIII Hombre",                                 precio: 3759,   imagen: "Imagenes/basquet/morado plateado b 1.jpg",        categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Nike Giannis Freak 7 Hombre",                              precio: 2159,   imagen: "Imagenes/basquet/negro naranja b 1.jpg",          categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis adidas Harden Volume 10 Hombre",                           precio: 2879,   imagen: "Imagenes/basquet/plateado b 1.jpg",               categoria: "Basquetbol",marca: "Adidas"        },
    { nombre: "Tenis adidas Harden Volume 9 Hombre",                            precio: 2719,   imagen: "Imagenes/basquet/verde b 1.jpg",                  categoria: "Basquetbol",marca: "Adidas"        },
    { nombre: "Tenis Nike Jordan Luka 4 Hombre",                                precio: 3099,   imagen: "Imagenes/basquet/rosa b 1.jpg",                   categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Nike Air Jordan 40 Hombre",                                precio: 4499,   imagen: "Imagenes/basquet/cafe negro b 1.jpg",             categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Under Armour Curry 13 Hombre",                             precio: 3999,   imagen: "Imagenes/basquet/negro fuego b 1.jpg",            categoria: "Basquetbol",marca: "Under Armour"  },
    { nombre: "Tenis Nike KD18 International Blue Hombre",                      precio: 3999,   imagen: "Imagenes/basquet/azul metal b 1.jpg",             categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Nike Jordan Luka 77 Hombre",                               precio: 2299,   imagen: "Imagenes/basquet/blanco total b 1.jpg",           categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Nike Book 2 Hombre",                                       precio: 3399,   imagen: "Imagenes/basquet/negro blanco b 1.jpg",           categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Nike Jordan Max Aura 7 Hombre Negro Dorado",               precio: 3099,   imagen: "Imagenes/basquet/negros dorado b 1.jpg",          categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Nike Jordan Max Aura 7 Hombre Negro Rojo",                 precio: 3099,   imagen: "Imagenes/basquet/negro rojo b 1.jpg",             categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Puma MB.05 LaMelo Ball Crowd Surf Hombre",                 precio: 3499,   imagen: "Imagenes/basquet/rojo b 1.jpg",                   categoria: "Basquetbol",marca: "Puma"          },
    { nombre: "Tenis Reebok Angel Reese 1 Hombre",                              precio: 3299,   imagen: "Imagenes/basquet/blanco gris b 1.jpg",            categoria: "Basquetbol",marca: "Reebok"        },
    { nombre: "Tenis Nike LeBron XXIII Hombre Cafe",                            precio: 4699,   imagen: "Imagenes/basquet/cafe b 1.jpg",                   categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Nike Jordan Heir Series 2 Hombre",                         precio: 2799,   imagen: "Imagenes/basquet/blanco b 1.jpg",                 categoria: "Basquetbol",marca: "Nike"          },
    { nombre: "Tenis Nike Book 2 The Phoenix Hombre",                           precio: 3799,   imagen: "Imagenes/basquet/naranja rojo b 1.jpg",           categoria: "Basquetbol",marca: "Nike"          },

    // ── VOLEYBALL ───────────────────────────────────────
    { nombre: "Tenis Asics Upcourt 6 GS Azul",                                  precio: 1899,   imagen: "Imagenes/Voleyball/azul clarito v 1.jpg",         categoria: "Voleyball", marca: "Asics" },
    { nombre: "Tenis Voleyball Azul Fuerte",                                    precio: 899,    imagen: "Imagenes/Voleyball/azul fuerte v 1.jpg",          categoria: "Voleyball", marca: "Pirma" },
    { nombre: "Tenis Mizuno Wave Momentum 3 Blanco Azul",                       precio: 3399,   imagen: "Imagenes/Voleyball/blanco azul v 1.jpg",          categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Voleyball Blanco Manchas Negras",                          precio: 6999,   imagen: "Imagenes/Voleyball/blanco manchas negras v 1.jpg",categoria: "Voleyball", marca: "Puma"  },
    { nombre: "Tenis Voleyball Blanco Total",                                   precio: 6999,   imagen: "Imagenes/Voleyball/blanco total v 1.jpg",         categoria: "Voleyball", marca: "Puma"  },
    { nombre: "Tenis Voleyball Blancos Naranja",                                precio: 1249,   imagen: "Imagenes/Voleyball/blancos naranja v 1.jpg",      categoria: "Voleyball", marca: "Puma"  },
    { nombre: "Tenis Puma FUTURE 9 PLAY IC Niño Rojo Blanco",                   precio: 818,    imagen: "Imagenes/Voleyball/rojo blanco v 1.jpg",          categoria: "Voleyball", marca: "Puma"  },
    { nombre: "Tenis Asics Upcourt 6 GS Rojo",                                  precio: 1899,   imagen: "Imagenes/Voleyball/rojos blanco v 1.jpg",         categoria: "Voleyball", marca: "Asics" },
    { nombre: "Tenis Mizuno Wave Momentum 3 Gris",                              precio: 3399,   imagen: "Imagenes/Voleyball/gris v 1.jpg",                 categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum 2 Negro Morado",                      precio: 2499,   imagen: "Imagenes/Voleyball/negro morado v 1.jpg",         categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum Elite Negro Azul",                    precio: 3799,   imagen: "Imagenes/Voleyball/negros azul claro v 1.jpg",    categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum 3 Negro Dorado",                      precio: 3399,   imagen: "Imagenes/Voleyball/negros dorados v 1.jpg",       categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum 3 Mid",                               precio: 3499,   imagen: "Imagenes/Voleyball/negros v 1.jpg",               categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum 2 Negro Verde",                       precio: 2499,   imagen: "Imagenes/Voleyball/negros verdes v 1.jpg",        categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum Elite Rosa",                          precio: 3799,   imagen: "Imagenes/Voleyball/rosa claro v 1.jpg",           categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum 3 Rosa Neón",                         precio: 3399,   imagen: "Imagenes/Voleyball/rosa neon v 1.jpg",            categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Dimension Rosa",                               precio: 2899,   imagen: "Imagenes/Voleyball/rosa v 1.jpg",                 categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum 3 Verde",                             precio: 3399,   imagen: "Imagenes/Voleyball/verde claro v 1.jpg",          categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum Elite Verde Amarillo",                precio: 3799,   imagen: "Imagenes/Voleyball/verdes amarillo v 1.jpg",      categoria: "Voleyball", marca: "Mizuno"},
    { nombre: "Tenis Mizuno Wave Momentum 3 Azul Clarito",                      precio: 3399,   imagen: "Imagenes/Voleyball/azul clarito v 1.jpg",         categoria: "Voleyball", marca: "Mizuno"},

    // ── ATLETISMO ───────────────────────────────────────
    { nombre: "Nike Dragonfly XC 2 Tenis de atletismo para campo traviesa",     precio: 170,    imagen: "Imagenes/Atletismo/tenis de atletismo.png",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Zoom Rival Waffle 7 Tenis de carrera en pavimento",         precio: 75,     imagen: "Imagenes/Atletismo/tenis de atletismo.png",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Tenis Mizuno Wave Momentum 3 Atletismo",                         precio: 3399,   imagen: "Imagenes/Atletismo/tenis atletismo3.jpg",         categoria: "Atletismo", marca: "Mizuno"},
    { nombre: "Nike Victory 2 Glam Spikes de atletismo",                        precio: 1477,   imagen: "Imagenes/Atletismo/tenis atletismo4.jpg",         categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Zoom Superfly Elite 2 Spikes para sprints",                 precio: 177,    imagen: "Imagenes/Atletismo/tenis atletismo 5.jpg",        categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Zoom Rival Multi Spikes para eventos multiples",            precio: 1249,   imagen: "Imagenes/Atletismo/tenis atletismo 6.jpg",        categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Alphafly 3 Tenis de carrera en pavimento para hombre",      precio: 2950,   imagen: "Imagenes/Atletismo/tenis atletismo 7.jpg",        categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Zoom Rival Distance Glam Spikes de atletismo",              precio: 1900,   imagen: "Imagenes/Atletismo/TENIS ATLETISMO 8.jpg",        categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Long Jump Elite Glam Spikes para salto y atletismo",        precio: 6899,   imagen: "Imagenes/Atletismo/tenis atletismo 9.jpg",        categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Pegasus Premium Tenis de correr en pavimento para hombre",  precio: 5200,   imagen: "Imagenes/Atletismo/tenis atletiso 10.jpg",        categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Vomero 18 Tenis de correr en pavimento para mujer",         precio: 3799,   imagen: "Imagenes/Atletismo/tenis atletismo 11.jpg",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Vomero Plus Tenis de correr en pavimento para mujer",       precio: 3399,   imagen: "Imagenes/Atletismo/tenis atletismo 12.jpg",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Zoom Ja Fly 4 Spikes para velocidad de atletismo",          precio: 4800,   imagen: "Imagenes/Atletismo/tenis atletismo 13.jpg",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Vomero 18 Tenis de correr en pavimento para hombre",        precio: 2499,   imagen: "Imagenes/Atletismo/tenis atletismo 14.jpg",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Pegasus 42 Tenis de correr en pavimento para hombre",       precio: 5200,   imagen: "Imagenes/Atletismo/tenis atletismo 15.jpg",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Zoom SD 4 Tenis de atletismo para lanzamiento",             precio: 6000,   imagen: "Imagenes/Atletismo/tenis atletismo 16.jpg",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Zoom Javelin Elite 3 Tenis de atletismo para lanzamiento",  precio: 7300,   imagen: "Imagenes/Atletismo/tenis atletismo 17.jpg",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Triple Jump Elite 3 Spikes para salto y atletismo",         precio: 3800,   imagen: "Imagenes/Atletismo/tenis atletismo 18.jpg",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Nike Pole Vault Elite Spikes para salto y atletismo",            precio: 8500,   imagen: "Imagenes/Atletismo/tenis atletismo 19.jpg",       categoria: "Atletismo", marca: "Nike" },
    { nombre: "Atletismo Zapatos Spikes Zapatillas para Correr Clavos",         precio: 8900,   imagen: "Imagenes/Atletismo/tenis atletismo 20.jpg",       categoria: "Atletismo", marca: "Genérico" }
];


// ========== INSERTAR DATOS ==========
async function llenarBaseDeDatos() {
    try {
        // Limpiar colecciones existentes
        await Usuario.deleteMany({});
        await Articulo.deleteMany({});
        await Carrito.deleteMany({});
        console.log("🗑  Colecciones limpiadas");

        // Insertar usuarios
        await Usuario.insertMany(usuarios);
        console.log(`✅ ${usuarios.length} usuarios insertados`);

        // Insertar artículos
        await Articulo.insertMany(articulos);
        console.log(`✅ ${articulos.length} artículos insertados`);

        // Crear carrito vacío para cada usuario
        const usuariosCreados = await Usuario.find({});
        for (const u of usuariosCreados) {
            await Carrito.create({ usuarioId: u._id.toString(), productos: [] });
        }
        console.log(`✅ ${usuariosCreados.length} carritos creados`);

        console.log("\n🎉 Base de datos Sport360 lista:");
        console.log(`   📦 Artículos:  ${articulos.length}`);
        console.log(`   👤 Usuarios:   ${usuarios.length}`);
        console.log(`   🛒 Carritos:   ${usuariosCreados.length}`);
        console.log("\n   Colecciones: Articulos | Usuarios | Carritos");

    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        mongoose.connection.close();
        console.log("🔌 Conexión cerrada");
    }
}

llenarBaseDeDatos();
