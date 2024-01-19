
exports.handlePsqlErrors = (err, req, res, next) => {
    
    if (err.code === '22P02' || err.code === '23502') {
      // console.log('---> psqlError:', err.code)
      res.status(400).send({ msg: 'Bad request' })
      } 
      else next(err)
  }  
  

exports.handleServerErrors = (err, req, res, next) => {
    
    if (err){
    // console.log('---> Server error')    
    res.status(500).send({ msg: 'Internal Server Error' })}
    else next(err)
}
