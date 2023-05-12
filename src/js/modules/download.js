export default class Download {
    constructor(trigger) {
        this.btns = document.querySelectorAll(trigger)
        this.path = 'assets/img/mainbg.jpg'
    }

    downloadItem() {
        const element = document.createElement('a')
        element.setAttribute('href', this.path)
        element.setAttribute('download', 'nice_picture')
        element.setAttribute('target', '_blank')

        element.style.display = 'none'
        
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.downloadItem()
            })
        })
    }

}