class Validator {

  constructor() {
  }

  validate(txt) {
    return new Promise( (resolve, reject) => {
      let blah = txt;
      resolve(blah.replace(/var/g, 'let'));
    });
  }


}
