import storage from './common/storage';
import {getPercents, random, fill} from './common';

window.workPlace = {
	mode : "play",
	checked : true,
	note : 0,
	success : 0,
	total : 0,
	limit : storage.get().total,
	settings : false,
	removeTimeout : null,
	resultTimeout : null,
	now : false,
	currentOctave : 1,

	notes : ['До', 'До#', 'Ре', 'Ре#', 'Ми', 'Фа', 'Фа#', 'Соль', 'Соль#', 'Ля', 'Ля#', 'Си'],
 	intervals : [
		"Прима",
		"Малая секунда",
		"Большая секунда",
		"Малая терция",
		"Большая терция",
		"Кварта",
		"Тритон",
		"Квинта",
		"Малая секста",
		"Большая секста",
		"Малая септима",
		"Большая септима",
		"Октава"
		],
	mindurs : ['Минор', 'Мажор'],
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
		'M' : 11},
	accordsDur : [
		'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'
	],
	accordsMin : [
		'Cm', 'Cm#', 'Dm', 'Dm#', 'Em', 'Fm', 'Fm#', 'Gm', 'Gm#', 'Am', 'Am#', 'Hm'
	],
	
	dispatch: function(type, payload) {
		window.store.dispatch({
			type,
			payload
		})
	},
	
	showInfoBox : function(text){
		workPlace.dispatch('SET_INFO', {info: text});
	},
		
	hideInfoBox : function(){
		workPlace.dispatch('SET_INFO', {info: null});
	},
		
	setNote : function(id) {
		if(typeof this.modules[this.mode] != "undefined" && typeof this.modules[this.mode].setNote != "undefined")
			this.modules[this.mode].setNote(id);
	},

	setLimit : function(limit){
		this.limit = limit;
	},

	setMode : function(mode){
		workPlace.hideInfoBox();
		
		this.checked = true;
			
		this.total = 0;
		this.success = 0;
			
		if(typeof this.modules[this.mode] != "undefined" && typeof this.modules[this.mode].destroy != "undefined")
			this.modules[this.mode].destroy();
		
		this.mode = mode;

		this.remember();

		if(typeof this.modules[this.mode] != "undefined" && typeof this.modules[this.mode].select != "undefined")
			this.modules[this.mode].select();
	},

	setSettings : function(){
		if(typeof this.modules[this.mode] != "undefined" && typeof this.modules[this.mode].setSettings != "undefined")
			this.modules[this.mode].setSettings();

		this.hideSettings();
	},

	guess : function(){
		this.dispatch('SET_CHECK', {value: true});

		if(typeof this.modules[this.mode] != "undefined" && typeof this.modules[this.mode].guess != "undefined")
			this.modules[this.mode].guess();

		this.hideSettings();
	},

	check : function(id){
		this.setNote(id);
		
		if(this.mode == "play" || this.checked)
			return;

		this.checked = true;
		
		this.total++;

		this.dispatch('REPEAT', {value: false});
		this.dispatch('INCREMENT_STEP');
		this.dispatch('SET_CHECK', {value: false});

		if(typeof this.modules[this.mode].check != "undefined")
			this.modules[this.mode].check(id);
		
		if(this.total == this.limit)
			this.showTotal();
	},

	clearResult : function(){
		workPlace.dispatch('MODE_SET_RESULT', {result: null})
	},

	showTotal : function(){
		if(this.total == this.limit && this.limit != 0){
			
			if(window.yaCounter32364810) 
				yaCounter32364810.reachGoal('finished');

			if(typeof this.modules[this.mode].showTotal != "undefined") {
				this.modules[this.mode].showTotal();
			}
		}
	},

	showSettings : function (){
		this.settings = true;
		$("#mode-controls ." + this.mode + " .settings").show();
		$("#mode-controls ." + this.mode + " .main").hide();
		
		if(typeof this.modules[this.mode].showSettings != "undefined")
			this.modules[this.mode].showSettings();
	},

	hideSettings : function (){
		this.settings = false;
		$("#mode-controls ." + this.mode + " .settings").hide();
		$("#mode-controls ." + this.mode + " .main").show();
		
		$("#info").hide().text("");
			
		if(typeof this.modules[this.mode].hideSettings != "undefined")
			this.modules[this.mode].hideSettings();
	},

	playNote : function (id){
		if(id < 0 || id >= 60)
			return;
		
		window.sound.get(id).play(0, 3);
	},

	playAccord : function (accord){
		window.sound.play(accord);
	},

	remember : function(){

		this.setLimit(storage.get().total);

		if(typeof this.modules[this.mode] != "undefined" && typeof this.modules[this.mode].remember != "undefined")
			this.modules[this.mode].remember();
	},

	keyPressed : function(id){
		if(id < 0 || id >= 60)
			return;

		if(typeof this.modules[this.mode] != "undefined" && typeof this.modules[this.mode].keyPressed != "undefined")
			this.modules[this.mode].keyPressed(id);
	},

	init : function(){
		for(m in this.modules){
			if(typeof this.modules[m].init != "undefined")
				this.modules[m].init();
		}
	},

	getResult: function(){
		if(typeof this.modules[this.mode] != "undefined" && typeof this.modules[this.mode].getResult != "undefined")
			this.modules[this.mode].getResult();
	},

	modules : {
		note : {
			noteKeys : null,

			getResult: function() {
				return [
					['Результат', `${getPercents(workPlace.success, storage.get().total)} (${workPlace.success} / ${storage.get().total})`],
				];
			},

			noteKeysCount : function (){
				var cnt = 0;
				for(var i = 0; i < this.noteKeys.length; i++){
					if(this.noteKeys[i])
						cnt++;
				}
				return cnt;
			},

			keyPressed : function(id){
				workPlace.check(id);	
			},

			select : function(){
				workPlace.showInfoBox("Нажмите 'Играть ноту' и выберете ее на клавиатуре виртуального фортепиано сверху");
				
				if(window.yaCounter32364810) yaCounter32364810.reachGoal('ноты');
			},

			guess : function(){
				if(!workPlace.checked){
					workPlace.playNote(workPlace.note);
					return;
				}
				
				workPlace.clearResult(true);
				
				while(true){
					var r = random();
					
					if(this.noteKeysCount() > 2){
						if(!this.noteKeys[r])
							continue;
					}
					
					if(r != workPlace.note){
						workPlace.note = r;
						break;
					}
				}

				workPlace.showInfoBox("Выберите ноту на клавиатуре");

				workPlace.playNote(workPlace.note);
				
				workPlace.checked = false;

				const result = this.noteKeys.splice();
				result[workPlace.note] = 'blue';
			},

			check : function(id){

				if(id === workPlace.note)
					workPlace.success++;

				workPlace.hideInfoBox();
				
				if(id == workPlace.note){
					const result = fill(60, false);
					result[workPlace.note] = 'green';

					workPlace.dispatch('MODE_SET_RESULT', {result})						
				}
				else{
					const result = fill(60, false);
					result[workPlace.note] = 'green';
					result[id] = 'red';

					workPlace.dispatch('MODE_SET_RESULT', {result})	
				}

			},

			remember : function() {
				if(!storage.get("note").notes){
					this.noteKeys = fill(60, false);
				}
				else{
					this.noteKeys = storage.get("note").notes;
				}
			},

			showTotal: function() {
				workPlace.hideInfoBox();
				workPlace.dispatch('MODE_SHOW_TOTAL', {result: this.getResult()});

				setTimeout( () => {
					workPlace.dispatch('MODE_SET_RESULT', {result: null});					
				}, 2000);
			}
		},

		interval : {
			interval : 0,
			intervalValues : null,
			intervalMode : "up",

			init : function(){
				var self = this;

				$('.interval-settings a').on("click", function(){
					common.setStorageVal("intervalMode", $(this).attr("data-value"));
					self.intervalMode = $(this).attr("data-value");

					$(".interval-settings a.active").removeClass("active");
					$(this).addClass("active");
				});

				$(".intervals a").on("click", function(){
					if(!workPlace.settings){
						var interval = $(this).attr("data-value");
						workPlace.check(interval);
						//workPlace.guess();
					}
					else{
						$(this).toggleClass("green");
						if($(this).hasClass("green")){
							$("span", $(this)).show();
						}
						else{
							$("span", $(this)).hide();
						}
					}
				});
			},

			showSettings : function (){
				$("#info").show().text("Выберите интервалы, которорые хотите угадывать (не менее 2х)");

				$(".intervals a").show();
			
				for(var i = 1; i < this.intervalValues.length; i++){
					if(this.intervalValues[i]){
						$('.intervals a[data-value="'+i+'"]').addClass("green");
						$("span", $('.intervals a[data-value="'+i+'"]')).show();
					}
				}
				$('.intervals').show();
			},

			play : function(){
				var v = this.intervalMode;
					
				var self = this;

				if(v == "up"){
					workPlace.playNote(workPlace.note);
					setTimeout(function(){
						workPlace.playNote(workPlace.note + self.interval);
						}, 1000);
				}
				else if(v == "down"){
					workPlace.playNote(workPlace.note + self.interval);
					setTimeout(function(){
						workPlace.playNote(workPlace.note);
						}, 1000);
				}
				else{
					workPlace.playNote(workPlace.note);
					workPlace.playNote(workPlace.note + self.interval);
				}
			},

			setSettings : function(){
				var self = this;

				$(".intervals a").each(function(){
					self.intervalValues[$(this).attr("data-value")] = $(this).hasClass("green");
				});
				
				if(this.intervalCount() >= 2)
					$(".intervals a").each(function(){
						if(self.intervalValues[$(this).attr("data-value")] == false){
							$(this).hide();
						}
					});
				
				common.setStorageVal("intervalValues", this.intervalValues.toString());
			},

			guess : function(){
				
				if(!workPlace.checked){
					this.play();
					return;
				}
				
				workPlace.clearResult(true);
				
				while(true){
					this.interval = common.random(1, 12);
					
					if(this.intervalCount() >= 2){
						if(!this.intervalValues[this.interval])
							continue;
					}
					
					r  = common.random(0, 24);
					
					if(r != workPlace.note){
						workPlace.note = r;
						break;
					}
				}
				
				$("#info").show().text("Выберите прозвучавший интервал");
				$("#mode-controls .interval .play .name").text("Повторить");
				this.play();
						
				$('.key').removeClass("red").removeClass("green");
				
				$('.intervals').show();
				
				workPlace.checked = false;
				
				//alert(2);
			},

			intervalCount : function() {
				var cnt = 0;
				for(var i = 0; i < this.intervalValues.length; i++){
					if(this.intervalValues[i])
						cnt++;
				}
				return cnt;
			},

			remember : function(){
				if(common.getStorageVal("intervalValues") == null){
					this.intervalValues = [];
					for(var i = 0; i <= 12; i++){
						this.intervalValues.push(false);
					}
				}
				else{
					this.intervalValues = common.getStorageArray("intervalValues");
				}

				if(common.getStorageVal("intervalMode") == null){
					this.intervalMode = "up";
				}
				else{
					this.intervalMode = common.getStorageVal("intervalMode");
				}
			},

			select : function(){				

				$('.interval-settings a[data-value="' + this.intervalMode + '"]').addClass("active");

				$("#mode-controls .interval .play .name").text("Играть интервал");
				$("#result").show();
				
				var self = this;

				if(this.intervalCount() >= 2)
					$(".intervals a").each(function(){
						if(self.intervalValues[$(this).attr("data-value")] == false){
							$(this).hide();
						}
					});
					
				if(window.yaCounter32364810) yaCounter32364810.reachGoal('интервал');
			},

			check : function(id){
				//alert(1);
				if(id == this.interval)
					workPlace.success++;

				var self = this;
				
				setTimeout(function(){
				
					if(id == self.interval){
						$('.key[data-note-abs="' + workPlace.note + '"]').addClass("green");
						$('.key[data-note-abs="' + (workPlace.note + self.interval) + '"]').addClass("green");
						$("#result").css("color", "green");
					}
					else{
						$('.key[data-note-abs="' + workPlace.note + '"]').addClass("red");
						$('.key[data-note-abs="' + (workPlace.note + self.interval) + '"]').addClass("red");
						$("#result").css("color", "red");
					}
					
					$("#result").text(workPlace.intervals[self.interval]);
					
					$("#mode-controls .interval .play .name").text("Играть след. интервал");
				}, 100);
				
				$(".intervals").hide();
			},

			hideSettings : function(){
				$(".intervals a.green").removeClass("green");
				$(".intervals span").hide();
				if(workPlace.checked)
					$(".intervals").hide();

				var self = this;
				
				if(this.intervalCount() >= 2)
					$(".intervals a").each(function(){
						if(self.intervalValues[$(this).attr("data-value")] == false){
							$(this).hide();
						}
					});
			}
		},

		mindur : {
			mindur : 0,

			select : function(){
				if(window.yaCounter32364810) yaCounter32364810.reachGoal('мажор-минор');
			},

			init : function(){
			},

			guess : function() {
				if(!workPlace.checked){
					this.play();
					return;
				}
				
				workPlace.clearResult(true);
				
				while(true){
					this.mindur = random(0, 1);
					
					const r = random(0, 60 - 8);
					
					if(r != workPlace.note){
						workPlace.note = r;
						break;
					}
				}
				
				workPlace.showInfoBox("Выберите прозвучавшее трезвучие с помощью кнопок 'Мажор' / 'Минор");

				this.play();
				
				workPlace.checked = false;
			},

			check : function(id){
				workPlace.hideInfoBox();

				if(id === this.mindur){
					workPlace.success++;

					const result = fill(60, false);
					result[workPlace.note] = 'green';
					result[workPlace.note + 3 + this.mindur] = 'green';
					result[workPlace.note + 7] = 'green';

					workPlace.dispatch('MODE_SET_RESULT', {result})		
				}
				else{
					const result = fill(60, false);
					result[workPlace.note] = 'red';
					result[workPlace.note + 3 + this.mindur] = 'red';
					result[workPlace.note + 7] = 'red';

					workPlace.dispatch('MODE_SET_RESULT', {result})	
				}
			},

			play : function() {
				if(this.mindur === 0){ // минор
					workPlace.playAccord([workPlace.note, workPlace.note + 3, workPlace.note + 7]);
				}
				else{	//мажор
					workPlace.playAccord([workPlace.note, workPlace.note + 4, workPlace.note + 7]);
				}
			},

			getResult: function() {
				return [
					['Результат', `${getPercents(workPlace.success, storage.get().total)} (${workPlace.success} / ${storage.get().total})`],
				];
			},

			showTotal: function() {
				workPlace.hideInfoBox();
				workPlace.dispatch('MODE_SHOW_TOTAL', {result: this.getResult()});

				setTimeout( () => {
					workPlace.dispatch('MODE_SET_RESULT', {result: null});					
				}, 2000);
			}
		},

		dictation : {
			speed: '500',
			noteCount: 4,
			img: null,
			canvas: null,
			ctx: null,
			saveMode: 'write',
			melody : [],
			notes: [],
			currentNote: -1,
			rects: [],
			timer: null,
			mode: "write",
			tone: 0,
			toneRnd: false,
				
			select : function(){
				$("#info").hide();
				$("#result").show();
				this.notes = [];
				this.melody = [];
				this.drawKey();
				this.generate();
				workPlace.checked = false;
				workPlace.showInfoBox("Чтобы записать ноту, выберите режим 'писать' и нажмите клавишу на клавиатуре виртуального фортепиано сверху");
				
				if(window.yaCounter32364810) yaCounter32364810.reachGoal('диктант');
				
			},
				
			generate : function(){
				var note = dictant.getFirstNote(this.tone);
				this.melody.push(note);
				
				for(var i = 1; i < 7; i++){
					note = dictant.getNote(note, this.tone);
					this.melody.push(note);		
				}
				
				/*this.melody.push(7);
				this.melody.push(8);	
				this.melody.push(-9);*/
			},

			remember : function(){

				if(common.getStorageVal("speed") == null){
					this.speed = "500";
				}
				else{
					this.speed = common.getStorageVal("speed");
				}
				
				if(common.getStorageVal("noteCount") == null){
					this.noteCount = 4;
				}
				else{
					this.noteCount = parseInt(common.getStorageVal("noteCount"));
				}
				
				if(common.getStorageVal("dictantMode") == null){
					this.mode = this.saveMode ="play";
				}
				else{
					this.mode = this.saveMode = common.getStorageVal("dictantMode");
				}
				
				if(common.getStorageVal("tone") == null){
					this.tone = 0;
				}
				else{
					this.tone = common.getStorageVal("tone") == "rnd" ? common.random(0, 3) : common.getStorageVal("tone");
				}
				this.toneRnd = (common.getStorageVal("tone") == "rnd");
				
				
				$("#dictant-tone").val(common.getStorageVal("tone") ? common.getStorageVal("tone") : "0");				
					
				$("#dictant-speed").val(this.speed);
				$("#dictant-notes").val(this.noteCount);
				$("#dictant-mode").val(this.mode);
				
				$(".dictation-mode .modes > *").removeClass("active");
				$(".dictation-mode .mode-" + this.mode).addClass("active");
			},
				
			drawKey : function(){
				var tone = this.tone;
				
				this.canvas  = $(".dictation canvas")[0];
	            this.ctx     = this.canvas && this.canvas.getContext('2d') || null;
	            
	            if(this.ctx == null)
					return;

	            this.ctx.fillStyle = "white";
	            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	            this.ctx.strokeStyle = 'black';
	            this.ctx.lineWidth = 1;

	            for(var i = 0; i < 5; i++){
	            	this.ctx.drawImage(this.img, 0, 280, 1, 1, 0, 20 + 28 + i * 8, this.canvas.width, 1);
	            }

		        this.ctx.drawImage(this.img, 0, 0, 50, 85, 0, 14, 50, 85);
		        
		        for(var i = 0; i < dictant.tones[tone].sharps.length; i++){
		        	var note = dictant.tones[tone].sharps[i].note + dictant.tones[tone].sharps[i].offset;
		        	
		        	this.ctx.drawImage(this.img, 126, 0, 25, 50, 40 + i * 10, 20 + (16 - note) * 4, 25, 50);
		        }
		        	
			},
				
			drawNote : function(note, pos, whole, sharp, highlight){
				if(note < 8){
					for(var i = 5; i < Math.abs(4 - Math.floor(note / 2)) + 5; i++){
		            	this.ctx.drawImage(this.img, 0, 280, 1, 1, pos + 4, 20 + 28 + i * 8, 15, 1);
		            }
				}
				else if(note > 17){					
					for(var i = 0; i < (note - 18) + Math.floor(note % 2); i++){
		            	this.ctx.drawImage(this.img, 0, 280, 1, 1, pos + 4, 20 + 28 - i * 8, 15, 1);
		            }
				}
				
				if(highlight == "green")
					highlight = 165;
				else if(highlight == "red")
					highlight = 81;
				else
					highlight = 0;
				
				if(sharp === true){
					this.ctx.drawImage(this.img, 126, highlight, 25, 50, pos - 10, 20 + (16 - note) * 4, 25, 50);
				}
				else if(sharp === 'bekar'){
					this.ctx.drawImage(this.img, 150, highlight, 25, 50, pos - 10, 20 + (16 - note) * 4, 25, 50);
				}
				
				if(whole === true)
					this.ctx.drawImage(this.img, 97, highlight, 25, 50, pos, 9 + (17 - note) * 4, 25, 50);					
				else
					this.ctx.drawImage(this.img, 71, highlight, 25, 50, pos, 9 + (17 - note) * 4, 25, 50);
				
				
			},
				
			drawLine : function(pos){
				this.ctx.drawImage(this.img, 0, 280, 1, 1, pos, 20 + 28, 1, 4 * 8);
			},
				
			drawNotes : function(values){
				var notes = values || this.notes;
				var offset = 0;
				
				if(notes == this.notes){
					this.rects = [];
				}
				
				for(var i = 0; i < notes.length; i++){
					if(notes[i] < 0)
						offset += 12;
					
					var sharp = false;
					
					var note = notes[i];
					
					var tone = this.tone;
					
						if(note > 0 && dictant.checkSharp(note, tone) && (!i || notes[i-1] != note)){
							sharp = 'bekar';
							offset += 8;
						}
						if(note < 0){
							if(dictant.checkSharp(note, tone)){
								if(i > 0 && notes[i-1] > 0 && i % 2 == 1 && i > 0 && notes[i-1] == -notes[i] - 1){
									sharp = true;
								}								
							}
							else{
								if(i > 0 && notes[i - 1] != notes[i] || i == 0){
									sharp = true;
								}
								else{
									offset -= 12;
								}
							}
							
							note = -note - 1;
														
						}	
						else if(note >= 0 && i % 2 == 1 && i > 0 && notes[i - 1] < 0 && -notes[i - 1] - 1 == notes[i]){
							sharp = 'bekar';
							offset += 8;
						}
					//}
					
					this.drawNote(note, i * 20 + offset + (this.tone == 0 ? 40 : 70), i == notes.length - 1 && notes.length % 2 == 1, sharp, this.currentNote == i ? "green" : false);
					
					if(notes == this.notes){
						this.rects.push({left: i * 20 + offset + (this.tone == 0 ? 40 : 70), right: i * 20 +  + (this.tone == 0 ? 40 : 70) + offset + 25, top: 9 + (17 - note) * 4, bottom: 9 + (17 - note) * 4 + 50});
					}
						
					if(i != notes.length - 1 && (i % 2 != 0)){
						this.drawLine(i * 20 + offset + 26 + (this.tone == 0 ? 40 : 70));
						offset += 6;
					}
				}
			},
				
			check : function(id){

				var self = this;
				
				function __check(){
					for(var i = 0; i < self.notes.length; i++){
						if(self.notes[i] != self.melody[i]){
							return false;
						}
					}
					return true;
				}
				
				if(__check())
					workPlace.success++;
				
				$(".dictation-mode").hide();
				$(".dictation-mode-checked").show();
				
				var offset = 0;
				var notes = this.notes;
				
				this.drawKey();
				
				for(var i = 0; i < notes.length; i++){
					if(notes[i] < 0)
						offset += 12;
					
					var sharp = false;
					
					var note = notes[i];
					
					var tone = this.tone;
					
					if(note > 0 && dictant.checkSharp(note, tone) && (!i || notes[i-1] != note)){
						sharp = 'bekar';
						offset += 8;
					}
					if(note < 0){
						if(dictant.checkSharp(note, tone)){
							if(i > 0 && notes[i-1] > 0 && i % 2 == 1 && i > 0 && notes[i-1] == -notes[i] - 1){
								sharp = true;
							}
							else{
								offset -= 12;
							}
						}
						else
							if(i > 0 && notes[i - 1] != notes[i] || i == 0){
								sharp = true;
							}
						
						note = -note - 1;
													
					}	
					else if(note >= 0 && i % 2 == 1 && i > 0 && notes[i - 1] < 0 && -notes[i - 1] - 1 == notes[i]){
						sharp = 'bekar';
						offset += 8;
					}
					
					if(self.notes[i] != self.melody[i]){
						this.drawNote(note, i * 20 + (this.tone == 0 ? 40 : 70) + offset, i == notes.length - 1 && notes.length % 2 == 1, sharp, "red");
						this.drawNote(self.melody[i] < 0 ? - self.melody[i] - 1 : self.melody[i], i * 20 + (this.tone == 0 ? 40 : 70) + offset, i == notes.length - 1 && notes.length % 2 == 1, sharp, "green");
					}
					else{
						this.drawNote(note, i * 20 + (this.tone == 0 ? 40 : 70) + offset, i == notes.length - 1 && notes.length % 2 == 1, sharp, "green");
					}

					if(i != notes.length - 1 && (i % 2 != 0)){
						this.drawLine(i * 20 + (this.tone == 0 ? 40 : 70) + offset + 26);
						offset += 6;
					}
				}
				
				setTimeout(function(){
					
				
					//$("#result").text([ workPlace.notes[window.note % 12], workPlace.octaves[Math.floor(workPlace.note / 12)] ].join(" "));
					
					//$("#mode-controls .note .play .name").text("Играть след. ноту");

				}, 100);
			},
				
			update : function(){
				$(".dictation-mode").show();
				$(".dictation-mode-checked").hide();

				$(".dictation .check").attr("disabled", "disabled");
				
				$(".dictation-mode .modes > *").removeClass("active");
				$(".dictation-mode .mode-" + this.saveMode).addClass("active");
					
				var self = this;
				
				self.melody = [];
				self.notes = [];
				
				self.currentNote = -1;
				
				if(self.toneRnd){
					self.tone = common.random(0, 3);
				}
				
				//alert(self.tone);
					
				self.generate();
				
				self.drawKey();
				workPlace.checked = false;
			},

			init : function(){
				var self = this;
				
				this.img = new Image();
				this.img.src = "/img/notes2.png";
				this.img.onload = function(){
					self.drawKey();
					}
				$("body").on("click", "canvas", function(e){
					
					if(self.mode == "write" && self.notes.length == 0){
						
						return;
					}
					
					if(self.mode == "play")
						return;
					
					var x = Math.floor(e.pageX - $(this).offset().left);
					var y = Math.floor(e.pageY - $(this).offset().top);
					
					for(var i = 0; i < self.rects.length; i++){
						if(x >= self.rects[i].left && x <= self.rects[i].right && y >= self.rects[i].top && y <= self.rects[i].bottom){
							self.currentNote = i;
							self.drawKey();
							self.drawNotes();
							return;
						}
					}
					
					self.currentNote = -1;
					self.drawKey();
					self.drawNotes();	
				});
				
				$("body").on("mousemove", "canvas", function(e){
					
					if(self.mode == "play")
						return;
					
					var x = Math.floor(e.pageX - $(this).offset().left);
					var y = Math.floor(e.pageY - $(this).offset().top);
					
					for(var i = 0; i < self.rects.length; i++){
						if(x >= self.rects[i].left && x <= self.rects[i].right && y >= self.rects[i].top && y <= self.rects[i].bottom){
							$(this).css("cursor", "pointer");
							return;
						}
					}
					
					$(this).css("cursor", "default");
				});					
					
				$("body").on("click", "#mode-controls .dictation .modes a", function(e){
					e.preventDefault();
					$("#mode-controls .dictation .modes a").removeClass("active");
					$(this).addClass("active");
					if($(this).hasClass("mode-write")){
						$("#mode-controls .dictation .buttons").show();
						$("#info").show().text("Выберите ноту на клавиатуре");
					}
					else{
						$("#mode-controls .dictation .buttons").hide();
						$("#info").hide();
						self.currentNote = -1;
						self.drawKey();
						self.drawNotes();
					}
				});
				
				$("body").on("click", "#mode-controls .dictation .play-melody", function(e){
					e.preventDefault();
					
					if(self.timer){
						clearTimeout(self.timer);
						self.timer = null;
						self.currentNote = -1; 
						self.drawKey();
						self.drawNotes();
						return;
					}
					
					function d(i){
						if(i >= self.noteCount){
							self.timer = null;
							return;
						}

						//$(".key[data-note-abs='"+dictant.noteToKey(self.melody[i])+"']").addClass("active");
						workPlace.playNote(dictant.noteToKey(self.melody[i]));

						self.timer = setTimeout(function(){
							//$(".key[data-note-abs='"+dictant.noteToKey(self.melody[i])+"']").removeClass("active");
							d(++i);
						}, self.speed);
					}
					
					d(0);
				});
				
				$("body").on("click", "#mode-controls .dictation .check", function(e){
					e.preventDefault();
					workPlace.check(0);
					
				});
				
				$("body").on("click", "#mode-controls .dictation .next", function(e){
					e.preventDefault();
					
					self.update();
				});
				
				$("body").on("click", "#mode-controls .dictation .play-user", function(e){
					e.preventDefault();
					
					if(self.timer){
						clearTimeout(self.timer);
						self.timer = null;
						self.currentNote = -1; 
						self.drawKey();
						self.drawNotes();
						$(".key").removeClass("active");
						return;
					}
					
					function d(i){
						if(i >= self.notes.length){
							self.currentNote = -1; 
							self.drawKey();
							self.drawNotes();
							self.timer = null;
							return;
						}
						$(".key[data-note-abs='"+dictant.noteToKey(self.notes[i])+"']").addClass("active");
						workPlace.playNote(dictant.noteToKey(self.notes[i]));
						
						if(!workPlace.checked){
							self.currentNote = i;
							self.drawKey();
							self.drawNotes();
						}

						self.timer = setTimeout(function(){
							$(".key[data-note-abs='"+dictant.noteToKey(self.notes[i])+"']").removeClass("active");
							d(++i);
						}, self.speed);
					}
					
					d(0);
				});

				
				$("body").on("click", ".dictation-mode .mode-play", function(e){
					e.preventDefault();
					self.mode = 'play';
				});
				
				$("body").on("click", ".dictation-mode .mode-write", function(e){
					e.preventDefault();
					self.mode = 'write';
				});
				
				$("body").on("click", ".dictation-mode .remove", function(e){
					e.preventDefault();
					if(self.notes.length){
						self.notes.pop();
						self.currentNote = -1;
						self.drawKey();
						self.drawNotes();
						$(".dictation .check").attr("disabled", "disabled");
					}
				});
				
				$("body").on("click", ".dictation-mode .dictation-settings", function(e){
					e.preventDefault();				
					$("#modalDictantSettings").modal("show");
				});
				
				$("body").on("click", "#modalDictantSettings .ok-btn", function(e){
					e.preventDefault();				
					
					self.speed = $("#dictant-speed").val();
					common.setStorageVal("speed", self.speed);
					
					self.noteCount = parseInt($("#dictant-notes").val());
					common.setStorageVal("noteCount", self.noteCount);
					
					self.saveMode = $("#dictant-mode").val();
					common.setStorageVal("dictantMode", self.saveMode);
					
					var tone = $("#dictant-tone").val();
					//alert(tone + "" + self.tone);
					if(tone != self.tone || tone == "rnd"){
						
						self.tone = tone;
						self.toneRnd = (tone == "rnd");
						
						self.update();
					}
						
					common.setStorageVal("tone", tone);
					
					if(self.noteCount > self.notes.length)
						$(".dictation .check").attr("disabled", "disabled");
					else{
						self.notes.splice(-(self.notes.length - self.noteCount), self.notes.length - self.noteCount);
						self.drawKey();
						self.drawNotes();	
						$(".dictation .check").removeAttr("disabled");
					}
				});
			},
				
			keyPressed : function(id){
				if($("#mode-controls .dictation .modes .mode-write").hasClass("active")){
					if(this.currentNote != -1){
						var note = dictant.keyToNote(id);
						this.notes[this.currentNote] = note;
						this.drawKey();
						this.drawNotes();				
					}
					else if(this.noteCount > this.notes.length){
						var note = dictant.keyToNote(id);
						this.notes.push(note);
						this.drawKey();
						this.drawNotes();				
					}
					if(this.noteCount <= this.notes.length){
						$(".dictation .check").removeAttr("disabled");
					}
				}
				
			}
		},
		
		education: {

			img: null,
			canvas: null,
			ctx: null,
			timer: null,
			note: null,
			startTime: 0,
				
			showTotal : function(){
			},
				
			destroy: function(){

				if(this.timer)
					clearInterval(this.timer);

				this.timer = null;
			},
				
			select : function(){
				
			},
				


			remember : function(){

			
			},
				
			drawKey : function(){
				this.canvas  = $("canvas.graph")[0];
				//alert(this.canvas)
	            this.ctx     = this.canvas && this.canvas.getContext('2d') || null;
				if(this.ctx == null)
					return;
				
	            this.ctx.fillStyle = "white";
	            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	            this.ctx.strokeStyle = 'black';
	            this.ctx.lineWidth = 1;

	            for(var i = 0; i < 5; i++){
	            	this.ctx.drawImage(this.img, 0, 280, 1, 1, 0, 20 + 28 + i * 8, this.canvas.width, 1);
	            }

		        this.ctx.drawImage(this.img, 0, 0, 50, 85, 0, 14, 50, 85);
			},
				
			drawNote : function(note, pos, whole, sharp, highlight){
				if(this.ctx == null)
					return;
				
				if(note < 0)
					note = -note - 1, sharp = true;
				
				if(note < 8){
					for(var i = 5; i < Math.abs(4 - Math.floor(note / 2)) + 5; i++){
		            	this.ctx.drawImage(this.img, 0, 280, 1, 1, pos + 4, 20 + 28 + i * 8, 15, 1);
		            }
				}
				else if(note > 17){					
					for(var i = 0; i < (note - 18) + Math.floor(note % 2); i++){
		            	this.ctx.drawImage(this.img, 0, 280, 1, 1, pos + 4, 20 + 28 - i * 8, 15, 1);
		            }
				}
				
				if(highlight == "green")
					highlight = 165;
				else if(highlight == "red")
					highlight = 81;
				else
					highlight = 0;
				
				if(sharp === true){
					this.ctx.drawImage(this.img, 126, highlight, 25, 50, pos - 10, 20 + (16 - note) * 4, 25, 50);
				}
				else if(sharp === 'bekar'){
					this.ctx.drawImage(this.img, 150, highlight, 25, 50, pos - 10, 20 + (16 - note) * 4, 25, 50);
				}
				
				if(whole === true)
					this.ctx.drawImage(this.img, 97, highlight, 25, 50, pos, 9 + (17 - note) * 4, 25, 50);					
				else
					this.ctx.drawImage(this.img, 71, highlight, 25, 50, pos, 9 + (17 - note) * 4, 25, 50);
				
				
			},
				
			drawLine : function(pos){
				this.ctx.drawImage(this.img, 0, 280, 1, 1, pos, 20 + 28, 1, 4 * 8);
			},

			init : function(){
				var self = this;
				
				this.img = new Image();
				this.img.src = "/img/notes2.png";
				this.img.onload = function(){
					self.drawKey();
					}
				
			},
				
			keyPressed : function(id){
				//alert(dictant.keyToNote(id));
				this.drawKey();
				this.drawNote(dictant.keyToNote(id), 45, true );

					
			}
				
			
		}
	}
}