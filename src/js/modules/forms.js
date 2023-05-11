export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms)
        this.inputs = document.querySelectorAll('input')
        this.message = {
            loading: "Загрузка...",
            success: "Спасибо, мы с вами свяжемся",
            failure: "Что-то пошло не так...",
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail:'assets/img/fail.png'
        };
        this.path = 'assets/question.php'
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = ''
        })
    }

    clearTextInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]')

        mailInputs.forEach(item => {
            item.addEventListener('keypress', function(e) {
                if(this.getAttribute('name') === 'email') {
                    if(!(/[a-z 0-9@._\-]/i.test(e.key))) {
                        e.preventDefault();
                    }
                } else {
                    if(e.key.match(/[^а-яё 0-9]/ig)) {
                        e.preventDefault()
                    }
                }
            })
        })
    }

    initMask() {
        let setCursorPosition = (pos, el) => {
            el.focus()
    
            if(el.setSelectionRange) {
                el.setSelectionRange(pos, pos)
            } else if (el.createTextRange) {
                let range = el.createTextRange()
    
                range.collapse(true)
                range.moveEnd('character', pos)
                range.moveStart('character', pos)
                range.select()
            }
        }
    
        function createMask(e) {
            let matrix = '+1 (___) ___-____'
            let i = 0
            let def = matrix.replace(/\D/g, '')
            let value = this.value.replace(/\D/g, '')
    
            if(def.length >= value.length) {
                value = def
            }
            
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : a
            })
    
            if(e.type == 'blur') {
                if(this.value.length === 2) {
                    this.value = ''
                }
            } else {
                setCursorPosition(this.value.length, this)
                if (this.value.replace(/\D/g, '').length >= 11) {
                    setCursorPosition(this.value.length, this)
                }
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]')
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask)
            input.addEventListener('focus', createMask)
            input.addEventListener('blur', createMask)
        })
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        })
        return await res.text()
    }

    init() {
        this.initMask()
        this.clearTextInputs()
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement("div");
                statusMessage.style.cssText = `
                    margin: 0 auto;
                    margin-top: 15px;
                    padding: 20px 30px;
                    max-width: 50%;
                    background-color: #fff;
                    box-shadow: 0px -10px 20px rgba(0,0,0,.05);
                    text-align: center;
                    font-size: 18px;
                    color: grey;
                `
                item.parentNode.appendChild(statusMessage);

                let statusImg = document.createElement('img')
                statusImg.setAttribute('src', this.message.spinner)
                statusImg.classList.add('animated', 'fadeInUp')
                statusMessage.appendChild(statusImg)

                let textMessage = document.createElement('div')
                textMessage.textContent = this.message.loading
                statusMessage.appendChild(textMessage)


                const formData = new FormData(item)

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res)
                        statusImg.setAttribute('src', this.message.ok)
                        statusMessage.textContent = this.message.success
                    })
                    .catch(() => {
                        statusImg.setAttribute('src', this.message.fail)
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs()
                        setTimeout(() => {
                            statusMessage.remove()
                        }, 80000)
                    })
            })
        })
    }
}