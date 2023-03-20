import { Streamdeck } from '@rweich/streamdeck-ts';

import { StateResponse } from './Shared';

const mutedImage = 'images/muted';
const unmutedImage = 'images/unmuted';

const baseUrl = 'http://localhost:9090';
const plugin = new Streamdeck().plugin();
let intervalHandle: ReturnType<typeof setInterval> | undefined;
let state: StateResponse = {
  app: {},
  gen: {
    break: {},
    reaper: {
      break: false,
      mic: false,
      preview: true,
      speakers: false,
    },
    scene: {
      sceneName: '',
      userTriggered: true,
    },
    stopwatch: {},
    timer: {},
  },
};
const actions: Record<string, Set<string>> = {
  'nodecg.break': new Set<string>(),
  'nodecg.mic': new Set<string>(),
  'nodecg.preview': new Set<string>(),
  'nodecg.speakers': new Set<string>(),
};

plugin.on('websocketOpen', () => {
  if (intervalHandle) {
    return;
  }

  intervalHandle = setInterval(updateState, 1000);
});

async function updateState() {
  const resp = await fetch(baseUrl + '/zowiettv/store');
  if (!resp.ok) {
    console.log('Error:', resp.status);
    return;
  }

  const body = await resp.blob();
  const newState = JSON.parse(await body.text()) as StateResponse;
  updateAllButtons(newState);

  state = newState;
}

function updateAllButtons(newState: StateResponse, force?: boolean) {
  const oldState = state;

  updateButtons(
    actions['nodecg.mic'],
    force ? !newState.gen.reaper.mic : oldState.gen.reaper.mic,
    newState.gen.reaper.mic,
    'Mic\nUnmuted',
    'Mic\nMuted',
  );
  updateButtons(
    actions['nodecg.preview'],
    force ? !newState.gen.reaper.preview : oldState.gen.reaper.preview,
    newState.gen.reaper.preview,
    'Preview\nUnmuted',
    'Preview\nMuted',
  );
  updateButtons(
    actions['nodecg.speakers'],
    force ? !newState.gen.reaper.speakers : oldState.gen.reaper.speakers,
    newState.gen.reaper.speakers,
    'Speakers\nUnmuted',
    'Speakers\nMuted',
  );
  updateButtons(
    actions['nodecg.break'],
    force ? !newState.gen.reaper.break : oldState.gen.reaper.break,
    newState.gen.reaper.break,
    'Break\nUnmuted',
    'Break\nMuted',
  );
}

function updateButtons(
  buttons: Set<string>,
  oldState: boolean,
  newState: boolean,
  muteText: string,
  unmuteText: string,
): void {
  if (oldState === newState) {
    return;
  }

  for (const button of buttons) {
    plugin.setTitle(newState ? unmuteText : muteText, button);
    plugin.setImage(newState ? mutedImage : unmutedImage, button);
  }
}

// your code here..
plugin.on('willAppear', (event) => {
  const actionName = getNormalizedActionName(event.action);
  if (!actions.hasOwnProperty(actionName)) {
    actions[actionName] = new Set<string>();
  }

  actions[actionName].add(event.context);
  updateAllButtons(state, true);
});

plugin.on('willDisappear', (event) => {
  const actionName = getNormalizedActionName(event.action);
  if (!actions.hasOwnProperty(actionName)) {
    return;
  }

  actions[actionName].delete(event.context);
});

plugin.on('keyDown', async (event) => {
  try {
    switch (getNormalizedActionName(event.action)) {
      case 'nodecg.preview': {
        await fetch(baseUrl + '/zowiettv/audio/preview/' + (state.gen.reaper.preview ? 'unmute' : 'mute'), {
          method: 'POST',
        });
        updateState();
        break;
      }
      case 'nodecg.break': {
        await fetch(baseUrl + '/zowiettv/audio/break/' + (state.gen.reaper.break ? 'unmute' : 'mute'), {
          method: 'POST',
        });
        updateState();
        break;
      }
      case 'nodecg.mic': {
        await fetch(baseUrl + '/zowiettv/audio/mic/' + (state.gen.reaper.mic ? 'unmute' : 'mute'), { method: 'POST' });
        updateState();
        break;
      }
      case 'nodecg.speakers': {
        await fetch(baseUrl + '/zowiettv/audio/speakers/' + (state.gen.reaper.speakers ? 'unmute' : 'mute'), {
          method: 'POST',
        });
        updateState();
        break;
      }
    }
    plugin.showOk(event.context);
  } catch {
    plugin.showAlert(event.context);
  }
});

function getNormalizedActionName(actionName: string): string {
  const startPos = actionName.indexOf('nodecg');
  return actionName.slice(startPos);
}

export default plugin;
