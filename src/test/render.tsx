import { ChakraProvider } from '@chakra-ui/react';
import { render, type RenderOptions } from '@testing-library/react';
import React from 'react';
import theme from '../theme';

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ChakraProvider value={theme}>{children}</ChakraProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
