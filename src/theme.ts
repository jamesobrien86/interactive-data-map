import { createSystem, defaultConfig } from '@chakra-ui/react';

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      radii: {
        md: { value: '10px' },
        lg: { value: '14px' },
      },
    },
  },
});

export default theme;
