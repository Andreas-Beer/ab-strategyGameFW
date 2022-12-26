import { ConfigData, ConfigDataId } from '../../types/config.types';
import { configDataMock } from './configData.mock';
import { ConfigDataFacade } from './ConfigDataFacade';

async function fetchConfigData(
  configDataId: ConfigDataId,
): Promise<ConfigData> {
  // TODO: Implement Database / API call
  return Promise.resolve(configDataMock);
}

async function getConfigData(
  configDataId: ConfigDataId,
): Promise<ConfigDataFacade> {
  const data = await fetchConfigData(configDataId);
  return new ConfigDataFacade(data);
}

const _test = {
  fetchConfigData,
};

export { _test, getConfigData };
