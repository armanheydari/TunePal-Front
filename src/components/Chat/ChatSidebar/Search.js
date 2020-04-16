import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <input
                    type="text"
                    placeholder="search"
                />
                <FontAwesomeIcon icon={faSearch} />
            </div>
        );
    }
}

export default Search;