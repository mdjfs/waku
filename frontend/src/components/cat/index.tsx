import { Cat } from '../../types/cat'
import './cat.scss'

export default function ({ cat }: { cat: Cat }) {
    const withoutData =
        (!cat.breeds || cat.breeds.length === 0) &&
        (!cat.categories || cat.categories.length === 0) &&
        !cat.requestedBy
    return (
        <div className={`cat-card ${withoutData ? 'only-pic' : 'with-data'}`}>
            <div className="cat-image">
                <img
                    src={cat.url}
                    alt="Cat Image"
                    onClick={() => {
                        window.open(cat.url, '_blank')
                    }}
                />
            </div>
            <div className="cat-data">
                {cat.breeds && cat.breeds.length > 0 && (
                    <div className="cat-breeds">
                        {cat.breeds.map((breed, i) => (
                            <div className="cat-breed" key={`b-${i}`}>
                                <div className="name">{breed.name}</div>
                                <div className="description">
                                    {breed.description}
                                </div>
                                <div className="country">
                                    {breed.country_code} - {breed.origin}
                                </div>
                                <a href={breed.wikipedia_url} target="_blank">
                                    More info
                                </a>
                            </div>
                        ))}
                    </div>
                )}
                {cat.categories && cat.categories.length > 0 && (
                    <div className="cat-categories">
                        {cat.categories.map((category, i) => (
                            <div className="cat-category" key={`c-${i}`}>
                                <div className="name">{category.name}</div>
                            </div>
                        ))}
                    </div>
                )}
                {cat.requestedBy && (
                    <div className="requests">
                        <div className="requested-by">
                            <p>{cat.requestedBy.name}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
