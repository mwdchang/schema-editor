class Validator {

  constructor() {
  }

  validate(txt) {
    return new Promise( (resolve, reject) => {
      let blah = txt;
      resolve({
        output: blah.replace(/var/g, 'let'),
        errors: [
          {code:123, line:11, txt: 'this is an error'},
          {code:123, line:24, txt: 'this is an error'},
          {code:223, line:4, txt: 'this is an error'}
        ]
      });
    });
  }


}
