const { get } = require('http');

function createGame() {
  initWorld();
  initApi();
}

function initWorld() {
  const savedData = getSavedWorldData();
  initMap(savedData);
}

function initApi() {
  const app = new App();

  app.post('start/login', (req) => {
    const playerId = getPlayerId(req);
    res.end(handlePlayerLogin(playerId));
  });
  app.post('start/new', () => {
    res.end(handleCreateNewPlayer());
  });

  app.post('chat', () => {});
  app.get('meta/highScore', () => {});
  app.get('game/config', () => {});
}

function handlePlayerLogin(playerId) {
  const player = new Player(playerId);
  const requestHandler = createPlayerServerRequestHandler(
    player,
    onPlayerRequests,
  );
  const connection = createPlayerServerConnection(requestHandler);
  const playerInitData = player.getInitData();
  return playerInitData;
}

function onPlayerRequests(player, req, res) {
  if (req.type === 'status') {
    res.write(player.getStatus());
    return;
  }
  if (req.type === 'buy-item') {
    const itemId = req.query.itemId;
    player.items.buy(itemId);
    res.write({ success: true });
    return;
  }
}

createGame();
