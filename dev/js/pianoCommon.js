
import {modes} from './const/modes';

$(window).on( 'popstate', function(e){
  const loc = decodeURIComponent((e.location || ( e.originalEvent && e.originalEvent.location ) || document.location).pathname);

  window.store.dispatch({
    type: "SET_MODE",
    payload: {
        mode: modes.get(loc)
    }
  })
});