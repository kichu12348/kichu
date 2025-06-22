import React from 'react'
import styles from './desktop-icon.module.css'

function DesktopIcon({ icon: Icon, label, onClick }) {
  return (
    <div className={styles.desktopIcon} onClick={onClick}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default DesktopIcon