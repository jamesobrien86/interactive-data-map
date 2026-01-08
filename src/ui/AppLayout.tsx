import { Box } from '@chakra-ui/react';
import { TopBar } from './TopBar';

export function AppLayout({
  onLogout,
  children,
}: {
  onLogout: () => void;
  children: React.ReactNode;
}) {
  return (
    <Box minH="100vh">
      <TopBar onLogout={onLogout} />
      <Box px={6} py={6}>{children}</Box>
    </Box>
  );
}
