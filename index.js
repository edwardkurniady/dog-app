const { 
  dotenv,
  Glue,
} = require('./headers');
const config = require('./config');
dotenv();

const manifest = {
  server: config.server,
  register: {
    plugins: [
      { plugin: require('./api') },
    ],
  },
};

const start =  async function() {
  try {
    const server = await Glue.compose(manifest, { relativeTo: __dirname });
    await server.start();
    console.log(`SERVER: Server running at ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
