const handleRegister = (knex,bcrypt) => (req,res)=>{
    const {email, name, password} = req.body;
    //Create security validation
    if(!name || !password || !email){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    
    //Create a transaction means either all the operations in the transaction are completed successfully, or none of them are.
    knex.transaction(trx =>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            //Insert into database
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
    // res.json(database.users[database.users.length-1]); //Returns last user.
}

module.exports = {
    handleRegister: handleRegister
};