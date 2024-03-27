const bcrypt = require('bcrypt');

const hashedPassword = async ()=>{ 
    const hashh = await bcrypt.hash('test', 10);
    console.log(await hashh)
}

hashedPassword()