var fs = require('fs');
let fileName = 'src/app/app-info.ts';
// executes `svn info`

fs.exists(fileName, exists => {
  if (exists) {
    updateFile();
  } else {
    console.log('file not exists ');
    let text = `/* tslint:disable */
  export const appInfo = {
  appVersion: '4.1.4.1',
  alfVersion: '4.2.4',
  buildDate: ${new Date()}
 };`;
    fs.writeFile(fileName, text, function (err) {
      if (err) {
        return console.log(err);
      }
      updateFile();
      console.log('The file was saved!');
    });
  }
});

function updateFile() {
  fs.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
      console.error('error in update file ', error);
    }
    var lines = data.split('\n');
    lines.forEach(line => {
      if (line !== '') {
        var newLine = line;

        if (line.indexOf('buildDate') !== -1) {
          var dateBuild = new Date();
          newLine = `\tbuildDate: '${dateBuild.toUTCString()}'`
        }
        fs.appendFileSync('src/app/app-info.ts.tmp', newLine + '\n');
      }
    });

    fs.unlinkSync(fileName);
    fs.renameSync('src/app/app-info.ts.tmp', fileName);
    console.log('Successfully updated value');
  });
}
