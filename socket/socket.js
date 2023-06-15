const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let users = [];
const addUser = (userId,userInfo,sockedId) => {
    const checkUser = users.some(user => user.userId === userId);

    if(!checkUser) {
        users.push({userId,userInfo,sockedId});
    }
}

const userLeave = (sockedId) => {
    users = users.filter(user => user.sockedId !== sockedId);
}

const findUser = (userId) => {
    return users.find(user => user.userId === userId);
}

io.on('connection', socket => {
    socket.on('addUser', (userId,userInfo) => {
        addUser(userId,userInfo,socket.id);
        io.emit('getUser', users);
    })

    socket.on('sendMessage', (data) => {
        const user = findUser(data.receiver);
        if(user) {
            socket.to(user.sockedId).emit('getMessage',data);
        }
    })

    socket.on('disconnect', () => {
        userLeave(socket.id);
        io.emit('getUser', users);
    })
})