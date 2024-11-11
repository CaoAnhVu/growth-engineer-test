// // src/components/Result.jsx
// import { Box, Button, Image, Text, Link, VStack } from "@chakra-ui/react";

// function Result({ score, results }) {
//   const level = results.find((res) => score >= res.range[0] && score <= res.range[1]);

//   return (
//     <Box textAlign="center">
//       <Text fontSize="2xl" fontWeight="bold" mb={2}>
//         {level.name}
//       </Text>
//       <Image src={level.icon} alt={`${level.name} icon`} mb={4} />
//       <Text>{level.description.text}</Text>
//       <VStack mt={4} spacing={3}>
//         {level.key_actions.map((action, index) => (
//           <Text key={index}>- {action.text}</Text>
//         ))}
//       </VStack>
//       <Link href={level.key_actions_cta.url} isExternal color="blue.500" mt={4}>
//         {level.key_actions_cta.text}
//       </Link>
//       <Button colorScheme="facebook" mt={6} onClick={() => window.open(`https://facebook.com/share?text=I achieved ${level.name} maturity level!`)}>
//         Share on Facebook
//       </Button>
//     </Box>
//   );
// }

// export default Result;
