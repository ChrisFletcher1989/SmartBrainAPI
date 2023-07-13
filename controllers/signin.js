const handleSignin = (req, res, db, bcrypt) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    
    db.select('email', 'hash').from('login')
    .where('email', '=', email) 
    .then(data => {
       const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
       console.log(isValid)
       if (isValid) { 
       db.select('*').from('users')
       .where('email', '=', email)
       .then(user => {
                res.json(user[0])
       })
       
       }
       else if(isValid===false) {
        res.status(400).json("incorrect username or password")}
       
    })
    .catch(err => res.status(400).json('User Not Found'))
}

module.exports = {
    handleSignin:handleSignin
}
