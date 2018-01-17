import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default ({ className, links, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <div style={{textAlign:'center',lineHeight:'40px'}}>
      {
        links && (
          <div className={styles.links}>
            {links.map(link => (
              <a
                key={link.title}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )
      }
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </div>
  );
};
