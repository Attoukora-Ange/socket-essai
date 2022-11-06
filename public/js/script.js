const socket = io();


socket.on('connect', ()=>{
    socket.emit('salle', 'conseil')
    console.log(socket.id + ' est connecté au coté client')

})
const message = document.querySelector('.input_message')
document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(message)
    console.log(socket.id)
    if(message.value){

        socket.emit('message', message.value)
    }
})
socket.on('message_client', (mes)=>{
    const divElement = document.querySelector('.champs_message')
    // const elem = document.createElement('div')
    divElement.innerHTML += `<div class = 'champs_complet'>
    <div class="texte_nom">^${mes.id}</div>
    <div class="texte_message">${mes.message}</div>

    
    </div>`
    
    console.log(message)

})

