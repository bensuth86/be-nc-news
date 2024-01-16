exports.handleCustomErrors = (err, req, res, next) => {
    
    if (err.status && err.msg){
      console.log('---> error status:', err.status)
      res.status(err.status).send({ msg: err.msg })
        } else next(err)
    }

exports.handlePsqlErrors = (err, req, res, next) => {
        
        if (err.code === '22P02' || err.code === '23502') {
          console.log('---> error code:', err.code)
          res.status(400).send({ msg: 'Bad request' })
        } else next(err)
      }    

exports.handleServerErrors = (err, req, res, next) => {
        console.log('---> error code:', err)
        res.status(500).send({ msg: 'Internal Server Error' })
    }
