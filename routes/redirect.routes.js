const {Router} = require('express')
const Link = require('../models/Link')
const config = require('config')
const router = Router()

router.get('/:code',async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code})

        if(link) {
            link.clicks++
            console.log(link)
            await link.save()
            return res.redirect(link.from)
        }

        res.status(404).json('No link found')
    } catch {
        res.status(500).json({message: 'Something went wrong, please try again'})
    }
})

module.exports = router
