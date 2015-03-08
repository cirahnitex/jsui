(function() {
    var ns = Root.Widget;
    ns.Recorder = function() {
        Util.Observable.call(this);

        this.mattRecorder = null;
        //this.mp3Worker = new Worker('libs/recorder/mp3Worker.js');

        try {
            var audioContext = new AudioContext();
            var that = this;
            navigator.getUserMedia({audio: true}, function(stream) {
                var input = audioContext.createMediaStreamSource(stream);
                window[Util.uniqueName()] = input;
                // Uncomment if you want the audio to feedback directly
                //input.connect(audio_context.destination);
                //__log('Input connected to audio context destination.');

                that.mattRecorder = new Recorder(input);

            }, function(e) {
                that.setChanged(ns.Recorder.state.NOT_ALLOWED);
                that.notifyObservers();
            });
        } catch(e) {
            this.setChanged(ns.Recorder.state.NOT_SUPPORTED);
            this.notifyObservers();
        }

        this.setChanged(ns.Recorder.state.NORMAL);

    };
    ns.Recorder.extend(Util.Observable);
    ns.Recorder.state = {
        NORMAL: Util.uniqueInt(),
        RECORDING: Util.uniqueInt(),
        RECORDED: Util.uniqueInt(),
        NOT_SUPPORTED: Util.uniqueInt(),
        NOT_ALLOWED: Util.uniqueInt()
    };
    ns.Recorder.prototype.record = function() {
        if(!this.mattRecorder) return;
        if(this.getObservableState() === ns.Recorder.state.RECORDING) return;
        this.mattRecorder.record();
        this.setChanged(ns.Recorder.state.RECORDING);
        this.notifyObservers();
    };
    ns.Recorder.prototype.stop = function() {
        if(this.getObservableState() !== ns.Recorder.state.RECORDING) return;
        this.mattRecorder.stop();
        this.setChanged(ns.Recorder.state.RECORDED);
        this.notifyObservers();
    };
    ns.Recorder.prototype.clear = function() {
        this.mattRecorder.clear();
    };
    ns.Recorder.prototype.exportWAV = function(callback) {
        this.mattRecorder.exportWAV(callback);
    };
    ns.Recorder.prototype.exportMP3 = function(callback) {
        var encoderWorker = this.mp3Worker;
        this.mattRecorder.exportWAV(function(blob) {

            //console.log("the blob " +  blob + " " + blob.size + " " + blob.type);

            var arrayBuffer;
            var fileReader = new FileReader();

            fileReader.onload = function() {
                arrayBuffer = this.result;
                var buffer = new Uint8Array(arrayBuffer),
                    data = ns.Recorder.parseWav(buffer);

                console.log(data);
                console.log("Converting to Mp3");

                encoderWorker.postMessage({ cmd: 'init', config: {
                    mode: 3,
                    channels: 2,
                    samplerate: data.sampleRate,
                    bitrate: data.bitsPerSample
                }});

                encoderWorker.postMessage({ cmd: 'encode', buf: ns.Recorder.Uint8ArrayToFloat32Array(data.samples) });
                encoderWorker.postMessage({ cmd: 'finish'});
                encoderWorker.onmessage = function(e) {
                    if(e.data.cmd == 'data') {

                        console.log("Done converting to Mp3");

                        /*var audio = new Audio();
                        audio.src = 'data:audio/mp3;base64,'+encode64(e.data.buf);
                        audio.play();*/

                        //console.log ("The Mp3 data " + e.data.buf);

                        var mp3Blob = new Blob([new Uint8Array(e.data.buf)], {type: 'audio/mp3'});
                        callback(mp3Blob);

                    }
                };
            };

            fileReader.readAsArrayBuffer(blob);
        });
    };
    ns.Recorder.parseWav = function(wav) {
        function readInt(i, bytes) {
            var ret = 0,
                shft = 0;

            while(bytes) {
                ret += wav[i] << shft;
                shft += 8;
                i++;
                bytes--;
            }
            return ret;
        }

        if(readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
        //if(readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
        console.log(readInt(22, 2));
        return {
            sampleRate: readInt(24, 4),
            bitsPerSample: readInt(34, 2),
            samples: wav.subarray(44)
        };
    };

    ns.Recorder.Uint8ArrayToFloat32Array = function(u8a) {
        var f32Buffer = new Float32Array(u8a.length);
        for(var i = 0; i < u8a.length; i++) {
            var value = u8a[i << 1] + (u8a[(i << 1) + 1] << 8);
            if(value >= 0x8000) value |= ~0x7FFF;
            f32Buffer[i] = value / 0x8000;
        }
        return f32Buffer;
    }
})();
