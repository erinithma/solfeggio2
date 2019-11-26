import a from '../const'
import {timeout, fill} from '../common';
import Sound from '../classes/sound';
import storage from '../common/storage';

window.sound = new Sound();

let resultTimeout = null, offsetTimeout = null;

const urls = {
  play: "/тренажер/игра",
  note: "/тренажер/ноты",
  mindur: "/тренажер/мажор-минор"
}

const modes = new Map();
modes.set("/тренажер/игра", "play");
modes.set("/тренажер/ноты", "note");
modes.set("/тренажер/мажор-минор", "mindur");

$(window).on( 'popstate', function(e){
  const loc = decodeURIComponent((e.location || ( e.originalEvent && e.originalEvent.location ) || document.location).pathname);

  window.store.dispatch({
    type: a.SET_MODE,
    payload: {
        mode: modes.get(loc)
    }
  })
});

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
            console.log(storage.get('note').notes)
            if (store.getState().sound.mode === 'note') {
              const result = storage.get('note').notes || fill();
              next({
                type: a.MODE_SET_RESULT,
                payload: {
                  result,
                }
              });
            }

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
                sound.get(payload.index).play();
                next(action);
            }

            break;

        case a.SAVE_NOTES:
            storage.set({notes: store.getState().sound.result}, 'note');
            next({
              type: a.MODE_SET_RESULT,
              payload: {
                result: null,
              }
            });
            next({
              type: a.MODE_HIDE_SETTINGS,
            });
            break;

        case a.KEY_UP:
            {
                const s = sound.get(payload.index, true);
        
                if(s)
                    s.stop();
            }
            next(action);
            break;

        case a.SET_MODE:
            next(action);
            next({ type: a.CLEAR_SCROLL });
            history.pushState({}, null, urls[payload.mode]);

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
