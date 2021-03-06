(function() {
    var ns = Root.Fyp.Main;
    /**
     *
     * @param ctrl
     * @constructor Root.Fyp.Main.View
     * @arguments Frame.TemplateView
     */
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this,'Root/Fyp/Main/template.html', ctrl);

        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.AUDIO_INDEX_VARNAME = Util.uniqueName();
    ns.View.prototype.onload = function() {
        var playerView = this._ctrl.mediaPlayer.getDefaultView();
        this.eles.mediaPlayerWrap.appendChild(playerView.dom);

        // rating audio
        var ctrl = this._ctrl;
        var aStar = this.querySelectorAll('.star');
        for(var i=0; i<aStar.length; i++) {
            (function(index, star) {
                star.onclick = function() {
                    ctrl.requestRateAudio(index);
                }
            })(i, aStar[i]);
        }

        this.eles.btnItemBased.onclick = function() {
            ctrl.requestRecommend(ns.recommendation.ITEM_BASED);
        };
        this.eles.btnUserBased.onclick = function() {
            ctrl.requestRecommend(ns.recommendation.USER_BASED);
        };
        this.eles.btnEditTag.onclick = function() {
            ctrl.editTag();
        };

    };
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;

        this._displayHasActiveAudio(this._ctrl.selectedAudioId);

        switch(state) {
        case ns.state.REFRESHED:
            this._displayAudios();
            this._displaySelectAudio(this._ctrl.selectedAudioId);
            break;
        case ns.state.SELECTION_CHANGED:
            this._displaySelectAudio(this._ctrl.selectedAudioId);
            break;
        case ns.state.RATING_CHANGED:
        case ns.state.RECOMMENDATION_CHANGED:
            this._displayRefreshRatings();
            break;
        case ns.state.TAG_UPDATED:
            this._displayTag();
            break;
        case ns.state.EDITING_TAG:
            this._displayEditTag();
            break;
        }
    };
    ns.View.prototype._displayHasActiveAudio = function(has) {
        if(has) {
            this.eles.activeAudio.classList.remove('hide');
            this.eles.noActiveAudio.classList.add('hide');
        }
        else {
            this.eles.activeAudio.classList.add('hide');
            this.eles.noActiveAudio.classList.remove('hide');
        }
    };
    ns.View.prototype._displayAudios = function() {
        this.eles.audioTabWrap.innerHTML = '';

        var audios = this._ctrl.audios;
        // group audios by category
        var hashTable = {};
        for(var i in audios) {
            if(!audios.hasOwnProperty(i)) continue;
            var audio = audios[i];
            var category = audio.category;
            if(!hashTable.hasOwnProperty(category)) hashTable[category] = [];
            hashTable[category].push(audio);

        }

        var that = this;
        for(category in hashTable) {
            if(!hashTable.hasOwnProperty(category)) continue;

            // draw header
            this.createWidget(this.eles.audioTabWrap, "audioTabHeader", category);
            // draw audioTabs
            var aAudio = hashTable[category];
            for(var i=0; i<aAudio.length; i++) {
                var audio = aAudio[i];
                var audioTab = this.createWidget(this.eles.audioTabWrap, 'audioTab');
                audioTab.eles.name.html(audio.name);
                audioTab.eles.url.html(audio.url);
                audioTab[ns.View.AUDIO_INDEX_VARNAME] = audio.id;
                this._displayRating(audioTab, audio);
                audioTab.onclick = function() {
                    that._ctrl.selectAudio(this[ns.View.AUDIO_INDEX_VARNAME]);
                }
            }

        }

    };
    ns.View.prototype._displayRating = function(wrap, audio) {
        var aStar = wrap.querySelectorAll('.star');
        var rating;
        var isPredicted = false;
        if(audio.ratingValue !== null) {
            rating = audio.ratingValue;
        }
        else if(audio.predictedRating !== null) {
            rating = audio.predictedRating;
            isPredicted = true;
        }
        for(var i=0; i<aStar.length; i++) {
            var star = aStar[i];
            star.classList.remove('predicted');
            if(i <= rating + 0.5) {
                star.classList.add('active');
                if(isPredicted) star.classList.add('predicted');
            }
            else {
                star.classList.remove('active');
            }
        }

        // display a rating value
        var domValue = wrap.querySelector('.ratingValue');
        if(domValue && typeof(rating)=='number') {
            domValue.classList.remove('predicted');
            domValue.html(Math.round((rating + 1)*100)/100);
            if(isPredicted) domValue.classList.add('predicted');
        }

    };
    ns.View.prototype._displaySelectAudio = function(id) {

        // left audio list
        var aWidget = this.querySelectorAll('.audioTab');
        for(var i=0; i<aWidget.length; i++) {
            var widget = aWidget[i];
            if(widget[ns.View.AUDIO_INDEX_VARNAME] === id) {
                widget.classList.add('active');
            }
            else {
                widget.classList.remove('active');
            }
        }
        if(id === null) return;
        var audio = this._ctrl.audios[id];

        // right content
        this.eles.name.html(audio.name);
        this._displayRating(this.eles.rating, audio);

    };
    ns.View.prototype._displayRefreshRatings = function() {
        var aWidget = this.querySelectorAll('.audioTab');
        for(var i=0; i<aWidget.length; i++) {
            var widget = aWidget[i];
            var id = widget[ns.View.AUDIO_INDEX_VARNAME];
            var audio = this._ctrl.getAudioById(id);
            this._displayRating(widget, audio);
        }
        if(this._ctrl.getActiveAudio()) this._displayRating(this.eles.rating, this._ctrl.getActiveAudio());
    };
    ns.View.prototype._displayTag = function() {
        var aTag = this._ctrl.aActiveAudioTag;
        this.eles.displayWrap.classList.remove('hide');
        this.eles.editorWrap.classList.add('hide');
        this.eles.tagWrap.innerHTML = '';
        for(var i=0; i<aTag.length; i++) {
            this.createWidget(this.eles.tagWrap, 'tag', aTag[i]);

        }
    };
    ns.View.prototype._displayEditTag = function() {
        if(!this._ctrl.selectedAudioId) return;
        this.eles.displayWrap.classList.add('hide');
        this.eles.editorWrap.classList.remove('hide');

        // create a TagEditor
        var TagEditor = Root.Fyp.TagEditor;

        // append its view into editorWrap
        var editor = new TagEditor(this._ctrl.selectedAudioId);
        var eEditorWrap = this.eles.editorWrap;
        eEditorWrap.innerHTML = '';
        eEditorWrap.appendChild(editor.getDefaultView().dom);

        // add events
        var that = this;
        var ctrl = this._ctrl;

        // update tags on EDIT_SUCCESS
        editor.bind(TagEditor.event.EDIT_SUCCESS, function() {
            ctrl.requestTagUpdate();
        });

        // display tags on this view only on DONE
        editor.bind(TagEditor.event.DONE, function() {
            that._displayTag();
        });
    };



})();
