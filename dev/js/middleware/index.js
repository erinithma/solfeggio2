import a from '../const'
import {timeout, fill} from '../common';
import Sound from '../classes/sound';
import storage from '../common/storage';

window.sound = new Sound();

let resultTimeout = null, offsetTimeout = null;

const urls = {
  play: "/тренажер/игра",
  note: "/тренажер/ноты",
  mindur: "/тренажер/мажор-минор",
  interval: "/тренажер/интервалы",
  accord: "/тренажер/аккорды",
  dictant: "/тренажер/диктант",
}

export default (store) => (next) => (action) => {
    const { type, payload, ...rest } = action;

    switch(type){
        case a.LOAD_SOUND:
            next(action);

            sound                    
                .loadAll(payload.urls)
                .addListener(
                    "loaded", 
                    () => next({ ...rest, payload, type: type + a.READY })
                )
                .addListener(
                    "progress", 
                    (percents, count) => next({ ...rest, payload: {percents, count}, type: a.PROGRESS })
                )
            break;

        case a.MODE_SHOW_SETTINGS:
            next(action);

            if (store.getState().sound.mode === 'note') {
              const result = storage.get('note').notes || fill();
              next({
                type: a.MODE_SET_RESULT,
                payload: {
                  result: result.map( r => r ? 'blue' : null),
                }
              });
            }

            break;

        case a.MODE_PLAY:
            workPlace.guess();
            next(action);
            break;

        case a.KEY_DOWN:
            if (store.getState().sound.showSettings && store.getState().sound.mode === 'note') {
                const res = store.getState().sound.result;
                res[payload.index] = res[payload.index] ? null : 'blue';
                next({
                    type: a.MODE_SET_RESULT,
                    payload: {
                        result: res,
                    }
                });
            }
            else {
                sound.get(payload.index).play(0, 3);
                next(action);
                workPlace.keyPressed(payload.index);
            }

            break;

        case a.SAVE_NOTES:
            storage.set({notes: store.getState().sound.result.map( r => !!r )}, 'note');
            next({
              type: a.MODE_SET_RESULT,
              payload: {
                result: null,
              }
            });
            next({
              type: a.MODE_HIDE_SETTINGS,
            });
            next(action);
            window.workPlace.setMode(payload.mode);
            break;

        case a.KEY_UP:
            next(action);
            break;

        case a.MODE_HIDE_TOTAL:
            next(action);
            window.workPlace.setMode(store.getState().sound.mode);
            break;

        case a.SET_MODE:
            next(action);
            next({ type: a.CLEAR_SCROLL });
            history.pushState({}, null, urls[payload.mode]);
            window.workPlace.setMode(payload.mode);

            /*store.getState().sound
                .get("mode")
                .addListener(
                    "counter", 
                    (count) => {
                        next({ type: a.MODE_COUNT, payload: {count} })
                    }
                )
                .addListener(
                    "finish", 
                    (result) => {
                        setTimeout( () => {
                            next({ type: a.MODE_COUNT, payload: {count: 0} });
                            next({ type: a.MODE_SHOW_TOTAL, payload: {result} });
                        },
                        300);                        
                    }
                )
                .addListener(
                    "offset", 
                    (value) => {
                        next({ type: a.SCROLL_TEMP, payload: {value} });  
                        timeout(offsetTimeout);
                        offsetTimeout = timeout(2500, () => {
                            next({ type: a.CLEAR_SCROLL });  
                        });
                    }
                );*/
            break;
        
        case a.SET_SIZE:
            next({ type: a.CLEAR_SCROLL });
            next(action);
            break;

        default:
            return next(action)        
  }
 
}
