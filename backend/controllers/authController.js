export const signup = async(req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: "Internal server error in signup controller."
        })
    }
}