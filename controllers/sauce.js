const fs = require('fs');
const Sauce = require('../models/sauce');

exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const { userId } = sauceObject;
  delete sauceObject.id;

  const sauce = new Sauce({
    ...sauceObject,
    userId,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res) => {
  Sauce.findOne({
    _id: req.params.id
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.modifySauce = (req, res) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split('/images')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({
              message: 'Deleted!'
            });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.like = (req, res) => {
  const userAction = req.body;
  const { userId } = userAction;
  const countLike = (arg) => {
    Sauce.findOne({
      _id: arg
    })
      .then((sauce) => {
        const { usersLiked } = sauce;
        const { usersDisliked } = sauce;

        if (userAction.like === 1) {
          usersLiked.push(userId);
        } else if (userAction.like === 0) {
          const indexLiked = usersLiked.indexOf(userId);
          const indexDisliked = usersDisliked.indexOf(userId);

          indexLiked !== -1
            ? usersLiked.splice(indexLiked, 1)
            : usersDisliked.splice(indexDisliked, 1);
        } else if (userAction.like === -1) {
          usersDisliked.push(userId);
        }

        const likes = sauce.usersLiked.length;

        const dislikes = sauce.usersDisliked.length;
        Sauce.updateOne(
          { _id: req.params.id },
          {
            usersLiked,
            usersDisliked,
            likes,
            dislikes
          }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié !' }))
          .catch((error) => res.status(400).json({ error }));
        return { likes, dislikes };
      })
      .catch((error) => {
        res.status(404).json({ error });
      });
  };
  countLike(req.params.id);
};
