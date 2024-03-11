import React from "react";

import Data from "./pages/Data";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

function App() {
    // 2. Wrap ChakraProvider at the root of your app
    return (
        <ChakraProvider>
            <Data />
        </ChakraProvider>
    );
}

export default App;
