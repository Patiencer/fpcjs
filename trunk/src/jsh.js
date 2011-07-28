// jsh main library

/*
TODO:
 
- parse parameter as quoted strings, now if param is ' ' it will be split because there is space
*/

// core bindings

function cat(AInput,AFileName) {
  // load local file and split it into array separated by EOL
  return jsh_cat_file(AFileName).split('\n');
}

// utilities

function dump(AInput,ANote) {
  // echo array to stdout for debug purposes
  echo(ANote+':\n');
  for (var i = 0; i < AInput.length; i++)
    echo('  ['+i+']: '+AInput[i]+'\n');
  echo('\n\n');
}

function trim(AText) {
  // remove empty spaces from begining and end of string
  return AText.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

// filters

function grep(AInput,AWord) {
  // keep only array items containing certain words
  var n = new Array();
  for (var i = 0; i < AInput.length; i++)
    if (AInput[i].match(AWord))
      n.push(AInput[i]);
  return n;
}

function sed(AInput,AFind,AReplace) {
  // find words and replace them with new meaning
  var n = new Array();
  for (var i = 0; i < AInput.length; i++) {
    var s = AInput[i].replace(AFind,AReplace).split('\n');
    for (var j=0; j < s.length; j++)
      n.push(s[j]);
  }
  return n;
}

// testing code

function test4() {
  // load testing files
  var a = cat(null,'sample.txt');
  var b = cat(null,'sample2.txt');
  dump(a,'a');
  dump(b,'b');
  
  // grep words containg "to"
  var c = grep(b,'to');
  dump(c,'c');
}

test();

function test() {
  // equivalent for bash script: cat 'sample.txt' | grep 'object' | sed ':' '' | sed ' ' '\n' | grep 'qrl'" | for (var i in a) echo '  '+a[i]+'.Caption := inttostr(a[][]);\n'; 
  var a = cat(null,'sample.txt');
  dump(a,'1');

  var a = grep(a,'object');
  dump(a,'2');

  var a = sed(a,':','');
  dump(a,'3');

  var a = sed(a,/ /g,'\n');
  dump(a,'4');

  var a = grep(a,'qrl');
  dump(a,'5');

  for (var i in a)
    echo('  '+a[i]+'.Caption := inttostr(a[][]);\n');
}

function test2() {
  s = "cat 'sample.txt' | grep 'object' | sed ':' '' | sed ' ' '\n' | grep 'qrl'"; // | for (var i in a) echo '  '+a[i]+'.Caption := inttostr(a[][]);\n';";
  echo(s+'\n\n');
  a = s.split('|');
  dump(a,'a');
}

function test3() {
  var jsh_array = new Array();
  for (var i=0; i<a.length; i++) {
    // first command in pipe
    aa = trim(a[i]);
    echo('aa='+aa+"\n");
  
    // split commend in command and attributes
    // TODO: must parse by characters to understand quotes
    cc = aa.split(' ');
    //dump(cc,'cc');
  
    // convert it to jsh command
    var ss = 'jsh_array = '+cc[0]+'(jsh_array,'+cc[1]+')';
    echo('>>>  '+ss+'\n');
  //  eval(ss);
  }
  //dump(jsh_array,'jsh_array');
}
 
/*
cat 'sample.txt' | grep object | sed ':' '' | sed ' ' '\n' | grep 'qrl' | for (var i in a) echo '  '+a[i]+'.Caption := inttostr(a[][]);\n';
cat sample.txt | grep object | sed ':' '' | sed ' ' '\n' | grep qrl | foreach echo '  %.Caption := inttostr(a[][]);\n';
*/

