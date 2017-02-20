const deploy = require('sftp-sync-deploy')

hexo.extend.deployer.register('sftp', function(args, callback){
  if (!args.host || !args.user){
    const help = [
      'You should argsure deployment settings in _config.yml first!',
      '',
      'Example:',
      '  deploy:',
      '    type: sftp',
      '    host: <host>',
      '    port: [port] # Default is 21',
      '    user: <user>',
      '    pass: <pass> # leave blank for paswordless connections',
      '    privateKey: [path/to/privateKey] # Optional',
      '    passphrase: [passphrase] # Optional',
      '    agent: [path/to/agent/socket] # Optional, defaults to $SSH_AUTH_SOCK',
      '    remotePath: [remotePath] # Default is `/`',
      '',
      'For more help, you can check the docs: ' + 'http://hexo.io/docs/deployment.html'.underline
    ]

    console.log(help.join('\n'))
    return callback()
  }

  const config = {
    host: args.host,
    port: args.port || 22,
    username: args.user,
    password: args.pass,
    privateKey: args.privateKey,
    passphrase: args.passphrase,
    agent: args.agent || process.env.SSH_AUTH_SOCK,
    localDir: hexo.public_dir,
    remoteDir: args.remotePath || '/'
  }

  const options = {
    dryRun: !!args.dryrun,
    // exclude: [                      // exclude patterns (glob)
    //   'node_modules',
    //   'src/**/*.spec.ts'
    // ]
  }

  deploy(config, options).then(() => {
    callback()
  }).catch(err => {
    callback(err)
  })
})
