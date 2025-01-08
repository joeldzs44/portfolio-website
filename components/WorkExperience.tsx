import experienceData from '../app/data/work-experience.json'

export default function WorkExperience({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">EXPERIENCE</h2>
        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <div 
              key={exp.id} 
              className="bg-card rounded-lg p-6 border border-border animate-scale-in hover-lift"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <h3 className="text-2xl font-semibold mb-2">{exp.company}</h3>
              <p className="text-muted-foreground mb-4">{exp.location}</p>
              {exp.positions.map((position, index) => (
                <div key={index} className="mb-2">
                  <h4 className="text-lg font-semibold gradient-text inline-block">{position.title}</h4>
                  <p className="text-muted-foreground">{position.duration}</p>
                </div>
              ))}
              <ul className="mt-4 space-y-2">
                {exp.achievements.map((achievement, index) => (
                  <li key={index} className="text-muted-foreground text-sm pl-4 border-l border-primary">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

