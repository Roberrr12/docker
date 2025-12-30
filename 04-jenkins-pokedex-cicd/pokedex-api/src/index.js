const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check para Jenkins
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Bienvenido a la PokeDex API v2.0',
    timestamp: new Date().toISOString()
  });
});

// Obtener info de un Pokémon específico
app.get('/pokemon/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    
    const pokemon = {
      name: response.data.name,
      id: response.data.id,
      types: response.data.types.map(t => t.type.name),
      stats: response.data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      })),
      sprite: response.data.sprites.front_default,
      height: response.data.height,
      weight: response.data.weight
    };
    
    res.json(pokemon);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Pokemon not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Obtener Pokémon aleatorio
app.get('/pokemon/random/get', async (req, res) => {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1; // Gen 1-8
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    
    const pokemon = {
      name: response.data.name,
      id: response.data.id,
      types: response.data.types.map(t => t.type.name),
      sprite: response.data.sprites.front_default
    };
    
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to PokeDex API!',
    endpoints: {
      health: '/health',
      pokemon: '/pokemon/:name',
      random: '/pokemon/random/get'
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`🎮 PokeDex API running on port ${PORT}`);
});

module.exports = { app, server };
