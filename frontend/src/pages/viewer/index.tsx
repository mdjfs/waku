import { useEffect, useState } from 'react'
import { Cat } from '../../types/cat'
import CatComponent from '../../components/cat'
import Loading from '../loading'
import './viewer.scss'

interface Option {
    id: string
    name: string
}

export default function () {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [cats, setCats] = useState<Cat[]>([])
    const [mode, setMode] = useState<'local' | 'api'>('local')
    const [filter, setFilter] = useState<'breed' | 'category'>('breed')
    const [filterOptions, setFilterOptions] = useState<Option[]>([])
    const [filterValue, setFilterValue] = useState<string>('all')

    async function fetchCoupleCats() {
        setLoading(true)
        const url = mode === 'local' ? '/api/cat/local' : '/api/cat'
        const filterID = filter === 'breed' ? 'breed_ids' : 'category_ids'
        const param = filterValue !== 'all' ? `${filterID}=${filterValue}` : ''
        const response = await fetch(url + `?page=${page}&limit=5&${param}`)
        const fetched = [...cats, ...(await response.json())]
        setCats(fetched)
        setPage(Math.ceil((fetched.length + 5) / 5))
        setLoading(false)
    }

    async function fetchOptions() {
        const url = mode === 'local' ? '/api/cat/local' : '/api/cat'
        const f_url = filter === 'breed' ? url + '/breeds' : url + '/categories'
        const response = await fetch(f_url)
        setFilterOptions(await response.json())
    }

    async function handleScroll(e) {
        const element = e.target as HTMLDivElement
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            if (!loading) fetchCoupleCats()
        }
    }

    function init() {
        setPage(1)
        setCats([])
        setFilterOptions([])
    }

    useEffect(init, [mode])

    useEffect(() => {
        if (cats.length === 0) fetchCoupleCats()
    }, [cats])

    useEffect(() => {
        setFilterOptions([])
    }, [filter])

    useEffect(() => {
        if (filterOptions.length === 0) fetchOptions()
    }, [filterOptions])

    return (
        <div className="cats-container" onScroll={handleScroll}>
            <div className="tabs">
                <button
                    className={mode === 'local' ? 'selected' : ''}
                    onClick={() => setMode('local')}
                >
                    Local
                </button>
                <button
                    className={mode === 'api' ? 'selected' : ''}
                    onClick={() => setMode('api')}
                >
                    CatAPI
                </button>
            </div>
            <div className="filter">
                <p>Filter by</p>
                <select
                    value={filter}
                    onChange={(e) => {
                        const value = e.target.value as 'breed' | 'category'
                        setFilter(value)
                        setFilterValue('all')
                        init()
                    }}
                >
                    <option value="category">Category</option>
                    <option value="breed">Breed</option>
                </select>
                <select
                    value={filterValue}
                    onChange={(e) => {
                        const value = e.target.value
                        setFilterValue(value)
                        init()
                    }}
                >
                    <option value="all">All</option>
                    {filterOptions.map((option) => (
                        <option value={option.id} key={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="cats">
                {cats.map((cat, i) => (
                    <CatComponent cat={cat} key={`cat-${i}`}></CatComponent>
                ))}
                {loading && <Loading></Loading>}
            </div>
        </div>
    )
}
