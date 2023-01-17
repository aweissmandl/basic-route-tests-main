const Server = require('./server');
const Config = require('./config.json')

Server.listen(Config.port.dev, () => console.log(`Server is listening at ${Config.port.dev}`));