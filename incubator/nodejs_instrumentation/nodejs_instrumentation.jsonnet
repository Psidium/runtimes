{
  ID: 'nodejsInstrumentation',
  versions:
    [ 
     { name: 'node12',
       version: '12',
       images: [{
        phase: "installation",
        image: "kubeless/nodejs@sha256:1c45cda56384adc7deae9bf99e221b8e159ec25980c05b947939096bf91800e6",
        command: "/kubeless-npm-install.sh"
       }, {
        phase: "runtime",
        image: "psidium/nodejs-instrumentation@sha256:6552b6483047468ccab8dd642add22ad62b62a97a21a3b304f6e6a8c1db8746a",
        env: {
          NODE_PATH: "$(KUBELESS_INSTALL_VOLUME)/node_modules",
        },
       }],
     },
    ],
  depName: 'package.json',
  fileNameSuffix: '.js'
}
