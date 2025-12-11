"use client";

import {
  Grid,
  Text,
  Box,
  Flex,
  IconButton,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiEraser } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { MdPlusOne } from "react-icons/md";
import { IoPencil, IoChevronDown, IoColorPalette } from "react-icons/io5";

export default function Chart() {
  const searchParams = useSearchParams();
  const rows = searchParams.get("rows") ?? "10";
  const cols = searchParams.get("cols") ?? "10";
  const name = searchParams.get("name") ?? "Untitled";
  const rowsCount = parseInt(rows);
  const colsCount = parseInt(cols);
  const [isErase, setIsErase] = useState(false);
  const [isDraw, setIsDraw] = useState(true);
  const [currentColor, setCurrentColor] = useState("white");

  const initialColors = Array.from({ length: rowsCount }, () =>
    Array.from({ length: colsCount }, () => "gray.200"),
  );

  const [cellColors, setCellColors] = useState(initialColors);

  const handleCellClick = (r: number, c: number) => {
    const newColor = isErase ? "gray.200" : isDraw ? currentColor : "white";

    setCellColors((prevColors) => {
      const newColors = prevColors.map((row) => [...row]);

      newColors[r][c] = newColor;
      return newColors;
    });
  };

  const cells = Array.from({ length: rowsCount }).flatMap((_, r) =>
    Array.from({ length: colsCount }).map((_, c) => (
      <Box
        key={`${r}-${c}`}
        bg={cellColors[r][c]}
        border="1px solid"
        borderColor="gray.300"
        width="100%"
        height="100%"
        onClick={() => handleCellClick(r, c)}
        cursor="pointer"
        css={{ aspectRatio: "1 / 1" }}
      />
    )),
  );

  return (
    <Box>
      {/* Horizontal Toolbar */}
      <Box h="96px">
        {/* Title Container */}
        <Flex alignItems="center" h="32px" gap="6px">
          <IconButton aria-label="menu button" size="xs" variant="ghost">
            <IoIosMenu />
          </IconButton>
          <Text textStyle="xl">{decodeURIComponent(name)}</Text>
          {/* TODO: Add save functionality */}
        </Flex>

        {/* Nav Bar */}
        <Flex alignItems="center" h="32px">
          <Button gap="2px" size="xs" variant="ghost">
            <Text textStyle="md" color="white">
              File
            </Text>
            <Icon aria-label="file chevron down" color="white" size="sm">
              <IoChevronDown />
            </Icon>
          </Button>
          <Button gap="2px" size="xs" variant="ghost">
            <Text textStyle="md" color="white">
              Edit
            </Text>
            <Icon aria-label="edit chevron down" color="white" size="sm">
              <IoChevronDown />
            </Icon>
          </Button>
          <Button gap="2px" size="xs" variant="ghost">
            <Text textStyle="md" color="white">
              View
            </Text>
            <Icon aria-label="view chevron down" color="white" size="sm">
              <IoChevronDown />
            </Icon>
          </Button>
          <Button gap="2px" size="xs" variant="ghost">
            <Text textStyle="md" color="white">
              Help
            </Text>
            <Icon aria-label="help chevron down" color="white" size="sm">
              <IoChevronDown />
            </Icon>
          </Button>
        </Flex>

        {/* Editor Tools */}
        <Flex
          alignItems="center"
          h="32px"
          border="1px solid"
          borderColor="transparent"
          borderBottomColor="white"
        >
          <IconButton
            aria-label="draw button"
            size="xs"
            variant="outline"
            borderColor="white"
            borderBottomRadius="0"
            marginLeft="12px"
            color="white"
            onClick={() => {
              setIsDraw(true);
              setIsErase(false);
            }}
          >
            <IoPencil />
          </IconButton>
          <IconButton
            aria-label="erase button"
            size="xs"
            variant="outline"
            borderColor="white"
            borderBottomRadius="0"
            color="white"
            onClick={() => {
              setIsErase(true);
              setIsDraw(false);
            }}
          >
            <CiEraser />
          </IconButton>
        </Flex>
      </Box>

      {/* Vertical Color Palette & Grid */}
      <Flex>
        {/* Vertical Color Palette*/}
        <Flex
          w="66px"
          h="calc(100vh - 96px)"
          padding="2px"
          border="1px solid"
          borderColor="transparent"
          borderRightColor="white"
          direction="column"
        >
          {/* Color Palette */}
          <Grid templateColumns="repeat(2, 30px)">
            <Box
              as="button"
              bgColor="white"
              border="1px solid"
              borderColor="gray.600"
              boxSize="30px"
              cursor="pointer"
              onClick={() => {
                setCurrentColor("white");
                setIsDraw(true);
                setIsErase(false);
              }}
            />
            <Box
              as="button"
              bgColor="black"
              border="1px solid"
              borderColor="gray.600"
              boxSize="30px"
              cursor="pointer"
              onClick={() => {
                setCurrentColor("black");
                setIsDraw(true);
                setIsErase(false);
              }}
            />
            {/* TODO: add functionality for adding colors*/}
          </Grid>

          {/* Add Color +1*/}
          <IconButton
            aria-label="add color"
            size="xs"
            width="60px"
            borderRadius="0"
            border="1px solid"
            borderColor="gray.600"
          >
            <MdPlusOne />
          </IconButton>

          {/* Edit Palette */}
          <IconButton
            aria-label="edit palette"
            size="xs"
            width="60px"
            borderRadius="0"
            border="1px solid"
            borderColor="gray.600"
          >
            <IoColorPalette />
          </IconButton>
        </Flex>
        <Flex
          flex="1"
          alignItems="center"
          justifyContent="center"
          overflow="scroll"
          h="calc(100vh - 96px)"
        >
          {/* Editor Grid */}
          <Grid templateColumns={`repeat(${cols}, 25px)`} bgColor="white">
            {cells}
          </Grid>
        </Flex>
      </Flex>
    </Box>
  );
}
