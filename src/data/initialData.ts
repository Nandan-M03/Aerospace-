import { PortfolioData } from '../types/portfolio';

// Generate a valid minimal standalone PDF data URI for initial demo projects
export function createSamplePdfDataUri(title: string, category: string): string {
  // Simple PDF 1.4 minimal binary structure
  const content = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>>>> endobj
4 0 obj <</Length 285>> stream
BT
/F1 22 Tf
50 720 Td
(DEPARTMENT OF AEROSPACE ENGINEERING) Tj
0 -30 Td
/F1 16 Tf
(${title.toUpperCase()}) Tj
0 -24 Td
/F1 12 Tf
(Author: Nandan M. | Dayananda Sagar College of Engineering) Tj
0 -20 Td
(Classification: Technical Research & Design Report // ${category.toUpperCase()}) Tj
0 -35 Td
(EXECUTIVE SUMMARY:) Tj
0 -18 Td
(This document presents the aerodynamic characteristics, computational modeling,) Tj
0 -15 Td
(flight mechanics formulation, and empirical telemetry data validated for this system.) Tj
0 -25 Td
(Status: Reviewed & Approved for Flight Demonstration) Tj
ET
endstream
endobj
5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000227 00000 n 
0000000564 00000 n 
trailer <</Size 6 /Root 1 0 R>>
startxref
635
%%EOF`;

  return `data:application/pdf;base64,${btoa(content)}`;
}

export const initialPortfolioData: PortfolioData = {
  version: 1,
  profile: {
    name: 'Nandan M.',
    title: 'Aerospace Engineering Scholar',
    institution: 'Dayananda Sagar College of Engineering',
    department: 'Department of Aerospace Engineering',
    location: 'Bengaluru, India',
    status: 'B.E. Aerospace Engineering Candidate',
    aboutAerospace:
      'Aerospace engineering bridges atmospheric aerodynamics with orbital mechanics. From the subsonic vortices shed by delta-wing fighters to autonomous neural-guided UAV navigation and supersonic ramjet compression, aerospace is the relentless pursuit of mastering flight through physics, computational modeling, and precision propulsion.',
    specializations: [
      'Computational Fluid Dynamics (CFD)',
      'Autonomous UAV Flight Controllers',
      'Supersonic Aerodynamics',
      'Avionics & Telemetry Integration',
      'Structural FEA & Composites',
    ],
    email: 'nandan.aerospace@gmail.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  quotes: [
    {
      id: 'q1',
      text: 'Scientists discover the world that exists; engineers create the world that never was.',
      author: 'Theodore von Kármán',
      affiliation: 'Pioneer of Supersonic Aerodynamics',
    },
    {
      id: 'q2',
      text: 'Look at the sky. We are not alone. The whole universe is friendly to us and conspires only to give the best to those who dream and work.',
      author: 'Dr. A.P.J. Abdul Kalam',
      affiliation: 'Missile Pioneer & Aeronautical Engineer',
    },
    {
      id: 'q3',
      text: 'The path from dreams to success does exist. May you have the vision to find it, the courage to get on to it, and the perseverance to follow it.',
      author: 'Kalpana Chawla',
      affiliation: 'Aerospace Engineer & NASA Astronaut',
    },
    {
      id: 'q4',
      text: 'Mystery creates wonder and wonder is the basis of mans desire to understand.',
      author: 'Neil Armstrong',
      affiliation: 'Aeronautical Engineer & Apollo 11 Commander',
    },
  ],
  sections: [
    {
      id: 'sec-fighter-jets',
      key: 'fighter-jets',
      title: 'Fighter Jets',
      callsign: 'SEC-01 // AIR-SUPERIORITY & COMBAT PLATFORMS',
      description:
        'Advanced aerodynamic research, compound delta-wing vortex lift analysis, stealth cross-section geometries, and supersonic air-intake simulations for high-agility combat aircraft.',
      projects: [
        {
          id: 'fj-1',
          title: 'LCA Delta-Wing High-AoA Vortex Breakdown Analysis',
          codename: 'PROJECT GARUDA // CFD-VORTEX',
          summary:
            'Computational and wind-tunnel investigation into leading-edge vortex stability on compound tailless delta-wing configurations at angles of attack up to 38 degrees.',
          details:
            'Analyzed vortex breakdown delay mechanisms using leading-edge root extensions (LERX) and synthetic jet actuation. Validated using open-source OpenFOAM transient compressible solvers at Mach 0.85.',
          tags: ['CFD', 'Delta Wing', 'Compressible Flow', 'OpenFOAM', 'Mach 0.85'],
          specs: [
            { label: 'Wing Sweep', value: '52.5° Compound' },
            { label: 'Mach Regime', value: 'Mach 0.3 - 1.4' },
            { label: 'Critical AoA', value: '38° Vortex Stall' },
            { label: 'Software', value: 'OpenFOAM / Ansys Fluent' },
          ],
          pdfName: 'LCA_DeltaWing_Vortex_Breakdown_Report.pdf',
          pdfDataId: 'sample-pdf-fj1',
          pdfSize: '1.4 MB',
          date: '2025 - 2026',
        },
        {
          id: 'fj-2',
          title: 'DSI (Diverterless Supersonic Intake) Aerodynamic Optimization',
          codename: 'RAM-04 // INTAKE DYNAMICS',
          summary:
            'Parametric compression-bump design for boundary layer diversion and shockwave management across trans-sonic to supersonic transition regimes.',
          details:
            'Engineered a 3D compression bump surface that isolates boundary layer ingestion without mechanical diverter plates, reducing radar cross-section and mechanical weight by 18%.',
          tags: ['Shockwave Dynamics', 'DSI Bump', 'Stealth', 'Propulsion Airframe'],
          specs: [
            { label: 'Design Mach', value: 'Mach 1.8' },
            { label: 'Pressure Recovery', value: '94.2%' },
            { label: 'Weight Reduction', value: '18.4 kg' },
            { label: 'Boundary Layer', value: 'Bleedless Divert' },
          ],
          pdfName: 'DSI_Supersonic_Intake_Analysis.pdf',
          pdfDataId: 'sample-pdf-fj2',
          pdfSize: '2.1 MB',
          date: '2025',
        },
      ],
    },
    {
      id: 'sec-drones',
      key: 'drones',
      title: 'Drones',
      callsign: 'SEC-02 // MULTIROTOR DYNAMICS & AUTONOMY',
      description:
        'Multi-rotor dynamic modeling, custom PID/LQR flight control architectures, autonomous GPS-denied sensory fusion, and high-thrust carbon propulsion testing.',
      projects: [
        {
          id: 'dr-1',
          title: 'Autonomous Hexacopter Heavy Lift with Adaptive LQR Control',
          codename: 'AERO-HEX 6X // HEAVY PAYLOAD',
          summary:
            'Custom 960mm carbon-fiber airframe designed for 8kg payload capacity with real-time center-of-gravity compensation and telemetry logging.',
          details:
            'Implemented custom ArduPilot firmware extensions with Kalman filter sensory fusion across dual IMUs, optical flow, and RTK GNSS for precision hovering within +/- 2.5cm.',
          tags: ['Hexacopter', 'LQR Control', 'Pixhawk', 'RTK-GNSS', 'Sensory Fusion'],
          specs: [
            { label: 'Wheelbase', value: '960 mm' },
            { label: 'Max Payload', value: '8.0 kg' },
            { label: 'Flight Endurance', value: '38 mins' },
            { label: 'Motor KV', value: '180 KV / 6S' },
          ],
          pdfName: 'Hexacopter_Adaptive_Control_Paper.pdf',
          pdfDataId: 'sample-pdf-dr1',
          pdfSize: '3.6 MB',
          date: '2025 - 2026',
        },
        {
          id: 'dr-2',
          title: 'High-Speed FPV Aerodynamic Drag Minimization',
          codename: 'AERODRAFT 5 // RACING DRYNAMICS',
          summary:
            'Wind tunnel aerodynamic profiling of tilted arm frames versus conventional horizontal geometries at pitch angles exceeding 65 degrees.',
          details:
            'Reduced parasite drag during forward sprint by 27% through airfoil arm fairings and battery bay shielding, increasing top speed from 142 km/h to 171 km/h.',
          tags: ['Aerodynamics', 'Parasite Drag', 'Carbon Fiber', 'Wind Tunnel'],
          specs: [
            { label: 'Sprint Speed', value: '171 km/h' },
            { label: 'Drag Reduction', value: '27.4%' },
            { label: 'Forward Pitch', value: '65° Nominal' },
            { label: 'Thrust-Weight', value: '11.8:1' },
          ],
          pdfName: 'FPV_HighSpeed_Drag_Study.pdf',
          pdfDataId: 'sample-pdf-dr2',
          pdfSize: '1.8 MB',
          date: '2025',
        },
      ],
    },
    {
      id: 'sec-uavs',
      key: 'uavs',
      title: 'UAVs (Unmanned Aerial Vehicles)',
      callsign: 'SEC-03 // FIXED-WING & HYBRID PLATFORMS',
      description:
        'Tactical fixed-wing airframes, VTOL tilt-rotor transitions, solar long-endurance flight mechanics, and low Reynolds number airfoil optimization.',
      projects: [
        {
          id: 'uav-1',
          title: 'Long-Endurance Solar-Assisted Fixed Wing UAV',
          codename: 'SOLARIS-II // ENDURANCE AIRFRAME',
          summary:
            '2.8-meter wingspan reconnaissance glider with integrated monocrystalline solar cells, maximizing lift-to-drag ratio at low Reynolds numbers.',
          details:
            'Designed using Selig S1223 high-lift low-Re airfoil with composite carbon-balsa spar construction. Validated 4.2-hour continuous daylight flight endurance with solar recharge system.',
          tags: ['Fixed-Wing', 'Solar Aviation', 'Low Reynolds', 'Selig S1223', 'Glider'],
          specs: [
            { label: 'Wingspan', value: '2.8 meters' },
            { label: 'Aspect Ratio', value: '14.2' },
            { label: 'L/D Max', value: '21.6 @ 14 m/s' },
            { label: 'Solar Output', value: '110 W Peak' },
          ],
          pdfName: 'Solar_UAV_Aerodynamics_FlightTest.pdf',
          pdfDataId: 'sample-pdf-uav1',
          pdfSize: '4.2 MB',
          date: '2025 - 2026',
        },
        {
          id: 'uav-2',
          title: 'Tandem-Wing Hybrid VTOL Transition Dynamics',
          codename: 'APEX-VTOL // VECTOR TRANSIENT',
          summary:
            'Aerodynamic transition simulation for a quad-tilt-rotor hybrid UAV bridging vertical takeoff hover to aerodynamic wing-borne cruise.',
          details:
            'Addressed stall margins during corridor transition at 12-16 m/s using active flap deflection scheduling and differential motor tilt angle rate limiters.',
          tags: ['VTOL', 'Transition Corridor', 'Tilt-Rotor', 'Flight Dynamics'],
          specs: [
            { label: 'MTOW', value: '6.5 kg' },
            { label: 'Cruise Speed', value: '24 m/s' },
            { label: 'Transition Time', value: '4.8 seconds' },
            { label: 'Range', value: '65 km' },
          ],
          pdfName: 'Hybrid_VTOL_Transition_Dynamics.pdf',
          pdfDataId: 'sample-pdf-uav2',
          pdfSize: '2.9 MB',
          date: '2025',
        },
      ],
    },
    {
      id: 'sec-others',
      key: 'others',
      title: 'Others & Space Systems',
      callsign: 'SEC-04 // PROPULSION, ROCKETRY & ADVANCED RESEARCH',
      description:
        'Solid rocket motor grain ballistics, nozzle expansion ratios, scramjet combustion computational models, and atmospheric re-entry heat shield analyses.',
      projects: [
        {
          id: 'oth-1',
          title: 'Solid Rocket Motor Star-Grain Internal Ballistics Simulation',
          codename: 'IGNIS-1 // PROPULSION CORE',
          summary:
            'Burn area progression modeling and de Laval nozzle throat erosion calculation for a composite propellant sounding rocket motor.',
          details:
            'Formulated numerical burn profile equations in Python/MATLAB, validated against static test stand load-cell recordings with peak chamber pressure of 4.8 MPa.',
          tags: ['Rocket Propulsion', 'Internal Ballistics', 'De Laval Nozzle', 'Pyrotechnics'],
          specs: [
            { label: 'Peak Thrust', value: '1,450 N' },
            { label: 'Total Impulse', value: '3,820 N·s' },
            { label: 'Specific Impulse', value: '218 s' },
            { label: 'Chamber Pressure', value: '4.8 MPa' },
          ],
          pdfName: 'Solid_Rocket_Ballistics_Static_Fire.pdf',
          pdfDataId: 'sample-pdf-oth1',
          pdfSize: '3.1 MB',
          date: '2024 - 2025',
        },
        {
          id: 'oth-2',
          title: 'Hypersonic Boundary Layer & Scramjet Inlet Shock Compression',
          codename: 'HYPER-5 // HYPERSONICS',
          summary:
            'Shock-on-lip condition calculations and boundary layer shock interactions at Mach 5.5 for scramjet compression ducts.',
          details:
            'Investigated cowl shock impingement on the internal compression ramp with localized aerodynamic heating predictions for carbon-carbon composite leading edges.',
          tags: ['Hypersonics', 'Mach 5.5', 'Shock Waves', 'Scramjet', 'CFD'],
          specs: [
            { label: 'Velocity', value: 'Mach 5.5' },
            { label: 'Stagnation Temp', value: '1,420 K' },
            { label: 'Compression Ratio', value: '18.4' },
            { label: 'Shock Structure', value: '3-Ramp Oblique' },
          ],
          pdfName: 'Hypersonic_Scramjet_Inlet_Study.pdf',
          pdfDataId: 'sample-pdf-oth2',
          pdfSize: '2.5 MB',
          date: '2024',
        },
      ],
    },
  ],
};

