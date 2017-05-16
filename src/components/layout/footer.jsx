import React, { PropTypes } from 'react'
import styles from '../less/main.less'
import { config } from '../../utils'

const Footer = () => <div className={styles.footer}>
  {config.footerText}
</div>

export default Footer
