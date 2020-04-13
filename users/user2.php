<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Socket.io example</title>
    <script src="/node_modules/socket.io-client/dist/socket.io.js"></script>
    <script>
        const socket = io.connect('http://127.0.0.1:7000');        
        socket.emit('userAuth', {
            user: "user2",
            password: "1111",
            room: "room2"
        });
        socket.on('message', message => addMessage(message));

        function sendMessage() {
            let input = document.getElementById('input');

            socket.emit('room-message', input.value);
        }

        function addMessage(message) 
        {
            const mainDiv = document.getElementById('main-div');
            let div = document.createElement('div');   
            div.append(`Name: ${message.name}`);
            div.append(document.createElement('br'));
            div.append(`- ${message.message}`);
            div.append(document.createElement('br'));
            div.append('---');
            mainDiv.append(document.createElement('br'));
            mainDiv.append(div);
        } 

        function changeRoom()
        {
            let select = document.getElementById('select-room');
            let room = select.options[select.selectedIndex].value;
            console.log(room);
        }
    </script>
</head>
<body>
    <p>
    <label for="select-room">Choose a room:</label>
    <select id="select-room" name="room" onchange="changeRoom()">
        <option value="room1">Room1</option>
        <option selected value="room2">Room2</option>
        <option value="room3">Room3</option>
        <option value="room4">Room4</option>
    </select>
    </p>
    <input id="input" type="text" name="message-div" placeholder="Message to server">
    <button onclick="sendMessage()">Send message</button>
    <div id="main-div"></div>
</body>
</html>
