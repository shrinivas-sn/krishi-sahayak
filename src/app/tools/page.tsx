'use client';

import { motion } from 'framer-motion';

const toolsList = [
  { name: 'Tractor', icon: '🚜', desc: 'The backbone of modern farming. Used for heavy pulling, plowing, towing, and providing power to other implements.' },
  { name: 'Plow', icon: '🪨', desc: 'Attached to tractors for the initial cultivation of soil, turning it over to prepare for seed sowing and burying weeds.' },
  { name: 'Combine Harvester', icon: '🌾', desc: 'A massive machine that efficiently reaps, threshes, and winnows grain crops in a single automated pass.' },
  { name: 'Harrow', icon: '🧹', desc: 'Used after plowing to break up large soil clods, smooth out the surface, and ensure a fine tilth for seeds.' },
  { name: 'Seeder', icon: '🌱', desc: 'Automates the planting process by dropping seeds at consistent depths and spacing across large fields.' },
  { name: 'Sprayer', icon: '💧', desc: 'Crucial for applying liquid fertilizers, herbicides, and pesticides evenly to protect and nourish crops.' },
  { name: 'Baler', icon: '📦', desc: 'Compresses cut and raked crops (like hay or straw) into compact bales that are easy to transport and store.' },
  { name: 'Rake', icon: '🔱', desc: 'Used mechanically or by hand to gather hay into windrows for baling, or to clear debris from the soil.' },
  { name: 'Cultivator', icon: '🌿', desc: 'Stirs and pulverizes the soil around growing crops to aerate the roots and destroy competing weeds.' },
  { name: 'Mower', icon: '✂️', desc: 'Used to quickly cut grass, forage, or cover crops down for harvesting or general field maintenance.' },
  { name: 'Grain Auger', icon: '⚙️', desc: 'A long tube with a rotating helical screw used to efficiently move harvested grain up into tall storage silos.' },
  { name: 'Sickle', icon: '🌙', desc: 'A traditional, curved hand-tool perfect for precision harvesting of delicate grain crops in small spaces.' },
  { name: 'Hoe', icon: '⛏️', desc: 'An ancient hand tool used to shape soil, remove aggressive weeds, and dig narrow furrows for planting.' },
  { name: 'Shovel', icon: '🥄', desc: 'Essential for digging irrigation trenches, moving bulk materials like soil or compost, and general field work.' },
  { name: 'Wheelbarrow', icon: '🛒', desc: 'A small, single-wheeled vehicle heavily used for localized transportation of heavy compost, rocks, or harvest.' },
  { name: 'Center Pivot', icon: '🚿', desc: 'A massive automated irrigation system that rotates around a central pivot, watering crops in a perfect circle.' },
  { name: 'Seed Drill', icon: '🕳️', desc: 'Sows seeds by positioning them precisely in the soil and burying them, protecting them from birds and wind.' },
  { name: 'Manure Spreader', icon: '💩', desc: 'Attached behind a tractor to distribute organic manure evenly over a field as a natural, powerful fertilizer.' },
];

export default function FarmingTools() {
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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '1rem' }}>Farming Tools & Equipment</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
          From ancient hand tools to massive modern machinery, discover the 18 essential tools that power the global agricultural industry.
        </p>
      </motion.div>

      {/* HERO IMAGES SECTION */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ flex: '1 1 30%', minWidth: '300px', height: '250px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <img src="/tools/tractor.png" alt="Tractor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ flex: '1 1 30%', minWidth: '300px', height: '250px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <img src="/tools/harvester.png" alt="Combine Harvester" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} style={{ flex: '1 1 30%', minWidth: '300px', height: '250px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <img src="/tools/irrigation.png" alt="Irrigation Pivot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </div>

      {/* 18 TOOLS GRID */}
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
        {toolsList.map((tool, index) => (
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
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem', background: '#e8f5e9', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              {tool.icon}
            </div>
            <h3 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '0.8rem' }}>
              {tool.name}
            </h3>
            <p style={{ color: '#555', lineHeight: 1.6 }}>
              {tool.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
