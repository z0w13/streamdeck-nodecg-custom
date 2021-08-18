import { StateResponse } from './Shared';
import { Streamdeck } from '@rweich/streamdeck-ts';

const mutedImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAEgCAYAAAAUg66AAAAIy0lEQVR4nO3dzW0bWRCF0YYnAEbgEJSBMnAGzsCJOAMFYMAZeDNrZaAMnIFC4CzGHHBsqfnP++rVWZwd1fjohu6iAMHLsixbgJB4ANBXPADoKx4A9BUPAPqKBwB9xQOAvuIBQF/xAKCveADQVzwA6CseAPQVDwD6igcAfcUDgL7iAUBf8QCgr3gA0Fc8AOgrHgD0FQ8A+ooHAH3FA4C+4gFAX/EAoK94ANBXPADoKx4A9BUPAPqKBwB9xQOAvuIBQF/xAKCveADQVzwA6CseAPQVDwD6igcAfcUDgL7iAUBf8QCgr3gA0Fc8AOgrHgD0FQ8A+ooHAH3FA4C+4gFAX/EAoK94ANBXPADoKx4A9BUPAPqKBwB9xQOAvuIBQF/xAKCveADQVzwA6CseAPQVDwD6igcAfcUDgL7iAUBf8QCgr3gA0Fc8AOgrHgD0FQ8A+ooHAH3FA4C+4gFAX/EAoK94ANBXPADoKx4Aw/swQMOk4gEwtL+WZfttWbYfB2iZUDwAhvXXsmz/Xpbtdlm2L4sRuoF4AAxpf3x2jNDVxQNgOG+Nz44Ruqp4AAxlbXx2jNDVxANgGMeMz44Ruop4AAzhlPHZMUIXiwdA3Dnjs2OELhIPgKhLxmfHCJ0tHgAx1xifHSN0lngARFxzfHaM0MniAXB3txifnW+Lvx07QTyAiT08PGyfnp7iHftuOT5//3p++jsWEg9gQpvNZvv169ftz58/t6+vr/GeHeMznHgAE9lsNtvPnz9vX15etq+vr/9Jdy2L8RlUPIBJPD4+bp+fn/83PKMMkPEZVjyA4nZ3nreGZ4QBMj5DiwdQ1O93nhEHyPgMLx5AMe/deUYbIONTQjyAQtbuPCMNkPEpIx5AAcfceUYZIONTSjyAgZ1y5xlhgIxPOfEABnTOnSc9QManpHgAgzn3zpMcIONTVjyAQVx650kNkPEpLR5A2LXuPIkBMj7lxQMIufad594DZHymEA8g4BZ3nnsOkPGZRjyAO7rlnedeA2R8phIP4A7ucee5xwAZn+nEA7ihe955bj1AxmdK8QBu5N53nlsOkPGZVjyAK0vdeW41QMZnavEAriR957nFABmf6cUDuNAod55rD5DxaSEewAVGuvNcc4CMTxvxAM4w4p3nWgNkfFqJB3CCke8873l+fj76+xmfduIBHKHCnee98dlsNkd9R+PTUjyAA6rceYwPZ4gH8I5qdx7jwxniAfym4p3H+HCmeAC/VL3zGB8uEA9gqXvnMT5cKB7AssTHw/gQEg9gqT1AxocLxANY6g6Q8eFC8QCWmgNkfLiCeMDUHh8ftz9+/Dj4ufSYGB9C4gFT2g3P7hf20OfTg2J8CIkHTOX34ZltgIwPVxYPmMJ7wzPTABkfbiAeUNqh4ZllgIwPNxIPKOnY4ZlhgIwPNxQPKOXU4ak+QMaHG4sHlHDu8FQeIOPDHcQDSrj0l/nWzzc+FBUPKKHTABkf7igeUEKXATI+3Fk8oIQOA2R8CIgHlDD7ABkfQuIBJcw8QMaHoHhACbMOkPEhLB5QwowDZHwYQDyghNkGyPgwiHhACTMNkPFhIPGAEmYZIOPDYOIBJcwwQMaHAcUDSqg+QMaHQcUDSqg8QMaHgcUDSqg6QMaHwcUDSqg4QMaHAuIBJVQbIONDEfGAEioNkPGhkHhACVUGyPhQTDyghAoDZHwoKB5QwugDZHwoKh5QwsgDZHwoLB5QwqgDZHwoLh5QwogDZHyYQDyghE+fPm1fXl6GGSDjwyTiAaWcO0SHnmt8aCoeUNKpQ3ToeTOPz7G9tBQPKO3YITr0nJnH5/v37/H3xLDiAVM4NESHfn7m8Tnm+9NWPGAq7w3RoZ+beXwMECviAVP6fYgOfX7m8TFArIgHTG03RIc+N/P4GCBWxANY/hygmcbHALEiHsCyTD0+BogV8QCWZerxMUCsiAewLFOPjwFiRTyA5d9j9azjY4BYEQ/gBBXHxwCxIh7AkaqOjwFiRTyAI1QeHwPEingAB1QfHwPEingAK2YYHwPEingA75hlfAwQK+IBvGGm8TFArIgH8JvZxscAsSIewJ4Zx8cAsSIewC+zjo8BYkU8gGXu8TFArIgHtDf7+BggVsQDWuswPgaIFfGAtrqMjwFiRTygpU7jY4BYEQ9op9v4GCBWxANaGWV8dr58+WKASIoHtDHa+OxsNpvt09OTASIhHtDCqOOz7+Hh4WZDlP73Z1jxgOlVGJ99h/6fewPEFcUDplZtfPZd8z6Ufg8MKx4wrcrjs3Ot+1D6XTCseMCUZhiffZfeh9Lvg2HFA6Yz2/jsO/c+lH4nDCseMJWZx2ffqfehdC/DigdMo8v47JxyH0q3Mqx4wBS6jc++Y+5D6UaGFQ8or/P47Fu7D6XbGFY8oDTj86e37kPpJoYVDyjL+Lzv9/tQuodhxQNKMj7H2d2H0h0MKx5Qzodl2X5bjA9cQTygpI/Lsn1ZjA9cKB5Q1jVHyPjQVDygtGuMkPGhsXhAeZeMkPGhuXjAFM4ZIeMD+YBpnDJCxgeW7TJAwFSOGSHjA/+JB0xnbYSMD/xPPGBKb42Q8YE/xAOmtT9CxgfeFA+Y2sfl3z/bMD7wpnjA9D4M0ACDigcAfcUDgL7iAUBf8QCgr3gA0Fc8AOgrHgD0FQ8A+ooHAH3FA4C+4gFAX/EAoK94ANBXPADoKx4A9BUPAPqKBwB9xQOAvuIBQF/xAKCveADQVzwA6CseAPQVDwD6igcAfcUDgL7iAUBf8QCgr3gA0Fc8AOgrHgD0FQ8A+ooHAH3FA4C+4gFAX/EAoK94ANBXPADoKx4A9BUPAPqKBwB9xQOAvuIBQF/xAKCveADQVzwA6CseAPQVDwD6igcAfcUDgL7iAUBf8QCgr3gA0Fc8AOgrHgD0FQ8A+ooHAH3FA4C+4gFAX/EAoK94ANBXPADoKx4A9BUPAPqKBwB9xQOAvuIBQF/xAKCveADQVzwA6CseAPQVDwD6igcAfcUDgL7iAUBT/wCKzB0ZUjlQTAAAAABJRU5ErkJggg==';
const unmutedImage =
  'data:image/png;base64,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';

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
      case 'nodecg.preview':
        await fetch(baseUrl + '/zowiettv/audio/preview/' + (state.gen.reaper.preview ? 'unmute' : 'mute'), {
          method: 'POST',
        });
        updateState();
        break;
      case 'nodecg.break':
        await fetch(baseUrl + '/zowiettv/audio/break/' + (state.gen.reaper.break ? 'unmute' : 'mute'), {
          method: 'POST',
        });
        updateState();
        break;
      case 'nodecg.mic':
        await fetch(baseUrl + '/zowiettv/audio/mic/' + (state.gen.reaper.mic ? 'unmute' : 'mute'), { method: 'POST' });
        updateState();
        break;
      case 'nodecg.speakers':
        await fetch(baseUrl + '/zowiettv/audio/speakers/' + (state.gen.reaper.speakers ? 'unmute' : 'mute'), {
          method: 'POST',
        });
        updateState();
        break;
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
