describe('Dialog system tests', function() {
    appendTestArea('dialog_area', true);
    describe('Short Jodit.Alert etc static methods', function() {
        it('Should work without Jodit instance', function () {
            var dialog = Jodit.Alert('Hello');
            dialog.close();
        });
        it('Should return Dialog instance', function () {
            var dialog = Jodit.Alert('Hello');
            expect(dialog instanceof Jodit.modules.Dialog).to.equal(true);
            dialog.close();
        });
        it('Should get string or HTMLElement or array of string or array of HTMLElement in arguments', function () {
            var dialog = Jodit.Alert(['<div id="hello1">Hello</div>']);
            expect(document.getElementById('hello1')).not.to.equal(null);
            dialog.close();

            var dialog2 = Jodit.Alert(document.createTextNode('Test'));
            expect(dialog2 instanceof Jodit.modules.Dialog).to.equal(true);
            dialog2.close()

            var div = document.createElement('div');
            div.id = 'hello3';
            var dialog3 = Jodit.Alert(div);
            expect(div).to.equal(document.getElementById('hello3'));
            dialog3.close()

        });
    });
    describe('Dialog image', function () {
        describe('Opened dialog image', function () {
            it('Should disable margin inputs for left, bottom, right if element has equals margins(margin:10px;)', function () {
                var editor = new Jodit('#dialog_area', {
                    observer: {
                        timeout: 0
                    },
                    image: {
                        openOnDblClick: true
                    }
                });
                editor.setEditorValue('<img src="https://xdsoft.net/jodit/build/images/artio.jpg" style="margin:10px;border:1px solid red;width:100px;height:100px;"/>');
                simulateEvent('dblclick', 0, editor.editor.querySelector('img'));

                var dialog = editor.ownerDocument.querySelector('.jodit.jodit_dialog_box.active');

                expect(dialog.style.display).to.not.equal('none');
                expect(dialog.querySelectorAll('input.margins[disabled]').length).to.equal(3);
            });
            it('Should enable margin inputs for left, bottom, right if element has not equals margins(margin:10px 5px;)', function () {
                var editor = new Jodit('#dialog_area', {
                    observer: {
                        timeout: 0
                    },
                    image: {
                        openOnDblClick: true
                    }
                });
                editor.setEditorValue('<img src="https://xdsoft.net/jodit/build/images/artio.jpg" style="margin:10px 5px;border:1px solid red;width:100px;height:100px;"/>');
                simulateEvent('dblclick', 0, editor.editor.querySelector('img'));

                var dialog = editor.ownerDocument.querySelector('.jodit.jodit_dialog_box.active');

                expect(dialog.style.display).to.not.equal('none');
                expect(dialog.querySelectorAll('input.margins[disabled]').length).to.equal(0);
            });
        });
    });
    after(function() {
        dialog_area.parentNode.removeChild(dialog_area);
    });
    afterEach(function () {
        var i, keys = Object.keys(Jodit.instances);
        for (i = 0; i < keys.length; i += 1) {
            Jodit.instances[keys[i]].destruct();
        }
    });
});