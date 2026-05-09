'use client';

import { motion, Variants } from 'framer-motion';

export default function FarmingGuides() {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '1rem' }}>Educational Farming Guides</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
          Explore modern techniques, best practices, and innovative technologies to maximize your yields across Agriculture, Aquaculture, and Horticulture.
        </p>
      </motion.div>

      {/* AGRICULTURE SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(46, 125, 50, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/agriculture.png" alt="Agriculture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '1rem' }}>🌾 Agriculture Farming</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Agriculture is the backbone of food production. Maximizing yields requires a combination of traditional wisdom and modern technology, from precision fertilization to advanced landscaping.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--primary-color)' }}>✅</span>
                <strong>Fertilizer & Crop Nutrition:</strong> Calculate exact NPK requirements per acre. Using controlled-release fertilizers ensures steady nutrient supply and reduces runoff.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--primary-color)' }}>✅</span>
                <strong>Water Management:</strong> Understand the exact water requirements for your specific crops. Using PM KUSUM solar pumps can drastically reduce irrigation costs.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--primary-color)' }}>✅</span>
                <strong>Advanced Landscaping:</strong> Utilizing modern dozer technology and skid steer attachments helps in levelling fields, improving water retention, and preparing soil from wilderness to harvest.
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* AQUACULTURE SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(2, 119, 189, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#0277bd', fontSize: '2.5rem', marginBottom: '1rem' }}>🐟 Aquaculture Farming</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Aquaculture is the cultivation of aquatic organisms such as fish, crustaceans, and aquatic plants. It requires careful management of water quality, pond construction, and species selection.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#0277bd' }}>💧</span>
                <strong>Building Farm Ponds:</strong> Constructing a farm pond is a crucial step for water storage and fish breeding. Ensure proper depth and clay lining to prevent seepage.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#0277bd' }}>💧</span>
                <strong>Water Quality Management:</strong> Regularly monitor pH, dissolved oxygen, and ammonia levels. Healthy water ensures faster growth and disease resistance.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#0277bd' }}>💧</span>
                <strong>Integrated Farming:</strong> Combine aquaculture with hydroponics (aquaponics) or poultry farming to create a sustainable, zero-waste ecosystem.
              </li>
            </ul>
          </div>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/aquaculture.png" alt="Aquaculture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </motion.section>

      {/* HORTICULTURE SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(230, 81, 0, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/horticulture.png" alt="Horticulture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#e65100', fontSize: '2.5rem', marginBottom: '1rem' }}>🍅 Horticulture Farming</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Horticulture involves the intensive cultivation of plants for human use—including fruits, vegetables, flowers, and ornamental plants. It offers high profitability per acre when managed correctly.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#e65100' }}>🌱</span>
                <strong>Plant Population & Spacing:</strong> Use precision spacing charts to maximize plant population per acre without overcrowding, preventing disease and nutrient competition.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#e65100' }}>🌱</span>
                <strong>Pesticide Dosage:</strong> Use exact spray mix calculators to apply pesticides efficiently, protecting high-value crops while minimizing chemical runoff.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#e65100' }}>🌱</span>
                <strong>Greenhouse & Sustainable Practices:</strong> Transitioning from conventional to sustainable farming using greenhouses helps control climate variables and drastically increases year-round yields.
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* POULTRY SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(229, 57, 53, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#e53935', fontSize: '2.5rem', marginBottom: '1rem' }}>🐔 Poultry Farming</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Poultry farming is the commercial raising of domesticated birds, primarily chickens, for meat and eggs. Modern management focuses on ethical practices and disease prevention.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#e53935' }}>🥚</span>
                <strong>Housing & Climate Control:</strong> Maintain optimal temperature and ventilation to prevent heat stress and respiratory diseases.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#e53935' }}>🥚</span>
                <strong>Nutrition Management:</strong> Provide balanced feed rich in protein and calcium to maximize egg production and shell strength.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#e53935' }}>🥚</span>
                <strong>Biosecurity:</strong> Implement strict sanitation protocols to protect flocks from avian influenza and other highly contagious pathogens.
              </li>
            </ul>
          </div>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/poultry.png" alt="Poultry Farming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </motion.section>

      {/* DAIRY SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(30, 136, 229, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/dairy.png" alt="Dairy Farming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#1e88e5', fontSize: '2.5rem', marginBottom: '1rem' }}>🐄 Dairy Farming</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Dairy farming specializes in long-term milk production. Success depends on high-quality genetics, exceptional cattle nutrition, and automated milking technologies.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#1e88e5' }}>🥛</span>
                <strong>Herd Health:</strong> Regular veterinary checkups, vaccination, and hoof care are critical to preventing mastitis and ensuring longevity.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#1e88e5' }}>🥛</span>
                <strong>Forage & Feeding:</strong> Utilize Total Mixed Ration (TMR) feeding systems to provide consistent, highly digestible nutrients.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#1e88e5' }}>🥛</span>
                <strong>Milking Hygiene:</strong> Implementing automated milking parlors with strict udder sanitization prevents contamination and improves yield.
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* APICULTURE SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(251, 192, 45, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#fbc02d', fontSize: '2.5rem', marginBottom: '1rem' }}>🐝 Apiculture</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Apiculture, or beekeeping, is the maintenance of honey bee colonies. Beyond honey and wax production, bees are the most vital pollinators for global agriculture.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#fbc02d' }}>🍯</span>
                <strong>Hive Placement:</strong> Position hives facing the morning sun, protected from strong winds, and within a 2-mile radius of diverse floral sources.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#fbc02d' }}>🍯</span>
                <strong>Pest Management:</strong> Monitor and control Varroa mites using organic treatments to prevent colony collapse.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#fbc02d' }}>🍯</span>
                <strong>Seasonal Feeding:</strong> Supplement colonies with sugar syrup and pollen patties during winter or nectar dearths.
              </li>
            </ul>
          </div>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/apiculture.png" alt="Apiculture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </motion.section>

      {/* SERICULTURE SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(142, 36, 170, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/sericulture.png" alt="Sericulture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#8e24aa', fontSize: '2.5rem', marginBottom: '1rem' }}>🐛 Sericulture</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Sericulture is the rearing of silkworms for the production of raw silk. It is a highly intricate agro-based industry requiring precise environmental controls.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#8e24aa' }}>🧵</span>
                <strong>Mulberry Cultivation:</strong> High-quality silk begins with high-protein mulberry leaves. Proper pruning and irrigation of mulberry gardens is essential.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#8e24aa' }}>🧵</span>
                <strong>Rearing Environment:</strong> Silkworms are extremely sensitive. Rearing houses must maintain exact humidity and temperature to prevent flacherie disease.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#8e24aa' }}>🧵</span>
                <strong>Cocoon Harvesting:</strong> Cocoons must be harvested exactly when the spinning is complete but before the moth breaks out, which ruins the silk thread.
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* FLORICULTURE SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(216, 27, 96, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#d81b60', fontSize: '2.5rem', marginBottom: '1rem' }}>🌷 Floriculture</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Floriculture focuses on the cultivation of flowering and ornamental plants. It is a highly profitable sector driven by greenhouse technologies and global logistics.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#d81b60' }}>💐</span>
                <strong>Greenhouse Control:</strong> Use automated climate computers to manage lighting, shading, and humidity, ensuring perfect bloom timing.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#d81b60' }}>💐</span>
                <strong>Soil Sterilization:</strong> Prevent fungal diseases like Botrytis by sterilizing the growing media before planting expensive bulbs.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#d81b60' }}>💐</span>
                <strong>Post-Harvest Care:</strong> Cut flowers immediately enter cold storage and are treated with floral preservatives to maximize vase life.
              </li>
            </ul>
          </div>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/floriculture.png" alt="Floriculture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </motion.section>

      {/* ORGANIC FARMING SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(67, 160, 71, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/organic.png" alt="Organic Farming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#43a047', fontSize: '2.5rem', marginBottom: '1rem' }}>🍃 Organic Farming</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Organic farming relies on sustainable techniques like crop rotation, green manure, and biological pest control, strictly avoiding synthetic chemical fertilizers and pesticides.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#43a047' }}>🌍</span>
                <strong>Soil Health:</strong> Rebuild soil microbiomes using compost tea and vermicompost, making nutrients naturally available to plants.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#43a047' }}>🌍</span>
                <strong>Companion Planting:</strong> Plant specific crops together (like Marigolds with Tomatoes) to naturally repel pests and attract beneficial insects.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#43a047' }}>🌍</span>
                <strong>Weed Management:</strong> Use mechanical cultivation, heavy mulching, and thermal weeding instead of chemical herbicides.
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* VERTICAL FARMING SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '5rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(57, 73, 171, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#3949ab', fontSize: '2.5rem', marginBottom: '1rem' }}>🏙️ Vertical Farming</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Vertical farming is the practice of growing crops in vertically stacked layers. It often incorporates controlled-environment agriculture, hydroponics, or aeroponics.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#3949ab' }}>💡</span>
                <strong>LED Grow Lights:</strong> Use specific spectrum LED lighting (red and blue waves) customized for each plant's exact photosynthetic needs.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#3949ab' }}>💡</span>
                <strong>Hydroponic Systems:</strong> Deliver nutrient-rich water directly to naked plant roots, using 90% less water than traditional soil farming.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#3949ab' }}>💡</span>
                <strong>Zero Pesticides:</strong> The sealed indoor environment eliminates pests entirely, allowing for 100% clean, ready-to-eat produce.
              </li>
            </ul>
          </div>
          <div style={{ flex: '1 1 500px', height: '400px' }}>
            <img src="/guides/vertical.png" alt="Vertical Farming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </motion.section>

    </div>
  );
}
