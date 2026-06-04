import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import esES from 'antd/locale/es_ES'
import AppRoutes from './routes/AppRoutes.jsx'

const primaryGreen = '#14532D'
const primaryLight = '#22C55E'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev
      if (next) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
      return next
    })
  }

  return (
    <ConfigProvider
      locale={esES}
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: primaryLight,
          colorLink: primaryLight,
          borderRadius: 8,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Layout: {
            siderBg: primaryGreen,
            headerBg: darkMode ? '#1E293B' : '#FFFFFF',
          },
          Menu: {
            darkItemBg: 'transparent',
            darkSubMenuItemBg: 'transparent',
            darkItemSelectedBg: 'rgba(34,197,94,0.2)',
            darkItemSelectedColor: '#22C55E',
          },
          Button: {
            colorPrimary: primaryGreen,
            colorPrimaryHover: '#166534',
          },
        },
      }}
    >
      <BrowserRouter>
        <AppRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </BrowserRouter>
    </ConfigProvider>
  )
}

