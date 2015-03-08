(function() {
    var ns = Root.DataUrl;
    ns.View = function(ctrl) {
        Frame.View.call(this, ctrl);
        this.dom = this.createElement('.wrap');
        {
            var label = this.createElement(this.dom, 'label');
            {
                var dropZone = this.createElement(label, '.drop-zone', 'drop files here');
                var input = this.createElement(label, 'input[type=file]');
                {
                    input.style.display = 'none';
                }
            }

            //var btnCopy = this.createElement(this.dom, 'button.btn.btn-default', 'copy');
        }

        var that = this;
        dropZone.addEventListener('dragover', function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        }, false);

        dropZone.addEventListener('drop', function(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.dataTransfer.files; // FileList object.

            if(files.length > 0) {
                ctrl.readFile(files[0]);
            }
        }, false);
        input.addEventListener('change', function(e) {
            var files = e.target.files; // FileList object.

            if(files.length > 0) {
                ctrl.readFile(files[0]);
            }
        })

    };
    ns.View.extend(Frame.View);
    ns.View.prototype.update = function(state) {
        switch(state) {
        case ns.state.BROWSER_NOT_SUPPORTED:
            frame.root.toast('Your browser does not support file reader.', Root.Widget.Toast.duration.PERM,
                Root.Widget.Toast.type.ERROR
            );
            break;
        case ns.state.SUCCEED:
            window.tmp = this._ctrl.dataUrl;
            frame.root.toast('Data URL saved as global variable tmp.');
            break;
        }
    };
    ns.View.css = {
        '.wrap': {
            'text-align':'center',
            padding:'20px',
        },
        '.drop-zone': {
            width:'200px',
            height:'100px',
            'line-height':'45px'
        }
    }
})();
