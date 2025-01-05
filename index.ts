import { z } from "zod";

async function askQuestion(key: string, question: string) {
  const payload = {
    key: key,
    human_input: question,
    tabId: "426",
  };

  const socket = new WebSocket(
    "wss://prod.orbit-ml-front-api.fakespot.prod.webservices.mozgcp.net/ws"
  );

  socket.addEventListener("message", (event) => {
    const zResponse = z.strictObject({
      sender: z.string(),
      message: z.string(),
      type: z.string(),
      code: z.null(),
      tabId: z.string(),
      messageId: z.string(),
    });

    const response = zResponse.parse(JSON.parse(event.data));
    console.write(response.message);
  });

  socket.addEventListener("open", (event) => {
    socket.send(JSON.stringify(payload));
  });

  socket.addEventListener("error", (event) => {
    console.error(event);
  });

  await new Promise((resolve) => {
    socket.addEventListener("close", () => {
      console.log("\n");
      resolve(void 0);
    });
  });
}

const body = {
  prompt:
    "You are an AI model designed to help the user do whatever they ask for!",
  ai_context: null,
  context: " ",
  title: "",
  type: "generic",
};

const res = await fetch("https://orbitbymozilla.com/v1/orbit/prompt/update", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const data = z
  .strictObject({
    token: z.string(),
  })
  .parse(await res.json());

const key = data.token.split(":")[1];
console.log("New session:", key, "\n");

while (true) {
  console.write("> ");

  let prompt = "";

  for await (const line of console) {
    prompt += line;
    break;
  }

  console.log("\n");

  await askQuestion(key, prompt);
}
