module.exports = {
    // Verify that a user is an admin
    verifyAdmin: (req, res, next) => {
        if (res.locals.currentUser && res.locals.currentUser.isAdmin) {
          next()
        } else {
          res.send("Not authorized")
        }
      }
}