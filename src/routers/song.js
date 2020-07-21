const express = require('express')
const Song = require('../models/song.js')
const router = new express.Router()

// song list - READ
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find({})
    res.render('songs', {
			title: 'My Favorite Songs',
			name: 'Ayu Adiati',
			songs: songs
		});
  } catch (e) {
    res.status(500).send()
  }
})

// render add songs page - READ
router.get('/songs/new', (req, res) => {
  res.render('new', {
    title: 'Add New Song',
    name: 'Ayu Adiati'
  })
})

// add new song - CREATE

router.post('/songs/new', async (req, res) => {
  const addSong = new Song({
    title: req.body.title
  })

  try {
    await addSong.save()
    res.status(201).render('songs')
  } catch (e) {
    res.status(404).render('404', {
      title: '404 error',
      errorMessage: 'You must provide song title!',
      name: 'Ayu Adiati'    
    })
}
})









// router.post('/songs/new', (req, res) => {
//     // console.log(req.body);
//     const songTitle = req.body.title


//     const newSong = {
//       songTitle
//     }

//     if(!songTitle) {
//       res.render('404', {
//         title: '404 error',
//         errorMessage: 'You must provide song title!',
//         name: 'Ayu Adiati'
//       })
//     } else {
//       songs.push(newSong);
//       res.redirect('/songs');
//     }
// })

module.exports = router
