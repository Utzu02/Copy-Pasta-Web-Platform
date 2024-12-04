require('dotenv').config(); // Pentru a citi variabilele din fișierul .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const app = express();

// Conectare la MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectat la MongoDB!'))
  .catch(err => console.error('Nu s-a putut conecta la MongoDB:', err));

app.use(express.json()); // Permite serverului să citească corpul cererilor în format JSON
const corsOptions = {
  origin: 'http://localhost:5173', // URL-ul front-end-ului tău
  credentials: true,  // Permite trimiterea cookie-urilor între domenii diferite
};
app.use(cors(corsOptions));

// Configurăm multer pentru a salva fișierul în memorie (într-un buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Definirea unui model MongoDB pentru Rețetă
const Recipe = mongoose.model('Recipe', new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: Buffer },  // Câmpul pentru imaginea stocată ca buffer
  author: { type: String, required: true },
  description: { type: String, required: true },
  ratings: { type: Number, default: 4 },
  nrratinguri: { type: Number, default: 432 }
}));

// Definirea unui model MongoDB pentru User
const User = mongoose.model('User', new mongoose.Schema({
  nume: { type: String, required: true },
  telefon: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  parola: { type: String, required: true },
}));

// Ruta pentru înregistrarea unui utilizator
app.post('/api/register', async (req, res) => {
  const { nume, telefon, email, parola } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Emailul este deja înregistrat.' });
    }

    const hashedPassword = await bcrypt.hash(parola, 10);

    const newUser = new User({
      nume,
      telefon,
      email,
      parola: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilizator înregistrat cu succes!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la înregistrarea utilizatorului.', error });
  }
});

// Ruta pentru autentificarea unui utilizator
app.post('/api/login', async (req, res) => {
  const { email, parola } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
    }

    const isMatch = await bcrypt.compare(parola, user.parola);
    if (!isMatch) {
      return res.status(400).json({ message: 'Parola incorectă.' });
    }
    const userId = user._id;
    res.status(200).json({ message: 'Autentificare cu succes!', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la autentificare.', error });
  }
});

// Ruta combinată pentru adăugarea unei rețete și încărcarea imaginii
app.post('/api/recipes', upload.single('image'), async (req, res) => {
  const { title, author, description, ratings = 4, nrratinguri = 432 } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null;

  if (!title || !author || !description) {
    return res.status(400).json({ message: 'Title, author și description sunt câmpuri obligatorii.' });
  }

  try {
    const newRecipe = new Recipe({
      title,
      author,
      description,
      ratings,
      nrratinguri,
      image: imageBuffer
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Rețetă adăugată cu succes!', newRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la adăugarea rețetei.', error });
  }
});

const getImage = (imageBuffer) => {
    if (imageBuffer) {
      return {
        headers: {
          'Content-Type': 'image/jpeg',  // Schimbă tipul de imagine în funcție de formatul fișierului
        },
        body: imageBuffer
      };
    }
    return null;
  };
  
  // Ruta pentru a prelua toate rețetele
  app.get('/api/get-recipes', async (req, res) => {
    try {
      const recipes = await Recipe.find();
  
      // Transformăm fiecare rețetă pentru a include imaginea în răspuns
      const recipesWithImages = recipes.map(recipe => {
        const recipeData = recipe.toObject();
        if (recipeData.image) {
          recipeData.image = `/api/recipes/image/${recipe._id}`;  // Înlocuim calea imaginii cu ruta pentru a o prelua
        }
        return recipeData;
      });
  
      res.status(200).json(recipesWithImages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Eroare la preluarea rețetelor.', error });
    }
  });
  
  // Ruta pentru a prelua imaginea din MongoDB
  app.get('/api/recipes/image/:id', async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe || !recipe.image) {
        return res.status(404).json({ message: 'Imaginea nu a fost găsită.' });
      }
  
      // Trimitem imaginea ca răspuns
      const { headers, body } = getImage(recipe.image);
      if (headers && body) {
        res.set(headers);
        res.send(body);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Eroare la preluarea imaginii.', error });
    }
  });
  // Ruta pentru a căuta utilizatorul după UID
app.get('/api/user/:uid', async (req, res) => {
    try {
      const user = await User.findById(req.params.uid);  // Căutăm utilizatorul după UID
      if (!user) {
        return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
      }
      res.status(200).json({ name: user.nume, email: user.email, telefon: user.telefon});  // Returnăm doar numele utilizatorului
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Eroare la căutarea utilizatorului.', error });
    }
  });
  
  
// Pornirea serverului
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
