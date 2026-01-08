import { LogoutOutlined } from '@ant-design/icons';
import { Flex, Heading, HStack, IconButton } from '@chakra-ui/react';

export function TopBar({ onLogout }: { onLogout: () => void }) {
  return (
    <Flex
      px={6}
      py={3}
      align="center"
      justify="space-between"
      borderBottomWidth="1px"
      borderColor="gray.200"
      bg="white"
    >
      <Heading size="sm">Data Map</Heading>

      <HStack>       
        <IconButton
          aria-label="Logout"
          variant="ghost"
          size="sm"
          onClick={onLogout}
        >
          <LogoutOutlined />
        </IconButton>
      </HStack>
    </Flex>
  );
}
