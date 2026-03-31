export const getTestController = (req, res) => {
    try {
        res.send({
            success: true,
            message: 'Test Controller working fine'
        })
    } catch (error) {
        res.send({
            success: false,
            message: 'Error in test controller'
        })
    }
}