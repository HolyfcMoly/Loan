export default class Diference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer)
        this.newOfficer = document.querySelector(newOfficer)
        try {
            this.oldItems = this.oldOfficer.querySelectorAll(items)
            this.newItems = this.newOfficer.querySelectorAll(items)
        } catch(e){}
        this.newCounter = 0
        this.oldCounter = 0
    }

    bindTriggers(container, items, counter) {
        container.querySelector('.card__click').addEventListener('click', () => {
            if (counter !== items.length - 2) {
                items[counter].style.display = 'flex';
                items[counter].classList.add("animated", 'fadeIn')
                counter++
            } else {
                items[counter].style.display = 'flex';
                items[counter].classList.add("animated", 'fadeIn')
                items[items.length - 1].remove()
            }
        })
    }
    
    hideItems(items) {
        items.forEach((item, index, array) => {
                if(index !== array.length - 1) {
                    item.style.display = 'none'
                }
            })
    }
    
    init() {
        try {
            this.hideItems(this.oldItems)
            this.hideItems(this.newItems)
            this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter)
            this.bindTriggers(this.newOfficer, this.newItems, this.newCounter)
        } catch(e) {}
    }
}