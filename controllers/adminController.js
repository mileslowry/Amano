module.exports = {
    verifyAdmin: (req, res, next) => {
        if (res.locals.currentUser && res.locals.currentUser.isAdmin) {
          next()
        } else {
          res.send("Not authorized")
        }
      }
}