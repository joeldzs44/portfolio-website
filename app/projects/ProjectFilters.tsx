'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/lib/interfaces'
import { ArrowUpDown, Filter, X, Check, Search } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import { Command } from 'cmdk'

interface ProjectFiltersProps {
  projects: Project[]
  onFilterChange: (filtered: Project[]) => void
}

export default function ProjectFilters({ projects, onFilterChange }: ProjectFiltersProps) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Get unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies || []))
  ).sort()

  // Filter technologies based on search
  const filteredTechnologies = allTechnologies.filter(tech =>
    tech.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    let filtered = [...projects]

    // Filter by selected technologies
    if (selectedTechs.length > 0) {
      filtered = filtered.filter(project =>
        selectedTechs.every(tech => project.technologies?.includes(tech))
      )
    }

    // Sort by title
    filtered.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title)
      return sortOrder === 'asc' ? comparison : -comparison
    })

    onFilterChange(filtered)
  }, [selectedTechs, sortOrder, projects, onFilterChange])

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex gap-4 mb-4 justify-end">
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/40 hover:bg-card/60 border border-primary/20 dark:border-accent/20 transition-all duration-300 text-sm">
              <Filter className="w-4 h-4" />
              Filters {selectedTechs.length > 0 && `(${selectedTechs.length})`}
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content 
              className="z-50 w-72 p-4 rounded-xl bg-background border border-border shadow-lg animate-in fade-in-0 zoom-in-95"
              sideOffset={5}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Tech Stack</h3>
                  {selectedTechs.length > 0 && (
                    <button
                      onClick={() => setSelectedTechs([])}
                      className="text-xs text-muted-foreground hover:text-primary dark:hover:text-accent"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    placeholder="Search technologies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full py-2 pl-8 pr-4 text-sm bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20"
                  />
                </div>

                <div className="max-h-60 overflow-auto space-y-1">
                  {filteredTechnologies.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-2 text-center">
                      No technologies found
                    </p>
                  ) : (
                    filteredTechnologies.map(tech => (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors
                          ${selectedTechs.includes(tech)
                            ? 'bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent'
                            : 'hover:bg-primary/5 dark:hover:bg-accent/5'
                          }`}
                      >
                        <span>{tech}</span>
                        {selectedTechs.includes(tech) && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <Popover.Arrow className="fill-border" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <button
          type="button"
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/40 hover:bg-card/60 border border-primary/20 dark:border-accent/20 transition-all duration-300 text-sm"
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </button>
      </div>

      {selectedTechs.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Active filters:</span>
          {selectedTechs.map(tech => (
            <span
              key={tech}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent text-xs"
            >
              {tech}
              <button
                onClick={() => toggleTech(tech)}
                className="hover:text-primary/80 dark:hover:text-accent/80"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
} 