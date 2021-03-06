
class App {

  /**
   * constructor
   * @param {string} inputId tag id of editor panel
   * @param {string} outputId tag id of output panel
   * @param {string} errorsId tag id of output errorsId
   */
  constructor(inputId, outputId, errorsId) {
    this.inputId = inputId
    this.outputId = outputId
    this.errorsId = errorsId

    this.editor = ace.edit(inputId)
    this.viewer = ace.edit(outputId)

    this.initEditor()
    this.initViewer();
  }

  /**
   * Common initialization for both editor and viewer
   * @param {object} editor ace editor instance
   */
  _initEditor(editor) {
		let TextMode = require('ace/mode/text').Mode
    let NebRules = require('NebRules').NebRules
		let dynamicMode = new TextMode()

		dynamicMode.HighlightRules = NebRules

		editor.setTheme('ace/theme/solarized_dark')
		editor.resize()
		editor.session.setMode(dynamicMode)
  }

  initViewer() {
    const viewer = this.viewer
    this._initEditor(viewer)
    viewer.setReadOnly(true)
  }

  initEditor() {
    const editor = this.editor
    this._initEditor(editor)
    /*
		editor.getSession().$mode.$highlightRules.setKeywords({
			"frusciante": "ramparts"
	  })
		editor.session.bgTokenizer.start(0);
    */
		editor.getSession().on('change', () => {
      this.changeHandler()
    })
  }

  setEditorText(txt) {
    this.editor.setValue(txt, -1)
  }

  setViewrText(txt) {
    this.viewer.setValue(txt, -1)
  }

  changeHandler() {
    const editor = this.editor
		const txt = editor.getSession().getValue();

		let promiseFn = debounce( ()=> {
			return this.validate(txt)
		}, 1500)

		promiseFn().then( d => {
      this.showResult(d.output);
			if (d.errors) {
			  this.showErrors(d.errors)
			}
		})
  }



  /**
   * Request validation
   * @param {string} txt text to validate
   */
  validate(txt) {
    return new Promise( (resolve, reject) => {
      let blah = txt
      resolve({
        output: blah.replace(/\t/g, '  ').replace(/\s\s+/, ' '),
        errors: [
          {code:123, line:11, txt: 'this is an error'},
          {code:123, line:24, txt: 'this is an error'},
          {code:223, line:4, txt: 'this is an error'}
        ]
      })
    })
  }


  /**
   * Show validation result/expansion
   * @param {string} txt
   */
  showResult(txt) {
    this.setViewrText(txt);
  }

  /**
   * Display errors output
   * @param {array} errors array of error object
   */
  showErrors(errors) {
    const editor = this.editor;

		d3.select('#' + this.errorsId).select('*').remove()
		const container = d3.select('#' + this.errorsId).append('ul');
		const lists = container.selectAll('li')
		  .data(errors)
			.enter()
			.append('li')
			.on('click', (d) => {
				editor.scrollToLine(d.line, true, true, ()=>{})
				editor.gotoLine(d.line, 0);
			});

		lists.append('span').text(d => d.txt);
		lists.append('span').style('font-style', 'italic').text(d => d.line);
  }



}
