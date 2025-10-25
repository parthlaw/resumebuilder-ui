import React from "react";
import { ResumeData, SpacingConfig } from "@/types";
import TemplateWrapper from "../../TemplareWrapper";
import { getCompleteBaseStyles } from "../../baseStyles";

interface TechProfessionalV0Props {
  data: ResumeData;
  spacingConfig: SpacingConfig;
  pageSize?: "letter" | "a4";
}

function TechProfessionalV0Content({ 
  data, 
}: TechProfessionalV0Props) {
  const { personalInfo, sections } = data;

  return (
    <div className="resume-container">
      {/* Header Section */}
      <header className="resume-header">
        <h1 className="resume-name">{personalInfo.name}</h1>
        <div className="contact-info">
          {personalInfo.email && (
            <span className="contact-item">{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="contact-item">{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="contact-item">{personalInfo.location}</span>
          )}
        </div>
        <div className="social-links">
          {personalInfo.linkedin && (
            <span className="social-item">
              LinkedIn: {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="social-item">
              GitHub: {personalInfo.github}
            </span>
          )}
          {personalInfo.website && (
            <span className="social-item">
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.id} className="resume-section">
          <h2 className="section-title">{section.type}</h2>
          <div className="section-divider"></div>
          
          <div className="section-content">
            {section.type === "Experience" && (
              <div className="experience-items">
                {section.items.map((item) => (
                  <div key={item.id} className="experience-item">
                    <div className="item-header">
                      <div className="item-header-left">
                        <h3 className="item-title">{item.title}</h3>
                        <span className="item-company">{item.company}</span>
                      </div>
                      <div className="item-header-right">
                        <span className="item-duration">{item.duration}</span>
                        {item.location && (
                          <span className="item-location">{item.location}</span>
                        )}
                      </div>
                    </div>
                    {item.description && (
                      <div 
                        className="item-description"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.type === "Projects" && (
              <div className="project-items">
                {section.items.map((item) => (
                  <div key={item.id} className="project-item">
                    <div className="item-header">
                      <h3 className="item-title">{item.title}</h3>
                      {item.duration && (
                        <span className="item-duration">{item.duration}</span>
                      )}
                    </div>
                    {item.description && (
                      <div 
                        className="item-description"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.type === "Education" && (
              <div className="education-items">
                {section.items.map((item) => (
                  <div key={item.id} className="education-item">
                    <div className="item-header">
                      <div className="item-header-left">
                        <h3 className="item-title">{item.degree}</h3>
                        <span className="item-company">{item.institution}</span>
                      </div>
                      <div className="item-header-right">
                        {item.year && (
                          <span className="item-duration">{item.year}</span>
                        )}
                        {item.location && (
                          <span className="item-location">{item.location}</span>
                        )}
                      </div>
                    </div>
                    {item.gpa && (
                      <div className="item-gpa">GPA: {item.gpa}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.type === "Skills" && (
              <div className="skills-items">
                {section.items.map((item) => (
                  <div key={item.id} className="skill-item">
                    <span className="skill-group">{item.group}:</span>
                    <span className="skill-list">{item.skills}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function TechProfessionalV0({ 
  data, 
  spacingConfig,
  pageSize = "letter"
}: TechProfessionalV0Props) {
  // Get base styles with spacing and page size
  const baseStyles = getCompleteBaseStyles(spacingConfig, pageSize);
  
  // Template-specific styles
  const templateStyles = `
    /* Header Styles */
    .resume-header {
      text-align: center;
      margin-bottom: ${spacingConfig.sectionSpacing * 1.5}rem;
      padding-bottom: ${spacingConfig.sectionSpacing}rem;
      border-bottom: 2px solid #2563eb;
    }

    .resume-name {
      font-size: 28pt;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0.4rem;
      letter-spacing: -0.5px;
    }

    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0 1rem;
      margin-bottom: 0.3rem;
      font-size: 10pt;
      color: #4b5563;
    }

    .contact-item {
      position: relative;
    }

    .contact-item:not(:last-child)::after {
      content: "•";
      position: absolute;
      right: -0.55rem;
      color: #9ca3af;
    }

    .social-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0 1rem;
      font-size: 9.5pt;
      color: #6b7280;
    }

    .social-item {
      position: relative;
    }

    .social-item:not(:last-child)::after {
      content: "•";
      position: absolute;
      right: -0.55rem;
      color: #9ca3af;
    }

    /* Section Styles */
    .resume-section {
      margin-bottom: ${spacingConfig.sectionSpacing * 1.2}rem;
    }

    .section-title {
      font-size: 13pt;
      font-weight: 700;
      color: #1e40af;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.3rem;
    }

    .section-divider {
      height: 1.5px;
      background: linear-gradient(to right, #2563eb, #93c5fd);
      margin-bottom: ${spacingConfig.sectionSpacing * 0.8}rem;
    }

    .section-content {
      padding-left: 0.1rem;
    }

    /* Experience & Projects Styles */
    .experience-items,
    .project-items,
    .education-items {
      display: flex;
      flex-direction: column;
      gap: ${spacingConfig.itemSpacing}rem;
    }

    .experience-item,
    .project-item,
    .education-item {
      position: relative;
      page-break-inside: avoid;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.35rem;
      gap: 1rem;
    }

    .item-header-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .item-header-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.1rem;
      text-align: right;
      flex-shrink: 0;
    }

    .item-title {
      font-size: 11.5pt;
      font-weight: 600;
      color: #111827;
      line-height: 1.3;
    }

    .item-company {
      font-size: 10.5pt;
      font-weight: 500;
      color: #374151;
      font-style: italic;
    }

    .item-duration {
      font-size: 10pt;
      font-weight: 500;
      color: #6b7280;
      white-space: nowrap;
    }

    .item-location {
      font-size: 9.5pt;
      color: #9ca3af;
      white-space: nowrap;
    }

    .item-description {
      color: #374151;
      font-size: 10.5pt;
    }

    .item-description ul {
      margin: 0;
      padding-left: 1.2rem;
      list-style-type: disc;
    }

    .item-description li {
      margin-bottom: 0.2rem;
      line-height: var(--line-height);
    }

    .item-description li::marker {
      color: #2563eb;
    }

    .item-gpa {
      font-size: 10pt;
      color: #6b7280;
      margin-top: 0.2rem;
    }

    /* Skills Styles */
    .skills-items {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .skill-item {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      font-size: 10.5pt;
    }

    .skill-group {
      font-weight: 600;
      color: #1f2937;
      min-width: 8rem;
      flex-shrink: 0;
    }

    .skill-list {
      color: #374151;
      flex: 1;
      line-height: 1.5;
    }

    /* Responsive adjustments for preview */
    @media screen and (max-width: 768px) {
      .item-header {
        flex-direction: column;
      }

      .item-header-right {
        align-items: flex-start;
        text-align: left;
      }

      .contact-info,
      .social-links {
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
      }

      .contact-item::after,
      .social-item::after {
        display: none;
      }
    }
  `;

  // Combine base styles with template-specific styles
  const styles = baseStyles + templateStyles;

  return (
    <TemplateWrapper styles={styles}>
      <TechProfessionalV0Content data={data} spacingConfig={spacingConfig} pageSize={pageSize} />
    </TemplateWrapper>
  );
}

