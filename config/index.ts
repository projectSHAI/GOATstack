import * as _ from 'lodash';

import {defaultConfig} from './env/default';
import {devEnv} from './env/development';
import {prodEnv} from './env/production';
import {testEnv} from './env/test';

function mergeConfig(): any {

  // Depending on the environment we will merge
  // the default assets and config to corresponding
  // environment files
  const environmentConfig = process.env.NODE_ENV === 'development' ? devEnv :
    process.env.NODE_ENV === 'test' ? testEnv : prodEnv;

  // Merge config files
  return _.merge(defaultConfig, environmentConfig);
};

const config = mergeConfig();
export default config;
