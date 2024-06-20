const PrismaClient = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient.PrismaClient();

async function insertAdmin() {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash('Admin1234', salt);
  prisma.user
    .create({
      data: {
        password: password,
        username: 'Admin123',
      },
    })
    .then((res) => {
      console.log('Init data created');
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      prisma.$disconnect();
    });
}

insertAdmin();
