function DAB(amount) {
    let remaining = Math.round(amount * 100);
  
    const denominations = [
      20000, 10000, 5000, 2000, 1000, 500,
      200, 100, 50, 20, 10, 5, 2, 1
    ];
  
    const distribution = [];
  
    for (let denom of denominations) {
      const count = Math.floor(remaining / denom);
      if (count > 0) {
        distribution.push({
          value: denom / 100,
          count: count
        });
        remaining %= denom;
      }
    }
  
    return distribution;
}

export default function initSocket(io) {
    io.on('connection', (socket) => {
        socket.on('chat message', (msgObj) => {
            if (typeof msgObj !== 'object' || !msgObj.text) {
                return;
            }
            const msg = msgObj.text;
            if (msg.startsWith('/dab ')) {
                const amount = parseFloat(msg.split('/dab ')[1]);
                
                if (isNaN(amount) || amount <= 0) {
                    io.emit('chat message', { username: "Système", text: `Veuillez entrer un montant valide après /dab (ex: /dab 150 ou /dab 13.37)` });
                } else {
                    const distribution = DAB(amount);
        
                    const distribMessage = distribution
                      .map(item => `${item.count} x ${item.value}€`)
                      .join(' + ');
        
                    if (distribution.length === 0) {
                      io.emit('chat message', { username: "Système", text: `Montant: ${amount}€, aucune coupure/pièce trouvée` });
                    } else {
                      io.emit('chat message', { username: "Système", text: `Pour ${amount}€, vous avez : ${distribMessage}` });
                    }
                }
            } else {
                io.emit('chat message', msgObj);
            }
        });
    });
}
