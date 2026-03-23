

export function requireAuth(req, res, next) {
    console.log("Checking auth")
    next()
}