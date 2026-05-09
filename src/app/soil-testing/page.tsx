'use client';

import { motion, Variants } from 'framer-motion';

export default function SoilAndIrrigation() {
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
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '1rem' }}>Soil Health & Advanced Irrigation</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
          Master the fundamentals of agricultural soil testing and discover how to implement off-grid solar-powered drip irrigation systems for your borewells.
        </p>
      </motion.div>

      {/* SOIL TESTING SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '6rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(121, 85, 72, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', height: '450px' }}>
            <img src="/soil_testing.png" alt="Soil Testing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#795548', fontSize: '2.5rem', marginBottom: '1rem' }}>🧪 Types of Soil Testing</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Soil testing is the first step to a successful harvest. It prevents the over-application of fertilizers and diagnoses underlying issues that stunt crop growth.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#795548' }}>🔬</span>
                <strong>pH Testing:</strong> Determines the acidity or alkalinity of the soil (measured from 0-14). Most crops prefer a slightly acidic pH of 6.0 to 7.0. If soil is too acidic, nutrients become locked and unavailable to roots.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#795548' }}>🔬</span>
                <strong>EC (Electrical Conductivity):</strong> Measures the total dissolved salts in the soil. High EC indicates soil salinity, which can severely dehydrate seeds and burn plant roots.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#795548' }}>🔬</span>
                <strong>Macronutrient (NPK) Analysis:</strong> Precisely measures available Nitrogen, Phosphorus, and Potassium so you can calculate exactly how much fertilizer to apply.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#795548' }}>🔬</span>
                <strong>Organic Carbon Test:</strong> Indicates the amount of organic matter in the soil, which is crucial for water retention and microbial health.
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* SOLAR IRRIGATION SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{ marginBottom: '4rem' }}
      >
        <motion.div variants={fadeInUp} whileHover={{ scale: 1.01, boxShadow: '0 25px 50px rgba(0, 150, 136, 0.2)' }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
          <div style={{ flex: '1 1 500px', padding: '2rem' }}>
            <h2 style={{ color: '#009688', fontSize: '2.5rem', marginBottom: '1rem' }}>☀️ Solar Energy & Drip Irrigation Implementation</h2>
            <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Combining solar power with drip irrigation is the ultimate solution for sustainable, off-grid farming. Learn how to convert your existing borewell motor to run purely on sunlight.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#009688' }}>⚡</span>
                <strong>Solar Panel Array Setup:</strong> To run a standard 5 HP submersible borewell motor, you will need a 5kW solar array (approx. fifteen 335W panels) mounted in a shadow-free, south-facing location.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#009688' }}>⚡</span>
                <strong>VFD (Variable Frequency Drive):</strong> This is the brain of the operation. The VFD converts the DC power from the solar panels into 3-phase AC power to directly start and run the water motor without needing batteries!
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#009688' }}>⚡</span>
                <strong>Drip Irrigation Network:</strong> Connect the pump outlet to a screen filter, then route the water through mainlines and laterals. Drip emitters will deliver water directly to the root zone, saving up to 70% water compared to flood irrigation.
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#009688' }}>⚡</span>
                <strong>Fertigation Integration:</strong> Install a Venturi injector at the mainline. This allows you to mix the water-soluble fertilizers (like NPK 19-19-19) directly into the solar-powered drip system!
              </li>
            </ul>
          </div>
          <div style={{ flex: '1 1 500px', height: '450px' }}>
            <img src="/solar_irrigation.png" alt="Solar Drip Irrigation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </motion.section>

    </div>
  );
}
