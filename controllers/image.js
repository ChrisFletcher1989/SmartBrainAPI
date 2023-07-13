//API user info
const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT ='0c1e3431a67a413db04239c90b89d1db';
    const USER_ID ='chrisfletcher';       
    const APP_ID ='smartbrain';
    const IMAGE_URL = imageUrl;
   const raw = JSON.stringify({
           "user_app_id": {
               "user_id": USER_ID,
               "app_id": APP_ID
           },
           "inputs": [
               {
                   "data": {
                       "image": {
                           "url": IMAGE_URL
                       }
                   }
               }
           ]
       });
       const requestOptions = {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Authorization': 'Key ' + PAT
         },
     body: raw
   };
   return requestOptions;
   }
//Get input from front-end and fetch API from clarifai(CELEBRITY RECOGNITION API)
const handleApiCallCeleb = async (req, res) => {
  const MODEL_ID2 = 'celebrity-face-recognition';

  try {
    const response2 = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID2 + "/outputs", returnClarifaiRequestOptions(req.body.input));
    const data = await response2.json();

    console.log("celeb", data);
    res.json(data);
  } catch (err) {
    res.status(400).json('unable to work with API2');
  }
};
//Handle the image and db entries
const handleImage = (req, res, db) => {
    const { id } = req.body;
  db('users').where('id', '=', id)
  .increment ('entries', 1)
  .returning('entries')
  .then (entries => {
    res.json(entries[0].entries)
  })
  .catch (err => res.status(400).json("unable to get entries"))
}

module.exports = {
    handleImage,
    handleApiCallCeleb

}