/** App specific SystemJS configuration */
// If the application is augmented (for some reason) when you test it
// you can add new configurations to the systemjs to potentially compensate
System.config({
  map: {
    app: ''
  },
  packages: {
    app: {
      main: 'main.js',
      defaultExtension: 'js'
    }
  }
});
