const clarifai = require('clarifai');


// Initialize with your API key (Clarifai)
const app = new Clarifai.App({
    apiKey: '0ef532cbd22b49ffbd0c0abd00c882fd'  // YOUR_API_KEY HERE
    /**clarifai api key - https://clarifai.com/9kvbz0xn84kk/my-first-application/settings*/
});

const handleApiCall = (req,res) => {
    // https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js : Clarifai Model
    app.models
    .predict(
        {
            id:'face-detection',
            name:'face-detection',
            version:'6dc7e46bc9124c5c8824be4822abe105',
            type:'visual-detector'
        },req.body.input
    )
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with API'))


}


const handleImage = (req,res,knex)=>{
    const {id} = req.body; 
    knex('users')
    .where('id', '=', id) //The 'id' = id where we received in the body.
    .increment('entries', 1) //increment by 1
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries); //return first array cus we get 1
    })
    .catch(err => res.status(400).json('unable to get count/entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall
}