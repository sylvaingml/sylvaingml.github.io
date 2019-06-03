/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var NavMenu = function(nodeId) {
    this.navNode = document.getElementById(nodeId);
    this.triggerBtn = this.navNode.querySelector('button.menu-icon');

    this.clickHandler = (event) => {
        this.toggleMenu(event);
    };
    this.triggerBtn.addEventListener('click', this.clickHandler);
}

NavMenu.prototype =  {
    visibilityCSSTrigger: 'show-menu'
};

NavMenu.prototype.toggleMenu = function(event) {
    event.stopPropagation();

    const visible = this.navNode.classList.contains(this.visibilityCSSTrigger);
    if ( visible ) {
        this.navNode.classList.remove(this.visibilityCSSTrigger);
    }
    else {
        this.navNode.classList.add(this.visibilityCSSTrigger);
    }
};

