import { useState } from "react";

interface SearchFormProps {
    onSearch: (city: string) => void;
    isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
    const [query, setQuery] = useState('');

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!query.trim()) return;

        onSearch(query);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Digite o nome da cidade..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base shadow-sm 
            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm 
                   transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto w-full"
            >
                {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
        </form>
    );
}
