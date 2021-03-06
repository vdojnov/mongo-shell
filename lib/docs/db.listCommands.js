module.exports = {
  "tags": [
    {
      "type": "return",
      "string": "{Promise}",
      "types": [
        "Promise"
      ],
      "typesDescription": "<a href=\"Promise.html\">Promise</a>",
      "optional": false,
      "nullable": false,
      "nonNullable": false,
      "variable": false,
      "description": ""
    }
  ],
  "description": {
    "full": "Provides a list of all database commands. See the /reference/command document for a more extensive index of these options.",
    "summary": "Provides a list of all database commands. See the /reference/command document for a more extensive index of these options.",
    "body": ""
  },
  "isPrivate": false,
  "isConstructor": false,
  "isClass": false,
  "isEvent": false,
  "ignore": false,
  "line": 1088,
  "codeStart": 1093,
  "code": "listCommands() {\n  return this.runCommand('listCommands')\n    .then(x => {\n      for (let name in x.commands) {\n        let c = x.commands[name];\n        let s = name + ': ';\n        if (c.adminOnly) s += ' adminOnly ';\n        if (c.slaveOk) s += ' slaveOk ';\n\n        s += '\\n  ';\n        s += c.help.replace(/\\n/g, '\\n  ');\n        s += '\\n';\n\n        this.log(s);\n      }\n    });\n}",
  "ctx": {
    "type": "method",
    "name": "listCommands",
    "string": "listCommands()"
  }
}