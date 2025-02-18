'use client'

import { useState, useEffect } from 'react'
import { SanityDocument } from 'next-sanity'
import { ArrowUpDown, Filter, X, Search, Calendar } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import { format, parseISO } from 'date-fns'

interface BlogFiltersProps {
  posts: SanityDocument[]
  onFilterChange: (filteredPosts: SanityDocument[]) => void
}

export default function BlogFilters({ posts, onFilterChange }: BlogFiltersProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  })

  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(
      posts.flatMap((post) => post.tags || [])
    )
  )

  useEffect(() => {
    let filtered = [...posts]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((post) =>
        post.tags?.includes(selectedTag)
      )
    }

    // Filter by date range
    if (dateRange.start) {
      filtered = filtered.filter(post => new Date(post.publishedAt) >= new Date(dateRange.start))
    }
    if (dateRange.end) {
      filtered = filtered.filter(post => new Date(post.publishedAt) <= new Date(dateRange.end))
    }

    // Sort by date
    filtered.sort((a, b) => {
      const comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      return sortOrder === 'asc' ? comparison : -comparison
    })

    onFilterChange(filtered)
  }, [searchTerm, selectedTag, dateRange, sortOrder, posts, onFilterChange])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTag(null)
    setDateRange({ start: '', end: '' })
  }

  const hasActiveFilters = searchTerm || selectedTag || dateRange.start || dateRange.end

  return (
    <div className="animate-fade-in flex flex-col md:flex-row justify-between">
      <div className="flex-1 max-w-md relative mr-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-card/40 hover:bg-card/60 border border-primary/20 dark:border-accent/20 transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20"
        />
      </div>

      <div className="flex gap-4 mb-4 justify-start mt-4 md:mt-0">
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/40 hover:bg-card/60 border border-primary/20 dark:border-accent/20 transition-all duration-300 text-sm">
              <Calendar className="w-4 h-4" />
              Date Filter
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content 
              className="z-50 w-72 p-4 rounded-xl bg-card border border-border shadow-lg animate-in fade-in-0 zoom-in-95"
              sideOffset={5}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Date Range</h3>
                  {(dateRange.start || dateRange.end) && (
                    <button
                      onClick={() => setDateRange({ start: '', end: '' })}
                      className="text-xs text-muted-foreground hover:text-primary dark:hover:text-accent"
                    >
                      Clear dates
                    </button>
                  )}
                </div>

                <div className="space-y-2 dark:[color-scheme:dark]">
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground" id='from-label'>From</label>
                    <input
                      type="date"
                      aria-labelledby='from-label'
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-3 py-1.5 text-sm bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground" id='to-label'>To</label>
                    <input
                      type="date"
                      aria-labelledby='to-label'
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-3 py-1.5 text-sm bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20"
                    />
                  </div>
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
          {sortOrder === 'asc' ? 'Oldest first' : 'Newest first'}
        </button>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              !selectedTag
                ? 'bg-primary dark:bg-accent text-white'
                : 'text-primary dark:text-accent border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5 hover:bg-primary/10 dark:hover:bg-accent/10'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-primary dark:bg-accent text-white'
                  : 'text-primary dark:text-accent border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5 hover:bg-primary/10 dark:hover:bg-accent/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Active filters:</span>
          {searchTerm && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent text-xs">
              Search: {searchTerm}
              <button
                onClick={() => setSearchTerm('')}
                className="hover:text-primary/80 dark:hover:text-accent/80"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedTag && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent text-xs">
              Tag: {selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="hover:text-primary/80 dark:hover:text-accent/80"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {dateRange.start && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent text-xs">
              From: {format(parseISO(dateRange.start), 'MMM d, yyyy')}
              <button
                onClick={() => setDateRange(prev => ({ ...prev, start: '' }))}
                className="hover:text-primary/80 dark:hover:text-accent/80"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {dateRange.end && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent text-xs">
              To: {format(parseISO(dateRange.end), 'MMM d, yyyy')}
              <button
                onClick={() => setDateRange(prev => ({ ...prev, end: '' }))}
                className="hover:text-primary/80 dark:hover:text-accent/80"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
} 