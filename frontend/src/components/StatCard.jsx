import React from 'react'
import { Card } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import '../styles/StatCard.css'

export default function StatCard({
  title,
  value,
  prefix,
  suffix,
  icon,
  color,
  change,
  changeType = 'up',
  description,
}) {
  return (
    <Card className="stat-card" bordered={false}>
      <div className="stat-card-inner">
        <div className="stat-card-left">
          <span className="stat-card-title">{title}</span>
          <span className="stat-card-value">
            {prefix && <span className="stat-prefix">{prefix}</span>}
            {value}
            {suffix && <span className="stat-suffix">{suffix}</span>}
          </span>
          {change !== undefined && (
            <span className={`stat-card-change ${changeType === 'up' ? 'change-up' : 'change-down'}`}>
              {changeType === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              {' '}{change}% vs ayer
            </span>
          )}
          {description && (
            <span className="stat-card-description">{description}</span>
          )}
        </div>
        <div className="stat-card-icon" style={{ background: color + '18', color }}>
          {icon}
        </div>
      </div>
    </Card>
  )
}
