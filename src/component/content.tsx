import React from "react";
import { Box } from "@chakra-ui/react";

interface IContent {
  bg?: string;
  hasAutoScroll?: boolean;
  isFullHeight?: boolean;
  maxWidth?: string;
  withGroup?: "medium" | "slim" | "large" | "fluid" | "medium-large";
  setContentAsReadOnly?: boolean;
}

const AppContent: React.FC<IContent & { children?: React.ReactNode }> = ({
  isFullHeight,
  maxWidth,
  withGroup,
  hasAutoScroll,
  bg,
  children,
  setContentAsReadOnly,
}) => {
  const [height] = React.useState(100);
  const ref = React.useRef<HTMLDivElement>(null);

  const menuHeight = 0;

  let myMaxWidth: string | undefined;

  if (withGroup || maxWidth) {
    if (withGroup === "slim") {
      myMaxWidth = "500px";
    } else if (withGroup === "medium") {
      myMaxWidth = "750px";
    } else if (withGroup === "medium-large") {
      myMaxWidth = "900px";
    } else if (withGroup === "large") {
      myMaxWidth = "1200px";
    } else if (withGroup === "fluid") {
      myMaxWidth = undefined;
    }
    if (maxWidth) {
      myMaxWidth = maxWidth;
    }
  } else {
    myMaxWidth = "750px";
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="full"
      bg={bg || "brand.50"}
      height="auto"
      minHeight={`${height}vh`}
      className="AppContent_main"
      p={0}
      m={0}
    >
      <Box
        paddingTop="0px"
        textAlign="left"
        width="full"
        maxWidth={myMaxWidth}
        bg="transparent"
        className="AppContent_wrapper"
        marginTop={`${(menuHeight || 50) + 10}px`}
      >
        <Box
          pointerEvents={setContentAsReadOnly ? "none" : undefined}
          marginX={{ base: "10px", lg: "5px" }}
          height={isFullHeight ? "100%" : "auto"}
          marginBottom="120px"
          bg="transparent"
          className="AppContent_children"
        >
          {children}
        </Box>
        <Box
          className="AppContent_bottom"
          marginTop="10px"
          display={hasAutoScroll ? "block" : "none"}
          ref={ref}
        >
          &nbsp;
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(AppContent);
