const dox = require('dox');
const fs = require('fs');
const mkdirp = require('mkdirp');

// name space configurations
const namespaces = {
  'db': [
    `${__dirname}/../lib/db.js`,
  ],
  'rs': [
    `${__dirname}/../lib/rs.js`
  ],
  'db.collection': [
    `${__dirname}/../lib/collection_proxy.js`
  ]
};

// Create docs directory
mkdirp.sync(`${__dirname}/../lib/docs`);

// List of final index file
const indexes = {};

// Iterate over all the namespaces and generate the files
for (let namespace in namespaces) {
  for (let i = 0; i < namespaces[namespace].length; i++) {
    const code = fs.readFileSync(namespaces[namespace][i], 'utf8');
    const obj = dox.parseComments(code, {raw: true});

    // Iterate over all the object
    obj.forEach(element => {
      if (element.ctx && element.ctx.type === 'method') {
        fs.writeFileSync(
          `${__dirname}/../lib/docs/${namespace}.${element.ctx.name}.js`,
          `module.exports = ${JSON.stringify(element, null, 2)}`,
          'utf8');

        // Add the file and method to the indexes
        indexes[`${namespace}.${element.ctx.name}`] = `./${namespace}.${element.ctx.name}`;
      } else {
        element.tags.forEach(tag => {
          if (tag.type == 'method') {
            const name = tag.string == '' ? element.ctx.name : tag.string;

            fs.writeFileSync(
              `${__dirname}/../lib/docs/${namespace}.${name}.js`,
              `module.exports = ${JSON.stringify(element, null, 2)}`,
              'utf8');

            // Add the file and method to the indexes
            indexes[`${namespace}.${name}`] = `./${namespace}.${name}`;
          } else if (tag.type == 'ctx') {
            element.ctx = JSON.parse(tag.string);
          }
        })
      }
    });
  }
}

// Strings
const strings = [];

// create the index file string
for (let name in indexes) {
  strings.push(`  '${name}': require('${indexes[name]}')`);
}

const template = `
module.exports = {
${strings.join(',\n')}
}
`;

// Write the indexes file
fs.writeFileSync(`${__dirname}/../lib/docs/index.js`, template, 'utf8');

// console.dir(indexes);
