import {Command} from '@tauri-apps/api/shell';

import {getCurrentResourceDir} from './fs';

/**
 * @deprecated
 */
export const openSavedFolderAsync = async () => {
  const curPath = (await getCurrentResourceDir()).replaceAll('\\\\?\\', '');

  const isWindows = navigator.userAgent.includes('Windows');
  const isMac = navigator.userAgent.includes('Mac');

  if (isWindows) {
    // FIXME curPath is escaped

    await new Command('explorer', String.raw`${curPath}`).execute();
  } else if (isMac) {
    await new Command('open', curPath).execute();
  }
};
