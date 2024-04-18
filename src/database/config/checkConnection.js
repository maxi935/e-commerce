const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'bjxeidmkkz8ceml3v2tm-mysql.services.clever-cloud.com',
    username: 'udc7azi5hdeo61zv',
    password: '3Dh5rOIszW05o8JaaQT0',
    database: 'bjxeidmkkz8ceml3v2tm'
});

async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

module.exports = checkConnection;