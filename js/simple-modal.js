var SimpleModal = function(nodeId) {
    this.modal = document.getElementById(nodeId);
    this.closeBtn = this.modal.querySelector('button[data-action=close]');
    
    this.modal.classList.remove(this.visibilityCSSTrigger);
};

SimpleModal.prototype = {
    visibilityCSSTrigger: 'show-modal'
};

SimpleModal.prototype.show = function(event) {
    event.stopPropagation();

    // Get this undercover to restore focus on close
    let trigger = event.target;

    // Install custom event handler for close action
    this.closeBtn.onclick = (event) => {
        this.hide(event);
        trigger.focus();
    };

    // Show modal
    document.body.style.overflow = 'hidden';
    this.modal.classList.add(this.visibilityCSSTrigger);
    this.modal.focus();
};

SimpleModal.prototype.hide = function(event) {
    event.stopPropagation();

    // Show modal
    document.body.style.overflow = 'auto';
    this.modal.classList.remove(this.visibilityCSSTrigger);
    this.closeBtn.onclick = undefined;
};

SimpleModal.createModal = function(elem, modalId) {
    let simpleModal = new SimpleModal(modalId);
    
    let listener = (event) => {
        simpleModal.show(event);
    };
    elem.addEventListener('click', listener);
};

SimpleModal.createAll = function() {
    let triggers = document.querySelectorAll('[data-toggle=simple-modal]');
    
    for ( let current of triggers ) {
        let targetId = current.getAttribute('data-target-id');
        if ( !!targetId ) {
            SimpleModal.createModal(current, targetId);
        }
    }
};