import { Box, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { groupByDataUse, groupBySystemType } from '../domain/selectors';
import type { SystemNode } from '../domain/types';
import { SystemCard } from './SystemCard';

type GroupMode = 'systemType' | 'dataUse';
const MotionDiv = motion.div;


export function SystemGrid({
  systems,
  groupMode = 'systemType',
  systemIndex,

}: {
  systems: SystemNode[];
  groupMode?: GroupMode;
  systemIndex: Map<string, SystemNode>;
}) {
  const grouped =
    groupMode === 'dataUse' ? groupByDataUse(systems) : groupBySystemType(systems);
  return (
    <VStack align="stretch" mt={6} gap={10}>
      {grouped.map((g) => (
        <Box
          key={g.key}
          borderWidth="1px"
          borderColor="blackAlpha.200"
          borderRadius="2xl"
          bg="gray.50"
          p={{ base: 4, md: 5 }}
        >
          <HStack justify="space-between" mb={4} align="baseline">
            <Heading size="lg" letterSpacing="tight">
              {g.key}
            </Heading>

          </HStack>
          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 3 }}
            gap={6}
          >
             <AnimatePresence mode="popLayout">
            {g.items.map((s) => (
               <MotionDiv
                key={`${g.key}:${s.id}`}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <SystemCard key={`${g.key}:${s.id}`} system={s} systemIndex={systemIndex} />
             </MotionDiv>
            ))}
            </AnimatePresence>
          </SimpleGrid>
        </Box>
      ))}
    </VStack>
  );
}
