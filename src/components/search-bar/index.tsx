import React from 'react';
import { useRef } from 'react';
import styles from './index.module.scss';

const SearchBar: React.FC = () => {
  const contentRef = useRef<string>('');

  const onEnter = (e: any) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      relaunchSearch();
    }
  };

  const updateContent = (e: React.FormEvent<HTMLInputElement>) => {
    contentRef.current = e.currentTarget.value;
  };

  const relaunchSearch = (): void => {
    window.location.href = `https://www.baidu.com/s?ie=UTF-8&wd=${encodeURIComponent(contentRef.current)}`;
  };

  return (
    <div className={styles.searchBar}>
      <input className={styles.input} onChange={updateContent} onKeyPress={onEnter} aria-label='search' />
      <div className={styles.submit} onClick={relaunchSearch}>
        <div className={styles.icon}></div>
      </div>
    </div>
  );
};

export default SearchBar;
