const Sauce = require('../models/sauce');

exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);
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
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted!'
      });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
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
  console.log(req.params.id);

  const sauceObject = req.body;
  const { userId } = sauceObject;
  console.log(sauceObject);

  if (sauceObject.like === 1) {
    Sauce.updateOne(
      { _id: req.params.id },
      {
        ...sauceObject,
        usersLiked: userId,
        likes: 1
      }
    )
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  } else if (sauceObject.like === 0) {
    console.log('like = 0');
    Sauce.updateOne(
      { _id: req.params.id },
      {
        ...sauceObject,
        likes: 0
      }
    )
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  } else if (sauceObject.like === -1) {
    console.log('like = -1');

    Sauce.updateOne(
      { _id: req.params.id },
      {
        ...sauceObject,
        dislikes: 1
      }
    )
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  }
};
