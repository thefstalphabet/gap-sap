// creating a varible
const socket = io()

let name;
let textarea = document.querySelector('#text-area')
let messageArea = document.querySelector('.message-area')

do{
      name = prompt('Please enter your name: ')
} while(!name)


//  this code isfor when user tab on enter message have send
textarea.addEventListener('keyup', (e) =>{
        if(e.key === 'Enter') {
            sendMessage(e.target.value)
        }
})

function sendMessage(message) {
        let msg = {
            user: name,
            message: message.trim()
        }

        // Append
        appendMessage(msg, 'outgoing')
        textarea.value = ''
        scrollToBottom()



        // send to server
        socket.emit('message', msg)

}


function appendMessage(msg, type){
        let maindiv = document.createElement('div')
        let className = type
        maindiv.classList.add(className, 'message')


        let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
        `
        maindiv.innerHTML = markup
        messageArea.appendChild(maindiv)


}


// Recieve messages

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})



function scrollToBottom(){
        messageArea.scrollTop = messageArea.scrollHeight
}
