#! /usr/bin/env node

var analyse = require('./analyse.js');
var _ = require('lodash');
var minimist = require('minimist');
var recursive = require('recursive-readdir');

var args = minimist(process.argv.slice(2));

var defaults = {
  p: '.',
  o: '.scss',
  m: '.mcss',
  i: false,
  v: false,
};

args = _.extend(defaults, args);

console.log(args.p)

recursive(args.p, function (err, files) {
  if (err) throw err;
  analyse(files, args.o, args.m, args.i, args.v);
});
