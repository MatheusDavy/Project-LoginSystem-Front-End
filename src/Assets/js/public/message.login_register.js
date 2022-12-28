export function messageLoginRegister(Message, IsSucess) {
    let status = false
    const container = document.getElementById("content-message-login")
    const textElement = document.getElementById("content-message-login__text")
    const iconElement = document.getElementById("content-message-login__icon")
    
    const removeModal = () => {
        container.classList.remove("active")
        textElement.innerHTML = ''
        iconElement.innerHTML = ''
    }

    const activeModal = () => {
        container.classList.add("active")
        if (IsSucess) {
            textElement.innerHTML = Message
            iconElement.innerHTML = 'Você será redirecionado'
            container.style.color = '#1CD44A'
            status = true
        } else {
            textElement.innerHTML = 'OPS!'
            container.style.color = '#FB2622'
            iconElement.innerHTML = Message
            status = false
        }

        setTimeout(() => {
            removeModal()
        }, 4000)
    }

    activeModal()

    return status;
}