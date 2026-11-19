import { useEffect, useState, useMemo } from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Circle, Path, Link, Image, Rect, Polyline, Line } from '@react-pdf/renderer';
import QRCode from 'qrcode';

export interface PortfolioExperience {
  company: string;
  date: string;
  location: string;
  role: string;
  bullets: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  location: string;
  phone: string;
  summary: string;
  skills: {
    power: string[];
    wiring: string[];
  };
  experience: PortfolioExperience[];
  education: string[];
  details: string[];
}

interface ResumePDFProps {
  data: PortfolioData;
  websiteUrl?: string;
}

const getStyles = (s: number) => StyleSheet.create({
  page: {
    padding: `${22 * s}px ${28 * s}px`,
    fontFamily: 'Helvetica',
    color: '#334155',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 21 * s,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  role: {
    fontSize: 10 * s,
    color: '#2563eb',
    fontFamily: 'Helvetica-Bold',
    marginTop: 3 * s,
    marginBottom: 6 * s,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10 * s,
    fontSize: 9 * s,
    color: '#475569',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4 * s,
  },
  qrImage: {
    width: 52 * s,
    height: 52 * s,
  },
  headerBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a8a',
    marginTop: 8 * s,
    marginBottom: 10 * s,
  },
  section: {
    marginBottom: 8 * s,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5 * s,
    borderBottomWidth: 1,
    borderBottomColor: '#bfdbfe',
    paddingBottom: 3.5 * s,
    marginBottom: 5 * s,
  },
  sectionTitle: {
    fontSize: 10 * s,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryText: {
    fontSize: 9 * s,
    lineHeight: 1.38,
    textAlign: 'justify',
    color: '#334155',
  },
  grid: {
    flexDirection: 'row',
    gap: 12 * s,
  },
  column: {
    flex: 1,
  },
  subHeader: {
    fontSize: 9 * s,
    fontFamily: 'Helvetica-Bold',
    color: '#2563eb',
    marginBottom: 4 * s,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3 * s,
  },
  bulletDot: {
    fontSize: 9.5 * s,
    color: '#334155',
    marginRight: 5 * s,
    marginTop: -0.5 * s,
  },
  bulletText: {
    flex: 1,
    fontSize: 9 * s,
    lineHeight: 1.35,
    color: '#334155',
  },
  boldText: {
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  timelineContainer: {
    paddingLeft: 4 * s,
    marginTop: 1 * s,
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: 14 * s,
    paddingBottom: 6.5 * s,
  },
  timelineLine: {
    position: 'absolute',
    left: 2 * s,
    top: 10 * s,
    bottom: -2 * s,
    width: 1,
    backgroundColor: '#93c5fd',
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: 3.5 * s,
    width: 5 * s,
    height: 5 * s,
    borderRadius: 2.5 * s,
    backgroundColor: '#2563eb',
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1 * s,
  },
  expRoleCompany: {
    fontSize: 9.5 * s,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  expCompany: {
    color: '#2563eb',
  },
  expDate: {
    fontSize: 8.5 * s,
    color: '#64748b',
  },
  expLocation: {
    fontSize: 8.5 * s,
    fontStyle: 'italic',
    color: '#64748b',
    marginBottom: 2.5 * s,
  },
  halfSection: {
    flex: 1,
  },
  watermarkContainer: {
    marginTop: 10 * s,
    paddingTop: 6 * s,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  watermarkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4 * s,
  },
  watermarkText: {
    fontSize: 7.5 * s,
    color: '#64748b',
  },
  watermarkBrand: {
    fontFamily: 'Helvetica-Bold',
    color: '#2563eb',
    textDecoration: 'none',
  },
  watermarkRight: {
    fontSize: 7.5 * s,
    color: '#64748b',
  },
  watermarkTimeBold: {
    fontFamily: 'Helvetica-Bold',
    color: '#334155',
  }
});

const Icons = {
  Location: ({ s = 1 }: { s?: number }) => (
    <Svg width={10 * s} height={10 * s} viewBox="0 0 24 24">
      <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="10" r="3" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Phone: ({ s = 1 }: { s?: number }) => (
    <Svg width={10 * s} height={10 * s} viewBox="0 0 24 24">
      <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  User: ({ s = 1 }: { s?: number }) => (
    <Svg width={12 * s} height={12 * s} viewBox="0 0 24 24">
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="7" r="4" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Lightning: ({ s = 1 }: { s?: number }) => (
    <Svg width={12 * s} height={12 * s} viewBox="0 0 24 24">
      <Rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 9h6v6H9z" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Briefcase: ({ s = 1 }: { s?: number }) => (
    <Svg width={12 * s} height={12 * s} viewBox="0 0 24 24">
      <Rect x="2" y="7" width="20" height="14" rx="2" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 12v3M9 12h6" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Education: ({ s = 1 }: { s?: number }) => (
    <Svg width={13 * s} height={13 * s} viewBox="0 0 24 24">
      <Path d="M22 10v6M2 10l10-5 10 5-10 5z" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 12v5c3 3 9 3 12 0v-5" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Document: ({ s = 1 }: { s?: number }) => (
    <Svg width={12 * s} height={12 * s} viewBox="0 0 24 24">
      <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="14 2 14 8 20 8" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="16" y1="13" x2="8" y2="13" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="16" y1="17" x2="8" y2="17" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="10 9 9 9 8 9" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Shield: ({ s = 1 }: { s?: number }) => (
    <Svg width={10 * s} height={10 * s} viewBox="0 0 24 24">
      <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m9 12 2 2 4-4" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
};

export const ResumePDF = ({ data, websiteUrl }: ResumePDFProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [genTime, setGenTime] = useState<string>('');

  // Dynamically scale based on content length
  const scale = useMemo(() => {
    const len = JSON.stringify(data).length;
    if (len < 2000) return 1.08;
    if (len < 3000) return 1.0;
    if (len < 4500) return 0.93;
    if (len < 6000) return 0.86;
    return 0.78;
  }, [data]);

  const styles = useMemo(() => getStyles(scale), [scale]);

  useEffect(() => {
    const currentDomain = typeof window !== 'undefined' ? (window.location.origin || window.location.href) : '';
    const activeUrl = websiteUrl || currentDomain || 'https://awadhsingh.kexora.in';
    setTargetUrl(activeUrl);
    
    // Set exact generation time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', hour12: true
    }).toUpperCase();
    
    setGenTime(`${dateStr}, ${timeStr}`);

    QRCode.toDataURL(activeUrl, {
      margin: 1,
      width: 160,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
    .then(url => setQrCodeUrl(url))
    .catch(err => console.error("QR Error:", err));
  }, [websiteUrl]);

  const renderFormattedText = (text: string) => {
    const colonIndex = text.indexOf(':');
    if (colonIndex !== -1 && colonIndex < 80) {
      const boldPart = text.substring(0, colonIndex + 1);
      const restPart = text.substring(colonIndex + 1);
      return (
        <Text style={styles.bulletText}>
          <Text style={styles.boldText}>{boldPart}</Text>
          {restPart}
        </Text>
      );
    }
    
    // For education items like "I.T.I. Certified (Electrical Trade)"
    const parenIndex = text.indexOf(' (');
    if (parenIndex !== -1 && parenIndex < 40) {
      const boldPart = text.substring(0, parenIndex);
      const restPart = text.substring(parenIndex);
      return (
        <Text style={styles.bulletText}>
          <Text style={styles.boldText}>{boldPart}</Text>
          {restPart}
        </Text>
      );
    }

    return <Text style={styles.bulletText}>{text}</Text>;
  };

  return (
    <Document
      title={`Resume - ${data.name}`}
      author={data.name}
      subject="Official Verified Resume - Read Only Security Protected"
      creator="Kexora AutoPDF Engine v2.0"
      producer="Kexora Security & Verification Lock (Protected)"
      keywords="Resume, Verified, ReadOnly, Kexora"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.mainContent}>
          <View>
            {/* Header Section */}
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.role}>{data.role}</Text>
                
                <View style={styles.contactRow}>
                  <View style={styles.contactItem}>
                    <Icons.Location s={scale} />
                    <Text>Siwan, Bihar - 841243</Text>
                  </View>
                  <Text style={{ color: '#cbd5e1' }}>|</Text>
                  
                  <Link src={`tel:${data.phone.replace(/\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                    <View style={styles.contactItem}>
                      <Icons.Phone s={scale} />
                      <Text style={{ color: '#475569' }}>{data.phone}</Text>
                    </View>
                  </Link>
                </View>
              </View>

              {qrCodeUrl && (
                <Link src={targetUrl} style={{ textDecoration: 'none' }}>
                  <Image src={qrCodeUrl} style={styles.qrImage} />
                </Link>
              )}
            </View>

            <View style={styles.headerBorder} />

            {/* Professional Summary */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Icons.User s={scale} />
                <Text style={styles.sectionTitle}>Professional Summary</Text>
              </View>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>

            {/* Technical Expertise */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Icons.Lightning s={scale} />
                <Text style={styles.sectionTitle}>Technical Expertise</Text>
              </View>
              <View style={styles.grid}>
                <View style={styles.column}>
                  <Text style={styles.subHeader}>Power Distribution & High Voltage</Text>
                  {data.skills.power.map((skill: string, i: number) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{skill}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.column}>
                  <Text style={styles.subHeader}>Wiring & Auxiliary Systems</Text>
                  {data.skills.wiring.map((skill: string, i: number) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Career Timeline & Experience */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Icons.Briefcase s={scale} />
                <Text style={styles.sectionTitle}>Career Timeline & Experience</Text>
              </View>
              <View style={styles.timelineContainer}>
                {data.experience.map((exp: any, index: number) => {
                  const isLast = index === data.experience.length - 1;
                  return (
                    <View key={index} style={styles.timelineItem}>
                      {!isLast && <View style={styles.timelineLine} />}
                      <View style={styles.timelineDot} />

                      <View style={styles.expHeader}>
                        <Text style={styles.expRoleCompany}>
                          {exp.role} <Text style={{ color: '#334155', fontFamily: 'Helvetica' }}>|</Text> <Text style={styles.expCompany}>{exp.company}</Text>
                        </Text>
                        <Text style={styles.expDate}>{exp.date}</Text>
                      </View>

                      <Text style={styles.expLocation}>{exp.location}</Text>

                      {exp.bullets.map((bullet: string, bIndex: number) => (
                        <View key={bIndex} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          {renderFormattedText(bullet)}
                        </View>
                      ))}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Education & Additional Details Grid */}
            <View style={styles.grid}>
              {/* Education & Training */}
              <View style={styles.halfSection}>
                <View style={styles.sectionTitleRow}>
                  <Icons.Education s={scale} />
                  <Text style={styles.sectionTitle}>Education & Training</Text>
                </View>
                {data.education.map((edu: string, i: number) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    {renderFormattedText(edu)}
                  </View>
                ))}
              </View>

              {/* Additional Details */}
              <View style={styles.halfSection}>
                <View style={styles.sectionTitleRow}>
                  <Icons.Document s={scale} />
                  <Text style={styles.sectionTitle}>Additional Details</Text>
                </View>
                {data.details.map((detail: string, i: number) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    {renderFormattedText(detail)}
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Dynamic Watermark at Bottom */}
          <View style={styles.watermarkContainer}>
            <View style={styles.watermarkLeft}>
              <Icons.Shield s={scale} />
              <Text style={styles.watermarkText}>
                This is an auto-generated PDF <Text style={{ color: '#cbd5e1' }}>|</Text> Powered by{' '}
                <Link src="https://kexora.in" style={styles.watermarkBrand}>
                  KEXORA
                </Link>
              </Text>
            </View>
            <Text style={styles.watermarkRight}>
              Generated: <Text style={styles.watermarkTimeBold}>{genTime}</Text>
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
