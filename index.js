const sftp = require("sftp-sync-deploy");

/** @type {import("@types/hexo")} */
hexo.extend.deployer.register("sftp", function(args) {
  if (!args.host || !args.user) {
    const help = [
      "You should argsure deployment settings in _config.yml first!",
      "",
      "Example:",
      "  deploy:",
      "    type: sftp",
      "    host: <host>",
      "    port: [port] # Default is 21",
      "    user: <user>",
      "    pass: <pass> # leave blank for paswordless connections",
      "    privateKey: [path/to/privateKey] # Optional",
      "    passphrase: [passphrase] # Optional",
      "    agent: [path/to/agent/socket] # Optional, defaults to $SSH_AUTH_SOCK",
      "    remotePath: [remotePath] # Default is `/`",
      "    forceUpload: [boolean] # default is false",
      "    concurrency: [number] # Max number of SFTP tasks processed concurrently. Default to 100.",
      "",
      "For more help, you can check the docs: " +
        "https://hexo.io/docs/one-command-deployment",
    ];

    console.log(help.join("\n"));
    return;
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
    remoteDir: args.remotePath || "/",
  };

  /** @type { import('sftp-sync-deploy').SftpSyncOptions } */
  const options = {
    dryRun: !!args.dryrun,
    forceUpload: args.forceUpload,
    excludeMode: "remove",
    concurrency: args.concurrency || 100,
    // exclude patterns (glob)
    // exclude: [
    //   'node_modules',
    //   'src/**/*.spec.ts'
    // ]
  };
  console.log("Deploying with configuration: ", options);
  return sftp.deploy(config, options);
});
