import { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Icon,
  TextAreaField,
  Button,
  Alert,
  Link,
  View,
} from "@aws-amplify/ui-react";
// import { RiFeedbackLine } from "react-icons/ri";
import { Amplify } from "aws-amplify";

import outputs from '../amplify_outputs.json';
Amplify.configure(outputs);

import { generateClient } from 'aws-amplify/data';
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */
const client = generateClient({ authMode: "apiKey"});

function App() {
  const [feedback, setFeedback] = useState("");
  const [feedbackState, setFeedbackState] = useState("form");

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("Feedback: ", feedback);

    const { data, errors } = await client.mutations.executeStateMachine({
      input: feedback
    });
    const output = JSON.parse(data.output);

    setFeedbackState(output.Sentiment);

    setFeedback("");
  }

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      alignContent="center"
      wrap="nowrap"
      gap="1rem"
    >
{/*       <Text fontSize="6em">
        <Icon ariaLabel="Feedback" as={RiFeedbackLine} />
      </Text> */}
      <Heading level="4">We value your feedback!</Heading>
      {(() => {
        switch (feedbackState) {
          case "form":
            return (
              <>
                <Text>
                  Please share your feedback to help us improve our services.
                </Text>
                <Flex
                  as="form"
                  direction="column"
                  width="20rem"
                  onSubmit={handleSubmit}
                >
                  <TextAreaField
                    type="email"
                    isRequired={true}
                    onChange={(event) => setFeedback(event.target.value)}
                    value={feedback}
                  />
                  <Button type="submit">Submit</Button>
                </Flex>
              </>
            );
          case "POSITIVE":
            return (
              <View width="35rem">
                <Alert
                  variation="success"
                  isDismissible={false}
                  hasIcon={true}
                  heading="Thank you!"
                >
                  Your feedback has been recorded.
                </Alert>
              </View>
            );
          default:
            return (
              <View width="35rem">
                <Alert
                  variation="info"
                  isDismissible={false}
                  hasIcon={true}
                  heading="Thank you for your feedback!"
                >
                  We are always looking to improve. If you felt your experience
                  was not optimal, we would love to make things right. Follow{" "}
                  <Link
                    href="https://docs.amplify.aws/"
                    textDecoration="underline dotted"
                    isExternal={true}
                  >
                    this link
                  </Link>{" "}
                  to get in touch with a customer service representative.
                </Alert>
              </View>
            );
        }
      })()}
    </Flex>
  );
}

export default App;
// import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";

// const client = generateClient<Schema>();

// function App() {
//   const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

//   useEffect(() => {
//     client.models.Todo.observeQuery().subscribe({
//       next: (data) => setTodos([...data.items]),
//     });
//   }, []);

//   function createTodo() {
//     //client.models.Todo.create({ content: window.prompt("Todo content") });
    
//   }

//   return (
//     <main>
//       <h1>KS ART</h1>
//       <button onClick={createTodo}>Send event</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>{todo.content}</li>
//         ))}
//       </ul>
//       <div>
//         🥳 App successfully hosted. Try creating a new todo.
//         <br />
//         <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
//           Review next step of this tutorial.
//         </a>
//       </div>
//     </main>
//   );
// }

// export default App;
