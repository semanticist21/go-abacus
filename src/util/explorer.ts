import {Command} from '@tauri-apps/api/shell';

import {getCurrentResourceDir} from './fs';

export const openSavedFolderAsync = async () => {
  const curPath = (await getCurrentResourceDir()).replaceAll('\\\\?\\', '');

  const isWindows = navigator.userAgent.includes('Windows');
  const isMac = navigator.userAgent.includes('Mac');

  if (isWindows) {
    // FIXME curPath is escaped
    new Command('explorer', curPath).spawn();
  } else if (isMac) {
    new Command('open', curPath).spawn();
  }
};
