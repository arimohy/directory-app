var fs = require('fs');

var EnviarContactos = () => {
  try {
    var contactoString = fs.readFileSync('directorio.json');
    return JSON.parse(contactoString);
  } catch (e) {
    return [];
  }
};

var GuardarContacto = (c) => {
  fs.writeFileSync('directorio.json', JSON.stringify(c));
};

var AgregarContacto = (name, number) => {
  var contactos= EnviarContactos();
  var ctc = {
    name,
    number
  };
  var duplicadocontacto = contactos.filter((ctc) => ctc.name === name);
  //si es q no hay publicado se agrega
  if (duplicadocontacto.length === 0) {
    contactos.push(ctc);
    GuardarContacto(contactos);
    return ctc;
  }
};

var ObtenerContactos = () => {
  return EnviarContactos();
};

var ObtenerContacto = (name) => {
  var contactos = EnviarContactos();
  var selecionarcontactos = contactos.filter((ctc) => ctc.name === name);
  return selecionarcontactos[0];
};

var EliminarContacto = (name) => {
  var contactos = EnviarContactos();
  var selecionarcontactos = contactos.filter((ctc) => ctc.name !== name);
  GuardarContacto(selecionarcontactos);

  return contactos.length !== selecionarcontactos.length;
};

var EscribirContacto = (ctc) => {
  console.log('--');
  console.log(`name: ${ctc.name}`);
  console.log(`number: ${ctc.number}`);
};

module.exports = {
  AgregarContacto,
  ObtenerContactos,
  ObtenerContacto,
  EliminarContacto,
  EscribirContacto
};
