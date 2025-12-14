import app from './src/app';
import { syncDatabase } from './src/config/database';
import { Config } from './src/config/env';
import logger from './src/config/logger';

async function main(): Promise<void> {
  await syncDatabase();
  const PORT = Config.get('PORT');
  app.listen(PORT, () => {
    logger.info(`Server started on http://localhost:${PORT}`);
  });
}

void main();
