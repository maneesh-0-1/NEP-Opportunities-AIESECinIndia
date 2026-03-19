import React, { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaCog, FaPlaneDeparture, FaSeedling, FaDollarSign, FaRupeeSign, FaShieldAlt, FaLaptop, FaCheckCircle, FaSearch, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import BackgroundFluid from './BackgroundFluid';
import './App.css';
import gtLogo from './assets/GT-logo.png';

const API_URL = "https://script.google.com/macros/s/AKfycbzjfElmM0yCCLrZbes7xjU4Wi4G6FvM6njtEFdLn-7fNdGmU2P8XsxuEmt1GiW5e_xMzw/exec";

const MOCK_DATA = [
  {
    Company: "Infosys, India",
    About: "A global leader in next-generation digital services and consulting.",
    Benefits: "International Experience, Corporate Talent Exposure, Flight Tickets, 16 Personal leaves/15 sick leaves, Health Insurance, Company Laptop",
    Website: "https://infosys.com",
    "Opp 1 Title": "Summer Exchange Program",
    "Opp 1 Desc": "Summer exchange program — where global businesses build the future.",
    "Opp 1 Salary": "₹50,000 / mo",
    "Opp 2 Title": "Business Development Internship",
    "Opp 2 Desc": "Regular development opportunities for business development internships.",
    "Opp 2 Salary": "₹45,000 / mo",
    "Opp 3 Title": "HR Specialist Role",
    "Opp 3 Desc": "HR Specialist role provides broad experience working with employees across departments.",
    "Opp 3 Salary": "₹40,000 / mo"
  },
  {
    Company: "AIESEC | Global Volunteer",
    About: "Lead by the Turkish Way, to inquiry our companies to transition most experience and prestigious entity city and operators.",
    Benefits: "International Experience [cite: 0, 1], Corporate Talent Exposure, Flight Tickets, 16 Personal leaves 15 sick leaves, Night Shift allowance, Health Insurance, Company Laptop",
    Website: "https://aiesec.org",
    "Opp 1 Title": "Summer Exchange Program",
    "Opp 1 Desc": "Summer exchange program — where the global businesses with antil future. [IMAGE 0]",
    "Opp 1 Salary": "₹30,000 / mo",
    "Opp 2 Title": "Business Development Internship",
    "Opp 2 Desc": "Regulass development opportunities, for business development internship to maursan conress. [IMAGE 1]",
    "Opp 2 Salary": "₹35,000 / mo",
    "Opp 3 Title": "HR Specialist Role",
    "Opp 3 Desc": "HR Specialist role provides a brander and worship with businesses with employes in role. [cite: 52]",
    "Opp 3 Salary": "₹32,000 / mo"
  },
  {
    Company: "TATA Consultancy Services",
    About: "IT services, consulting and business solutions organization.",
    Benefits: "Global Operations, Corporate Retreats, 401k Match, Private Healthcare",
    Website: "https://tcs.com",
    "Opp 1 Title": "IT Consultant",
    "Opp 1 Desc": "Consulting for enterprise digital transformation.",
    "Opp 1 Salary": "₹60,000 / mo",
    "Opp 2 Title": "Software Engineer",
    "Opp 2 Desc": "Develop scalable high-performance backend systems.",
    "Opp 2 Salary": "₹75,000 / mo",
    "Opp 3 Title": "Data Scientist",
    "Opp 3 Desc": "Advanced analytics and AI modeling.",
    "Opp 3 Salary": "₹80,000 / mo"
  }
];

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (API_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE" || !API_URL) {
          setData(MOCK_DATA);
          setSelectedCompany(MOCK_DATA.find(p => p.Company.includes("AIESEC")) || MOCK_DATA[0]);
        } else {
          const response = await fetch(API_URL);
          const json = await response.json();
          setData(json);
          if (json.length > 0) setSelectedCompany(json.find(p => (p.Company || p.company || p.Company_Name || "").includes("AIESEC")) || json[0]);
        }
      } catch (e) {
        console.error("Fetch Error:", e);
        // Fallback on error
        setData(MOCK_DATA);
        setSelectedCompany(MOCK_DATA[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(company => {
    const name = company.Company || company.company || company.Company_Name || "";
    return name.toLowerCase().includes(search.toLowerCase().trim());
  });

  // Handle benefits icon mapping
  const renderBenefit = (benefitStr, idx) => {
    const text = benefitStr.toLowerCase();
    let Icon = FaCheckCircle;

    if (text.includes('international') || text.includes('globe')) Icon = FaGlobe;
    else if (text.includes('talent') || text.includes('corporate') || text.includes('gear')) Icon = FaCog;
    else if (text.includes('flight') || text.includes('travel') || text.includes('plane')) Icon = FaPlaneDeparture;
    else if (text.includes('leave') || text.includes('sick') || text.includes('personal')) Icon = FaSeedling;
    else if (text.includes('allowance') || text.includes('bonus') || text.includes('stipend') || text.includes('shift')) Icon = FaDollarSign;
    else if (text.includes('health') || text.includes('insurance') || text.includes('shield')) Icon = FaShieldAlt;
    else if (text.includes('laptop') || text.includes('equipment') || text.includes('computer')) Icon = FaLaptop;

    return (
      <div key={idx} className="benefit-item">
        <Icon className="benefit-icon" />
        <span>{benefitStr}</span>
      </div>
    );
  };

  return (
    <>
      <BackgroundFluid />

      <main className="app-container">

        {/* Header */}
        <header className="app-header">
          <div className="header-text">
            <h1 className="header-title">Premium Opportunities</h1>
            <p className="header-subtitle">Powered by AIESEC in India</p>
          </div>
          <div className="glass-panel logo-card">
            <img src={gtLogo} alt="Global Talent Logo" className="actual-logo" />
          </div>
        </header>

        <div className="content-wrapper">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="glass-panel search-container">
              <input
                type="text"
                placeholder="Search Partner..."
                className="search-input"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  // Auto-select top result if searching matches
                  const matches = data.filter(c => (c.Company || c.company || c.Company_Name || "").toLowerCase().includes(e.target.value.toLowerCase().trim()));
                  if (matches.length > 0 && e.target.value !== "") setSelectedCompany(matches[0]);
                }}
              />
              <FaSearch className="search-icon" />
            </div>

            <div className="glass-panel list-panel">
              <div className="company-list">
                {loading && <div className="loading-state">Loading...</div>}
                {!loading && filteredData.length === 0 && <div className="empty-state">No partners found.</div>}
                {!loading && filteredData.map((company, idx) => {
                  const compName = company.Company || company.company || company.Company_Name || "Unnamed";
                  const isActive = selectedCompany && (selectedCompany.Company || selectedCompany.company || selectedCompany.Company_Name) === compName;
                  return (
                    <div
                      key={idx}
                      className={`company-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCompany(company);
                        if (window.innerWidth <= 1024 && profileRef.current) {
                          // Allow a tiny delay for React state batching before scroll
                          setTimeout(() => {
                            profileRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 50);
                        }
                      }}
                    >
                      {compName}
                    </div>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Profile Card */}
          <section className="main-content" ref={profileRef}>
            <article className="glass-panel profile-card">
              {!selectedCompany ? (
                <div className="empty-state">Select a company on the left to view details.</div>
              ) : (
                <>
                  <h2 className="company-name">{selectedCompany.Company || selectedCompany.company || selectedCompany.Company_Name}</h2>

                  <div className="profile-section">
                    <h3>About</h3>
                    <p>{selectedCompany.About || selectedCompany.about || "Description not available."}</p>

                    {/* Social Media Links */}
                    <div className="social-links">
                      {(selectedCompany.Instagram || selectedCompany.instagram) && (
                        <a href={selectedCompany.Instagram || selectedCompany.instagram} target="_blank" rel="noreferrer" className="social-icon" title="Instagram">
                          <FaInstagram />
                        </a>
                      )}
                      {(selectedCompany.X || selectedCompany.x || selectedCompany.Twitter || selectedCompany.twitter) && (
                        <a href={selectedCompany.X || selectedCompany.x || selectedCompany.Twitter || selectedCompany.twitter} target="_blank" rel="noreferrer" className="social-icon" title="X (Twitter)">
                          <FaXTwitter />
                        </a>
                      )}
                      {(selectedCompany.Linkedin || selectedCompany.linkedin || selectedCompany.LinkedIn || selectedCompany.LinkedIn_Link) && (
                        <a href={selectedCompany.Linkedin || selectedCompany.linkedin || selectedCompany.LinkedIn || selectedCompany.LinkedIn_Link} target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
                          <FaLinkedin />
                        </a>
                      )}
                      {(selectedCompany.Youtube || selectedCompany.youtube || selectedCompany.YouTube || selectedCompany.Youtube_Link) && (
                        <a href={selectedCompany.Youtube || selectedCompany.youtube || selectedCompany.YouTube || selectedCompany.Youtube_Link} target="_blank" rel="noreferrer" className="social-icon" title="YouTube">
                          <FaYoutube />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="profile-section">
                    <h3>Compensation & Benefits</h3>
                    
                    {(() => {
                      // Prioritize the new unified Opp_Salary column
                      const unifiedSalary = selectedCompany.Opp_Salary || selectedCompany["Opp Salary"] || selectedCompany.opp_salary || selectedCompany.oppSalary || selectedCompany.Salary;
                      
                      const salaries = [];
                      if (unifiedSalary && String(unifiedSalary).trim() !== "") {
                        salaries.push(unifiedSalary);
                      } else {
                        // Fallback for mock data or older rows
                        let maxOpp = 3;
                        Object.keys(selectedCompany).forEach(key => {
                          const match = key.match(/opp\s*_?(\d+)/i);
                          if (match) {
                            const num = parseInt(match[1], 10);
                            if (num > maxOpp) maxOpp = num;
                          }
                        });
                        for (let num = 1; num <= maxOpp; num++) {
                          const oppSalary = selectedCompany[`Opp ${num} Salary`] || selectedCompany[`opp${num}Salary`] || selectedCompany[`Opp_${num}_Salary`];
                          if (oppSalary && String(oppSalary).trim() !== "" && !salaries.includes(oppSalary)) {
                            salaries.push(oppSalary);
                          }
                        }
                      }
                      
                      if (salaries.length > 0) {
                        return (
                          <div className="salary-highlights">
                            {salaries.map((sal, idx) => (
                              <div key={idx} className="benefit-salary-tag">
                                <FaRupeeSign className="salary-icon" />
                                {sal}
                              </div>
                            ))}
                          </div>
                        );
                      }
                    })()}

                    <div className="benefits-list">
                      {(() => {
                        const b = selectedCompany.Benefits || selectedCompany.benefits;
                        if (!b) return <p>No specific benefits listed.</p>;
                        const bList = b.split(',').map(s => s.trim()).filter(s => s.length > 0);
                        return bList.map((benefit, i) => renderBenefit(benefit, i));
                      })()}
                    </div>
                  </div>

                  {(selectedCompany.Website || selectedCompany.website) && (
                    <div className="visit-btn-container">
                      <a href={selectedCompany.Website || selectedCompany.website} target="_blank" rel="noreferrer" className="btn-visit">
                        Visit Website
                      </a>
                    </div>
                  )}
                </>
              )}
            </article>
          </section>
        </div>

        {/* Opportunities Grid */}
        <div className="opportunities-container">
          {selectedCompany ? (
            (() => {
              // Dynamically find how many opportunities are in the data based on keys
              let maxOpp = 3; // default minimum
              Object.keys(selectedCompany).forEach(key => {
                const match = key.match(/opp\s*_?(\d+)/i);
                if (match) {
                  const num = parseInt(match[1], 10);
                  if (num > maxOpp) maxOpp = num;
                }
              });

              return Array.from({ length: maxOpp }, (_, i) => i + 1).map(num => {
                const title = selectedCompany[`Opp ${num} Title`] || selectedCompany[`opp${num}Title`] || selectedCompany[`Opp_${num}_Name`];
                const desc = selectedCompany[`Opp ${num} Desc`] || selectedCompany[`opp${num}Desc`] || selectedCompany[`Opp_${num}_About`];
                const link = selectedCompany[`Opp_${num}_Link`] || selectedCompany[`Opp ${num} Link`] || selectedCompany[`opp${num}Link`];

                // If title doesn't exist or is empty string, don't render this Opportunity card
                if (!title || String(title).trim() === "") return null;

                return (
                  <div key={num} className="glass-panel opp-card">
                    <h3 className="opp-title">{title}</h3>
                    <p className="opp-desc">{desc || "Details available upon application."}</p>
                    {link && String(link).trim() !== "" ? (
                      <a href={link} target="_blank" rel="noreferrer" className="btn-details">See details</a>
                    ) : (
                      <span className="btn-details" style={{ opacity: 0.5, cursor: 'not-allowed' }}>No link available</span>
                    )}
                  </div>
                );
              });
            })()
          ) : (
            <div className="glass-panel opp-card" style={{ gridColumn: 'span 3', padding: '2rem' }}>
              <p className="empty-state" style={{ padding: 0 }}>No active listings.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
