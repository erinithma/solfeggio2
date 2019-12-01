import { fill } from ".";

const NAME = "so_storage";

function init(){
    if(!localStorage.getItem(NAME))
        localStorage.setItem(NAME, JSON.stringify({
            common: {
                total: 10,
                showInfo: true,
            },
            modes: {
                note: {
                    notes: fill().map( (_, i) => [24, 26, 28, 29, 31, 33, 35].includes(i) )
                }
            }
        }));
}

function get(mode = null){
    init();

    const json = JSON.parse(localStorage.getItem(NAME));
    
    if(mode === null) {
        return json.common;
    }
    else if(typeof mode === "string"){
        return json.modes[mode] || {};
    }
    throw "invalid argument 'mode'";
}

function set(data, mode = null) {
    init();

    let allData = JSON.parse(localStorage.getItem(NAME))

    if(mode === null) {
        let json = get();
        json = Object.assign({}, json, data);
        allData.common = json;

        localStorage.setItem(NAME, JSON.stringify(allData));
        return;
    }
    else if(typeof mode === "string"){
        let json = get(mode) || {};
        json = Object.assign(json, data);
        allData.modes[mode] = json;

        localStorage.setItem(NAME, JSON.stringify(allData));
        return;
    }
    throw "invalid argument 'mode'";
}

export default {
    get,
    set
};