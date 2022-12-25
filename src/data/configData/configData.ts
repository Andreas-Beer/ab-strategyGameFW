import { ConfigData } from '../../types/config.types';
import { configDataMock } from './configData.mock';
import { ConfigDataFacade } from './ConfigDataFacade';

async function fetchConfigData(): Promise<ConfigData> {
  // TODO: Implement Database / API call
  return Promise.resolve(configDataMock);
}

async function getConfigData(): Promise<ConfigDataFacade> {
  const data = await fetchConfigData();
  return new ConfigDataFacade(data);
}

const _test = {
  fetchConfigData,
};

export { _test, getConfigData };
