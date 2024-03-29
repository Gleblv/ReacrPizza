import React from 'react';
import debounce from 'lodash.debounce';

import { appContext } from '../../App';

import styles from './Search.module.scss';

const Search = () => {
  const { setSearchValue } = React.useContext(appContext);

  const [value, setValue] = React.useState('');

  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = React.useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 500),
    [],
  );

  const onChangeValue = (e) => {
    setValue(e.target.value);
    updateSearchValue(value);
  };

  return (
    <div className={styles.searchInput}>
      <input
        ref={inputRef}
        onChange={(e) => onChangeValue(e)}
        value={value}
        type="text"
        placeholder="Поиск"
      />
      {value && (
        <div onClick={onClickClear} className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 24 24">
            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Search;
