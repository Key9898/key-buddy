import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Upload, X, Loader2, Check, AlertCircle } from 'lucide-react'
import clsx from 'clsx'
import type { RemoteCharacterPack } from '../../types/character'
import { CharacterPackCard } from './CharacterPackCard'
import { mockRemotePacks } from '../../demo/mockCharacterPacks'
import { downloadRemotePack } from '../../services/characterPackService'
import { useCharacterPackStore } from '../../stores/useCharacterPackStore'
import { importFromZip } from '../../services/characterPackService'

type FilterCategory = 'all' | 'animal' | 'fantasy' | 'minimal' | 'seasonal'
type FilterTier = 'all' | 'free' | 'premium'

export function CharacterMarketplace() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all')
  const [tierFilter, setTierFilter] = useState<FilterTier>('all')
  const [showImportModal, setShowImportModal] = useState(false)
  const [importStatus, setImportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [importError, setImportError] = useState<string | null>(null)

  const installPack = useCharacterPackStore((s) => s.installPack)

  const filteredPacks = useMemo(() => {
    return mockRemotePacks.filter((pack) => {
      const matchesSearch =
        searchQuery === '' ||
        pack.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pack.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pack.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = categoryFilter === 'all' || pack.category === categoryFilter
      const matchesTier = tierFilter === 'all' || pack.tier === tierFilter

      return matchesSearch && matchesCategory && matchesTier
    })
  }, [searchQuery, categoryFilter, tierFilter])

  const featuredPacks = filteredPacks.filter((p) => p.featured)
  const regularPacks = filteredPacks.filter((p) => !p.featured)

  const handleDownload = async (pack: RemoteCharacterPack) => {
    await downloadRemotePack(pack)
  }

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImportStatus('loading')
    setImportError(null)

    try {
      const result = await importFromZip(file)

      if (result.valid && result.pack) {
        installPack(result.pack)
        setImportStatus('success')
        setTimeout(() => {
          setShowImportModal(false)
          setImportStatus('idle')
        }, 2000)
      } else {
        setImportStatus('error')
        setImportError(result.errors.join(', '))
      }
    } catch (error) {
      setImportStatus('error')
      setImportError(error instanceof Error ? error.message : 'Unknown error')
    }

    event.target.value = ''
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Character Marketplace</h1>
          <p className="text-base-content/70">
            Discover and download new character companions for KeyBuddy
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
            <input
              type="text"
              placeholder="Search characters..."
              className="input input-bordered w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="dropdown dropdown-bottom">
              <label tabIndex={0} className="btn btn-outline gap-2">
                <Filter className="w-4 h-4" />
                Category
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-30 menu p-2 shadow-lg bg-base-200 rounded-box w-52"
              >
                {(['all', 'animal', 'fantasy', 'minimal', 'seasonal'] as FilterCategory[]).map(
                  (cat) => (
                    <li key={cat}>
                      <button
                        className={clsx(categoryFilter === cat && 'active')}
                        onClick={() => setCategoryFilter(cat)}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="dropdown dropdown-bottom">
              <label tabIndex={0} className="btn btn-outline gap-2">
                Tier
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-30 menu p-2 shadow-lg bg-base-200 rounded-box w-52"
              >
                {(['all', 'free', 'premium'] as FilterTier[]).map((tier) => (
                  <li key={tier}>
                    <button
                      className={clsx(tierFilter === tier && 'active')}
                      onClick={() => setTierFilter(tier)}
                    >
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn btn-primary gap-2" onClick={() => setShowImportModal(true)}>
              <Upload className="w-4 h-4" />
              Import
            </button>
          </div>
        </div>

        {featuredPacks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary">★</span> Featured Characters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPacks.map((pack) => (
                <CharacterPackCard key={pack.id} pack={pack} onDownload={handleDownload} />
              ))}
            </div>
          </div>
        )}

        {regularPacks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Characters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPacks.map((pack) => (
                <CharacterPackCard key={pack.id} pack={pack} onDownload={handleDownload} />
              ))}
            </div>
          </div>
        )}

        {filteredPacks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/50 text-lg">
              No characters found matching your criteria
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showImportModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImportModal(false)}
          >
            <motion.div
              className="modal-box max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Import Character Pack</h3>
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={() => setShowImportModal(false)}
                  title="Close"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4">
                <p className="text-sm text-base-content/70 mb-4">
                  Import a character pack from a .zip file. The zip file must contain a valid
                  manifest.json file.
                </p>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-base-300 rounded-lg cursor-pointer hover:bg-base-200 transition-colors">
                  {importStatus === 'idle' && (
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-base-content/50" />
                      <p className="text-sm text-base-content/70">Click to select a .zip file</p>
                    </div>
                  )}

                  {importStatus === 'loading' && (
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-primary" />
                      <p className="text-sm">Importing...</p>
                    </div>
                  )}

                  {importStatus === 'success' && (
                    <div className="text-center">
                      <Check className="w-8 h-8 mx-auto mb-2 text-success" />
                      <p className="text-sm text-success">Import successful!</p>
                    </div>
                  )}

                  {importStatus === 'error' && (
                    <div className="text-center">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-error" />
                      <p className="text-sm text-error">Import failed</p>
                      {importError && <p className="text-xs text-error/70 mt-1">{importError}</p>}
                    </div>
                  )}

                  <input
                    type="file"
                    accept=".zip"
                    className="hidden"
                    onChange={handleFileImport}
                    disabled={importStatus === 'loading'}
                  />
                </label>
              </div>

              <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => setShowImportModal(false)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
