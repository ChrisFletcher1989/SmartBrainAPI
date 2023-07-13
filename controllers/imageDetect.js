//API user info
const returnClarifaiRequestOptions1 = (imageUrl) => {
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
       const requestOptions1 = {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Authorization': 'Key ' + PAT
         },
     body: raw
   };
   return requestOptions1;
   }
//Get input from front-end and fetch API from clarifai (FACE DETECTION API)

const handleApiCallRecognize = async (req, res) => {
    const MODEL_ID = 'face-detection';
  try {
    const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions1(req.body.input));
    const data = await response.json();

    console.log("face", data);
    res.json(data);
  } catch (err) {
    res.status(400).json('unable to work with API1');
  }
};


module.exports = {
    handleApiCallRecognize,

}