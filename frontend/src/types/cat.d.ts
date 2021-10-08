import { User } from './user'

export interface Cat {
    id: string
    url: string
    height?: number
    width?: number
    breeds?: Breed[]
    categories?: Category[]
    requestedBy?: User
}

export interface Breed {
    id: string
    name: string
    description?: string
    country_code?: string
    wikipedia_url?: string
    origin?: string
}

export interface Category {
    id: string | number
    name: string
}
