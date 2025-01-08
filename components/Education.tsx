const education = {
  degree: 'Bachelor of Engineering in Computer Science',
  institution: 'Xavier Institute of Engineering',
  location: 'Mumbai, India',
  year: '2021'
}

const certifications = [
  { name: '[PL-300] Microsoft Certified: Power BI Data Analyst Associate', issuer: 'Microsoft', date: 'June 2024' },
  { name: 'Introduction to NoSQL Databases', issuer: 'Coursera', date: 'May 2024' },
  { name: 'Core Data Concepts in Microsoft Azure', issuer: 'Coursera', date: 'Apr 2024' },
  { name: 'Microsoft Azure SQL', issuer: 'Coursera', date: 'Apr 2024' },
  { name: 'Python for Everybody Specialization', issuer: 'Coursera', date: 'June 2021' },
  { name: 'MTA: Software Development Fundamentals', issuer: 'Microsoft', date: 'Oct 2019' }
]

export default function Education() {
  return (
    <section id="education" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Education & Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">Education</h3>
            <p className="text-xl font-semibold">{education.degree}</p>
            <p className="text-gray-600">{education.institution}</p>
            <p className="text-gray-600">{education.location}</p>
            <p className="text-gray-600">{education.year}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">Certifications</h3>
            <ul className="space-y-2">
              {certifications.map((cert, index) => (
                <li key={index}>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-gray-600">{cert.issuer}, {cert.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

