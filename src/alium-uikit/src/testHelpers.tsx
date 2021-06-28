import React, { ReactNode } from 'react'
// @ts-ignore
import { render, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { light } from './theme'

/* eslint-disable import/prefer-default-export */
export const renderWithTheme = (component: ReactNode, theme = light): RenderResult => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}
