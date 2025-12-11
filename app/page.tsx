"use client";

import {
  Box,
  Button,
  NumberInput,
  Flex,
  Grid,
  Text,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const defaultStitches = "30";
  const [cols, setCols] = useState(defaultStitches);
  const [rows, setRows] = useState(defaultStitches);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleCreateChart = () => {
    if (!name) {
      alert("Please enter a project name");
      return;
    }

    const chartName = encodeURIComponent(name);
    const fullPath = `/charts/${chartName}?rows=${rows}&cols=${cols}&name=${chartName}`;

    router.push(fullPath);
  };

  return (
    <Box>
      <Flex
        width="100vw"
        height="100vh"
        as="main"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="18px"
      >
        <Grid templateColumns="repeat(2, 1fr)" gap="18px">
          <Box>
            <Text>Row</Text>
            <NumberInput.Root
              width="100px"
              size="lg"
              min={1}
              value={rows}
              onValueChange={(details) => setRows(details.value)}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Box>
          <Box>
            <Text>Col</Text>
            <NumberInput.Root
              width="100px"
              size="lg"
              min={1}
              value={cols}
              onValueChange={(details) => setCols(details.value)}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Box>
        </Grid>
        <Input
          placeholder="Project Name"
          width="200px"
          size="lg"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Button onClick={handleCreateChart}>Create Chart</Button>
      </Flex>
    </Box>
  );
}
