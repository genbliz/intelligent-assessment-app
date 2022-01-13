import React from "react";
import AppLayout from "../../component/layout";
import { NotificationService } from "../../services/notification-service";
import { BookDataService } from "./book-data-service";
import { IBook } from "./book-types";
import { useNavigate } from "react-router-dom";
import { BookItem } from "../../component/book-item";
import AppContent from "../../component/content";
import AppHeader from "../../component/header";
import { Spacer } from "@chakra-ui/react";

export const BookList: React.FC = () => {
  const [isLoaded, setLoaded] = React.useState(false);
  const [dataList, setDataList] = React.useState<IBook[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    BookDataService.getList()
      .then((result) => {
        if (result?.data?.length) {
          setDataList(result?.data);
        }
        setLoaded(true);
      })
      .catch((err) => {
        NotificationService.error(err?.message || "Error loading users");
        navigate("home");
      });
  }, []);

  if (!isLoaded) {
    return <AppLayout>{/*  */}</AppLayout>;
  }

  if (!dataList?.length) {
    return <AppLayout>{/*  */}</AppLayout>;
  }

  return (
    <AppLayout>
      <AppHeader menuTitle={"Books"} />
      <AppContent>
        {dataList.map((data, i) => {
          return (
            <React.Fragment key={data.id}>
              <BookItem
                title={data.name}
                commentCount={data.commentCount}
                handleCommentClick={() => {
                  navigate(`/books/${data.id}/comment`);
                }}
                authors={data.authors}
                showActionButtons={true}
              ></BookItem>
              <Spacer height={5} />
            </React.Fragment>
          );
        })}
      </AppContent>
    </AppLayout>
  );
};
