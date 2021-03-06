import React from 'react';
import Octave from './octave';
import { connect } from 'react-redux';
import a from '../../const';
import { map } from '../../common';
import {PianoLike, Button, Column} from '../../components/common';

const workPlace = {
	ids : {
		'Z' : 0, 
		'S' : 1,
		'X' : 2,
		'D' : 3,
		'C' : 4,
		'V' : 5,
		'G' : 6,
		'B' : 7,
		'H' : 8,
		'N' : 9,
		'J' : 10,
    'M' : 11
  },
  modes: {
    play: "Игра",
    note: 'Угадай ноту',
    mindur: 'Мажор / минор',
  }
};

class Piano extends React.Component{

    componentDidMount() {
        this.props.loadSound();

        $("body").on("mouseup", this.onMouseUp);
        $("body").on("keydown", this.onKeyDown);
        $("body").on("keyup", this.onKeyUp);
    }

    componentWillUnmount() {
        $("body").off("mouseup", this.onMouseUp);
        $("body").off("keydown", this.onKeyDown);
        $("body").off("keyup", this.onKeyUp);
    }

    onMouseUp = (e) => {
        if(this.props.lastTouchIndex !== -1)
            this.props.keyUp(this.props.lastTouchIndex);
    };

    onKeyDown = (e) => {
        let key = e.keyCode;

        switch(key){
            case 37:
                return this.props.prevOctave();    
            case 39:
                return this.props.nextOctave();
        }
        
        key = String.fromCharCode(e.keyCode);            
        
        if(key in workPlace.ids){
            const noteKey =  this.props.currentOctave * 12 + workPlace.ids[key];

            this.props.keyDown(noteKey);

            return;
        }

        key = +key;
        
        if(!Number.isNaN(key) && key > 0 && key <=5 ){
            this.props.selectOctave(key - 1);
        }
    };

    onKeyUp = (e) => {
        const key = String.fromCharCode(e.keyCode);            
            
        if(key in workPlace.ids){	
            const noteKey =  this.props.currentOctave * 12 + workPlace.ids[key];

            this.props.keyUp(noteKey);
        }
    };

    display = (i) => {
        const {size, currentOctave} = this.props;

        if(size === "sm"){
            return i === currentOctave;
        }
        else if(size === "md"){
            let c = currentOctave;

            if(c > 0 && c < 4){
                return i >= c - 1 && i <= c + 1;
            }
            else if(c === 0){
                return i <= 2;
            }
            else if(c === 4){
                return i >= 2;
            }
        }
        else{
            return true;
        }
    };

    nextOctave = () => {
        this.props.nextOctave();
    };

    prevOctave = () => {
        this.props.prevOctave();
    };

    render(){
        const {tempOffset, offset, currentOctave, mode, size} = this.props;

        return (
            <React.Fragment>
                {
                   (size === "sm" || size === "md") &&
                    <PianoLike>
                        <h1 style={{margin: 0}}><span className={`icon-mode-${mode}`}/>{workPlace.modes[mode]}</h1>
                    </PianoLike>
                }
                <div className="piano-wrap">
                    <div className="piano-wrap__scroll-area" style={{left: tempOffset !== null ? tempOffset : offset}}>
                        <div className="piano-titles">
                            {
                                ['большая', 'малая', 'первая', 'вторая' , 'третья'].map( (v, i) => 
                                    <div key={i} className="octave-title">{v} октава</div> )
                            }
                        </div>
                        <div className="piano">
                            {
                                map(i => <Octave current={currentOctave === i} key={i} index={i} />, 5)
                            }
                        </div>
                    </div>   
                </div>
                <PianoLike className="piano-controls">
                    <Button onClick={this.prevOctave}>←</Button>
                    <Button ml="auto" onClick={this.nextOctave}>→</Button>
                </PianoLike> 
            </React.Fragment>
        );
    }
}

export default connect(
    (state) => (
    {
        currentOctave: state.sound.get("currentOctave"),
        lastTouchIndex: state.sound.get("lastTouchIndex"),
        size: state.sound.get("size"),
        offset: state.sound.get("offset"),
        tempOffset: state.sound.get("tempOffset"),
        mode: state.sound.mode,
    }),
    (dispatch) => ({
        loadSound: () => dispatch({
            type: a.LOAD_SOUND,
            payload: { urls: map( i => `/sound/piano/${i}.mp3` ) }
        }),
        keyDown: (index) => dispatch({
            type: a.KEY_DOWN,
            payload: {index}
        }),
        keyUp: (index) => dispatch({
            type: a.KEY_UP,
            payload: {index}
        }),
        selectOctave: (index) => dispatch({
            type: a.SELECT_OCTAVE,
            payload: {index}
        }),
        nextOctave: () => dispatch({
            type: a.INCREMENT_OCTAVE
        }),
        prevOctave: () => dispatch({
            type: a.DECREMENT_OCTAVE
        })    
    })
)(Piano)
  