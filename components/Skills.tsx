import skillsData from '../app/data/skills.json'

export default function Skills({ id }: { id?: string }) {

  return (
    <section id={id} className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center animate-fade-in font-baskervville">The Skill Wall.</h2>
        <p className="text-center text-[10px] text-foreground mb-12 animate-slide-up">{"> p.s."} its ever growing</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkillCategory title="Development Skills" skills={skillsData.Development} gradientClass="gradient-text" delay={0} />
          <SkillCategory title="AI/ML Skills" skills={skillsData['AI/ML']} gradientClass="accent-gradient-text" delay={0.2} />
          <SkillCategory title="Other Skills" skills={skillsData.Other} gradientClass="secondary-gradient-text" delay={0.4} />
        </div>
      </div>
    </section>
  )
}

function SkillCategory({ title, skills, gradientClass, delay }: { title: string, skills: string[], gradientClass: string, delay: number }) {
  return (
    <div 
      className={`bg-background p-6 rounded-lg border border-border animate-scale-in hover-lift mx-auto`}
      style={{animationDelay: `${delay}s`}}
    >
      <h3 className={`text-xl text-center font-semibold mb-6 ${gradientClass}`}>{title}</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-3xl text-sm border dark:border-border dark:bg-border/90"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

