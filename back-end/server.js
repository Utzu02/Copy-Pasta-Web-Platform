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
  ratings: { type: Number, default: 0 },
  nrratinguri: { type: Number, default: 0 }
}));
// Definirea unui model MongoDB pentru User
const User = mongoose.model('User', new mongoose.Schema({
  nume: { type: String, required: true },
  telefon: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  parola: { type: String, required: true }
}));

// Ruta pentru înregistrarea unui utilizator
app.post('/api/register', async (req, res) => {
  const { nume, telefon, email, parola } = req.body;
  
  try {
    // Verifică dacă emailul este deja înregistrat
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Emailul este deja înregistrat.' });
    }

    // Criptarea parolei
    const hashedPassword = await bcrypt.hash(parola, 10);

    // Crează un nou utilizator
    const newUser = new User({
      nume,
      telefon,
      email,
      parola: hashedPassword
    });

    // Salvează utilizatorul în baza de date
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
    // Căutăm utilizatorul după email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
    }

    // Comparăm parola criptată cu cea introdusă
    const isMatch = await bcrypt.compare(parola, user.parola);
    if (!isMatch) {
      return res.status(400).json({ message: 'Parola incorectă.' });
    }
    // Setăm un cookie care va conține email-ul utilizatorului
    res.cookie('userEmail', email, {
        httpOnly: true,  // Protejează cookie-ul (nu poate fi accesat din JavaScript)
        secure: process.env.NODE_ENV === 'production',  // Folosește doar HTTPS în producție
        maxAge: 7 * 24 * 60 * 60 * 1000,  // Expiră după 1 săptămână
        sameSite: 'Lax',  // Permite cookie-ului să fie trimis în cereri cross-site
      });

    res.status(200).json({ message: 'Autentificare cu succes!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la autentificare.', error });
  }
});

// Ruta combinată pentru adăugarea unei rețete și încărcarea imaginii
app.post('/api/recipes', upload.single('image'), async (req, res) => {
  const { title, author, description, ratings = 0, nrratinguri = 0 } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null; // Imaginea salvată în memorie ca buffer

  // Verificăm dacă există câmpurile necesare
  if (!title || !author || !description) {
    return res.status(400).json({ message: 'Title, author și description sunt câmpuri obligatorii.' });
  }

  try {
    // Creăm o nouă rețetă cu informațiile primite
    const newRecipe = new Recipe({
      title,
      author,
      description,
      ratings,
      nrratinguri,
      image: imageBuffer // Dacă există imagine, o adăugăm la rețetă
    });

    // Salvăm rețeta în baza de date
    await newRecipe.save();

    res.status(201).json({ message: 'Rețetă adăugată cu succes!', newRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la adăugarea rețetei.', error });
  }
});

// Ruta pentru încărcarea imaginii rețetei (se poate elimina, dacă alegi să combini în POST-ul principal)
// app.post('/api/upload-recipe-image', upload.single('image'), async (req, res) => {
//   const { recipeId } = req.body;  // ID-ul rețetei
//   const imageBuffer = req.file.buffer;  // Imaginea salvată în memorie ca buffer

//   try {
//     // Căutăm rețeta după ID
//     const recipe = await Recipe.findById(recipeId);
//     if (recipe) {
//       recipe.image = imageBuffer;  // Stocăm imaginea ca buffer în câmpul `image`
//       await recipe.save();
//       return res.status(200).json({ message: 'Imaginea a fost actualizată cu succes pentru rețetă!' });
//     }

//     res.status(404).json({ message: 'Rețeta nu a fost găsită!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Eroare la salvarea imaginii.', error });
//   }
// });

// Rută pentru a prelua imaginea unei rețete
app.get('/api/recipe-image/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe || !recipe.image) {
      return res.status(404).json({ message: 'Nu există o imagine pentru această rețetă.' });
    }

    res.set('Content-Type', 'image/jpeg');  // Poți ajusta în funcție de tipul imaginii
    res.send(recipe.image);  // Trimitem imaginea din buffer către client
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la citirea imaginii.' });
  }
});

// Pornirea serverului
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
