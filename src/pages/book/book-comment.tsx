import React from "react";
import AppLayout from "../../component/layout";
import { NotificationService } from "../../services/notification-service";
import { BookDataService } from "./book-data-service";
import { IBook, IBookComment } from "./book-types";
import { useNavigate } from "react-router-dom";
import { BookItem } from "../../component/book-item";
import AppContent from "../../component/content";
import AppHeader from "../../component/header";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { MdComment, MdPerson } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../../component/loading";

export const BookCommentList: React.FC = () => {
  const [isLoaded, setLoaded] = React.useState(false);
  const [bookData, setBookData] = React.useState<IBookComment>({} as any);

  const { id } = useParams();

  const navigate = useNavigate();

  const [value, setValue] = React.useState("");

  const handleInputChange = (e: any) => {
    const inputValue: string = e.target.value;

    console.log(inputValue);
    if (inputValue.length > 500) {
      return;
    }
    setValue(inputValue);
  };

  const addComment = () => {
    if (!id || !value) {
      return;
    }
    BookDataService.comment({ comment: value.trim(), bookId: id })
      .then((result) => {
        if (result?.data) {
          setBookData({
            ...bookData,
            comments: [...(bookData.comments || []), result.data],
          });
        }
        setValue("");
      })
      .catch((err) => {
        NotificationService.error(err?.message || "Error loading book");
        // navigate("/home");
      });
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }
    BookDataService.getById(id)
      .then((result) => {
        if (result?.data) {
          setBookData(result?.data);
        }
        setLoaded(true);
      })
      .catch((err) => {
        NotificationService.error(err?.message || "Error loading book");
        // navigate("/home");
      });
  }, [id]);

  if (!isLoaded) {
    return (
      <AppLayout>
        <Loading />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <AppHeader menuTitle={"Book Comment"} isMini backToUrl="/books" />
      <AppContent>
        <Box>
          <BookItem
            title={bookData.name}
            commentCount={bookData.commentCount}
            authors={bookData.authors}
            showActionButtons={false}
          ></BookItem>
        </Box>

        <Spacer h={10} />

        {bookData.comments?.length ? (
          <Box>
            <Heading size={"sm"} paddingBottom={1}>
              Comments
            </Heading>
            <Spacer h={2} />

            <List spacing={3}>
              {bookData.comments.map((data) => {
                return (
                  <React.Fragment key={data.id}>
                    <ListItem>
                      <HStack>
                        <ListIcon
                          as={MdComment}
                          boxSize={6}
                          color="green.500"
                        />
                        <Box>{data.comment}</Box>
                      </HStack>
                    </ListItem>
                  </React.Fragment>
                );
              })}
            </List>
          </Box>
        ) : (
          <Box>No Comments</Box>
        )}
        <Spacer h={10} />

        <Box>
          <Heading size={"sm"} paddingBottom={1}>
            Add Comment
          </Heading>
          <Spacer h={2} />
          <Textarea
            value={value}
            onChange={handleInputChange}
            placeholder="Comment"
            size="lg"
            rows={5}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          p={5}
          paddingTop={3}
        >
          <Box></Box>
          <Button colorScheme="teal" onClick={() => addComment()} size="md">
            Save
          </Button>
        </Box>
      </AppContent>
    </AppLayout>
  );
};
