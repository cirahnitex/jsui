(function() {
    var ns = Root.TranslateGame.GameMain;
    ns.View = function(ctrl) {
        Frame.TemplateView.call(this, 'Root/TranslateGame/GameMain/template.html', ctrl);

        ctrl.bind(ns.event.ACTION_ACCEPTED,function() {
            frame.root.toast("Action submitted");
        });
        this._isTimeRemainingAnimationPlaying = false;
        this.applyTemplate();
    };
    ns.View.extend(Frame.TemplateView);
    ns.View.prototype.onload = function() {
        var infoView = Frame.createDefaultView(this._ctrl.info);
        var eles = this.eles;
        eles.infoWrap.appendChild(infoView.dom);
        var that = this;
        eles.questionSubmit.onclick = function() {
            that._ctrl.submitQuestion(eles.questionInput.value);
        };
        eles.translateSubmit.onclick = function() {
            that._ctrl.submitTranslation(eles.translateInput.value);
        };
        eles.responseSubmit.onclick = function() {
            that._ctrl.submitResponse(eles.responseInput.value);
        };
        eles.decideSubmit.onclick = function() {
            var val = that.querySelector("input#selection0:checked")?"0":"1";
            that._ctrl.submitDecision(val);
        };

    };
    ns.View.prototype.update = function(state) {
        if(this.isTemplateLoading) return;

        var ctrl = this._ctrl;

        // clear all active and waiting
        var aSection = this.querySelectorAll('section');
        for(var i=0; i<aSection.length; i++) {
            aSection[i].classList.remove('active');
            aSection[i].classList.remove('waiting');
        }

        // mark active and waiting properly
        var activeSection = null;
        switch(state) {
        case ns.state.LOADING:
            return;
        case ns.state.CHALLENGING:
            activeSection = this.eles.challengingSection;
            break;
        case ns.state.TRANSLATING:
            activeSection = this.eles.translatingSection;
            break;
        case ns.state.RESPONDING:
            activeSection = this.eles.respondingSection;
            break;
        case ns.state.DECIDING:
            activeSection = this.eles.decidingSection;
            break;
        }
        if(activeSection)
        {
            activeSection.classList.add('active');
            if(!this._ctrl.shouldParticipate()) activeSection.classList.add('waiting');
        }
        if(ctrl.timeLimit) {
            this._startTimeRemainingAnimation();

        }

        // show all observable strings
        this.eles.questionDisplay.html(ctrl.question);
        this.eles.translationDisplay.html(ctrl.translation);
        this.eles.response0Display.html(ctrl.response0);
        this.eles.response1Display.html(ctrl.response1);


    };
    ns.View.prototype._startTimeRemainingAnimation = function() {
        if(this._isTimeRemainingAnimationPlaying) return;
        this._isTimeRemainingAnimationPlaying = true;
        var that = this;
        var looper = function() {
            var timeRemaining = that._ctrl.timeLimit + that._ctrl.stateStartTime - new Date().getTime() ;
            if(timeRemaining < 0 ) {
                that._isTimeRemainingAnimationPlaying = false;
                return;
            }
            var perc = (timeRemaining / that._ctrl.timeLimit) * 100 + '%';
            that.eles.timeRemaining.style.width = perc;
            requestAnimationFrame(looper);
        };
        requestAnimationFrame(looper);
    };



})();
