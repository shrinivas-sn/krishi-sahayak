'use client';

import { motion } from 'framer-motion';

const fertilizers = [
  { name: 'Urea (46-0-0)', category: 'Nitrogenous', desc: 'The most popular nitrogen fertilizer. Essential for rapid vegetative growth and deep green color in crops.', icon: '⚪' },
  { name: 'DAP (18-46-0)', category: 'Phosphatic', desc: 'Di-ammonium Phosphate. Excellent for root development and early plant establishment.', icon: '🟤' },
  { name: 'MOP (0-0-60)', category: 'Potassic', desc: 'Muriate of Potash. Improves disease resistance, water retention, and fruit quality.', icon: '🔴' },
  { name: 'SSP (0-16-0)', category: 'Phosphatic', desc: 'Single Super Phosphate. Contains sulfur and calcium, great for oilseeds and legumes.', icon: '🔘' },
  { name: 'Ammonium Sulfate', category: 'Nitrogenous', desc: 'Provides nitrogen and sulfur. Ideal for alkaline soils to lower pH slightly.', icon: '🧂' },
  { name: 'CAN (Calcium Ammonium Nitrate)', category: 'Nitrogenous', desc: 'A neutral fertilizer containing calcium, excellent for acid soils and top dressing.', icon: '💊' },
  { name: 'NPK Complex (19-19-19)', category: 'Complex', desc: 'A perfectly balanced water-soluble fertilizer for foliar spray and drip irrigation.', icon: '🧪' },
  { name: 'Vermicompost', category: 'Organic', desc: 'Earthworm compost. Rich in micro-nutrients and extremely beneficial for soil microbiome.', icon: '🪱' },
  { name: 'FYM (Farm Yard Manure)', category: 'Organic', desc: 'Decomposed mixture of dung and urine. Improves soil structure and water holding capacity.', icon: '💩' },
  { name: 'Bone Meal', category: 'Organic', desc: 'Slow-release organic source of phosphorus and calcium. Essential for root and flower development.', icon: '🦴' },
  { name: 'Blood Meal', category: 'Organic', desc: 'Highly concentrated organic nitrogen. Acts quickly to boost heavy-feeding plants.', icon: '🩸' },
  { name: 'Neem Cake', category: 'Organic/Pesticidal', desc: 'Residue of neem seed oil extraction. Acts as a slow-release fertilizer and natural nematicide.', icon: '🍃' },
  { name: 'Rhizobium', category: 'Bio-Fertilizer', desc: 'Symbiotic bacteria that fixes atmospheric nitrogen in the root nodules of leguminous plants.', icon: '🦠' },
  { name: 'Azotobacter', category: 'Bio-Fertilizer', desc: 'Free-living bacteria that fixes nitrogen in the soil, suitable for non-leguminous crops like wheat.', icon: '🧫' },
  { name: 'Seaweed Extract', category: 'Bio-Stimulant', desc: 'Rich in trace minerals and natural growth hormones (cytokinins). Boosts stress tolerance.', icon: '🌊' },
];

export default function FertilizersGuide() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const popUp = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

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
          <img src="/fertilizers.png" alt="Fertilizers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '1rem' }}>Types of Fertilizers</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
          Discover 15 essential fertilizers ranging from powerful chemical NPK blends to sustainable organic composts and cutting-edge bio-fertilizers.
        </p>
      </motion.div>

      {/* 15 FERTILIZERS GRID */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}
      >
        {fertilizers.map((fert, index) => (
          <motion.div 
            key={index}
            variants={popUp}
            whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(46, 125, 50, 0.2)' }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '16px', 
              padding: '2rem', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              border: '1px solid rgba(46, 125, 50, 0.1)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', background: '#e8f5e9', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
              {fert.icon}
            </div>
            <h3 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '0.3rem' }}>
              {fert.name}
            </h3>
            <span style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'block' }}>
              {fert.category}
            </span>
            <p style={{ color: '#555', lineHeight: 1.6, marginTop: 'auto' }}>
              {fert.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
