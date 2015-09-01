var fs = require('fs');
var metadata = require('react-component-metadata');
var colors = require('colors');
var table = require('console.table');
var _ = require('lodash');

var counts = {
  total: 0,
  old: 0,
  modular: 0,
  none: 0,
  inline: 0,
  combination: 0,
};

module.exports = function(paths, old, modular, inline, verbose) {
  var jsFiles = paths.filter(function(file) {
    var ext = file.split('.').pop();

    return ext === 'js' || ext === 'jsx';
  });

  jsFiles.forEach(function(file, index) {
    fs.readFile(file, 'utf-8', function(err, contents) {
      if (err) throw err;
      var component = metadata(contents);
      var name = Object.keys(component)[0];
      name = name + ' ' + (verbose ? '(' + file + ')' : '');
      contents = contents.toLowerCase();

      var isComponent = contents.indexOf('react.createclass(') > -1;
      var isOld = contents.indexOf(old) > -1;
      var isModular = contents.indexOf(modular) > -1;
      var isInline = inline !== false && contents.indexOf('style = {') > -1;
      var isMany = _.compact([isOld, isModular, isInline]).length > 1;

      if (isComponent) {
        counts.total = counts.total + 1;

        if (isMany) {
          counts.combination = counts.combination + 1;
          var exts = (isOld ? old : '') + (isModular ? ', ' + modular : '') + (isInline ? ', inline' : '');
          console.log(('? ' + name + '(' + exts + ')').yellow);

        } else if (isOld) {
          counts.old = counts.old + 1;
          console.log(('✘ ' + name + ' (' + old + ')').red);

        } else if (isModular) {
          counts.modular = counts.modular + 1;
          console.log(('✔ ' + name).green);

        } else if (isInline) {
          // todo, handle inline styles better lol
          counts.inline = counts.inline + 1;
          console.log(('✘ ' + name + ' (inline)').red);

        } else {
          counts.none = counts.none + 1;
          console.log(('- ' + name).grey);
        }
      }

      if (index === jsFiles.length - 1) {
        console.table([{
          total: counts.total,
          none: counts.none,
          inline: counts.inline,
          notModular: counts.old,
          modular: counts.modular,
          combination: counts.combination,
        }]);

        console.log(('You\'re ' + Math.floor((counts.modular / (counts.total - counts.none) * 100))  + '% of the way there!').bold.green);
      }
    });
  });
};


// counts total aint right, goota omit /none
