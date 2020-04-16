{
  ID: 'nodejs_with_heap',
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
        image: "psidium/nodejs-with-heap@sha256:833508b7238bb05e4354a5092541e257e44ffd4625a58f63d195c3193a8dac04",
        env: {
          NODE_PATH: "$(KUBELESS_INSTALL_VOLUME)/node_modules",
        },
       }],
     },
    ],
  depName: 'package.json',
  fileNameSuffix: '.js'
}
