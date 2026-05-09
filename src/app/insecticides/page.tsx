'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cropsDatabase = [
  // Grains & Cereals
  { name: 'Rice', category: 'Grains', pests: 'Stem Borer, Leaf Folder', insecticides: 'Cartap Hydrochloride, Chlorantraniliprole', icon: '🌾' },
  { name: 'Wheat', category: 'Grains', pests: 'Aphids, Termites', insecticides: 'Imidacloprid, Thiamethoxam', icon: '🌾' },
  { name: 'Corn (Maize)', category: 'Grains', pests: 'Fall Armyworm, Stem Borer', insecticides: 'Spinetoram, Emamectin Benzoate', icon: '🌽' },
  { name: 'Sorghum', category: 'Grains', pests: 'Shoot Fly, Stem Borer', insecticides: 'Cypermethrin, Quinalphos', icon: '🌾' },
  { name: 'Barley', category: 'Grains', pests: 'Aphids, Wireworms', insecticides: 'Clothianidin, Imidacloprid', icon: '🌾' },
  { name: 'Oats', category: 'Grains', pests: 'Cereal Leaf Beetle', insecticides: 'Lambda-cyhalothrin', icon: '🌾' },
  { name: 'Millet', category: 'Grains', pests: 'Stem Borer, Earhead Bug', insecticides: 'Carbaryl, Malathion', icon: '🌾' },
  
  // Vegetables
  { name: 'Tomato', category: 'Vegetables', pests: 'Fruit Borer, Whitefly', insecticides: 'Flubendiamide, Diafenthiuron', icon: '🍅' },
  { name: 'Potato', category: 'Vegetables', pests: 'Aphids, Colorado Beetle', insecticides: 'Thiamethoxam, Acetamiprid', icon: '🥔' },
  { name: 'Onion', category: 'Vegetables', pests: 'Thrips, Maggots', insecticides: 'Fipronil, Profenofos', icon: '🧅' },
  { name: 'Cabbage', category: 'Vegetables', pests: 'Diamondback Moth', insecticides: 'Spinosad, Indoxacarb', icon: '🥬' },
  { name: 'Carrot', category: 'Vegetables', pests: 'Carrot Fly, Aphids', insecticides: 'Deltamethrin, Cypermethrin', icon: '🥕' },
  { name: 'Eggplant (Brinjal)', category: 'Vegetables', pests: 'Fruit & Shoot Borer', insecticides: 'Emamectin Benzoate, Chlorantraniliprole', icon: '🍆' },
  { name: 'Okra', category: 'Vegetables', pests: 'Shoot Borer, Whitefly', insecticides: 'Imidacloprid, Spinosad', icon: '🥬' },
  { name: 'Cauliflower', category: 'Vegetables', pests: 'Caterpillars, Aphids', insecticides: 'Quinalphos, Dimethoate', icon: '🥦' },
  { name: 'Spinach', category: 'Vegetables', pests: 'Leaf Miners, Aphids', insecticides: 'Neem Oil (Organic), Malathion', icon: '🥬' },
  { name: 'Pumpkin', category: 'Vegetables', pests: 'Fruit Fly, Red Pumpkin Beetle', insecticides: 'Malathion, Carbaryl', icon: '🎃' },
  { name: 'Cucumber', category: 'Vegetables', pests: 'Whitefly, Fruit Fly', insecticides: 'Acetamiprid, Diafenthiuron', icon: '🥒' },
  { name: 'Bell Pepper', category: 'Vegetables', pests: 'Thrips, Mites', insecticides: 'Spiromesifen, Fipronil', icon: '🫑' },
  { name: 'Radish', category: 'Vegetables', pests: 'Flea Beetles, Aphids', insecticides: 'Imidacloprid, Neem Extract', icon: '🥬' },

  // Fruits
  { name: 'Apple', category: 'Fruits', pests: 'Codling Moth, Aphids', insecticides: 'Chlorpyrifos, Thiocloprid', icon: '🍎' },
  { name: 'Banana', category: 'Fruits', pests: 'Banana Weevil, Aphids', insecticides: 'Chlorpyrifos, Phorate', icon: '🍌' },
  { name: 'Mango', category: 'Fruits', pests: 'Mango Hopper, Mealybug', insecticides: 'Imidacloprid, Buprofezin', icon: '🥭' },
  { name: 'Citrus (Orange)', category: 'Fruits', pests: 'Citrus Psylla, Leaf Miner', insecticides: 'Dimethoate, Thiamethoxam', icon: '🍊' },
  { name: 'Grapes', category: 'Fruits', pests: 'Thrips, Mealybug', insecticides: 'Spinetoram, Methomyl', icon: '🍇' },
  { name: 'Papaya', category: 'Fruits', pests: 'Mealybug, Whitefly', insecticides: 'Spirotetramat, Imidacloprid', icon: '🍈' },
  { name: 'Watermelon', category: 'Fruits', pests: 'Fruit Fly, Thrips', insecticides: 'Spinosad, Malathion', icon: '🍉' },
  { name: 'Strawberry', category: 'Fruits', pests: 'Spider Mites, Aphids', insecticides: 'Abamectin, Bifenthrin', icon: '🍓' },
  { name: 'Pineapple', category: 'Fruits', pests: 'Mealybug, Nematodes', insecticides: 'Diazinon, Oxamyl', icon: '🍍' },

  // Cash Crops
  { name: 'Cotton', category: 'Cash Crops', pests: 'Bollworms, Whitefly', insecticides: 'Spinosad, Flonicamid, Profenofos', icon: '👕' },
  { name: 'Sugarcane', category: 'Cash Crops', pests: 'Early Shoot Borer, Termites', insecticides: 'Chlorantraniliprole, Fipronil', icon: '🎋' },
  { name: 'Tea', category: 'Cash Crops', pests: 'Tea Mosquito Bug, Red Spider Mite', insecticides: 'Thiamethoxam, Propargite', icon: '🍵' },
  { name: 'Coffee', category: 'Cash Crops', pests: 'Berry Borer, Stem Borer', insecticides: 'Chlorpyrifos, Cypermethrin', icon: '☕' },
  { name: 'Tobacco', category: 'Cash Crops', pests: 'Tobacco Caterpillar, Aphids', insecticides: 'Novaluon, Imidacloprid', icon: '🚬' },
  { name: 'Sunflower', category: 'Cash Crops', pests: 'Head Borer, Jassids', insecticides: 'Quinalphos, Imidacloprid', icon: '🌻' },
  { name: 'Soybean', category: 'Cash Crops', pests: 'Girdle Beetle, Stem Fly', insecticides: 'Profenofos, Chlorantraniliprole', icon: '🌱' },
];

export default function InsecticidesGuide() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCrops = cropsDatabase.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crop.pests.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.insecticides.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <div style={{ width: '100%', height: '350px', borderRadius: '24px', overflow: 'hidden', marginBottom: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
          <img src="/crop_protection.png" alt="Crop Protection" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '1rem' }}>Crop Protection & Insecticides</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
          Instantly find the recommended modern insecticides for 36 major crops to protect your yield from devastating pests.
        </p>
      </motion.div>

      {/* SEARCH BAR */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ maxWidth: '600px', margin: '0 auto 4rem auto', position: 'relative' }}
      >
        <input 
          type="text" 
          placeholder="Search for a crop, pest, or insecticide... (e.g., 'Tomato' or 'Whitefly')" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1.2rem 1.5rem',
            fontSize: '1.1rem',
            borderRadius: '50px',
            border: '2px solid rgba(46, 125, 50, 0.3)',
            boxShadow: '0 10px 20px rgba(46, 125, 50, 0.05)',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(46, 125, 50, 0.3)'}
        />
        <span style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem' }}>🔍</span>
      </motion.div>

      {/* RESULTS SUMMARY */}
      <div style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: '#666' }}>
        {filteredCrops.length} {filteredCrops.length === 1 ? 'crop' : 'crops'} found
      </div>

      {/* INTERACTIVE GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '2rem' 
      }}>
        <AnimatePresence>
          {filteredCrops.map((crop, index) => (
            <motion.div 
              key={crop.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
              transition={{ duration: 0.3 }}
              style={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '16px', 
                padding: '1.5rem', 
                border: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.8rem' }}>
                <span style={{ fontSize: '2.5rem', background: '#f5f5f5', padding: '0.5rem', borderRadius: '12px' }}>{crop.icon}</span>
                <div>
                  <h3 style={{ color: '#222', fontSize: '1.4rem', margin: 0 }}>{crop.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{crop.category}</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e53935', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  🦠 Common Pests
                </strong>
                <p style={{ margin: '0.3rem 0 0 0', color: '#555', fontSize: '1.05rem' }}>{crop.pests}</p>
              </div>

              <div style={{ marginTop: 'auto', background: '#e8f5e9', padding: '1rem', borderRadius: '12px' }}>
                <strong style={{ color: '#2e7d32', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  🛡️ Recommended Insecticides
                </strong>
                <p style={{ margin: '0.3rem 0 0 0', color: '#1b5e20', fontSize: '1.05rem', fontWeight: '500' }}>{crop.insecticides}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCrops.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888', fontSize: '1.2rem' }}>
          No crops or insecticides found matching your search.
        </div>
      )}

    </div>
  );
}
