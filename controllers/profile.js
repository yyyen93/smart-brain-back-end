const handleProfileGet = (req,res, knex)=>{
    //Able to grab ':id' through the 'req.params' property.
    const {id} = req.params; 
    //Want everythiing from the users table. But remember we want to make sure that we want to grab the ID not every single user. So, we want the id is the id in the req.params.
    knex.select('*').from('users')
    .where({id})
    .then(user => {
        console.log(user);//get empty array
        if(user.length){
            //user.length means if there is thing that greater than 1 or equal to 1 or exist then call the res.json
            res.json(user[0]);//Grab the array of the user
        }else{
            res.status(400).json('Not Found');
        }
    })
    .catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
    // handleProfileGet: handleProfileGet //Old way
    handleProfileGet //ES6
}