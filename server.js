//exportamos los modulos que necesitamos
var fs = require('fs');
var _ = require('lodash');
var yargs = require('yargs');
//exportamos nuestro modulo contact
var conta = require('./contact.js');

//requisitos para nuestro objeto contacto
var NombreC = {
  describe: 'Nombre de contacto',//descripccion
  demand: true,//necesario
  alias: 'n'
};
var TelefonoC = {
  describe: 'telefono de contacto',
  demand: true,
  alias: 't'
};
//definimos los comandos que utilizaremos
var argv = yargs
//comando agregar
  .command('add', 'Agregar Contacto', {
    name: NombreC,
    number: TelefonoC
  })
  //comando listar
  .command('list', 'listar contactos')
  //comando leer
  .command('read', 'leer contacto', {
    name: NombreC,
  })
  //comando eeliminar
  .command('remove', 'eliminar contacto', {
    name: NombreC
  })
  .help()
  .argv;
//escogemos el comando
var command = argv._[0];
//si es agregar
if (command === 'add') {
  var ctc = conta.AgregarContacto(argv.name, argv.number);
  if (ctc) {
    console.log('contacto creado');
    conta.EscribirContacto(ctc);
  } else {
    console.log('contacto no creado');
  }
} 
else if (command === 'list') {
  var allconta = conta.ObtenerContactos();
  console.log(`Printing ${allconta.length} contacts(s).`);
  allconta.forEach((ctc) => conta.EscribirContacto(ctc));
} 
else if (command === 'read') {
  var contacto = conta.ObtenerContacto(argv.name);
  if (contacto) {
    console.log('Contacto encontrado');
    conta.EscribirContacto(contacto);
  } else {
    console.log('contacto no encontrado');
  }
}
else if (command === 'remove') {
  var eliminarc = conta.EliminarContacto(argv.name);
  var mensaje = eliminarc ? 'contacto was removed' : 'contacto not found';
  console.log(mensaje);
}
else {
  console.log('Comando no reconocido');
}
