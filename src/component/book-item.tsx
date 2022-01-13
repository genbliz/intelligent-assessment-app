import React from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Spacer,
} from "@chakra-ui/react";

import { MdPerson } from "react-icons/md";

export const BookItem: React.FC<{
  hasBorderRadius?: boolean;
  commentCount: number;
  title: string;
  authors: string[];
  showActionButtons: boolean;
  handleCommentClick?: () => void;
}> = ({
  children,
  hasBorderRadius,
  commentCount,
  title,
  handleCommentClick,
  authors,
  showActionButtons,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderTopRadius={hasBorderRadius ? "20px" : undefined}
      minWidth="full"
      minH="100px"
      shadow="lg"
      className="AppCard_main"
      p={0}
      m={0}
      paddingBottom={0}
    >
      <Center padding={2}>
        <Heading fontSize="xl">{title}</Heading>
      </Center>

      <Center>By</Center>

      <Center>
        <List spacing={3}>
          {authors.map((data, i) => {
            return (
              <React.Fragment key={data}>
                <ListItem>
                  <ListIcon as={MdPerson} color="green.500" />
                  {data}
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Center>

      {showActionButtons && (
        <React.Fragment>
          <Spacer height={"30px"} />
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              width={"50%"}
              bg={"gray.100"}
              p={1}
              cursor={"pointer"}
              role={"button"}
              borderRightWidth={"1px"}
              borderRightColor={"gray.300"}
              onClick={() => {
                if (handleCommentClick) {
                  handleCommentClick();
                }
              }}
            >
              <Center> {commentCount || 0} Comments</Center>
            </Box>
            <Box p={1} width={"50%"} bg={"gray.100"}>
              <Center> 5 Chars</Center>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
