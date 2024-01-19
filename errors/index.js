
exports.handlePsqlErrors = (err, req, res, next) => {
    
    if (err.code === '22P02' || err.code === '23502') {
      // console.log('---> psqlError:', err.code)
      res.status(400).send({ msg: 'Bad request' })
      } 
      else next(err)
  }
  
exports.handle404NotFound = (err, req, res, next) => {
  
  if (err.status === 404) {
    
    res.status(404).send(err)
  }
  else next(err)

}

exports.handleServerErrors = (err, req, res, next) => {
    
    if (err){
      
    res.status(500).send({ msg: 'Internal Server Error' })}
    else next(err)
}
