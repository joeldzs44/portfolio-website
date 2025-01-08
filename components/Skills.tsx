import skillsData from '../app/data/skills.json'

export default function Skills({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20 bg-card">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">MY TECH STACK</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkillCategory title="Technical Skills" skills={skillsData.technical} gradientClass="gradient-text" delay={0} />
          <SkillCategory title="Reporting Skills" skills={skillsData.reporting} gradientClass="accent-gradient-text" delay={0.2} />
          <SkillCategory title="Development Tools" skills={skillsData.development} gradientClass="secondary-gradient-text" delay={0.4} />
        </div>
      </div>
    </section>
  )
}

function SkillCategory({ title, skills, gradientClass, delay }: { title: string, skills: string[], gradientClass: string, delay: number }) {
  return (
    <div 
      className={`bg-background p-6 rounded-lg border border-border animate-scale-in hover-lift`}
      style={{animationDelay: `${delay}s`}}
    >
      <h3 className={`text-xl text-center font-semibold mb-6 ${gradientClass}`}>{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="skills-bg/10 px-3 py-1 rounded-full text-sm border skills-border/20"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

