export default function Pagination({ meta, onPageChange }) {
    if (!meta) return null;

    const { current_page, last_page } = meta;

    const pages = [];
    for (let i = 1; i <= last_page; i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-end">
                <li className={`page-item ${current_page === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(current_page - 1)}
                    >
                        Previous
                    </button>
                </li>

                {pages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${current_page === page ? "active" : ""}`}
                    >
                        <button className="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}

                <li
                    className={`page-item ${current_page === last_page ? "disabled" : ""
                        }`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(current_page + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
