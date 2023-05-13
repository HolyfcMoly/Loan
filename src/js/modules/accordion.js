export default class Accordion {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
    }

    init() {
            this.btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    try {
                        const sibling = btn.closest('.module__info-show').nextElementSibling;
                        const child = btn.querySelector('svg')
                        child.style.transition = 'all .3s ease-out'
                        if(btn !== this && btn.classList.contains('active')) {
                            sibling.classList.remove('active')
                            sibling.classList.remove('fadeIn')
                            sibling.classList.add('fadeOut')
                            sibling.style.maxHeight = "0px";
                            child.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg)'
                        }
        
                        if(!sibling.classList.contains('active')) {
                            sibling.classList.add('active')
                            sibling.classList.add('animated', 'fadeIn')
                            sibling.classList.remove('fadeOut')
                            sibling.style.maxHeight = sibling.scrollHeight + 80 + "px";
                            child.style.transform = 'translateX(-50%) translateY(-50%) rotate(45deg)'
                        } else {
                            sibling.classList.remove('active')
                            sibling.classList.remove('fadeIn')
                            sibling.classList.add('fadeOut')
                            sibling.style.maxHeight = "0px";
                            child.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg)'
                            
                        }
                    }catch(e){}    
                })
            })
    }
}